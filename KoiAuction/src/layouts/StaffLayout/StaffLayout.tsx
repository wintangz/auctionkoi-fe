import Footer from '../../components/Footer/Footer'
import StaffHeader from '../../components/StaffHeader/StaffHeader'

interface Props {
  children?: React.ReactNode
}

export default function StaffLayout({ children }: Props) {
  return (
    <div>
      <StaffHeader />
      {children}
      <Footer />
    </div>
  )
}
