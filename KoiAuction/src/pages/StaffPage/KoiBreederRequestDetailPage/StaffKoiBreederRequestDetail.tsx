import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { KoiBreederResponse } from '../../../types/KoiBreederResponse.type'

function StaffKoiBreederRequestDetail() {
  const [approvalStatus, setApprovalStatus] = useState('')
  const [reason, setReason] = useState('')
  const [breederData, setBreederData] = useState<KoiBreederResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { id } = useParams<{ id: string }>()

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchAuctionData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://koiauctionwebapp.azurewebsites.net/api/Request/role/${id}`, {
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
        setBreederData(data.value)
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
    if (!approvalStatus || !breederData) return

    setLoading(true)
    try {
      const response = await fetch(
        approvalStatus === 'Approved'
          ? 'https://koiauctionwebapp.azurewebsites.net/api/Request/role/approval'
          : 'https://koiauctionwebapp.azurewebsites.net/api/Request/role/denial',
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            approvalStatus === 'Approved' ? { koiBreederID: id } : { koiBreederID: id, requestResponse: reason }
          )
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update auction status')
      }

      const result = await response.json()
      toast.success(result.message)

      setBreederData((prevData) => {
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
    <div className='min-h-screen bg-white'>
      <main className='container mx-auto px-5 lg:px-20 md:px-10 pb-28 pt-10 mt-10'>
        <div className='flex flex-col space-y-8'>
          <h1 className='text-xl font-medium text-red'>KOI BREEDER REQUEST DETAIL</h1>

          <div className='w-full'>
            <img
              src={breederData?.koiFarmImage}
              alt='Koi pond with colorful koi fish'
              className='w-full h-[400px] object-cover rounded-lg'
            />
          </div>

          <div className='space-y-4'>
            <h2 className='text-red text-xl'>Farm Name: {breederData?.koiFarmName}</h2>

            <div className='space-y-1 text-sm'>
              <p className='text-black text-lg'>Farm Location: {breederData?.koiFarmLocation}</p>
              <p className='text-black text-lg'>Breeder: {breederData?.breederName}</p>
              <p className='text-black text-lg'>Farm Description: {breederData?.koiFarmDescription}</p>
              <p className='text-black text-lg'>Request Status: {breederData?.roleRequestStatus}</p>
              <p className='text-black text-lg'>Request Response: {breederData?.requestResponse}</p>
            </div>
          </div>

          {!isSubmitted && breederData?.roleRequestStatus === 'Pending' && (
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
      </main>
    </div>
  )
}

export default StaffKoiBreederRequestDetail
