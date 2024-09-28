import {PasswordControllerInterface} from "./basePassword.interface";
import {Body, Controller, Post, Put, UsePipes, ValidationPipe} from "@nestjs/common";
import {BasePasswordService, PasswordException} from "../../services/password/basePassword.service";
import {
  AuthLoginUserDto,
  ChangePasswordDto, ChangePasswordRequestDto,
  CreateCustomTokenDto, UpdatePasswordDto,
  VerifyCustomTokenDto
} from "../../../dtos";
import {TBaseDto} from "../../../app.typing";
import {BusinessException} from "../../../app.exception";


@Controller({
    path: 'password',
    version: '1',
})
export abstract class BasePasswordController implements PasswordControllerInterface{
  protected constructor(
      private passwordService: BasePasswordService,

  ) {}
  @Post('/verify')
  @UsePipes(ValidationPipe)
  async verifyPassword(
      @Body() passwordData: AuthLoginUserDto,
  ): Promise<TBaseDto<{
    token: string
  }>> {
    const token = await this.passwordService.verifyPassword(passwordData)
    return {
      data: {
        token
      }
    }
  }


  @Post('/change')
  @UsePipes(ValidationPipe)
  async changePassword(
      @Body() changePasswordData: ChangePasswordDto
  ): Promise<TBaseDto<{}>> {
    const validateTokenData = await this.passwordService.verifyToken(changePasswordData)

    if (!validateTokenData.isValidToken || !validateTokenData.userInfo) {
      throw new BusinessException(PasswordException.ECP0002, 'Token is invalid')
    }

     await this.passwordService.serviceUpdatePassword(
        validateTokenData.userInfo.id, changePasswordData.newPassword
    )

    return {
      data: {}
    }
  }
  @Post('/custom-token')
  @UsePipes(ValidationPipe)
  async createCustomToken(
      @Body() customTokenDto: CreateCustomTokenDto
  ): Promise<TBaseDto<{
    token: string
  }>> {
    const token =  await this.passwordService.createCustomToken(customTokenDto.authId)
    return {
      data: {
        token
      }
    }
  }

  @Post('/custom-token/verify')
  @UsePipes(ValidationPipe)
  async verifyCustomToken(
      @Body() verifyToken: VerifyCustomTokenDto
  ): Promise<TBaseDto<{
    authId: string,
    email: string
  }>> {
    const tokenDetail =  await this.passwordService.verifyCustomToken(
        verifyToken.token
    )
    return {
      data: tokenDetail
    }
  }
  @Post('/forgot/change')
  @UsePipes(ValidationPipe)
  async forgotPassChangePass(
      @Body() verifyToken: ChangePasswordRequestDto
  ): Promise<TBaseDto<{
    authId: string,
    email: string
  }>> {
    const tokenDetail =  await this.passwordService.verifyCustomToken(verifyToken.token)

    if (!tokenDetail) {
      throw new BusinessException(PasswordException.ECP0002, 'Token is invalid')
    }

    await this.passwordService.serviceUpdatePassword(
        tokenDetail.authId, verifyToken.newPassword
    )

    return {
      data: {
        authId: tokenDetail.authId,
        email: tokenDetail.email
      }
    }
  }
  // update password directly
  @Put('/update')
  @UsePipes(ValidationPipe)
  async updatePassword(
      @Body() updatePasswordDto: UpdatePasswordDto
  ): Promise<TBaseDto<{}>> {
    await this.passwordService.serviceUpdatePassword(
        updatePasswordDto.uid, updatePasswordDto.newPassword
    )

    return {
      data: {}
    }
  }
}
