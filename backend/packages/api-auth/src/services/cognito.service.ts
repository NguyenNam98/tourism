import { Injectable } from '@nestjs/common'
import {
	CognitoIdentityProviderClient,
	AdminCreateUserCommand,
	AdminInitiateAuthCommand,
	GlobalSignOutCommand,
	AdminSetUserPasswordCommand,
	AdminGetUserCommand, ChangePasswordCommand, ForgotPasswordCommand, ConfirmForgotPasswordCommand,

} from '@aws-sdk/client-cognito-identity-provider'
import {CognitoUserPool} from 'amazon-cognito-identity-js'
import {TBaseDto, TTokenPair} from "../app.typing";
import {CognitoJwtVerifier} from "aws-jwt-verify";
import {AuthRegisterUserDto} from "../dtos";
import {extractCustomAttributes} from "../utils/helper";


export type TChangePasswordRequest = {
	username: string,
	password: string,
	permanent: boolean
}
export enum CognitoError {
	// Login failed
	ECF0001 = 'ECF0001',
	// Register failed
	ECF0002 = 'ECF0002',
	// Validate token failed
	ECF0003 = 'ECF0003',
	// set password  failed
	ECF0004 = 'ECF0004',
}

export type TAuthenticateRequest = {
	email: string
	password: string

}

export type TValidateTokenResponse = {
	email: string,
	uid: string,
	[key: string]: any
}

type TCreateUser= {
	uid: string
}
export interface TCustomTokenCognito {
	userStatus?: string
	collectionOrganizationId?: string
	permission?: string
	isCompleteRegistration?: string
	nationalId?: string
	roleId?: string
	userRole?: string
	displayName?: string
}
export interface TVerifyPasswordResponse {
	isPasswordCorrect: boolean
	token: string
}
export const CUSTOM_USER_CLAIMS = {
	userStatus: 'custom:userStatus',
	collectionOrganizationId: 'custom:collectionOrgId',
	permission: 'custom:permission',
	isCompleteRegistration: 'custom:completeRegistration',
	nationalId: 'custom:nationalId',
	roleId: 'custom:roleId',
	displayName: 'custom:displayName',
}

@Injectable()
export class CognitoService {
	protected cognitoClient: CognitoIdentityProviderClient
	protected _userPool : CognitoUserPool = new CognitoUserPool({
		UserPoolId: process.env.CM_COGNITO_USER_POOL_ID,
		ClientId: process.env.CM_COGNITO_CLIENT_ID,
	})

	constructor(protected userPool: CognitoUserPool) {
		this.cognitoClient = new CognitoIdentityProviderClient({
			region: process.env.AWS_REGION,
			credentials: {
				accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Your AWS access key ID
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			},
		})
		this._userPool = userPool
	}

	get getUserPool() {
		return this._userPool
	}
	async createUser(
			input: AuthRegisterUserDto,
			customAttributes?: TCustomTokenCognito
	): Promise<TBaseDto<TCreateUser>> {
		try {

			const userAttributeKeys = Object.keys(customAttributes).reduce((prev, key) => {
				input[key] && prev.push({
					Name: customAttributes[key],
					Value: String(input[key]),
				});
				return prev;
			}, [] as { Name: string; Value: string }[]);

			const command = new AdminCreateUserCommand({
				UserPoolId: this.userPool.getUserPoolId(),
				Username: input.email,
				TemporaryPassword: input.password,
				UserAttributes: [
					{
						Name: 'email',
						Value: input.email,
					},
					{
						Name: 'email_verified',
						Value: 'true',
					},
						...userAttributeKeys
				],
			})
			const result = await this.cognitoClient.send(command)

			if (!result.User) {
				return {
					error: CognitoError.ECF0002,
					message: 'Create account failed. Please try again.',
					data: {
						uid: ""
					},
				}
			}

			const setPasswordResult = await this.setPassword({
				username: input.email,
				password: input.password,
				permanent: true
			})

			if (setPasswordResult.error) {
				return {
					error: CognitoError.ECF0002,
					message: 'Create account failed. Please try again.',
					data: {} as {uid: string},
				}
			}

			return {
				data: {
					uid: result.User.Username,
				},
			}
		} catch (error) {
			console.error('Create account failed. Please try again.', error)
			return {
				error: CognitoError.ECF0002,
				message: 'Create account failed. Please try again.',
				data: {
					uid: ""
				},
			}
		}
	}
	async askForgotPassword(
			email: string,
	): Promise<TBaseDto<{}>> {
		try {
			const command = new ForgotPasswordCommand({
				ClientId: this.getUserPool.getClientId(),
				Username: email,
			})

			await this.cognitoClient.send(command)

			return {
				data: {
				},
			}
		} catch (error) {
			console.error('Create account failed. Please try again.', error)
			return {
				error: CognitoError.ECF0002,
				message: 'Create account failed. Please try again.',
				data: {
				},
			}
		}
	}

