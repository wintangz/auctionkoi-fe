import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import Home from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import Auction from './components/Auction/Auction'
import Blogs from './components/Blogs/Blogs'
import AboutUs from './components/AboutUs/AboutUs'

import { usePageTitle } from './hooks/usePageTitle'
import Policy from './pages/PolicyPage/Policy'
import Profile from './pages/ProfilePage'
import HistoryAuction from './pages/AuctionHistoryPage'
import FarmPage from './pages/FarmsPage/Farms'
import AuctionDetailPage from './pages/AuctionDetailPage/AuctionDetail'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import AdminHome from './pages/AdminPage/HomePage/AdminHome'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import AdminAccountManagement from './pages/AdminPage/AccountManagementPage/AdminAccountManagement'

// function ProtectedRoute() {
//   const { isAuthenticated } = useContext(AppContext)
//   return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
// }

// eslint-disable-next-line react-refresh/only-export-components
function AdminProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  const role = localStorage.getItem('roles') || ''
  const isManager = role === 'MANAGER'

  return isAuthenticated && isManager ? <Outlet /> : <Navigate to='/login' />
}

// eslint-disable-next-line react-refresh/only-export-components
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElement() {
  usePageTitle()

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
      path: '',
      element: <AdminProtectedRoute />,
      children: [
        {
          path: '/admin',
          element: (
            <AdminLayout>
              <AdminHome />
            </AdminLayout>
          )
        },
        {
          path: '/admin/account-management',
          element: (
            <AdminLayout>
              <AdminAccountManagement />
            </AdminLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
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
        }
      ]
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
    },
    {
      path: '/about',
      element: (
        <MainLayout>
          <AboutUs />
        </MainLayout>
      )
    },
    {
      path: '/farms',
      element: (
        <MainLayout>
          <FarmPage />
        </MainLayout>
      )
    },
    {
      path: '/policy',
      element: (
        <MainLayout>
          <Policy />
        </MainLayout>
      )
    },
    {
      path: '/profile',
      element: (
        <MainLayout>
          <Profile />
        </MainLayout>
      )
    },
    {
      path: '/auction-history',
      element: (
        <MainLayout>
          <HistoryAuction />
        </MainLayout>
      )
    },
    {
      path: '/auction-detail',
      element: (
        <MainLayout>
          <AuctionDetailPage />
        </MainLayout>
      )
    }
  ])
  return routeElements
}
