import React, { useState } from 'react'
import './FarmPage.scss'
import FarmCard from '../../components/FarmCard'
import Pagination from '../../components/Pagination/Pagination'

const farmData = [
  {
    title: 'Akashi Koi Farm',
    breeder: 'Hitoshi Kameki',
    description:
      'Japanese Koi Buying Trip 2020. This year we heard that there might be a shortage of small koi available, so we made the decision to...',
    location: 'Saitama, ABC Street Tokyo',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdPGDWHyeeuW36Ra8JvIUzkYwPWIaOILx9vg&s'
  },
  {
    title: 'Yagenji Koi Farm',
    breeder: 'Junine',
    description:
      'Japanese Koi Buying Trip 2020. This year we heard that there might be a shortage of small koi available, so we made the decision to...',
    location: 'Yagenji, BCD Street Kyoto',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh80DJ7KMdstIO4oSEbS8IuweohBkEKEXa3Q&s'
  },
  {
    title: 'Yagenji Koi Farm',
    breeder: 'Junine',
    description:
      'Japanese Koi Buying Trip 2020. This year we heard that there might be a shortage of small koi available, so we made the decision to...',
    location: 'Yagenji, BCD Street Kyoto',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh80DJ7KMdstIO4oSEbS8IuweohBkEKEXa3Q&s'
  }
]

const FarmPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const farmsPerPage = 2 // Số lượng farm card mỗi trang

  // Tính toán chỉ số bắt đầu và kết thúc
  const indexOfLastFarm = currentPage * farmsPerPage
  const indexOfFirstFarm = indexOfLastFarm - farmsPerPage
  const currentFarms = farmData.slice(indexOfFirstFarm, indexOfLastFarm) // Lấy farm card hiện tại

  const totalPages = Math.ceil(farmData.length / farmsPerPage) // Tổng số trang

  const handlePageChange = (page: number) => {
    setCurrentPage(page) // Cập nhật trang hiện tại
  }

  return (
    <div className='container'>
      <div className='farm-page'>
        <section className='farm-description'>
          <h1>Farms</h1>
          <p>
            With a deep understanding of genetics, breeding techniques, and water quality management, reputable breeders
            strive to produce koi with the most desirable traits—whether it's vibrant colors, balanced markings, or
            graceful swimming behavior.
          </p>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGWdHh03vkbo2QSki7PewIIGVs093JxxW17Q&s'
            alt='Marusei Koi Farm'
            className='farm-banner'
          />
          <p>
            Breeders from renowned farms in Japan, such as Dainichi, Momotaro, and Sakai, are highly respected for their
            generations of expertise and their contribution to the koi hobby. The koi produced by these breeders are
            often showcased in auctions, where collectors and hobbyists alike bid for a chance to own these magnificent
            living jewels.
          </p>
        </section>

        <section className='farm-search'>
          <h2>Search All Our Farms</h2>
          <div className='search-inputs'>
            <input type='text' placeholder='Search by name' />
            <input type='text' placeholder='Search by name' />
            <input type='text' placeholder='Search by name' />
          </div>
        </section>

        <section className='farm-page-box'>
          {currentFarms.map((farm, index) => (
            <FarmCard
              key={index} // Hoặc dùng farm.title nếu title là duy nhất
              title={farm.title}
              breeder={farm.breeder}
              description={farm.description}
              location={farm.location}
              image={farm.image}
            />
          ))}
        </section>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}

export default FarmPage
