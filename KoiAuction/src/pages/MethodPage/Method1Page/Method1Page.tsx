import { useLocation } from 'react-router-dom'
import CreateAuctionMethod from '../../../components/CreateAuctionMethod/CreateAuctionMethod'

function Method1Page() {
  const location = useLocation()
  const description = location.state?.description || 'No description available.'

  const handleAuctionSubmit = (data: unknown) => {
    console.log('Auction Data:', data)
  }
  return <CreateAuctionMethod description={description} onSubmit={handleAuctionSubmit} />
}

export default Method1Page
