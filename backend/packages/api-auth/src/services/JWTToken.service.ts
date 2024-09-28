import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {tenantType} from "../entities/privacy/Auth";

export interface accessTokenPayload {
	uid: string;
	email: string;
	iat: number;
}

export interface refreshTokenPayload {
	uid: string;
	iat: number;
}
export enum EAudience {
	FORGOT_PASSWORD = 'fp',
	CUSTOM_TOKEN = 'ct',
}
export interface customTokenPayload {
	uid: string;
	iat: number;
	aud: EAudience;
}
@Injectable()
export class JWTTokenService {
	//TODO change this to a more secure key
	private readonly SECRET_KEY = 'abcd126262hshs';

	generateToken(
			payload: accessTokenPayload | refreshTokenPayload,
			expireIn: string
	): string {
		const options: jwt.SignOptions = {
			expiresIn: expireIn,
			issuer: 'sample-assist',
		};

		// Generate the token
		return jwt.sign(payload, this.SECRET_KEY, options);
	}

	generateCustomToken(
			payload: customTokenPayload,
			expireIn: string
	): string {
		const options: jwt.SignOptions = {
			expiresIn: expireIn,
			issuer: 'sample-assist',
		};

		// Generate the token
		return jwt.sign(payload, this.SECRET_KEY, options);
	}
	verifyAccessToken(token: string): accessTokenPayload | null {
		try {
			return jwt.verify(token, this.SECRET_KEY) as accessTokenPayload;
		} catch (error) {
			console.error('Token verification failed:', error);
			return null;
		}
	}

	verifyRefreshToken(token: string): refreshTokenPayload | null {
		try {
			return jwt.verify(token, this.SECRET_KEY) as refreshTokenPayload;
		} catch (error) {
			console.error('Token verification failed:', error);
			return null;
		}
	}
	verifyCustomToken(token: string): customTokenPayload | null {
		try {
			return jwt.verify(token, this.SECRET_KEY) as customTokenPayload;
		} catch (error) {
			console.error('Token verification failed:', error);
			return null;
		}
	}
}
