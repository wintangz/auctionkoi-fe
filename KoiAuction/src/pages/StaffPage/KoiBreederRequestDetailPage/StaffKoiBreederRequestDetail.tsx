'use client'

import { useState } from 'react'

export default function Component() {
  const [approvalStatus, setApprovalStatus] = useState('')

  return (
    <div className='min-h-screen bg-white'>
      <main className='container mx-auto px-5 lg:px-20 md:px-10 pb-28 pt-10 mt-10'>
        <div className='flex flex-col space-y-8'>
          <h1 className='text-xl font-medium text-red'>Koi Breeder Request Detail</h1>

          <div className='w-full'>
            <img
              src='https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/image%2021.png?alt=media&token=8612057d-ecc4-4487-86fb-d8f508a164e2'
              alt='Koi pond with colorful koi fish'
              className='w-full h-[400px] object-cover rounded-lg'
            />
          </div>

          <div className='space-y-4'>
            <h2 className='text-red text-xl'>Farm Name: Sakai Fish Farm</h2>

            <div className='space-y-1 text-sm'>
              <p className='text-black text-lg'>Farm Location: Niigata, Japan</p>
              <p className='text-black text-lg'>Breeder: Junnie</p>
              <p className='text-black text-lg'>
                Farm Description: Sakai Fish Farm uses advanced filtration systems and closely monitors water quality,
                temperature, and pH levels to create an environment that mimics the natural habitat of koi while
                minimizing stress.
              </p>
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
      </main>
    </div>
  )
}
