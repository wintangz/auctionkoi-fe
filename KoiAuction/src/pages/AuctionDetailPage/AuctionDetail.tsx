/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from 'react-router-dom'
import AuctionPage from '../../components/AuctionDetail/AuctionDetail'
import http from '../../utils/http'
import { useEffect, useState } from 'react'
import { AuctionInfo, Bidder, FishDetails } from '../../types/AuctionDetailProps'

function AuctionDetailPage() {
  const { koiId } = useParams<{ koiId: string }>()
  const [fishDetails, setFishDetails] = useState<FishDetails | undefined>()
  const [auctionInfo, setAuctionInfo] = useState<AuctionInfo | undefined>()
  const [bidders, setBidders] = useState<Bidder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const calculateTimeLeft = (endTime: string, startTime: string) => {
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
  }

  const fetchData = async () => {
    try {
      const response = await http.get<{
        message: string
        value: {
          id: string
          name: string
          sex: number
          size: number
          age: number
          location: string
          variety: number
          reservePrice: number
          description: string
          imageUrl: string
          auctionRequestStatus: number
          auctionStatus: number
          startTime: string
          endTime: string
          allowAutoBid: boolean
          auctionMethodName: string
          breederName: string
          contact: string
          bidders: Bidder[]
          koiImages: { url: string }[]
          highestPrice: number
          currentDescendedPrice: number
        }
      }>(`Koi/${koiId}`)

      const {
        name,
        variety,
        imageUrl,
        location,
        size,
        breederName,
        age,
        description,
        contact,
        reservePrice,
        startTime,
        auctionMethodName,
        endTime,
        bidders,
        koiImages,
        highestPrice,
        currentDescendedPrice
      } = response.data.value

      setFishDetails({
        koiId: String(koiId),
        name,
        variety: String(variety),
        imageUrl,
        location,
        size: String(size),
        breeder: breederName,
        age: String(age),
        description,
        contact,
        thumbnails: koiImages?.map((image) => image.url)
      })
      setAuctionInfo({
        reservePrice,
        startingBid: reservePrice,
        timeLeft: calculateTimeLeft(endTime, startTime),
        startTime,
        endTime,
        highestPrice,
        auctionMethodName,
        currentDescendedPrice
      })

      setBidders(bidders)
    } catch (error) {
      console.error('Error fetching auction data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (koiId) {
      fetchData()
    }
  }, [koiId])

  if (isLoading) {
    return <p>Loading...</p>
  }
  return (
    <div>
      <AuctionPage fishDetails={fishDetails} auctionInfo={auctionInfo} bidders={bidders} />
    </div>
  )
}

export default AuctionDetailPage
