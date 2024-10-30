import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import CustomerHeader from '../../components/CustomerHeader/CustomerHeader'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  const { role } = useContext(AppContext)

  const isCustomer = role === 'CUSTOMER'

  return (
    <div>
      {isCustomer ? <CustomerHeader /> : <Header />}
      {children}
      <Footer />
    </div>
  )
}
