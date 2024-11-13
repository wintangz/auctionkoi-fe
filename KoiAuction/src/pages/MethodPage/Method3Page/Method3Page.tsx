import { useLocation } from 'react-router-dom'
import CreateAuctionMethod from '../../../components/CreateAuctionMethod/CreateAuctionMethod'
import img from '../../../assets/img/3.png'
function Method3Page() {
  const location = useLocation()
  const description = location.state?.description || 'No description available.'
  const id = location.state?.id || 'No ID available'
  const handleAuctionSubmit = (data: unknown) => {
    console.log('Auction Data:', data)
  }
  return (
    <CreateAuctionMethod description={description} onSubmit={handleAuctionSubmit} imfUrl={img} auctionMethodID={id} />
  )
}

export default Method3Page