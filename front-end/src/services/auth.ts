/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, post, ServicePrefix } from "./baseApiService";

interface AuthRegisterUserDto {
  username: string;
  email: string;
  password: string;
}

interface AuthLoginUserDto {
  email: string;
  password: string;
}

interface TRegisterResponseDTO {
  data: {
    uid: string;
  };
}

interface TRefreshTokenResponseDTO {
  data: {
    ats: string;
    attributes: any;
  };
  error?: string;
}

export const AuthService = {
  register: async (
    registerData: AuthRegisterUserDto
  ): Promise<TRegisterResponseDTO> => {
    return await post<TRegisterResponseDTO>(
      `/${ServicePrefix.Auth}/register`,
      registerData
    );
  },

  login: async (
    loginData: AuthLoginUserDto
  ): Promise<{ data: { userId: string } }> => {
    return await post<{ data: { userId: string } }>(
      `/${ServicePrefix.Auth}/login`,
      loginData
    );
  },

  refreshToken: async (
    refreshToken: string
  ): Promise<TRefreshTokenResponseDTO> => {
    return await get<TRefreshTokenResponseDTO>(
      `/${ServicePrefix.Auth}/refresh`,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
  },

  logout: async (): Promise<void> => {
    return await post<void>(`/${ServicePrefix.Auth}/log-out`);
  },
};
