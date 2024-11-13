import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut, Settings, History, Tractor } from 'lucide-react'
import { AppContext } from '../../contexts/app.context'

export default function KoiBreaderHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { logout } = useContext(AppContext)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = ['Auction', 'Blogs', 'About', 'Farms', 'Policy']

  return (
    <header className='sticky top-0 bg-white z-50'>
      <div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 lg:py-2'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Link to='/'>
              <img
                src='https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/Logo.png?alt=media&token=e71cfc51-da8e-4bea-8619-2e64177ee62a'
                alt='Logo'
                className='w-12 h-12'
              />
            </Link>
          </div>
          <nav className='hidden md:flex items-center space-x-5'>
            {menuItems.map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className='text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-base font-medium'
              >
                {item}
              </a>
            ))}
            <div className='relative'>
              <button
                onClick={toggleUserMenu}
                className='flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              >
                <User className='w-6 h-6 text-gray-600' />
              </button>
              {isUserMenuOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5'>
                  <a href='/profile' className='block px-4 py-2 text-sm text-gray-700 hover:bg-red hover:text-white'>
                    <User className='inline-block w-4 h-4 mr-2' />
                    Profile
                  </a>
                  <a
                    href='/auction-history'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-red hover:text-white'
                  >
                    <History className='inline-block w-4 h-4 mr-2' />
                    Auction History
                  </a>
                  <a
                    href='/create-auction'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-red hover:text-white'
                  >
                    <Tractor className='inline-block w-4 h-4 mr-2' />
                    Create Auction
                  </a>
                  <a
                    href='/breeder-koi-request'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-red hover:text-white'
                  >
                    <Tractor className='inline-block w-4 h-4 mr-2' />
                    Koi Request
                  </a>
                  <a href='/settings' className='block px-4 py-2 text-sm text-gray-700 hover:bg-red hover:text-white'>
                    <Settings className='inline-block w-4 h-4 mr-2' />
                    Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red hover:text-white'
                  >
                    <LogOut className='inline-block w-4 h-4 mr-2' />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
          <div className='md:hidden flex items-center'>
            <button
              onClick={toggleMenu}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500'
            >
              <span className='sr-only'>Open main menu</span>
              {isMenuOpen ? (
                <X className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <Menu className='block h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {menuItems.map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className='text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium'
              >
                {item}
              </Link>
            ))}
            <Link
              to='/profile'
              className='text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium'
            >
              Profile
            </Link>
            <Link
              to='/auction-history'
              className='text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium'
            >
              Auction History
            </Link>
            <Link to='/create-auction' className='block px-4 py-2 text-sm text-gray-700 hover:bg-red hover:text-white'>
              <Tractor className='inline-block w-4 h-4 mr-2' />
              Create Auction
            </Link>
            <Link
              to='/breeder-koi-request'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-red hover:text-white'
            >
              <Tractor className='inline-block w-4 h-4 mr-2' />
              Koi Request
            </Link>
            <Link
              to='/settings'
              className='text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium'
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className='text-red hover:text-red block px-3 py-2 rounded-md text-base font-medium w-full text-left'
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
