import Footer from '../../components/Footer/Footer'
import KoiBreaderHeader from '../../components/KoiBreederHeader/KoiBreederHeader'

interface Props {
  children?: React.ReactNode
}

export default function KoiBreederLayout({ children }: Props) {
  return (
    <div>
      <KoiBreaderHeader />
      {children}
      <Footer />
    </div>
  )
}
