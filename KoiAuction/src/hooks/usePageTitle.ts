import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function usePageTitle() {
  const location = useLocation()

  useEffect(() => {
    const pathToTitleMap: { [key: string]: string } = {
      '/': 'Home - KoiAuction',
      '/login': 'Login - KoiAuction',
      '/register': 'Register - KoiAuction',
      '/auction': 'Auction - KoiAuction',
      '/blogs': 'Blogs - KoiAuction',
      '/about': 'About - KoiAuction',
      '/farms': 'Farms - KoiAuction'
    }

    const title = pathToTitleMap[location.pathname] || 'KoiAuction'
    document.title = title
  }, [location])
}
