import axios, { AxiosError, type AxiosInstance } from 'axios'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import { clearAccessTokenFromLS, getAccessTokenFromLS, saveAccessTokenToLS } from './auth'

interface DecodedToken {
  sub: string
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string
  exp: number
}

class Http {
  instance: AxiosInstance
  private accessToken: string

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://koiauctionwebapp.azurewebsites.net/api/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/Authentication/login' || url === '/Authentication/register/customer') {
          const token = (response.data as { value: string }).value
          this.accessToken = 'Bearer ' + token
          saveAccessTokenToLS(this.accessToken)

          const decoded: DecodedToken = jwtDecode(token)
          const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
          localStorage.setItem('roles', role)
          localStorage.setItem('token', token)
        } else if (url === '/logout') {
          this.accessToken = ''
          clearAccessTokenFromLS()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
