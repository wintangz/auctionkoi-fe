import { Link } from 'react-router-dom'
import logo from '~/assets/Logo.png'
import footerBg from '~/assets/Footer.png'

export default function Footer() {
  return (
    <footer
      className='flex flex-col items-center text-center text-surface dark:text-white lg:text-left w-full'
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: 'cover', // Ensure the image covers the whole container
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat' // No repeating
      }}
    >
      <div className='container px-6 py-24 pb-28'>
        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='mb-3 md:mb-0'>
            <p className='mb-4'>
              <Link to='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
                <img src={logo} className='h-36' alt='KoiAuction Logo' />
              </Link>
            </p>
          </div>
          <div className='mb-4 md:mb-0 py-5'>
            <h5 className='mb-12 text-xl uppercase'>Koi Auction</h5>
            <p className='mb-4'>
              Koi Auction Farm is the premier destination for quality Japanese koi fish for sale. We are the largest
              importer of Koi in North America. We specialize in raising champion koi!
            </p>
          </div>
          <div className='mb-4 md:mb-0 py-5'>
            <p>Monday - Friday</p>
            <p>7:00 a.m. to 3:00 p.m. HST</p>
            <p>Saturday and Sunday Closed</p>
            <h5 className='mb-2 mt-5 font-medium '>P.O. Box 893086, Mililani HI 96789</h5>
            <h5 className='mb-2 font-medium '>TEL:+1 (833) Koi Love (1-833-564-5683)</h5>
            <h5 className='mb-14 font-medium '>Email: info@auctionKoifarm.com</h5>
          </div>
        </div>
      </div>
    </footer>
  )
}
