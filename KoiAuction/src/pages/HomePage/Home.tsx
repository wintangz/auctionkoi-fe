import AboutUs from '../../components/AboutUs/AboutUs'
import Auction from '../../components/Auction/Auction'
import Blogs from '../../components/Blogs/Blogs'
import HeroSection from '../../components/HeroSection/HeroSection'

export default function Home() {
  return (
    <div className='min-h-screen bg-white flex flex-col justify-between'>
      <main className='container mx-auto px-5 lg:px-14 py-8 space-y-12'>
        <HeroSection />
        <Auction />
        <Blogs />
        <AboutUs />
      </main>
    </div>
  )
}
