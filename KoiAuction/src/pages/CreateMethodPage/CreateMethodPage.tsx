import './CreateMethodPage.scss'
import AuctionMethodCard from '../../components/AuctionMethodCard/AuctionMethodCard'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import http from '../../utils/http'

type AuctionMethodType = {
  id: string
  methodTitle: string
  description: string
  imageUrl: string
  route: string
}
function CreateMethodPage() {
  const logoRef = useRef<HTMLImageElement | null>(null)
  const navigate = useNavigate()
  const [auctionMethods, setAuctionMethods] = useState<AuctionMethodType[]>([])

  const fetchMethodData = async () => {
    try {
      const response = await http.get<{ message: string; value: AuctionMethodType[] }>('AuctionMethod')
      const methodsWithRoutes = response.data.value.map((method, index) => ({
        ...method,
        route: `/method${index + 1}`
      }))

      setAuctionMethods(methodsWithRoutes)
    } catch (error) {
      console.error('Error fetching auction methods:', error)
    }
  }

  useEffect(() => {
    fetchMethodData()
  }, [])
  return (
    <div className='cm-page'>
      <img ref={logoRef} className='logo' src='https://i.imgur.com/abwtsRC.png' alt='logo' />
      <div className='banner'>
        <img src='https://i.imgur.com/wWN0fVX.png' alt='banner' />
      </div>
      <div className='auction-card-container'>
        {auctionMethods.map((method, index) => (
          <AuctionMethodCard
            id={method.id}
            key={index}
            methodTitle={method.methodTitle}
            description={method.description}
            imageUrl='https://img.freepik.com/premium-vector/poster-template-with-koi-fish-concept-watercolor-style_75071-1972.jpg'
            route={method.route}
            onClick={() => navigate(method.route, { state: { description: method.description } })}
          />
        ))}
      </div>
    </div>
  )
}

export default CreateMethodPage
