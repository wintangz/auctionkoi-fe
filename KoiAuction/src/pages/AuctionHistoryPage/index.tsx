import React, { useState } from 'react'
import KoiCard from '../../components/KoiCard'
import './index.scss'
import TabNavigation from '../../components/TagNavigation'
import Pagination from '../../components/Pagination/Pagination'

const koiData = [
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FKoiFishAuction.png?alt=media&token=6389f149-aea2-4b57-9411-70fd4a3fd32b',
    name: 'Asagi',
    code: '#Koi2412',
    sex: 'Male',
    reservePrice: 150000,
    age: 12,
    variety: 'Doitsu',
    bidTime: 'September 10, 2024 6:04 pm',
    status: 'Payment successfully',
    deliveryStatus: 'On-Going'
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FKoiFishAuction.png?alt=media&token=6389f149-aea2-4b57-9411-70fd4a3fd32b',
    name: 'Sanke',
    code: '#Koi2413',
    sex: 'Female',
    reservePrice: 200000,
    age: 10,
    variety: 'Kohaku',
    bidTime: 'September 12, 2024 5:00 pm',
    status: 'Payment successfully',
    deliveryStatus: 'Finished'
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FKoiFishAuction.png?alt=media&token=6389f149-aea2-4b57-9411-70fd4a3fd32b',
    name: 'Showa',
    code: '#Koi2414',
    sex: 'Male',
    reservePrice: 180000,
    age: 8,
    variety: 'Showa',
    bidTime: 'September 15, 2024 4:30 pm',
    status: 'Payment successfully',
    deliveryStatus: 'On-Going'
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FKoiFishAuction.png?alt=media&token=6389f149-aea2-4b57-9411-70fd4a3fd32b',
    name: 'Kohaku',
    code: '#Koi2415',
    sex: 'Female',
    reservePrice: 220000,
    age: 11,
    variety: 'Kohaku',
    bidTime: 'September 20, 2024 3:00 pm',
    status: 'Payment successfully',
    deliveryStatus: 'Finished'
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FKoiFishAuction.png?alt=media&token=6389f149-aea2-4b57-9411-70fd4a3fd32b',
    name: 'Utsuri',
    code: '#Koi2416',
    sex: 'Male',
    reservePrice: 250000,
    age: 9,
    variety: 'Utsuri',
    bidTime: 'September 22, 2024 2:00 pm',
    status: 'Payment successfully',
    deliveryStatus: 'On-Going'
  }
]

const HistoryAuction: React.FC = () => {
  const [activeItem, setActiveItem] = useState('auctionHistory')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 4 // Số lượng card mỗi trang
  const totalPages = Math.ceil(koiData.length / itemsPerPage) // Tổng số trang
  const [selectedSex, setSelectedSex] = useState<string>('') // Trạng thái cho giới tính
  const [selectedVariety, setSelectedVariety] = useState<string>('') // Trạng thái cho giống
  const [sortOrder, setSortOrder] = useState<string>('') // Trạng thái cho sắp xếp

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
  const sortedKois = filteredKois.sort((a, b) => {
    if (sortOrder === 'oldest') {
      return new Date(a.bidTime).getTime() - new Date(b.bidTime).getTime()
    }
    return new Date(b.bidTime).getTime() - new Date(a.bidTime).getTime() // Mặc định là sắp xếp mới nhất trước
  })

  // Tính toán chỉ số bắt đầu và kết thúc
  const indexOfLastKoi = currentPage * itemsPerPage
  const indexOfFirstKoi = indexOfLastKoi - itemsPerPage
  const currentKois = filteredKois.slice(indexOfFirstKoi, indexOfLastKoi)

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
