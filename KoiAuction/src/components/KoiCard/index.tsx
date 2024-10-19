import React from 'react'
import './index.scss'
import { KoiData } from '../../types/KoiData.type'

interface KoiCardProps {
  koi: KoiData
}

const KoiCard: React.FC<KoiCardProps> = ({ koi }) => {
  return (
    <div className='card'>
      <img src={koi.image} alt='Koi' />
      <div className='card-info'>
        <div className='card-details'>
          <p>
            <strong>Koi Name:</strong> {koi.name}
          </p>
          <p>
            <strong>Code:</strong> {koi.code}
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
            <strong>Bid Time:</strong> {koi.bidTime}
          </p>
        </div>
        <div>
          <p className='status'>Status: {koi.status}</p>
          <p className={`delivery ${koi.deliveryStatus === 'Finished' ? 'finished-delivery' : 'delivery'}`}>
            Delivery: {koi.deliveryStatus}
          </p>
          <button className='btn-view'>View</button>
        </div>
      </div>
    </div>
  )
}

export default KoiCard
