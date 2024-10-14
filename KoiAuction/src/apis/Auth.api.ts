import { AuthResponse } from '../types/Auth.type'
import http from '../utils/http'

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)
export const loginAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body)
