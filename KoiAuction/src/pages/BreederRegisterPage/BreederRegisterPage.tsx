import React, { useRef, useState } from 'react'
import './BreederRegisterPage.scss'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../configs/firebase.config'
import http from '../../utils/http'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function BreederRegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const logoRef = useRef<HTMLImageElement | null>(null)
  const [koiImagePreview, setKoiImagePreview] = useState<string | null>(null)
  const [koiFarmDescription, setKoiFarmDescription] = useState('')
  const [koiFarmLocation, setKoiFarmLocation] = useState('')
  const [koiFarmName, setKoiFarmName] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const navigate = useNavigate()
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setKoiImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true)
    e.preventDefault()

    let koiFarmImageURL = ''

    if (selectedImage) {
      const imageRef = ref(storage, `images/${selectedImage.name}`)
      try {
        await uploadBytes(imageRef, selectedImage)
        koiFarmImageURL = await getDownloadURL(imageRef)
        navigate('/')
      } catch (error) {
        console.error('Error uploading image:', error)
        return
      }
    }

    const requestData = {
      koiFarmName,
      koiFarmDescription,
      koiFarmLocation,
      koiFarmImage: koiFarmImageURL
    }

    try {
      const response = await http.post<{ message: string; value: string }>(
        'Authentication/register/koibreeder',
        requestData
      )

      if (response) {
        toast.success(response.data.message)
      } else {
        toast.error('Failed to register koi farm')
      }
    } catch (error) {
      toast.error(`Error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='br-page'>
      {isLoading && (
        <div className='loading-overlay'>
          <div className='loading-text'>Loading...</div>
        </div>
      )}
      <img ref={logoRef} className='logo' src='https://i.imgur.com/abwtsRC.png' alt='logo' />
      <p style={{ marginTop: '20px' }}>Register to Koi Breeder</p>
      <div className='br-page-form-container'>
        <form className='br-page-form' onSubmit={handleSubmit}>
          <label>
            <span>Koi Farm Name:</span>
            <input
              type='text'
              name='koiFarmName'
              value={koiFarmName}
              onChange={(e) => setKoiFarmName(e.target.value)}
            />
          </label>
          <label>
            <span>Koi Farm Description:</span>
            <input
              type='text'
              name='koiFarmDescription'
              value={koiFarmDescription}
              onChange={(e) => setKoiFarmDescription(e.target.value)}
            />
          </label>
          <label>
            <span>Koi Farm Location:</span>
            <input
              type='text'
              name='koiFarmLocation'
              value={koiFarmLocation}
              onChange={(e) => setKoiFarmLocation(e.target.value)}
            />
          </label>
          <label>
            <span>Koi Farm Image:</span>
            <input type='file' accept='image/*' onChange={handleImageChange} />
          </label>

          {koiImagePreview && (
            <div className='image-preview'>
              <h4>Preview of Koi Farm Image:</h4>
              <img src={koiImagePreview} alt='Koi Farm Preview' className='koi-image' />
            </div>
          )}
          <button type='submit' className='register-button'>
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default BreederRegisterPage
