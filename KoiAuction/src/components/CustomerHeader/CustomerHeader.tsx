'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, User, LogOut, Settings } from 'lucide-react'

export default function CustomerHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const menuItems = ['Auction', 'Blogs', 'About', 'Farms', 'Policy']

  return (
    <header className='sticky top-0 bg-white z-50 shadow-sm'>
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
                  <a href='/profile' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                    <User className='inline-block w-4 h-4 mr-2' />
                    Profile
                  </a>
                  <a href='/settings' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                    <Settings className='inline-block w-4 h-4 mr-2' />
                    Settings
                  </a>
                  <a href='/logout' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                    <LogOut className='inline-block w-4 h-4 mr-2' />
                    Logout
                  </a>
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
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className='text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium'
              >
                {item}
              </a>
            ))}
            <a
              href='/profile'
              className='text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium'
            >
              Profile
            </a>
            <a
              href='/settings'
              className='text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium'
            >
              Settings
            </a>
            <a
              href='/logout'
              className='text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium'
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
