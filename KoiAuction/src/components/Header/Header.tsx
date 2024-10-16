import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuItems = ['Auction', 'Blogs', 'About', 'Farms', 'Policy', 'Login']

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
                className='text-gray-700 hover:text-red px-3 py-2 rounded-md text-base font-medium'
              >
                {item}
              </a>
            ))}
          </nav>
          <div className='md:hidden flex items-center'>
            <button
              onClick={toggleMenu}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
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
                className='text-gray-700 hover:text-red block px-3 py-2 rounded-md text-base font-medium'
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
