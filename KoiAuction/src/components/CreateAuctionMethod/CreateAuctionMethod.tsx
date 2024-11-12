import { useEffect, useState } from 'react'
import './CreateAuctionMethod.scss'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage' // Firebase imports

import http from '../../utils/http'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

interface CreateAuctionMethodProps {
  description: string
  onSubmit: (data: any) => void
  imfUrl?: string
  auctionMethodID: string
}

function CreateAuctionMethod({ description, onSubmit, imfUrl, auctionMethodID }: CreateAuctionMethodProps) {
  const [koiImage, setKoiImage] = useState<File | null>(null) // Save File instead of string
  const [name, setName] = useState('')
  const [initialPrice, setInitialPrice] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [sex, setSex] = useState('Female')
  const [age, setAge] = useState('')
  const [location, setLocation] = useState('')
  const [startTime, setStartTime] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [varieties, setVarieties] = useState<string[]>([])
  const [variety, setVariety] = useState<string>('')

  const navigate = useNavigate()
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setKoiImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get('Enum/variety')
        setVarieties(response.data)

        if (response.data.length > 0) {
          setVariety(response.data[0])
        }
      } catch (error) {
        console.error('Error fetching varieties:', error)
      }
    }

    fetchData()
  }, [])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!name) newErrors.name = 'Koi Name cannot be empty.'
    else if (name.length > 50) newErrors.name = 'Koi Name cannot exceed 50 characters.'

    if (!age) newErrors.age = 'Age cannot be empty.'
    else if (isNaN(Number(age)) || Number(age) < 1 || Number(age) > 20)
      newErrors.age = 'Age must be between 1 and 20 years.'

    if (!location) newErrors.location = 'Location cannot be empty.'

    if (!startTime) newErrors.startTime = 'Start Time cannot be empty.'
    else if (new Date(startTime) <= new Date())
      newErrors.startTime = 'Start Time must be in the future and at least 5 minutes from now.'

    if (!initialPrice) newErrors.initialPrice = 'Initial Price cannot be empty.'
    else if (isNaN(Number(initialPrice)) || Number(initialPrice) <= 0)
      newErrors.initialPrice = 'Initial Price must be a positive number.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!koiImage) {
      toast.error('Please select an image')
      return
    }

    if (validateForm()) {
      try {
        const storage = getStorage()
        const storageRef = ref(storage, `images/${koiImage?.name}`)
        await uploadBytes(storageRef, koiImage)
        const imageUrl = await getDownloadURL(storageRef) // Get image URL

        const auctionData = {
          name,
          sex,
          age: Number(age),
          location,
          variety,
          initialPrice: Number(initialPrice),
          imageUrl,
          startTime,
          auctionMethodID
        }

        const response = await http.post('/Request/koi', auctionData)
        onSubmit(auctionData)
        const { message } = response.data
        toast.success(message)

        setName('')
        setInitialPrice('')
        setSex('')
        setAge('')
        setLocation('')
        setStartTime('')
        setKoiImage(null)

        navigate('/create-auction')
      } catch (error) {
        console.error('Error uploading image or saving auction:', error)
        toast.error('Failed to create auction')
      }
    }
  }

  return (
    <div className='method1-page'>
      <div className='banner'>
        <img width='30%' src={imfUrl} alt='Banner' />
      </div>
      <div className='auction-form-container'>
        <form className='auction-form' onSubmit={handleSubmit}>
          <label>
            <span>Name:</span>
            <input
              type='text'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                validateForm() // Validate immediately on change
              }}
              required
            />
            {errors.name && <p className='error-message'>{errors.name}</p>}
          </label>
          <label>
            <span>Initial Price:</span>
            <input
              type='text'
              value={initialPrice}
              onChange={(e) => {
                setInitialPrice(e.target.value)
                validateForm()
              }}
              required
            />
            {errors.initialPrice && <p className='error-message'>{errors.initialPrice}</p>}
          </label>
          <label>
            <span>Sex:</span>
            <select
              value={sex}
              onChange={(e) => {
                setSex(e.target.value)
              }}
              required
              style={{
                width: '65%',
                padding: '8px',
                marginLeft: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <option value='Female'>Female</option>
              <option value='Male'>Male</option>
            </select>
          </label>
          <label>
            <span>Age:</span>
            <input
              type='text'
              value={age}
              onChange={(e) => {
                setAge(e.target.value)
                validateForm()
              }}
              required
            />
            {errors.age && <p className='error-message'>{errors.age}</p>}
          </label>
          <label>
            <span>Location:</span>
            <input
              type='text'
              value={location}
              onChange={(e) => {
                setLocation(e.target.value)
                validateForm()
              }}
              required
            />
            {errors.location && <p className='error-message'>{errors.location}</p>}
          </label>
          <label>
            <span>Variety:</span>
            <select
              id='varietySelect'
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
              style={{
                width: '65%',
                padding: '8px',
                marginLeft: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              {varieties.map((varietyOption) => (
                <option key={varietyOption} value={varietyOption}>
                  {varietyOption}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Start Time:</span>
            <input
              type='datetime-local'
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value)
                validateForm()
              }}
              required
            />
            {errors.startTime && <p className='error-message'>{errors.startTime}</p>}
          </label>
          <label>
            <span>Koi Image:</span>
            <input type='file' accept='image/*' onChange={handleImageChange} required />
          </label>
          {previewUrl && (
            <div className='image-preview'>
              <img src={previewUrl} alt='Preview' style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
            </div>
          )}

          <button type='submit' className='create-method-button' disabled={Object.keys(errors).length > 0}>
            Create Auction
          </button>
        </form>
        <p className='auction-description'>{description}</p>
      </div>
    </div>
  )
}

export default CreateAuctionMethod
