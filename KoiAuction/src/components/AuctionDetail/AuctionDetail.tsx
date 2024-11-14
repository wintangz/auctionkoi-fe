import React, { useCallback, useEffect, useState } from 'react'
import './AuctionDetail.scss'
import { AuctionPageProps, Bidder } from '../../types/AuctionDetailProps'
import http from '../../utils/http'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AuctionPage: React.FC<AuctionPageProps> = ({ fishDetails, auctionInfo, bidders }) => {
  const [bidAmount, setBidAmount] = useState<number>(auctionInfo?.highestPrice ?? auctionInfo?.startingBid ?? 0)
  const [timeLeft, setTimeLeft] = useState<string>('')
  const [selectedThumbnail, setSelectedThumbnail] = useState(fishDetails?.imageUrl)
  const [isSealedBid, setIsSealedBid] = useState<boolean>(false)
  const [isDescendingBid, setIsDescendingBid] = useState<boolean>(false)
  const [thumbnailIndex, setThumbnailIndex] = useState<number>(0)
  const [currentBidders, setCurrentBidders] = useState<Bidder[]>(bidders || [])
  const [isReady, setIsReady] = useState<boolean>(false)
  const [hasUserBid, setHasUserBid] = useState<boolean>(false)
  const [userBid, setUserBid] = useState<Bidder | null>(null)
  const thumbnails = fishDetails?.thumbnails
    ? [fishDetails.imageUrl, ...fishDetails.thumbnails]
    : [fishDetails?.imageUrl || '']
  const navigate = useNavigate()
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
        fetchBidders()
      }
      if (isDescendingBid) {
        navigate('/')
      }
    } catch (error: any) {
      console.log(error)
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

  const fetchBidders = useCallback(async () => {
    try {
      const response = await http.get(`Koi/get-bidders-by-koi-id/${fishDetails?.koiId}`)

      setCurrentBidders(response.data.value[0]?.bidders || [])
    } catch (error) {
      console.error('Error fetching bidders:', error)
    }
  }, [fishDetails?.koiId])

  useEffect(() => {
    if (auctionInfo?.endTime && auctionInfo?.startTime) {
      const updateTimer = () => setTimeLeft(calculateTimeLeft(auctionInfo.endTime, auctionInfo.startTime))
      updateTimer()
      const timer = setInterval(updateTimer, 1000)
      return () => clearInterval(timer)
    }
  }, [auctionInfo, calculateTimeLeft])

  const checkUserBid = useCallback(async () => {
    try {
      const response = await http.get(`Bid/check-userBid-for-koi/${fishDetails?.koiId}`)
      setHasUserBid(response.data === true)
      console.log(hasUserBid)
      if (response.data === true && isSealedBid) {
        const userBidResponse = await http.get(`Koi/get-current-bidder-by-koi-id/${fishDetails?.koiId}`)
        setUserBid(userBidResponse.data.value || null)
      }
    } catch (error) {
      console.error('Error checking user bid:', error)
    }
  }, [fishDetails?.koiId, isSealedBid])
  useEffect(() => {
    const checkSealedBid = async () => {
      try {
        const response = await http.get(`AuctionMethod/check-sealed-bid/${fishDetails?.koiId}`)
        setIsSealedBid(response.data === true)
      } catch (error) {
        console.error('Error checking sealed bid:', error)
      } finally {
        setIsReady(true)
      }
    }
    if (fishDetails?.koiId) checkSealedBid()
  }, [fishDetails?.koiId])

  useEffect(() => {
    const checkSealedBid = async () => {
      try {
        const response = await http.get(`AuctionMethod/check-descending-bid/${fishDetails?.koiId}`)
        setIsDescendingBid(response.data === true)
        setBidAmount(auctionInfo?.currentDescendedPrice ?? 0)
      } catch (error) {
        console.error('Error checking sealed bid:', error)
      }
    }
    if (fishDetails?.koiId) checkSealedBid()
  }, [fishDetails?.koiId])
  useEffect(() => {
    checkUserBid() // Check if user has bid
  }, [checkUserBid])

  useEffect(() => {
    fetchBidders()
    const interval = setInterval(fetchBidders, 5000)
    return () => clearInterval(interval)
  }, [fetchBidders])

  const handleNextThumbnail = () => {
    if (thumbnailIndex < thumbnails.length - 2) {
      setThumbnailIndex(thumbnailIndex + 2)
    }
  }

  const handlePrevThumbnail = () => {
    if (thumbnailIndex > 0) {
      setThumbnailIndex(thumbnailIndex - 2)
    }
  }

  const handleThumbnailClick = (imageUrl: string) => {
    setSelectedThumbnail(imageUrl)
  }

  if (!fishDetails || !auctionInfo || !bidders || !isReady) return <p>Loading auction details...</p>

  return (
    <div className='auction-page'>
      <div className='main-image-section'>
        <img src={selectedThumbnail} alt='Main Fish' className='main-fish-image' />

        <div className='thumbnail-section'>
          <button onClick={handlePrevThumbnail} disabled={thumbnailIndex === 0} className='thumbnail-nav-btn'>
            &lt;
          </button>

          {thumbnails.slice(thumbnailIndex, thumbnailIndex + 2).map((thumb, index) => (
            <img
              key={index}
              src={thumb}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${thumb === selectedThumbnail ? 'selected' : ''}`}
              onClick={() => handleThumbnailClick(thumb)}
            />
          ))}

          <button
            onClick={handleNextThumbnail}
            disabled={thumbnailIndex >= thumbnails.length - 2}
            className='thumbnail-nav-btn'
          >
            &gt;
          </button>
        </div>
      </div>

      <div className='details-section'>
        <h2>Name: {fishDetails.name}</h2>
        <h3 className='reserve-price'>
          Reserve Price: <span>${auctionInfo.reservePrice}</span>
        </h3>
        <h3>Variety: {fishDetails.variety}</h3>
        {!isSealedBid && (
          <h3 className='reserve-price'>
            {isDescendingBid ? 'Current Descended Price: ' : 'Highest Bid: '}
            <span>${isDescendingBid ? auctionInfo.currentDescendedPrice : auctionInfo.highestPrice}</span>
          </h3>
        )}
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
              {auctionInfo.endTime.split('T')[0]} {auctionInfo.endTime.split('T')[1].split('.')[0]}
            </span>
          </p>
        </div>

        <div className='bidder-list'>
          <table>
            <thead>
              <tr style={{ background: '#d6d1d1' }}>
                <th>Bidder</th>
                <th>Amount</th>
                <th>Bid Time</th>
              </tr>
            </thead>
            <tbody>
              {isSealedBid ? (
                // Nếu là sealed bid, chỉ hiển thị bid của người dùng hiện tại (nếu có)
                hasUserBid ? (
                  <tr>
                    <td>{userBid?.bidderName}</td>
                    <td>${userBid?.bidAmount}</td>
                    <td>
                      {userBid?.bidTime.split('T')[0]} {userBid?.bidTime.split('T')[1].split('.')[0]}
                    </td>
                  </tr>
                ) : (
                  // Nếu người dùng chưa bid, không hiển thị gì cả
                  <tr>
                    <td colSpan={3}>You have not placed a bid yet.</td>
                  </tr>
                )
              ) : (
                // Nếu không phải sealed bid, hiển thị tất cả bid
                currentBidders
                  .sort((a, b) => b.bidAmount - a.bidAmount)
                  .map((bidder, index) => (
                    <tr key={index}>
                      <td>{bidder.bidderName}</td>
                      <td>${bidder.bidAmount}</td>
                      <td>
                        {bidder.bidTime.split('T')[0]} {bidder.bidTime.split('T')[1].split('.')[0]}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

        <div className='bid-section'>
          <label>Your bid:</label>
          <input
            type='number'
            value={bidAmount}
            onChange={handleBidChange}
            min={isDescendingBid ? auctionInfo.currentDescendedPrice : auctionInfo.highestPrice}
            disabled={isDescendingBid}
          />
          <button onClick={placeBid} className='bid-now-btn'>
            Bid Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuctionPage
