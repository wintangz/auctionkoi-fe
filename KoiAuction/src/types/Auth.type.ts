import { User } from './User.type'
import { SuccessResponseApi } from './Utils.type'

export type AuthResponse = SuccessResponseApi<{
  value: string
  user: User
}>
