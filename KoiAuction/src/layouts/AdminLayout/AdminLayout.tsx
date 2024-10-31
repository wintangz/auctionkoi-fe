import Footer from '../../components/Footer/Footer'
import AdminHeader from '../../components/AdminHeader/AdminHeader'

interface Props {
  children?: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
  return (
    <div>
      <AdminHeader />
      {children}
      <Footer />
    </div>
  )
}
