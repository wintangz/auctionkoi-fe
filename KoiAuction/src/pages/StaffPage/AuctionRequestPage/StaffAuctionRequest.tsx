import { useEffect, useState } from 'react'
import { KoiAuction } from '../../../types/KoiAuction.type'
import Pagination from '../../../components/Pagination/Pagination'

const StaffAuctionRequest = () => {
  const [koiList, setKoiData] = useState<KoiAuction[]>([
    {
      id: '1',
      name: 'Sakura Showa',
      breeder: 'Yamamoto Koi Farm',
      reservePrice: 300,
      dateCreated: '2024-10-01',
      method: 'Live Auction',
      variety: 'Showa',
      image: 'https://example.com/images/sakura-showa.jpg',
      sex: 'Female',
      status: 'Pending',
      age: 2
    },
    {
      id: '2',
      name: 'Golden Ogon',
      breeder: 'Nishikigoi Farm',
      reservePrice: 450,
      dateCreated: '2024-09-28',
      method: 'Online Auction',
      variety: 'Ogon',
      image: 'https://example.com/images/golden-ogon.jpg',
      sex: 'Male',
      status: 'Pending',
      age: 3
    },
    {
      id: '3',
      name: 'Kohaku Beauty',
      breeder: 'Miyazaki Koi Farm',
      reservePrice: 500,
      dateCreated: '2024-10-05',
      method: 'Sealed Bid',
      variety: 'Kohaku',
      image: 'https://example.com/images/kohaku-beauty.jpg',
      sex: 'Female',
      status: 'Approved',
      age: 1
    },
    {
      id: '4',
      name: 'Shiro Utsuri Star',
      breeder: 'Aoki Koi',
      reservePrice: 320,
      dateCreated: '2024-09-30',
      method: 'Live Auction',
      variety: 'Shiro Utsuri',
      image: 'https://example.com/images/shiro-utsuri-star.jpg',
      sex: 'Male',
      status: 'Pending',
      age: 4
    },
    {
      id: '5',
      name: 'Platinum Ogon',
      breeder: 'Sakai Koi Farm',
      reservePrice: 600,
      dateCreated: '2024-10-02',
      method: 'Online Auction',
      variety: 'Ogon',
      image: 'https://example.com/images/platinum-ogon.jpg',
      sex: 'Female',
      status: 'Denied',
      age: 2
    }
  ])
  const [isLoading, setLoading] = useState(true)

  const fetchKoiData = async () => {
    try {
      setLoading(true)
    } catch (error) {
      console.error('Error fetching farm data:', error)
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

  const filteredKoiList = koiList.filter(
    (koi) =>
      (!searchName || koi.name.toLowerCase().includes(searchName.toLowerCase())) &&
      (!searchSex || koi.sex.toLowerCase() === searchSex.toLowerCase()) &&
      (!searchVariety || koi.variety.toLowerCase() === searchVariety.toLowerCase()) &&
      koi.reservePrice <= priceRange
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
                <option value='kohaku'>Kohaku</option>
                <option value='showa'>Showa</option>
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
          </section>

          <div className='mt-20'>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <section className='grid md:grid-cols-2 gap-10'>
                {currentKoi.length > 0 ? (
                  currentKoi.map((koi) => (
                    <div key={koi.id} className='border rounded-lg overflow-hidden shadow-md flex p-5'>
                      <img src={koi.image} alt={`${koi.name} Koi fish`} className='w-1/4 h-auto object-cover' />
                      <div className='p-4 space-y-2 flex-1'>
                        <h3 className='text-xl font-bold text-red'>Koi Name: {koi.name}</h3>
                        <p>Sex: {koi.sex}</p>
                        <p>Reserve price: ${koi.reservePrice}</p>
                        <p>Age: {koi.age}</p>
                        <p>Variety: {koi.variety}</p>
                        <p>Method: {koi.method}</p>
                        <div className='flex justify-end'>
                          <button className='mt-2 bg-red text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 mr-7'>
                            View
                          </button>
                          {koi.status === 'Pending' ? (
                            <button className='mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300'>
                              Pending
                            </button>
                          ) : koi.status === 'Denied' ? (
                            <button className='mt-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300'>
                              Denied
                            </button>
                          ) : koi.status === 'Approved' ? (
                            <button className='mt-2 bg-green-700 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300'>
                              Approve
                            </button>
                          ) : null}
                        </div>
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
        </div>
      </main>
    </div>
  )
}

export default StaffAuctionRequest
