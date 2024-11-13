import { useEffect, useState } from 'react'
import { KoiAuction } from '../../../types/KoiAuction.type'
import Pagination from '../../../components/Pagination/Pagination'
import { Link } from 'react-router-dom'

const StaffAuctionRequest = () => {
  const [koiList, setKoiData] = useState<KoiAuction[]>([])
  const [isLoading, setLoading] = useState(true)

  const fetchKoiData = async () => {
    try {
      setLoading(true)

      const token = localStorage.getItem('token')

      if (!token) {
        console.error('No authentication token found')
        return
      }

      const response = await fetch('https://koiauctionwebapp.azurewebsites.net/api/Request/kois', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch koi data')
      }

      const data = await response.json()
      setKoiData(data.value)
    } catch (error) {
      console.error('Error fetching koi data:', error)
      setKoiData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchKoiData()
  }, [])

  const [searchName, setSearchName] = useState('')
  const [searchSex, setSearchSex] = useState('')
  const [searchVariety, setSearchVariety] = useState('')
  const [priceRange, setPriceRange] = useState(600)
  const [statusFilter, setStatusFilter] = useState('')

  const varieties = Array.from(new Set(koiList.map((koi) => koi.variety)))

  const filteredKoiList = koiList.filter(
    (koi) =>
      (!searchName || koi.name.toLowerCase().includes(searchName.toLowerCase())) &&
      (!searchSex || koi.sex.toLowerCase() === searchSex.toLowerCase()) &&
      (!searchVariety || koi.variety.toLowerCase() === searchVariety.toLowerCase()) &&
      koi.initialPrice <= priceRange &&
      (!statusFilter || koi.auctionRequestStatus === statusFilter)
  )

  const [currentPage, setCurrentPage] = useState<number>(1)
  const koiPerPage = 4
  const totalPages = Math.ceil(filteredKoiList.length / koiPerPage)

  const indexOfLastKoi = currentPage * koiPerPage
  const indexOfFirstKoi = indexOfLastKoi - koiPerPage
  const currentKoi = filteredKoiList.slice(indexOfFirstKoi, indexOfLastKoi)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className='min-h-screen bg-bg-admin lg:px-0 px-5'>
      <main className='container mx-auto lg:px-32 md:px-10 pb-28 pt-10 mt-10'>
        <div className='flex flex-col space-y-8'>
          <section className='bg-gray-200 p-6 rounded-lg'>
            <h2 className='text-2xl font-semibold mb-4'>Search All Auction Request</h2>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <input
                type='text'
                placeholder='Search by name'
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className='w-full px-3 py-2 rounded border border-gray-300'
              />
              <select
                value={searchSex}
                onChange={(e) => setSearchSex(e.target.value)}
                className='w-full px-3 py-2 rounded border border-gray-300'
              >
                <option value=''>Search by sex</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
              <select
                value={searchVariety}
                onChange={(e) => setSearchVariety(e.target.value)}
                className='w-full px-3 py-2 rounded border border-gray-300'
              >
                <option value=''>Search by variety</option>
                {varieties.map((variety, index) => (
                  <option key={index} value={variety}>
                    {variety}
                  </option>
                ))}
              </select>
            </div>
            <div className='mt-4'>
              <label htmlFor='priceRange' className='block text-sm font-bold'>
                Max Price: ${priceRange}
              </label>
              <input
                type='range'
                id='priceRange'
                min='0'
                max='1000'
                step='50'
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className='w-full'
              />
            </div>

            <div className='flex gap-2 mt-4'>
              <button
                onClick={() => setStatusFilter('')}
                className={`px-4 py-2 rounded ${!statusFilter ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('Pending')}
                className={`px-4 py-2 rounded ${statusFilter === 'Pending' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              >
                Pending
              </button>
              <button
                onClick={() => setStatusFilter('Approved')}
                className={`px-4 py-2 rounded ${statusFilter === 'Approved' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              >
                Approved
              </button>
              <button
                onClick={() => setStatusFilter('Denied')}
                className={`px-4 py-2 rounded ${statusFilter === 'Denied' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              >
                Denied
              </button>
            </div>
          </section>

          <div className='mt-20'>
            {isLoading ? (
              <p className='text-base text-red'>Loading...</p>
            ) : (
              <section className='grid md:grid-cols-2 gap-10'>
                {currentKoi.length > 0 ? (
                  currentKoi.map((koi) => (
                    <div key={koi.id} className='border rounded-lg overflow-hidden shadow-md flex p-5'>
                      <img src={koi.imageUrl} alt={`${koi.name} Koi fish`} className='w-2/5 h-auto object-cover' />
                      <div className='p-4 space-y-2 flex-1'>
                        <h3 className='text-xl font-bold text-red'>Koi Name: {koi.name}</h3>
                        <p className='text-base text-black'>Sex: {koi.sex}</p>
                        <p className='text-base text-black'>Reserve price: ${koi.initialPrice}</p>
                        <p className='text-base text-black'>Age: {koi.age}</p>
                        <p className='text-base text-black'>Variety: {koi.variety}</p>
                        <p className='text-base text-red'>Method: {koi.auctionMethod}</p>
                        <div className='flex justify-end'>
                          <Link to={`/staff/auction-request-detail/${koi.id}`}>
                            <button className='mt-2 bg-red text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 mr-7'>
                              View
                            </button>
                          </Link>

                          {koi.auctionRequestStatus === 'Pending' ? (
                            <button
                              className='mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300'
                              disabled
                            >
                              Pending
                            </button>
                          ) : koi.auctionRequestStatus === 'Denied' ? (
                            <button
                              className='mt-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300'
                              disabled
                            >
                              Denied
                            </button>
                          ) : koi.auctionRequestStatus === 'Approved' ? (
                            <button
                              className='mt-2 bg-green-700 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300'
                              disabled
                            >
                              Approved
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='text-base text-red'>No Koi fish found for this filter.</p>
                )}
              </section>
            )}

            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default StaffAuctionRequest
