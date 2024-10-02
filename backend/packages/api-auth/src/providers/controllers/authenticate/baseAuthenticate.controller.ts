import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthLoginUserDto, AuthRegisterUserDto } from "dtos";
import { BaseAuthenticateService } from "../../services/authenticate/baseAuthenticate.service";

import {
  TRefreshTokenResponseDTO,
  TRegisterResponseDTO,
} from "../../../app.typing";
import { AuthenticatedControllerInterface } from "./authenticateController.interface";
import {
  ACCESS_TOKEN_SIG_COOKIE,
  REFRESH_TOKEN_SIG_COOKIE,
} from "../../../app.constant";
import { Cookies } from "../../../decorators/cookies";
import * as process from "process";

@Controller("auth")
export abstract class BaseAuthenticateController
  implements AuthenticatedControllerInterface
{
  protected constructor(private authenticateService: BaseAuthenticateService) {}

  @Post("/register")
  @UsePipes(ValidationPipe)
  async register(
    @Body() authRegisterUserDto: AuthRegisterUserDto
  ): Promise<TRegisterResponseDTO> {
    const uid = await this.authenticateService.register(authRegisterUserDto);
    return {
      data: {
        uid,
      },
    };
  }

  @Post("/login")
  @UsePipes(ValidationPipe)
  async login(@Body() loginData: AuthLoginUserDto, @Res() res) {
    const result = await this.authenticateService.login(loginData);
    this.authenticateService.setCookies(res, result.tokenPair);
    return res.send({
      data: {
        userId: result.id,
      },
    });
  }

  @Get("/refresh")
  async refreshToken(
    @Cookies(REFRESH_TOKEN_SIG_COOKIE) refreshToken: string
  ): Promise<TRefreshTokenResponseDTO> {
    const refreshTokenValidate = await this.authenticateService.refreshToken(
      refreshToken
    );

    if (!refreshTokenValidate) {
      return {
        error: "Invalid refresh token",
        data: {},
      };
    }
    return {
      data: {
        ats: refreshTokenValidate.ats,
        attributes: refreshTokenValidate.data,
      },
    };
  }

  @Post("/log-out")
  async logout(
    @Cookies(ACCESS_TOKEN_SIG_COOKIE) accessToken: string,
    @Res() res
  ): Promise<any> {
    const option = { domain: process.env.SA_DOMAIN || "host.docker.internal" };

    res.clearCookie(ACCESS_TOKEN_SIG_COOKIE, option);
    res.clearCookie(REFRESH_TOKEN_SIG_COOKIE, option);

    await this.authenticateService.logout(accessToken);
    return res.send({
      data: {
        isSuccess: true,
      },
    });
  }

  revokeAllByAuthId(...args: any[]) {}

  revokeTokenByRefreshToken(...args: any[]) {}
}
