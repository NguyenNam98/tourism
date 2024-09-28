import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches} from 'class-validator';

export class AuthLoginUserDto {
  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  /* Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character */

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d@$&+,:;=?@#|'<>.^*()%!-]{8,}$/,
    { message: 'invalid password' },
  )
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class ChangePasswordDto {
  @IsEmail()
  @IsString()
  email: string;

  /* Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character */

  @Matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d@$&+,:;=?@#|'<>.^*()%!-]{8,}$/,
      { message: 'invalid password' },
  )
  @IsString()
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  uid: string;

  /* Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character */

  @Matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d@$&+,:;=?@#|'<>.^*()%!-]{8,}$/,
      { message: 'invalid password' },
  )
  @IsString()
  newPassword: string;
}

export class AskForgotPassDto {
  @IsEmail()
  @IsString()
  email: string;
}

export class CreateCustomTokenDto {
  @IsString()
  authId: string;
}

export class VerifyCustomTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class ChangePasswordRequestDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d@$&+,:;=?@#|'<>.^*()%!-]{8,}$/,
      { message: 'invalid password' },
  )
  newPassword: string;
}

export class DeleteAccountRequestDto {
  @IsString()
  @IsNotEmpty()
  authId: string;
}
export class CustomUserClaimsDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
   userStatus?: number

   @IsOptional()
   @ApiProperty()
   @IsString()
   collectionOrganizationId?: string

   @IsOptional()
   @ApiProperty()
   @IsNumber()
   permission?: number

   @IsOptional()
   @ApiProperty()
   isCompleteRegistration?: boolean

   @IsOptional()
   @ApiProperty()
   @IsString()
   nationalId?: string

   @IsOptional()
   @ApiProperty()
   @IsString()
   roleId?: string

   @IsOptional()
   @ApiProperty()
   @IsString()
   userRole?: string
 }

export class AuthRegisterUserDto {

  @IsEmail()
  @ApiProperty()
  @IsString()
  email: string;

  /* Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character */

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d@$&+,:;=?@#|'<>.^*()%!-]{8,}$/,
    { message: 'invalid password' },
  )
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  displayName?: string;

}

export class UpdateCustomToken extends CustomUserClaimsDto {
  @IsString()
  @IsNotEmpty()
  authId: string;


}

/*
export interface TCustomUserClaim {
  userStatus?: number
  collectionOrganizationId?: string
  permission?: number
  isCompleteRegistration?: boolean
  nationalId?: string
  roleId?: string
}
*/


