import { useEffect, useState } from 'react'
import { Koi } from '../../types/Koi.type'
import Pagination from '../Pagination/Pagination'
import http from '../../utils/http'
import { Link } from 'react-router-dom'

export default function Auction() {
  const [koiList, setKoiData] = useState<Koi[]>([])
  const [isLoading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState<{ [id: number]: string }>({})
  const fetchKoiData = async () => {
    try {
      setLoading(true)
      const response = await http.get<{ message: string; value: Koi[] }>('Koi/all-active-auctions')
      setKoiData(response.data.value || [])
    } catch (error) {
      console.error('Error fetching farm data:', error)
      setKoiData([])
    } finally {
      setLoading(false)
    }
  }

  const calculateTimeLeft = (endTime: string, startTime: string) => {
    const end = new Date(endTime).getTime()
    const start = new Date(startTime).getTime()
    const now = Date.now()
    const timeRemaining = end - Math.max(start, now)

    if (timeRemaining <= 0) return 'Auction Ended'

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)

    return `${days}d ${hours}h ${minutes}m ${seconds}s`
  }
  useEffect(() => {
    fetchKoiData()
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = koiList.reduce(
        (acc, koi) => {
          if (koi.endTime && koi.startTime) {
            acc[koi.id] = calculateTimeLeft(koi.endTime, koi.startTime)
          } else {
            acc[koi.id] = 'No time data'
          }
          return acc
        },
        {} as { [id: number]: string }
      )

      setTimeLeft(newTimeLeft)
    }, 1000)

    return () => clearInterval(interval)
  }, [koiList])
  const [searchName, setSearchName] = useState('')
  const [searchSex, setSearchSex] = useState('')
  const [searchVariety, setSearchVariety] = useState('')

  const filteredKoiList = koiList.filter(
    (koi) =>
      (!searchName || koi.name.toLowerCase().includes(searchName.toLowerCase())) &&
      (!searchSex || koi.sex.toLowerCase() === searchSex.toLowerCase()) &&
      (!searchVariety || koi.variety.toLowerCase() === searchVariety.toLowerCase())
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
    <>
      <div className='min-h-screen bg-white flex flex-col justify-between'>
        <main className='container mx-auto lg:px-14 lg:py-20 py-0 space-y-12 lg:mt-0 mt-10 px-5'>
          <section className='flex flex-col-reverse md:flex-row md:items-center md:space-x-8 justify-between'>
            <div className='md:w-3/4 mt-4 md:mt-0 lg:w-1/3'>
              <p className='text-gray-700'>
                This website will have a section dedicated to current live auctions, showing active bidding processes
                with countdown timers and real-time updates. Upcoming auctions are displayed with start times, preview
                images, and details.
              </p>
            </div>
            <div className='md:w-1/3'>
              <img
                src='https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FAuctionBanner.png?alt=media&token=652696d6-17eb-447f-ae59-d40d4063e820'
                alt='Auction banner'
                className='w-full h-auto'
              />
            </div>
          </section>

          <section className='bg-gray-200 p-6 rounded-lg'>
            <h2 className='text-2xl font-semibold mb-4'>Search All Our Available Koi</h2>
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
                <option value='kohaku'>Kohaku</option>
                <option value='showa'>Showa</option>
              </select>
            </div>
          </section>

          <div className='mt-20'>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <section className='grid md:grid-cols-2 gap-10'>
                {currentKoi.length > 0 ? (
                  currentKoi.map((koi) => (
                    <div key={koi.id} className='border rounded-lg overflow-hidden shadow-md flex p-5'>
                      <img src={koi.imageUrl} alt={`${koi.name} Koi fish`} className='w-1/4 h-auto object-cover' />
                      <div className='p-4 space-y-2 flex-1'>
                        <p className='text-red font-medium'>Time Left: {timeLeft[koi.id] || 'Calculating...'}</p>
                        <h3 className='text-xl font-bold'>Koi Name: {koi.name}</h3>
                        <p>Size: {koi.size}</p>
                        <p>Sex: {koi.sex}</p>
                        <p>Reserve price: {koi.initialPrice}</p>
                        <p>Age: {koi.age}</p>
                        <p>Variety: {koi.variety}</p>

                        <button className='mt-2 bg-red text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300'>
                          <Link to={`/auction-detail/${koi.id}`}>View</Link>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No Koi found matching your search criteria.</p>
                )}
              </section>
            )}

            {!isLoading && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
          </div>
        </main>
      </div>
    </>
  )
}
