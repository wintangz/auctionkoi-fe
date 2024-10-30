import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import Home from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import Auction from './components/Auction/Auction'
import Blogs from './components/Blogs/Blogs'
import AboutUs from './components/AboutUs/AboutUs'
import Farms from './pages/FarmsPage/Farms'
import { usePageTitle } from './hooks/usePageTitle'
import Policy from './pages/PolicyPage/Policy'
import Profile from './pages/ProfilePage'
import HistoryAuction from './pages/AuctionHistoryPage'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import path from './constants/path'

// eslint-disable-next-line react-refresh/only-export-components
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

// eslint-disable-next-line react-refresh/only-export-components
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouteElement() {
  usePageTitle()

  const routeElements = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: []
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <MainLayout>
              <Login />
            </MainLayout>
          )
        },
        {
          path: path.register,
          element: (
            <MainLayout>
              <Register />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: path.auction,
      element: (
        <MainLayout>
          <Auction />
        </MainLayout>
      )
    },
    {
      path: path.blogs,
      element: (
        <MainLayout>
          <Blogs />
        </MainLayout>
      )
    },
    {
      path: path.about,
      element: (
        <MainLayout>
          <AboutUs />
        </MainLayout>
      )
    },
    {
      path: path.farms,
      element: (
        <MainLayout>
          <Farms />
        </MainLayout>
      )
    },
    {
      path: path.policy,
      element: (
        <MainLayout>
          <Policy />
        </MainLayout>
      )
    },
    {
      path: path.profile,
      element: (
        <MainLayout>
          <Profile />
        </MainLayout>
      )
    },
    {
      path: path.auctionHistory,
      element: (
        <MainLayout>
          <HistoryAuction />
        </MainLayout>
      )
    }
  ])
  return routeElements
}
