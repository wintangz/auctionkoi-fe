import React, { useCallback, useEffect, useState } from 'react'
import './AuctionDetail.scss'
import { AuctionPageProps } from '../../types/AuctionDetailProps'
import http from '../../utils/http'
import { toast } from 'react-toastify'

const AuctionPage: React.FC<AuctionPageProps> = ({ fishDetails, auctionInfo, bidders }) => {
  const [bidAmount, setBidAmount] = useState<number>(auctionInfo?.highestPrice ?? auctionInfo?.startingBid ?? 0)
  const [timeLeft, setTimeLeft] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<string>(fishDetails?.imageUrl || '')

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBidAmount(Number(e.target.value))
  }
  const placeBid = async () => {
    const requestBody = {
      koiId: fishDetails?.koiId,
      bidAmount: bidAmount
    }

    try {
      const response = await http.post('Bid/place-bid', requestBody)

      if (response?.data?.message) {
        toast.success(response.data.message)
        window.location.reload()
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { title, detail } = error.response.data
        if (title && detail) {
          const errorMessage = `${title}: ${detail}`
          alert(errorMessage)
        } else {
          toast.error(error.response.data.detail)
        }
      } else {
        console.error('Unexpected error: ', error)
      }
    }
  }

  const calculateTimeLeft = useCallback((endTime: string, startTime: string) => {
    const end = new Date(endTime).getTime()
    const start = new Date(startTime).getTime()
    const now = Date.now()
    const timeRemaining = end - Math.max(start, now)

    if (timeRemaining <= 0) return 'Auction Ended'

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)

    return `${days}d ${hours}h ${minutes}m ${seconds}s`
  }, [])
  useEffect(() => {
    if (auctionInfo?.endTime && auctionInfo?.startTime) {
      const updateTimer = () => {
        setTimeLeft(calculateTimeLeft(auctionInfo.endTime, auctionInfo.startTime))
      }

      updateTimer() // Cập nhật lần đầu
      const timer = setInterval(updateTimer, 1000)

      return () => clearInterval(timer)
    }
  }, [auctionInfo, calculateTimeLeft])
  if (!fishDetails || !auctionInfo || !bidders) {
    return <p>Loading auction details...</p>
  }

  return (
    <div className='auction-page'>
      <div className='main-image-section'>
        <img src={selectedImage} alt={fishDetails.name} className='main-fish-image' />
        <div className='thumbnail-section'>
          {fishDetails.thumbnails?.map((thumb, index) => (
            <img
              key={index}
              src={thumb}
              alt={`Thumbnail ${index + 1}`}
              className='thumbnail'
              onClick={() => setSelectedImage(thumb)}
            />
          )) ?? <p>No thumbnails available</p>}
        </div>
      </div>

      <div className='details-section'>
        <h2>Name: {fishDetails.name}</h2>
        <h3 className='reserve-price'>
          Reserve Price: <span>${auctionInfo.reservePrice}</span>
        </h3>
        <h3>Variety: {fishDetails.variety}</h3>
        <h3 className='reserve-price'>
          Highest Bid: <span>${auctionInfo.highestPrice} </span>
        </h3>

        <div className='additional-info'>
          <h4>Additional Information</h4>
          <p>Location: {fishDetails.location}</p>
          <p>Size: {fishDetails.size}</p>
          <p>Breeder: {fishDetails.breeder}</p>
          <p>Age: {fishDetails.age}</p>
          <p>Description: {fishDetails.description}</p>
          <p>Auction Method: {auctionInfo.auctionMethodName}</p>
          <p>Contact: {fishDetails.contact}</p>
        </div>

        <div className='time-section'>
          <p>
            Time Left: <span>{timeLeft}</span>
          </p>
          <p>
            Auction ends:{' '}
            <span>
              {' '}
              {auctionInfo.endTime.split('T')[0]} {auctionInfo.endTime.split('T')[1].split('.')[0]}
            </span>
          </p>
        </div>

        <div className='bidder-list'>
          <table>
            <thead>
              <tr
                style={{
                  background: '#d6d1d1'
                }}
              >
                <th>Bidder</th>
                <th>Amount</th>
                <th>Bid Time</th>
              </tr>
            </thead>
            <tbody>
              {bidders.map((bidder, index) => (
                <tr key={index}>
                  <td>{bidder.bidderName}</td>
                  <td>${bidder.bidAmount}</td>
                  <td>
                    {' '}
                    {bidder.bidTime.split('T')[0]} {bidder.bidTime.split('T')[1].split('.')[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='bid-section'>
          <label>Your bid:</label>
          <input type='number' value={bidAmount} onChange={handleBidChange} />
          <button onClick={placeBid} className='bid-now-btn'>
            Bid Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuctionPage
