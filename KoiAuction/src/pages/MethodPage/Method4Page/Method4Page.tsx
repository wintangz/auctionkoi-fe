import { useLocation } from 'react-router-dom'
import CreateAuctionMethod from '../../../components/CreateAuctionMethod/CreateAuctionMethod'
import img from '../../../assets/img/4.png'
function Method4Page() {
  const location = useLocation()
  const description = location.state?.description || 'No description available.'

  const handleAuctionSubmit = (data: unknown) => {
    console.log('Auction Data:', data)
  }
  return <CreateAuctionMethod description={description} onSubmit={handleAuctionSubmit} imfUrl={img} />
}

export default Method4Page
