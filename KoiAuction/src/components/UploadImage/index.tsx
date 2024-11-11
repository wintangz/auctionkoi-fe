// src/ImageUpload.tsx
import React, { useState, ChangeEvent, useCallback } from 'react'

import Cropper from 'react-easy-crop'
import ReactModal from 'react-modal'
import './index.scss'
import { toast } from 'react-toastify'
import getCroppedImg from '../../configs/cropImage'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../configs/firebase.config'

ReactModal.setAppElement('#root')
interface ImageUploadProps {
  imgUrl?: string | null
  onImageSave: (imageUrl: string) => Promise<void>
}
const ImageUpload: React.FC<ImageUploadProps> = ({ imgUrl, onImageSave }) => {
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number
    y: number
    width: number
    height: number
  } | null>(null)
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [isCropping, setIsCropping] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const [isSaved, setIsSaved] = useState<boolean>(false)
  const handleCancel = () => {
    setCroppedImage(null)
    setImage(null)
    setFile(null)
    setIsCropping(false)
    setIsSaved(false)
  }
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string)
        setFile(selectedFile)
        setIsCropping(true)

        setCroppedImage(null)
        setCroppedAreaPixels(null)
        setCrop({ x: 0, y: 0 })
        setZoom(1)
        setIsSaved(false)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      console.error('Không có file nào được chọn')
    }
  }

  const onCropComplete = useCallback(
    (_croppedArea: unknown, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    []
  )

  const showCroppedImage = useCallback(async () => {
    try {
      if (image && croppedAreaPixels) {
        const croppedImageBlob = await getCroppedImg(image, croppedAreaPixels)
        const croppedImageUrl = URL.createObjectURL(croppedImageBlob)

        setCroppedImage(croppedImageUrl)
        setIsCropping(false)
      }
    } catch (e) {
      console.error(e)
      toast.error('Đã xảy ra lỗi cắt ảnh')
    }
  }, [image, croppedAreaPixels])

  const handleSave = async () => {
    if (croppedImage && file) {
      setIsUploading(true)
      try {
        const croppedImageBlob = await fetch(croppedImage).then((res) => res.blob())
        const fileName = `${file.name}-${Date.now()}`
        const storageRef = ref(storage, `images/${fileName}`)
        await uploadBytes(storageRef, croppedImageBlob)
        const firebaseUrl = await getDownloadURL(storageRef)
        console.log(firebaseUrl)
        await onImageSave(firebaseUrl)
        setIsSaved(true)
      } catch {
        toast.error('Có lỗi xảy ra khi upload ảnh. Vui lòng thử lại.')
        setIsUploading(false)
      }
    }
  }

  return (
    <div className='image-upload-container'>
      <input
        id='image-upload'
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        className='image-upload-input'
      />

      {/* Hiển thị ảnh ban đầu từ imgUrl nếu chưa có ảnh cropped */}
      {!isCropping && (
        <div
          className='upload-circle'
          onClick={() => {
            document.getElementById('image-upload')?.click()
          }}
          style={{
            backgroundImage: croppedImage ? `url(${croppedImage})` : imgUrl ? `url(${imgUrl})` : undefined
          }}
        >
          {!croppedImage && !imgUrl && <div className='placeholder' />}
        </div>
      )}

      <ReactModal
        isOpen={isCropping}
        onRequestClose={() => setIsCropping(false)}
        contentLabel='Crop Image'
        className='modal'
        overlayClassName='overlay'
      >
        <div className='cropper-container'>
          <div className='cropper-header'>
            <button onClick={showCroppedImage} className='crop-button'>
              Cắt Ảnh
            </button>
          </div>

          <Cropper
            image={image || ''}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape='round'
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />

          <div className='cropper-footer'>
            <button onClick={showCroppedImage} className='confirm-button'>
              Xác Nhận
            </button>
          </div>
        </div>
      </ReactModal>

      {croppedImage && !isSaved && (
        <div className='button-container'>
          <button onClick={handleSave} className='save-button' disabled={isUploading}>
            {isUploading ? 'Load...' : 'Save'}
          </button>
          <button onClick={handleCancel} className='cancel-button'>
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
