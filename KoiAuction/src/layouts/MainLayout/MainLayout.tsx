import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import CustomerHeader from '../../components/CustomerHeader/CustomerHeader'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  const role = localStorage.getItem('roles') || ''

  const isCustomer = role === 'CUSTOMER'

  return (
    <div>
      {isCustomer ? <CustomerHeader /> : <Header />}
      {children}
      <Footer />
    </div>
  )
}
