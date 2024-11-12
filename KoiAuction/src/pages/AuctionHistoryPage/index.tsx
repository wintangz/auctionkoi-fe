import React, { useEffect, useState } from 'react'
import KoiCard from '../../components/KoiCard'
import './index.scss'
import TabNavigation from '../../components/TagNavigation'
import Pagination from '../../components/Pagination/Pagination'
import { KoiData } from '../../types/KoiData.type'
import http from '../../utils/http'

const HistoryAuction: React.FC = () => {
  const [koiData, setKoiData] = useState<KoiData[]>([])

  const [activeItem, setActiveItem] = useState('auctionHistory')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 4
  const totalPages = Math.ceil(koiData.length / itemsPerPage)
  const [selectedSex, setSelectedSex] = useState<string>('')
  const [selectedVariety, setSelectedVariety] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchKoiData = async () => {
      try {
        // Axios request to get koi data from the API
        const response = await http.get<{ message: string; value: KoiData[] }>('Bid/user/past-auctions')

        // Check if the request was successful (status 200)
        if (response.status === 200) {
          const data = response.data

          // Map through the value array from the response
          const formattedData = data.value.map((item: KoiData) => ({
            id: item.id,
            imageUrl: item.imageUrl,
            name: item.name,
            location: item.location,
            sex: item.sex, // Example of how to format sex
            reservePrice: item.reservePrice,
            age: item.age,
            variety: item.variety.toString(),
            endTime: item.endTime,
            auctionStatus: item.auctionStatus.toString(), // Convert status code to string if necessary
            contact: item.contact
          }))

          setKoiData(formattedData)
        } else {
          // Handle non-200 status code
          throw new Error('Failed to fetch koi data')
        }
      } catch (err: any) {
        // Handle errors (e.g., network or status code errors)
        setError(err.message)
      } finally {
        // Set loading to false once the request is complete
        setLoading(false)
      }
    }

    fetchKoiData()
  }, [])

  const handleItemClick = (item: string) => {
    setActiveItem(item)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }
  const [searchTerm, setSearchTerm] = useState<string>('')
  const filteredKois = koiData.filter((koi) => {
    const matchesName = koi.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSex = selectedSex ? koi.sex.toLowerCase() === selectedSex.toLowerCase() : true
    const matchesVariety = selectedVariety ? koi.variety.toLowerCase() === selectedVariety.toLowerCase() : true
    return matchesName && matchesSex && matchesVariety
  })
  // const sortedKois = filteredKois.sort((a, b) => {
  //   if (sortOrder === 'oldest') {
  //     return new Date(a.bidTime).getTime() - new Date(b.bidTime).getTime()
  //   }
  //   return new Date(b.bidTime).getTime() - new Date(a.bidTime).getTime() // Mặc định là sắp xếp mới nhất trước
  // })

  // Tính toán chỉ số bắt đầu và kết thúc
  const indexOfLastKoi = currentPage * itemsPerPage
  const indexOfFirstKoi = indexOfLastKoi - itemsPerPage
  const currentKois = filteredKois.slice(indexOfFirstKoi, indexOfLastKoi)
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='history'>
      <div className='content-container'>
        <TabNavigation activeItem={activeItem} handleItemClick={handleItemClick} />
        <div className='search-section'>
          <input
            type='text'
            placeholder='Search by name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select aria-label='Search by sex' value={selectedSex} onChange={(e) => setSelectedSex(e.target.value)}>
            <option value=''>Search by sex</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          <select
            aria-label='Search by variety'
            value={selectedVariety}
            onChange={(e) => setSelectedVariety(e.target.value)}
          >
            <option value=''>Search by variety</option>
            <option value='doitsu'>Doitsu</option>
            <option value='Kohaku'>Kohaku</option>
          </select>
          <select aria-label='Sort by recent' value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value=''>Recent</option>
            <option value='oldest'>Oldest</option>
          </select>
        </div>
        <div id='card-container'>
          {currentKois.map((koi, index) => (
            <KoiCard koi={koi} key={index} />
          ))}
        </div>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}

export default HistoryAuction
