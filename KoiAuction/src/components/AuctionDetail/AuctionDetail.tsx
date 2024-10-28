import React, { useState } from 'react'
import './AuctionDetail.scss'
import { AuctionPageProps } from '../../types/AuctionDetailProps'

const AuctionPage: React.FC<AuctionPageProps> = ({ fishDetails, auctionInfo, bidders }) => {
  const [bidAmount, setBidAmount] = useState<number>(auctionInfo.startingBid)

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBidAmount(Number(e.target.value))
  }

  const placeBid = () => {
    console.log('Bid placed: ', bidAmount)
  }

  return (
    <div className='auction-page'>
      {/* Left Section with Main Image */}
      <div className='main-image-section'>
        <img src={fishDetails.mainImage} alt={fishDetails.name} className='main-fish-image' />
        <div className='thumbnail-section'>
          {fishDetails.thumbnails.map((thumb, index) => (
            <img key={index} src={thumb} alt={`Thumbnail ${index + 1}`} className='thumbnail' />
          ))}
        </div>
      </div>

      {/* Right Section with Details */}
      <div className='details-section'>
        <h2>Name: {fishDetails.name}</h2>
        <h3 className='reserve-price'>
          Reserve Price: <span>${auctionInfo.reservePrice}</span>
        </h3>
        <h3>Variety: {fishDetails.variety}</h3>

        <div className='additional-info'>
          <h4>Additional Information</h4>
          <p>Location: {fishDetails.location}</p>
          <p>Size: {fishDetails.size}</p>
          <p>Breeder: {fishDetails.breeder}</p>
          <p>Age: {fishDetails.age}</p>
          <p>Delivery: {fishDetails.deliveryInfo}</p>
          <p>Contact: {fishDetails.contact}</p>
        </div>

        <div className='time-section'>
          <p>
            Time Left: <span>{auctionInfo.timeLeft}</span>
          </p>
          <p>
            Auction ends: <span>{auctionInfo.endDate}</span>
          </p>
        </div>

        <div className='bidder-list'>
          <h4>Bidder</h4>
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
                  <td>{bidder.name}</td>
                  <td>${bidder.amount}</td>
                  <td>{bidder.time}</td>
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
