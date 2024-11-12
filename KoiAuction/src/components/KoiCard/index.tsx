import React from 'react'
import './index.scss'
import { KoiData } from '../../types/KoiData.type'
import { Link } from 'react-router-dom'

interface KoiCardProps {
  koi: KoiData
}

const KoiCard: React.FC<KoiCardProps> = ({ koi }) => {
  return (
    <div className='card'>
      <img src={koi.imageUrl} alt='Koi' />
      <div className='card-info'>
        <div className='card-details'>
          <p>
            <strong>Koi Name:</strong> {koi.name}
          </p>
          <p>
            <strong>Location:</strong> {koi.location}
          </p>
          <p>
            <strong>Sex:</strong> {koi.sex}
          </p>
          <p>
            <strong>Reserve price:</strong> {koi.reservePrice.toLocaleString()} $
          </p>
          <p>
            <strong>Age:</strong> {koi.age}
          </p>
          <p>
            <strong>Variety:</strong> {koi.variety}
          </p>
          <p>
            <strong>Bid Time:</strong> {koi.endTime}
          </p>
          <p>Contact: {koi.contact}</p>
        </div>
        <div>
          <p className='status'>Status: {koi.auctionStatus}</p>
          {/* <p className={`delivery ${koi.deliveryStatus === 'Finished' ? 'finished-delivery' : 'delivery'}`}> */}

          <button className='btn-view'>
            <Link to={`/auction-detail/${koi.id}`}>View</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default KoiCard
