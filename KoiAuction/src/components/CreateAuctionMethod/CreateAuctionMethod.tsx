import { useState } from 'react'
import './CreateAuctionMethod.scss'

interface CreateAuctionMethodProps {
  description: string
  onSubmit: (data: any) => void
  imfUrl?: string
}

function CreateAuctionMethod({ description, onSubmit, imfUrl }: CreateAuctionMethodProps) {
  const [koiImage, setKoiImage] = useState<string | null>(null)
  const [koiName, setKoiName] = useState('')
  const [reservePrice, setReservePrice] = useState('')
  const [sex, setSex] = useState('')
  const [age, setAge] = useState('')
  const [variety, setVariety] = useState('')
  const [finishTime, setFinishTime] = useState('')

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setKoiImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit({
      koiName,
      reservePrice,
      sex,
      age,
      variety,
      finishTime,
      koiImage
    })
  }

  return (
    <div className='method1-page'>
      <div className='banner'>
        <img width='30%' src={imfUrl} alt='Banner' />
      </div>
      <div className='auction-form-container'>
        <form className='auction-form' onSubmit={handleSubmit}>
          <label>
            <span>Koi Name:</span>
            <input type='text' name='koiName' value={koiName} onChange={(e) => setKoiName(e.target.value)} />
          </label>
          <label>
            <span>Reserve Price:</span>
            <input
              type='text'
              name='reservePrice'
              value={reservePrice}
              onChange={(e) => setReservePrice(e.target.value)}
            />
          </label>
          <label>
            <span>Sex:</span>
            <input type='text' name='sex' value={sex} onChange={(e) => setSex(e.target.value)} />
          </label>
          <label>
            <span>Age:</span>
            <input type='text' name='age' value={age} onChange={(e) => setAge(e.target.value)} />
          </label>
          <label>
            <span>Variety:</span>
            <input type='text' name='variety' value={variety} onChange={(e) => setVariety(e.target.value)} />
          </label>
          <label>
            <span>Finish Time:</span>
            <input type='text' name='finishTime' value={finishTime} onChange={(e) => setFinishTime(e.target.value)} />
          </label>
          <label>
            <span>Koi Image:</span>
            <input type='file' accept='image/*' onChange={handleImageChange} />
          </label>

          {koiImage && (
            <div className='image-preview'>
              <h4>Preview of Koi Image:</h4>
              <img src={koiImage} alt='Koi Preview' className='koi-image' />
            </div>
          )}
          <button type='submit' className='create-method-button'>
            Create Auction
          </button>
        </form>
        <p className='auction-description'>{description}</p>
      </div>
    </div>
  )
}

export default CreateAuctionMethod
