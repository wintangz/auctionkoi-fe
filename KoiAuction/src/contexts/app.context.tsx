import { createContext, useState, ReactNode } from 'react'
import { getAccessTokenFromLS } from '../utils/auth'
import { jwtDecode } from 'jwt-decode'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  role: string | null
  setRole: React.Dispatch<React.SetStateAction<string | null>>
  login: (token: string) => void
  logout: () => void
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  role: localStorage.getItem('roles') || '',
  setRole: () => null,
  login: () => null,
  logout: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [role, setRole] = useState<string | null>(initialAppContext.role)

  const login = (token: string) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decodedToken: any = jwtDecode(token)
      const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

      console.log('Decoded User Role:', userRole)
      setIsAuthenticated(true)
      setRole(userRole)
      localStorage.setItem('roles', JSON.stringify(userRole))
      localStorage.setItem('access_token', token)
    } catch (error) {
      console.error('Error decoding token:', error)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setRole('')
    localStorage.removeItem('access_token')
    localStorage.removeItem('roles')
  }

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, role, setRole, login, logout }}>
      {children}
    </AppContext.Provider>
  )
}
