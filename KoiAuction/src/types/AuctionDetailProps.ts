export interface FishDetails {
  name: string
  variety: string
  mainImage: string
  thumbnails: string[]
  location: string
  size: string
  breeder: string
  age: string
  deliveryInfo: string
  contact: string
}

export interface AuctionInfo {
  reservePrice: number
  startingBid: number
  timeLeft: string
  endDate: string
}

export interface Bidder {
  name: string
  amount: number
  time: string
}

export interface AuctionPageProps {
  fishDetails: FishDetails
  auctionInfo: AuctionInfo
  bidders: Bidder[]
}
