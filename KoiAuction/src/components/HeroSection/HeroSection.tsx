import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <div className='bg-white flex flex-col justify-between'>
      <main className='container mx-auto lg:px-14 space-y-12 lg:pt-20 pt-0 px-5 lg:mb-12 mb-0'>
        <section className='flex flex-col md:flex-row items-center justify-between'>
          <div className='md:w-1/2 md:mb-0'>
            <h1 className='text-4xl font-bold mb-4'>KOI AUCTION</h1>
            <p className='text-gray-600 mb-6 max-w-md'>
              An online platform designed to facilitate the buying and selling of Koi fish through live auctions. It
              serves as a marketplace for Koi enthusiasts, breeders, and collectors to find, bid on, and purchase
              high-quality Koi fish.
            </p>
            <Link to='/register'>
              <button className='bg-red text-white px-6 py-2 rounded hover:bg-white hover:text-red border border-red-600 transition duration-300'>
                Sign Up
              </button>
            </Link>
          </div>
          <div className='md:w-1/2 flex justify-center mt-10 lg:mt-0'>
            <img
              src='https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FKoiBG.png?alt=media&token=fdf8297e-dc36-474b-b863-acffbfe9478b'
              alt='Colorful Koi fish illustration'
              className='w-2/3 h-auto'
            />
          </div>
        </section>
      </main>
    </div>
  )
}
