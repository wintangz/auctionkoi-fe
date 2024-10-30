import { User } from './User.type'
import { SuccessResponseApi } from './Utils.type'

export type AuthResponse = SuccessResponseApi<{
  access_token: string
  expires: string
  refresh_token: string
  expires_refresh_token: string
  user: User
}>
