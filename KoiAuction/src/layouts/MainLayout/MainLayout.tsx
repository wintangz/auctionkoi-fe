import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import CustomerHeader from '../../components/CustomerHeader/CustomerHeader'
import KoiBreederHeader from '../../components/KoiBreederHeader/KoiBreederHeader' // Import KoiBreederHeader

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  const role = localStorage.getItem('roles') || ''

  const isCustomer = role === 'CUSTOMER'
  const isKoiBreeder = role === 'KOIBREEDER'

  return (
    <div>
      {isCustomer ? <CustomerHeader /> : isKoiBreeder ? <KoiBreederHeader /> : <Header />}
      {children}
      <Footer />
    </div>
  )
}
