import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { KoiAuctionResponse } from '../../../types/KoiAuctionResponse.type'
import { toast } from 'react-toastify'

function StaffAuctionRequestDetail() {
  const [currentImage, setCurrentImage] = useState(0)
  const [approvalStatus, setApprovalStatus] = useState('')
  const [reason, setReason] = useState('')
  const [auctionData, setAuctionData] = useState<KoiAuctionResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { id } = useParams<{ id: string }>()

  const token = localStorage.getItem('token')

  const images = auctionData
    ? [auctionData.mainImageUrl, ...(Array.isArray(auctionData.imageUrl) ? auctionData.imageUrl : [])]
    : [
        '/placeholder.svg?height=400&width=300',
        '/placeholder.svg?height=400&width=300',
        '/placeholder.svg?height=400&width=300'
      ]

  useEffect(() => {
    const fetchAuctionData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://koiauctionwebapp.azurewebsites.net/api/Request/koi/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch auction data')
        }

        const data = await response.json()
        setAuctionData(data.value)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchAuctionData()
  }, [id, token])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const handleApprovalStatusChange = async () => {
    if (!approvalStatus || !auctionData) return

    setLoading(true)
    try {
      const response = await fetch(
        approvalStatus === 'Approved'
          ? 'https://koiauctionwebapp.azurewebsites.net/api/Request/koi/approval'
          : 'https://koiauctionwebapp.azurewebsites.net/api/Request/koi/denial',
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(approvalStatus === 'Approved' ? { koiID: id } : { koiID: id, requestResponse: reason })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update auction status')
      }

      const result = await response.json()
      toast.success(result.message)

      setAuctionData((prevData) => {
        if (!prevData) {
          return prevData
        }

        return {
          ...prevData,
          auctionRequestStatus: approvalStatus
        }
      })

      setApprovalStatus('')
      setReason('')
      setIsSubmitted(true) // Set isSubmitted to true on success
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
        toast.error('Error: ' + err.message)
      } else {
        setError('An unknown error occurred')
        toast.error('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-bg-admin lg:px-0 px-5'>
      <main className='container mx-auto lg:px-20 md:px-10 pb-28 pt-10 mt-10'>
        <div className='flex flex-col space-y-8'>
          <h1 className='text-xl font-semibold text-red'>AUCTION REQUEST DETAIL</h1>
          <div className='grid grid-cols-12 gap-8'>
            <div className='col-span-4 space-y-2'>
              <div className='rounded-lg overflow-hidden'>
                <img src={images[currentImage]} alt='Koi fish' className='w-full h-auto object-cover' />
              </div>
              <div className='flex gap-2 overflow-x-auto'>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`flex-shrink-0 border-2 rounded-lg overflow-hidden
            ${currentImage === idx ? 'border-blue-500' : 'border-transparent'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className='w-20 h-20 object-cover' />
                  </button>
                ))}
              </div>
            </div>

            <div className='col-span-8 space-y-6'>
              <div>
                <h2 className='text-base font-semibold'>Name: {auctionData?.name}</h2>
                <p className='text-green-600 mt-2 text-base'>Reserve Price: {auctionData?.initialPrice} $</p>
              </div>

              <div>
                <p className='font-medium text-base text-black'>Variety: {auctionData?.variety}</p>
                <p className='text-red-600 mt-1 text-base text-red'>Method: {auctionData?.auctionMethod}</p>
              </div>

              <div className='bg-gray-100 p-4 rounded-lg'>
                <h3 className='font-semibold mb-2 text-xl text-black'>Additional Information</h3>
                <div className='space-y-2 text-sm'>
                  <p className='text-base text-black'>Breeder: {auctionData?.breeder}</p>
                  <p className='text-base text-black'>Size: {auctionData?.size}</p>
                  <p className='text-base text-black'>Sex: {auctionData?.sex}</p>
                  <p className='text-base text-black'>Age: {auctionData?.age}</p>
                  <p className='text-base text-black'>Description: {auctionData?.description}</p>
                  <p className='text-base text-black'>Date Created: {auctionData?.dateCreate}</p>
                  <p className='text-base text-black'>End Time: {auctionData?.endTime}</p>
                  <p className='text-base text-black'>Auction Status: {auctionData?.auctionRequestStatus}</p>
                  <p className='text-base text-black'>Request Response: {auctionData?.requestResponse}</p>
                </div>
              </div>

              {!isSubmitted && auctionData?.auctionRequestStatus === 'Pending' && (
                <div className='flex items-center gap-4 pt-4'>
                  <div className='relative'>
                    <select
                      value={approvalStatus}
                      onChange={(e) => setApprovalStatus(e.target.value)}
                      className='appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-8 leading-tight focus:outline-none focus:border-blue-500 text-black'
                    >
                      <option value=''>Select Action</option>
                      <option value='Approved'>Approve</option>
                      <option value='Deny'>Deny</option>
                    </select>
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                      <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                      </svg>
                    </div>
                  </div>

                  {approvalStatus === 'Deny' && (
                    <input
                      type='text'
                      placeholder='Reason for denial'
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className='border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:border-blue-500 text-black'
                    />
                  )}

                  <button
                    onClick={handleApprovalStatusChange}
                    className='px-4 py-2 bg-red text-white rounded-md hover:bg-rose-600'
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default StaffAuctionRequestDetail
