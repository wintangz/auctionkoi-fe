import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className='bg-brown py-20 mt-20 lg:mt-0'>
      <div className='container mx-auto lg:px-20 px-10 flex flex-col md:flex-row justify-between items-start'>
        <div className='mb-6 md:mb-0 flex-1 justify-center'>
          <div className='flex items-center mb-4'>
            <div className='w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mr-3'>
              <Link to='/'>
                <img
                  src='https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/Logo.png?alt=media&token=e71cfc51-da8e-4bea-8619-2e64177ee62a'
                  alt='Logo'
                  className='w-12 h-12'
                />
              </Link>
            </div>
            <h2 className='text-2xl font-bold text-red'>Koi Auction</h2>
          </div>
          <p className='max-w-xs text-sm text-gray-600'>
            Koi Auction Farm is the premier destination for quality Japanese koi fish for sale. We are the largest
            importer of Koi in North America. We specialize in raising champion koi!
          </p>
        </div>
        <div className='mb-6 md:mb-0 flex-1'>
          <h3 className='font-semibold mb-2 text-red'>Contact Information</h3>
          <p className='text-sm text-gray-600'>P.O. Box 893086, Mililani HI 96789</p>
          <p className='text-sm text-gray-600'>TEL: +1 (833) Koi Love (1-833-564-5683)</p>
          <p className='text-sm text-gray-600'>Email: info@auctionkoifarm.com</p>
        </div>
        <div className='flex-1'>
          <h3 className='font-semibold mb-2 text-red'>Hours of Operation</h3>
          <p className='text-sm text-gray-600'>Monday – Friday</p>
          <p className='text-sm text-gray-600'>7:00 a.m. to 3:00 p.m. HST</p>
          <p className='text-sm text-gray-600'>Saturday and Sunday Closed</p>
          <div className='mt-4 flex space-x-4'>
            <a href='#' className='text-red hover:text-red-800'>
              <span className='sr-only'>Facebook</span>
              <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
            <a href='#' className='text-red hover:text-red-800'>
              <span className='sr-only'>Instagram</span>
              <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
            <a href='#' className='text-red hover:text-red-800'>
              <span className='sr-only'>Google+</span>
              <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 16.083c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c1.103 0 2.024.402 2.735 1.067l-1.107 1.068c-.304-.292-.834-.63-1.628-.63-1.394 0-2.531 1.155-2.531 2.579 0 1.424 1.138 2.579 2.531 2.579 1.616 0 2.224-1.162 2.316-1.762h-2.316v-1.4h3.855c.036.204.064.408.064.677.001 2.332-1.563 3.988-3.919 3.988zm9.917-3.5h-1.75v1.75h-1.167v-1.75h-1.75v-1.166h1.75v-1.75h1.167v1.75h1.75v1.166z' />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
