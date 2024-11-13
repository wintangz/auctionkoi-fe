export interface FishDetails {
  koiId: string
  name: string
  variety: string
  imageUrl: string
  thumbnails?: string[]
  location: string
  size: string
  breeder: string
  age: string
  description: string
  contact: string
}

export interface AuctionInfo {
  reservePrice: number
  startingBid: number
  timeLeft: string
  startTime: string
  endTime: string
  highestPrice: number
  auctionMethodName: string
}

export interface Bidder {
  bidderName: string
  bidAmount: number
  bidTime: string
}

export interface AuctionPageProps {
  fishDetails?: FishDetails
  auctionInfo?: AuctionInfo
  bidders?: Bidder[]
}
