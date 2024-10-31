import './CreateMethodPage.scss'
import AuctionMethodCard from '../../components/AuctionMethodCard/AuctionMethodCard'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateMethodPage() {
  const logoRef = useRef<HTMLImageElement | null>(null)
  const navigate = useNavigate()

  // Dữ liệu các phương thức đấu giá
  const auctionMethods = [
    {
      methodTitle: 'Method 1: Fixed Price Sale',
      description:
        'In this form, the price of Koi fish is determined specifically at 1 level. If 1 person wants to buy, the price remains fixed; however, if 2 people want to buy 1 fish, at the end of the closing time, the system will randomly draw lots to determine who buys the fish.',
      imageUrl:
        'https://img.freepik.com/premium-vector/poster-template-with-koi-fish-concept-watercolor-style_75071-1972.jpg',
      route: '/method1'
    },
    {
      methodTitle: 'Method 2: Sealed Bid Auction',
      description:
        'When each Koi is put up for auction, the buyer will determine the price to pay for the Koi (this price is completely confidential). At the end of the auction, the person who bids the highest will buy the Koi.',
      imageUrl:
        'https://img.freepik.com/premium-vector/poster-template-with-koi-fish-concept-watercolor-style_75071-1972.jpg',
      route: '/method2'
    },
    {
      methodTitle: 'Method 3: Ascending Bid Auction',
      description:
        '1 buyer can bid multiple times, the highest bidder will be the winner. Bid information of the buyer is public.',
      imageUrl:
        'https://img.freepik.com/premium-vector/poster-template-with-koi-fish-concept-watercolor-style_75071-1972.jpg',
      route: '/method3'
    },
    {
      methodTitle: 'Method 4: Descending Bid Auction',
      description:
        'The winning bidder is the first person to accept the starting or reduced price (the system will periodically reduce the price if there are no bidders). Buyer bid information is public.',
      imageUrl:
        'https://img.freepik.com/premium-vector/poster-template-with-koi-fish-concept-watercolor-style_75071-1972.jpg',
      route: '/method4'
    }
  ]

  return (
    <div className='cm-page'>
      <img ref={logoRef} className='logo' src='https://i.imgur.com/abwtsRC.png' alt='logo' />
      <div className='banner'>
        <img src='https://i.imgur.com/wWN0fVX.png' alt='banner' />
      </div>
      <div className='auction-card-container'>
        {auctionMethods.map((method, index) => (
          <AuctionMethodCard
            key={index}
            methodTitle={method.methodTitle}
            description={method.description}
            imageUrl={method.imageUrl}
            route={method.route}
            onClick={() => navigate(method.route, { state: { description: method.description } })}
          />
        ))}
      </div>
    </div>
  )
}

export default CreateMethodPage
