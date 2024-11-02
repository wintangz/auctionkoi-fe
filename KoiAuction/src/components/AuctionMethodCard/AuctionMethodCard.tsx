import React from 'react'
import { Link } from 'react-router-dom'
import './AuctionMethodCard.scss'
import { AuctionMethodCardProps } from '../../types/AuctionMethodCardProps'

const AuctionMethodCard: React.FC<AuctionMethodCardProps> = ({ methodTitle, description, imageUrl, route }) => {
  return (
    <div className='auction-method-card'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${methodTitle} image`} />
      </div>
      <div className='content'>
        <h3>{methodTitle}</h3>
        <p>
          <span className='description-label'>Description:</span>
          <br />
          {description}
        </p>

        <Link to={route} state={{ description }} className='create-auction-button'>
          Create Auction
        </Link>
      </div>
    </div>
  )
}

export default AuctionMethodCard
