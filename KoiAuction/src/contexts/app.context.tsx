import { createContext, useState, ReactNode } from 'react'
import { getAccessTokenFromLS } from '../utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  role: string | null
  setRole: React.Dispatch<React.SetStateAction<string | null>>
  login: () => void
  logout: () => void
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  role: localStorage.getItem('roles') || 'abc',
  setRole: () => null,
  login: () => null,
  logout: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [role, setRole] = useState<string | null>(initialAppContext.role)

  const login = () => {
    try {
      setIsAuthenticated(true)
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
