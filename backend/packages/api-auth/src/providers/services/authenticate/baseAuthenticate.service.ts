import { Injectable } from "@nestjs/common";
import { AuthLoginUserDto, AuthRegisterUserDto, UpdateCustomToken } from "dtos";
import { AuthenticateServiceInterface } from "./authenticateService.interface";
import { TTokenPair } from "../../../app.typing";
import {
  ACCESS_TOKEN_JWT_LIFE_TIME,
  ACCESS_TOKEN_LIFE_TIME,
  ACCESS_TOKEN_SIG_COOKIE,
  DATABASE_NAMES,
  REFRESH_TOKEN_JWT_LIFE_TIME,
  REFRESH_TOKEN_LIFE_TIME,
  REFRESH_TOKEN_SIG_COOKIE,
} from "../../../app.constant";
import {
  accessTokenPayload,
  JWTTokenService,
} from "../../../services/JWTToken.service";
import { InjectDataSource } from "@nestjs/typeorm";
import { DatabaseModule } from "../../../database.module";
import { DataSource, Equal, Not } from "typeorm";
import { Auth, StatusType, tenantType } from "../../../entities/privacy/Auth";
import { BusinessException } from "../../../app.exception";
import { CryptoService } from "../../../services/crypto.service";
import { TokenHistory } from "../../../entities/privacy/TokenHistory";
import { isEmpty } from "lodash";
import { Redis } from "ioredis";

