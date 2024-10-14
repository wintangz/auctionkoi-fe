import { User } from './User.type'
import { ResponseApi } from './Utils.type'

export type AuthResponse = ResponseApi<{
  access_token: string
  expires: string
  refresh_token: string
  expires_refresh_token: string
  user: User
}>
