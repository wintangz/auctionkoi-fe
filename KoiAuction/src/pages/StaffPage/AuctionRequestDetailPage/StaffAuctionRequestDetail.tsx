'use client'

import { useState } from 'react'

function StaffAuctionRequestDetail() {
  const [currentImage, setCurrentImage] = useState(0)
  const [approvalStatus, setApprovalStatus] = useState('')

  const images = [
    '/placeholder.svg?height=400&width=300',
    '/placeholder.svg?height=400&width=300',
    '/placeholder.svg?height=400&width=300'
  ]

  return (
    <div className='min-h-screen bg-bg-admin lg:px-0 px-5'>
      <main className='container mx-auto lg:px-20 md:px-10 pb-28 pt-10 mt-10'>
        <div className='flex flex-col space-y-8'>
          <h1 className='text-xl font-semibold text-red'>AUCTION REQUEST DETAIL</h1>
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-4'>
              <div className='border rounded-lg overflow-hidden'>
                <img src={images[currentImage]} alt='Koi fish' className='w-full h-96 object-cover' />
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

            {/* Details */}
            <div className='space-y-6'>
              <div>
                <h2 className='text-xl font-semibold'>Name: Asagi #Koi2412</h2>
                <p className='text-green-600 mt-2 text-xl'>Reserve Price: 150 $</p>
              </div>

              <div>
                <p className='font-medium text-xl text-black'>Variety: Doitsu</p>
                <p className='text-red-600 mt-1 text-xl text-black'>Method: Fixed Price Sale!</p>
              </div>

              <div className='bg-gray-100 p-4 rounded-lg'>
                <h3 className='font-semibold mb-2 text-xl text-black'>Additional Information</h3>
                <div className='space-y-2 text-sm'>
                  <p className='text-xl text-black'>Location: Littlehampton</p>
                  <p className='text-xl text-black'>Size: Doitsu</p>
                  <p className='text-xl text-black'>Sex: Female</p>
                  <p className='text-xl text-black'>Age: 1</p>
                  <p className='text-xl text-black'>Delivery: At cost (approx £30) Multiple fish can go in one box</p>
                  <p className='text-xl text-black'>Contact: 01903 724880</p>
                </div>
              </div>

              <div className='flex justify-end gap-4 pt-4'>
                <div className='relative'>
                  <select
                    value={approvalStatus}
                    onChange={(e) => setApprovalStatus(e.target.value)}
                    className='appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-8 leading-tight focus:outline-none focus:border-blue-500 text-black'
                  >
                    <option value=''>Select Action</option>
                    <option value='approve'>Approve</option>
                    <option value='deny'>Deny</option>
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                    <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                </div>
                <button className='px-4 py-2 bg-red text-white rounded-md hover:bg-rose-600'>Done</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default StaffAuctionRequestDetail
