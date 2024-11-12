import React, { useState, useRef, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../contexts/app.context'
import { User } from '../../types/User.type'

const AdminHeader: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { logout } = useContext(AppContext)
  const navigate = useNavigate()
  const [user, setUser] = useState<User>()

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  const closeDropdown = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', closeDropdown)
    return () => {
      document.removeEventListener('mousedown', closeDropdown)
    }
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        console.log('No token found')
        return
      }

      const response = await fetch('https://koiauctionwebapp.azurewebsites.net/api/User/get-current-user', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.value)
      } else {
        console.log('Failed to fetch user data')
      }
    }

    fetchUserData()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    { title: 'AUCTION', href: '/admin' },
    { title: 'ACOUNT MANAGEMENT', href: '/admin/account-management' },
    { title: 'TRANSACTION MANAGEMENT', href: '/admin/transaction-management' }
  ]

  return (
    <header>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='flex items-center space-x-8'>
          <Link to='/admin' className='flex items-center space-x-2'>
            <img
              src='https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/Logo.png?alt=media&token=e71cfc51-da8e-4bea-8619-2e64177ee62a'
              alt='Logo'
              className='w-12 h-12'
            />
          </Link>
          <nav className='hidden md:flex space-x-4'>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className='sm-md:text-xxs lg:text-base font-medium text-blue hover:text-red transition-colors'
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className='relative' ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className='flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none'
            aria-expanded={dropdownOpen}
            aria-haspopup='true'
          >
            <img src={user?.urlAvatar} alt='abc' className='h-8 w-8 rounded-full object-cover' />
            <span className='hidden sm-md:inline-block'>{user?.fullName}</span>
            <svg className='h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
            </svg>
          </button>
          {dropdownOpen && (
            <div className='absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10'>
              <div className='p-4 border-b'>
                <p className='text-sm font-medium text-gray-900'>{user?.fullName}</p>
                <p className='text-sm text-gray-500'>{user?.email}</p>
              </div>
              <ul className='py-2'>
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className='block px-4 py-2 text-sm text-blue hover:bg-gray-100'
                      onClick={() => setDropdownOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to='/login'
                    className='block px-4 py-2 text-sm text-red hover:bg-gray-100'
                    onClick={handleLogout}
                  >
                    <div className='flex items-center space-x-2'>
                      <svg
                        className='h-4 w-4'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                        />
                      </svg>
                      <span>Log Out</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
