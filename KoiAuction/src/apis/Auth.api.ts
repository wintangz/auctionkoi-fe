import { AuthResponse } from '../types/Auth.type'
import http from '../utils/http'

export const registerAccount = (body: { email: string; password: string }) =>
  http.post<AuthResponse>('/Authentication/register/customer', body)
export const loginAccount = (body: { email: string; password: string }) =>
  http.post<AuthResponse>('/Authentication/login', body)

export const logout = () => http.post('/logout')
