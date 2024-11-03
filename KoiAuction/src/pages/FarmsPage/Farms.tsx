import React, { useEffect, useState } from 'react'
import './FarmPage.scss'
import FarmCard from '../../components/FarmCard'
import Pagination from '../../components/Pagination/Pagination'
import http from '../../utils/http'
import { FarmDataType } from '../../types/FarmDataType'

const FarmPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const farmsPerPage = 2
  const [farmData, setFarmData] = useState<FarmDataType[]>([])

  const fetchFarmData = async () => {
    try {
      const response = await http.get<{ message: string; value: FarmDataType[] }>('KoiBreeder/get-all-breeders')
      setFarmData(response.data.value || [])
    } catch (error) {
      console.error('Error fetching farm data:', error)
      setFarmData([])
    }
  }

  useEffect(() => {
    fetchFarmData()
  }, [])

  const indexOfLastFarm = currentPage * farmsPerPage
  const indexOfFirstFarm = indexOfLastFarm - farmsPerPage
  const currentFarms = farmData.slice(indexOfFirstFarm, indexOfLastFarm)

  const totalPages = Math.ceil((farmData.length || 0) / farmsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
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
              key={index}
              title={farm.title}
              breeder={farm.breederName}
              description={farm.koiFarmDescription}
              location={farm.koiFarmLocation}
              image={farm.koiFarmImage}
            />
          ))}
        </section>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}

export default FarmPage
