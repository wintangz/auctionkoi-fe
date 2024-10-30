import { createContext, useState, ReactNode } from 'react'
import { getAccessTokenFromLS } from '../utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  roles: string[]
  setRoles: React.Dispatch<React.SetStateAction<string[]>>
  login: (token: string, roles: string[]) => void
  logout: () => void
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  roles: [],
  setRoles: () => null,
  login: () => null,
  logout: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [roles, setRoles] = useState<string[]>(initialAppContext.roles)

  const login = (token: string, userRoles: string[]) => {
    setIsAuthenticated(true)
    setRoles(userRoles)
    localStorage.setItem('access_token', token)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setRoles([])
    localStorage.removeItem('access_token')
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        roles,
        setRoles,
        login,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
