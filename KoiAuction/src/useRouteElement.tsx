import { useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import Auction from './components/Auction/Auction'
import Blogs from './components/Blogs/Blogs'

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: '/login',
      element: (
        <MainLayout>
          <Login />
        </MainLayout>
      )
    },
    {
      path: '/register',
      element: (
        <MainLayout>
          <Register />
        </MainLayout>
      )
    },
    {
      path: '/auction',
      element: (
        <MainLayout>
          <Auction />
        </MainLayout>
      )
    },
    {
      path: '/blogs',
      element: (
        <MainLayout>
          <Blogs />
        </MainLayout>
      )
    }
  ])
  return routeElements
}
