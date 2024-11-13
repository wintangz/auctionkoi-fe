import { useEffect, useState } from 'react'
import Pagination from '../../../components/Pagination/Pagination'
import { KoiBreeder } from '../../../types/KoiBreeder.type'
import { Link } from 'react-router-dom'

const StaffKoiBreederRequest = () => {
  const [breederList, setKoiData] = useState<KoiBreeder[]>([
    {
      id: '1',
      koiFarmName: 'Yamamoto Koi Farm',
      koiFarmLocation: 'Osaka, Japan',
      breeder: 'Yamamoto Taro',
      koiFarmDescription:
        'Specializing in high-quality Showa and Kohaku varieties, renowned for their vibrant colors and patterns.',
      koiFarmImage:
        'https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/image%2021.png?alt=media&token=8612057d-ecc4-4487-86fb-d8f508a164e2',
      status: 'Pending'
    },
    {
      id: '2',
      koiFarmName: 'Nishikigoi Farm',
      koiFarmLocation: 'Kyoto, Japan',
      breeder: 'Nishikigoi Ken',
      koiFarmDescription: 'Famous for breeding champion-grade Koi, offering a wide variety of species.',
      koiFarmImage:
        'https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/image%2022.png?alt=media&token=9b64eac2-1f6a-4acf-8098-fd51e884a3a0',
      status: 'Pending'
    },
    {
      id: '3',
      koiFarmName: 'Miyazaki Koi Farm',
      koiFarmLocation: 'Hiroshima, Japan',
      breeder: 'Miyazaki Hiroshi',
      koiFarmDescription:
        'Known for their unique Ogon and Asagi varieties, with meticulous care and breeding practices.',
      koiFarmImage:
        'https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/image%2021.png?alt=media&token=8612057d-ecc4-4487-86fb-d8f508a164e2',
      status: 'Denied'
    },
    {
      id: '4',
      koiFarmName: 'Aoki Koi',
      koiFarmLocation: 'Tokyo, Japan',
      breeder: 'Aoki Kazu',
      koiFarmDescription: 'A prestigious farm focusing on high-quality Utsuri and Shiro Utsuri breeds.',
      koiFarmImage:
        'https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/image%2022.png?alt=media&token=9b64eac2-1f6a-4acf-8098-fd51e884a3a0',
      status: 'Approved'
    },
    {
      id: '5',
      koiFarmName: 'Sakai Koi Farm',
      koiFarmLocation: 'Okayama, Japan',
      breeder: 'Sakai Shinji',
      koiFarmDescription:
        'World-renowned for their exceptional Koi breeding techniques, offering a variety of stunning Koi.',
      koiFarmImage:
        'https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/image%2021.png?alt=media&token=8612057d-ecc4-4487-86fb-d8f508a164e2',
      status: 'Approved'
    }
  ])
  const [isLoading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')

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

  const [searchFarmName, setSearchFarmName] = useState('')
  const [searchBreederName, setSearchBreederName] = useState('')

  const filteredKoiList = breederList.filter(
    (breeder) =>
      (!searchFarmName || breeder.koiFarmName.toLowerCase().includes(searchFarmName.toLowerCase())) &&
      (!searchBreederName || breeder.breeder.toLowerCase().includes(searchBreederName.toLowerCase())) &&
      (!statusFilter || breeder.status === statusFilter)
  )

  const [currentPage, setCurrentPage] = useState<number>(1)
  const breederPerPage = 4
  const totalPages = Math.ceil(filteredKoiList.length / breederPerPage)

  const indexOfLastKoi = currentPage * breederPerPage
  const indexOfFirstKoi = indexOfLastKoi - breederPerPage
  const currentKoi = filteredKoiList.slice(indexOfFirstKoi, indexOfLastKoi)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className='min-h-screen bg-bg-admin lg:px-0 px-5'>
      <main className='container mx-auto lg:px-32 md:px-10 pb-28 pt-10 mt-10'>
        <div className='flex flex-col space-y-8'>
          <section className='bg-gray-200 p-6 rounded-lg'>
            <h2 className='text-2xl font-semibold mb-4'>Search All Koi Breeder Request</h2>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <input
                type='text'
                placeholder='Search by Farm Name'
                value={searchFarmName}
                onChange={(e) => setSearchFarmName(e.target.value)}
                className='w-full px-3 py-2 rounded border border-gray-300'
              />
              <input
                type='text'
                placeholder='Search by Breeder Name'
                value={searchBreederName}
                onChange={(e) => setSearchBreederName(e.target.value)}
                className='w-full px-3 py-2 rounded border border-gray-300'
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
              <p>Loading...</p>
            ) : (
              <section className='grid gap-10'>
                {currentKoi.length > 0 ? (
                  currentKoi.map((breeder) => (
                    <div key={breeder.id} className='border rounded-lg overflow-hidden shadow-md flex p-5'>
                      <img
                        src={breeder.koiFarmImage}
                        alt={`${breeder.koiFarmName} Koi fish`}
                        className='w-2/5 h-auto object-cover'
                      />
                      <div className='p-4 space-y-2 flex-1'>
                        <h3 className='text-xl font-bold text-red'>Farm Name: {breeder.koiFarmName}</h3>
                        <p className='text-base text-black'>Farm Location: {breeder.koiFarmLocation}</p>
                        <p className='text-base text-black'>Koi Breeder: {breeder.breeder}</p>
                        <p className='text-base text-black'>Description: {breeder.koiFarmDescription}</p>
                        <div className='flex justify-end'>
                          <Link to={`/staff/koibreeder-request-detail/${breeder.id}`}>
                            <button className='mt-2 bg-red text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 mr-7'>
                              View
                            </button>
                          </Link>
                          {breeder.status === 'Pending' ? (
                            <button
                              className='mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300'
                              disabled
                            >
                              Pending
                            </button>
                          ) : breeder.status === 'Denied' ? (
                            <button
                              className='mt-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300'
                              disabled
                            >
                              Denied
                            </button>
                          ) : breeder.status === 'Approved' ? (
                            <button
                              className='mt-2 bg-green-700 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300'
                              disabled
                            >
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

export default StaffKoiBreederRequest