	async refreshToken(refreshToken: string): Promise<TBaseDto<TTokenPair>> {
		try {
			const paramRefreshToken = new AdminInitiateAuthCommand({
				ClientId: this.getUserPool.getClientId(),
				UserPoolId: this.getUserPool.getUserPoolId(),
				AuthFlow: 'REFRESH_TOKEN_AUTH',
				AuthParameters: {
					REFRESH_TOKEN: refreshToken,
				},
			})

			const result = await this.cognitoClient.send(paramRefreshToken)
			if (!result.AuthenticationResult || result.$metadata.httpStatusCode !== 200) {
				return {
					error: CognitoError.ECF0001,
					message: 'Login failed. Please try again.',
					data: {} as TTokenPair,
				}
			}
			return {
				data: {
					ats: result.AuthenticationResult.AccessToken,
					// its: result.AuthenticationResult.IdToken,
					rts: result.AuthenticationResult.RefreshToken,
				},
			}
		} catch (error) {
			console.error('Error in initiateAuth', error)
			return {
				error: CognitoError.ECF0001,
				message: 'Login failed. Please try again.',
				data: {} as TTokenPair,
			}
		}

	}

	async authenticateUser (input: TAuthenticateRequest): Promise<TBaseDto<TTokenPair>>{
		try {
			const command = new AdminInitiateAuthCommand({
				ClientId: this.getUserPool.getClientId(),
				UserPoolId: this.getUserPool.getUserPoolId(),
				AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
				AuthParameters: {
					USERNAME: input.email,
					PASSWORD: input.password,
				},
			})

			const result =  await this.cognitoClient.send(command)


			if (!result.AuthenticationResult || result.$metadata.httpStatusCode !== 200) {
				return {
					error: CognitoError.ECF0001,
					message: 'Login failed. Please try again.',
					data: {} as TTokenPair,
				}
			}
			return {
				data: {
					ats: result.AuthenticationResult.AccessToken,
					// its: result.AuthenticationResult.IdToken,
					rts: result.AuthenticationResult.RefreshToken,
				},
			}
		} catch (error) {
			console.error('Error in initiateAuth', error)
			return {
				error: CognitoError.ECF0001,
				message: 'Login failed. Please try again.',
				data: {} as TTokenPair,
			}
		}

	}
	async checkPassword (input: TAuthenticateRequest): Promise<TVerifyPasswordResponse>{
		try {
			const command = new AdminInitiateAuthCommand({
				ClientId: this.getUserPool.getClientId(),
				UserPoolId: this.getUserPool.getUserPoolId(),
				AuthFlow: 'ADMIN_NO_SRP_AUTH',
				AuthParameters: {
					USERNAME: input.email,
					PASSWORD: input.password,
				},
			})

			const result =  await this.cognitoClient.send(command)

			if (!result.AuthenticationResult) {
				return {
					isPasswordCorrect: false,
					token: ""
				}
			}

			return {
				isPasswordCorrect: true,
				token: result.AuthenticationResult.AccessToken
			}
		} catch (error) {
			return {
				isPasswordCorrect: false,
				token: ""
			}
		}

	}
	async logout(accessToken: string): Promise<TBaseDto<{isSuccess: boolean}>> {
		try {
			const command = new GlobalSignOutCommand({
				AccessToken: accessToken
			})

			await this.cognitoClient.send(command)
			return {
				data: {
					isSuccess: true
				}
			}
		} catch (error) {
			console.error('Error to logout', error)
			return {
				error: CognitoError.ECF0003,
				message: 'Error to logout.',
				data: {
					isSuccess: false
				},
			}
		}
  }

	async verifyAccessToken(accessToken: string): Promise<TBaseDto<TValidateTokenResponse>> {
		try {
			const verifier = CognitoJwtVerifier.create({
				userPoolId: this.getUserPool.getUserPoolId(),
				tokenUse: 'access',
				clientId: this.getUserPool.getClientId(),
			})

			const payload = await verifier.verify(accessToken)
			const customAttributes = await this.getCustomClaimByUID(payload.sub)
			return {
				data: {
					email: String(payload.email),
					uid: payload.sub,
					...customAttributes.data,
					ats: accessToken
				}
			}
		} catch (error) {
			console.error('Error in verify token', error)
			return {
				error: CognitoError.ECF0003,
				message: 'Error in verify token.',
				data: {} as TValidateTokenResponse,
			}
		}

	}

	async setPassword(input: TChangePasswordRequest){
		try {
			const commandParams =  {
				UserPoolId: this.getUserPool.getUserPoolId(),
				Username: input.username,
				Password: input.password,
				Permanent: input.permanent,
			}
			const command = new AdminSetUserPasswordCommand(commandParams)

			const result = await this.cognitoClient.send(command)
			if (!result || result.$metadata.httpStatusCode !== 200) {
				return {
					error: CognitoError.ECF0004,
					message: 'Error to set password.',
					data: {} as TValidateTokenResponse,
				}
			}
			return {
				data: {}
			}

		} catch (error) {
			console.error('Error to set password', error)
			return {
				error: CognitoError.ECF0004,
				message: 'Error to set password.',
				data: {} as TValidateTokenResponse,
			}
		}

	}

	private async getCustomClaimByUID (uid: string) {
		try {
			const commandParams =  {
				UserPoolId: this.getUserPool.getUserPoolId(),
				Username: uid,
			}
			const command = new AdminGetUserCommand(commandParams)

			const result = await this.cognitoClient.send(command)

			if (!result || !result.UserAttributes) {
				return {
					error: CognitoError.ECF0004,
					message: 'Get token custom fail.',
					data: {} ,
				}
			}
			console.log("result.UserAttributes", result.UserAttributes)
			const customAttributes = extractCustomAttributes(result.UserAttributes)
			return {
				data: customAttributes
			}

		} catch (error) {
			console.error('Error to set password', error)
			return {
				error: CognitoError.ECF0004,
				message: 'Error to set password.',
				data: {} as TValidateTokenResponse,
			}
		}

	}
}