export interface TDefaultPayload {
  uid: string;
  email: string;
}
export interface TRefreshTokenResponseDTO {
  ats: string;
  data: accessTokenPayload;
}
@Injectable()
export abstract class BaseAuthenticateService
  implements AuthenticateServiceInterface
{
  protected _tenant: tenantType;
  @InjectDataSource(DatabaseModule.getConnectionName(DATABASE_NAMES.MASTER))
  private masterConnection: DataSource;
  protected constructor(
    protected readonly cryptoService: CryptoService,
    protected readonly jwtTokenService: JWTTokenService
  ) {}
  get getTenant(): tenantType {
    return this._tenant;
  }
  async register(authRegisterUserDto: AuthRegisterUserDto) {
    await this.validateEmailRegister(authRegisterUserDto.email);
    return await this.createNewEmailUser(authRegisterUserDto);
  }

  private async validateEmailRegister(email: string) {
    const slaveQueryRunner = this.masterConnection.createQueryRunner("slave");
    try {
      const repository = slaveQueryRunner.manager.getRepository(Auth);
      const authData = await repository.findOne({
        where: {
          email: email,
          isValid: true,
          userStatus: Not(Equal(StatusType.deleted)),
        },
      });

      if (authData) {
        throw new BusinessException("Email already exists");
      }
    } finally {
      await slaveQueryRunner.release();
    }
  }

  private async createNewEmailUser(
    authRegisterUserDto: AuthRegisterUserDto
  ): Promise<string> {
    let dataBaseNewUser: Partial<Auth> = {
      isValid: true,
      userStatus: StatusType.active,
      email: authRegisterUserDto.email,
      password: this.cryptoService.encrypt(authRegisterUserDto.password),
    };

    const user = await this.masterConnection
      .getRepository(Auth)
      .insert(dataBaseNewUser);
    const uid = user.identifiers[0].id;
    if (!uid) {
      throw new BusinessException("Create user failed");
    }
    return uid;
  }

  private generateTokenPairs(tokenPayloadDefault: TDefaultPayload): {
    ats: string;
    rts: string;
  } {
    const atsPayload = {
      ...tokenPayloadDefault,
      iat: Date.now(),
    };
    const accessToken = this.jwtTokenService.generateToken(
      atsPayload,
      ACCESS_TOKEN_JWT_LIFE_TIME
    );
    const refreshToken = this.jwtTokenService.generateToken(
      {
        iat: Date.now(),
        uid: tokenPayloadDefault.uid,
      },
      REFRESH_TOKEN_JWT_LIFE_TIME
    );
    return {
      ats: accessToken,
      rts: refreshToken,
    };
  }

  private async validateLogin(email: string, password: string): Promise<Auth> {
    const slaveQueryRunner = this.masterConnection.createQueryRunner("slave");
    try {
      const repository = slaveQueryRunner.manager.getRepository(Auth);
      const authData = await repository.findOne({
        where: {
          email: email,
          isValid: true,
        },
      });
      if (
        !authData ||
        password !== this.cryptoService.decrypt(authData.password)
      ) {
        throw new BusinessException("Email or password is incorrect");
      }
      return authData;
    } finally {
      await slaveQueryRunner.release();
    }
  }

  async login(
    authLoginUserDto: AuthLoginUserDto
  ): Promise<{ tokenPair: TTokenPair; id: string }> {
    const { email, password } = authLoginUserDto;
    const authData = await this.validateLogin(email, password);

    const defaultPayload = {
      uid: authData.id,
      email: authData.email,
    };
    const tokenPair = this.generateTokenPairs(defaultPayload);

    await Promise.all([
      this.updateLoginHistory(authData.id),
      this.createTokenHistory(authData.id, tokenPair.rts),
    ]);

    return { tokenPair, id: authData.id };
  }

  private async updateLoginHistory(uid: string): Promise<string> {
    await this.masterConnection.getRepository(Auth).update(
      {
        id: uid,
      },
      {
        lastLoginAt: new Date(),
        lastAccessAt: new Date(),
      }
    );
    return uid;
  }

  private async updateAccessHistory(uid: string): Promise<string> {
    await this.masterConnection.getRepository(Auth).update(
      {
        id: uid,
      },
      {
        lastAccessAt: new Date(),
      }
    );
    return uid;
  }

  private async createTokenHistory(
    uid: string,
    refreshToken: string
  ): Promise<string> {
    await this.masterConnection.getRepository(TokenHistory).insert({
      authId: uid,
      refreshToken,
      isValid: true,
    });
    return uid;
  }
  async refreshToken(
    refreshToken: string
  ): Promise<TRefreshTokenResponseDTO | null> {
    const verifyToken = this.jwtTokenService.verifyRefreshToken(refreshToken);
    if (!verifyToken) {
      return null;
    }

    const userAuthInfor = await this.getUserAuthInformation(verifyToken.uid);

    if (!userAuthInfor) {
      return null;
    }
    const defaultPayload = {
      uid: userAuthInfor.id,
      email: userAuthInfor.email,
      iat: Date.now(),
    };
    const accessToken = this.jwtTokenService.generateToken(
      defaultPayload,
      ACCESS_TOKEN_JWT_LIFE_TIME
    );

    await this.updateAccessHistory(userAuthInfor.id);

    return {
      ats: accessToken,
      data: defaultPayload,
    };
  }
  private async getUserAuthInformation(uid: string): Promise<Auth | null> {
    const slaveQueryRunner = this.masterConnection.createQueryRunner("slave");
    try {
      const repository = slaveQueryRunner.manager.getRepository(Auth);
      const authData = await repository.findOneBy({
        id: uid,
      });

      if (!authData) {
        return null;
      }

      return authData;
    } finally {
      await slaveQueryRunner.release();
    }
  }

  async logout(accessToken: string) {
    // return await this._cognitoService.logout(accessToken)
  }

  /** *
   * Set response cookie
   * @param res
   * @param token
   */
  setCookies(res, token: TTokenPair) {
    res.cookie(ACCESS_TOKEN_SIG_COOKIE, token.ats, {
      httpOnly: true,
      secure: process.env.ENV !== "develop",
      domain: process.env.SA_DOMAIN || "host.docker.internal",
      maxAge: ACCESS_TOKEN_LIFE_TIME,
    });
    res.cookie(REFRESH_TOKEN_SIG_COOKIE, token.rts, {
      httpOnly: true,
      secure: process.env.ENV !== "develop",
      domain: process.env.GOGO_DOMAIN || "host.docker.internal",
      maxAge: REFRESH_TOKEN_LIFE_TIME,
    });
  }
}
