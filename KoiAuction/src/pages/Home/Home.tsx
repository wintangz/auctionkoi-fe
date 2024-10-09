import Auction from '../../components/Auction/Auction'
import HeroSection from '../../components/HeroSection/HeroSection'

export default function Home() {
  return (
    <div className='min-h-screen bg-white flex flex-col justify-between'>
      <main className='container mx-auto px-10 lg:px-14 py-8 space-y-12'>
        <HeroSection />
        <Auction />
      </main>
    </div>
  )
}
