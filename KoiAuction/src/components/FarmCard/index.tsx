import React from 'react'
import './index.scss'
import { FarmCardProps } from '../../types/FarmCardProps'

const FarmCard: React.FC<FarmCardProps> = ({ title, breeder, description, location, image }) => {
  return (
    <div className='farm-card'>
      <img src={image} alt={title} className='farm-card-image' />
      <div className='farm-card-content'>
        <h3>{title}</h3>
        <p>
          <strong>Breeder:</strong> {breeder}
        </p>
        <p>{description}</p>
        <p>
          <strong>Location:</strong> {location}
        </p>
      </div>
    </div>
  )
}

export default FarmCard
