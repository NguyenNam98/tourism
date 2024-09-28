interface TMetaData {
  ipAddress: string
  userAgent: string
  userId?: number
  userName?: string
  referer: string
}

interface TBaseDto<T> {
  data: T
  error?: string
  message?: string
}

export type TTokenResponse = {
  accessToken: string
  idToken: string
  refreshToken: string
}

export type TDecodedTokenDTO = {
  email: string
  uid: string
  collectionOrganizationId: string
}
export type TRegisterResponseDTO = TBaseDto<{ uid: string }>
export type TLoginResponseDTO = TBaseDto<TTokenDTO>
export type TRefreshTokenResponseDTO = TBaseDto<TTokenDTO>
export type TValidateTokenResponseDTO = TBaseDto<TDecodedTokenDTO>

 type TTokenPair = {
  ats: string
  rts: string
  // its: string
}

export { TMetaData, TBaseDto, TAuPayload, TTokenPair }