import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import path from '../constants/path'

export function usePageTitle() {
  const location = useLocation()
  const { id } = useParams()

  useEffect(() => {
    const pathToTitleMap: { [key: string]: string } = {
      [path.home]: 'Home - KoiAuction',
      [path.login]: 'Login - KoiAuction',
      [path.register]: 'Register - KoiAuction',
      [path.auction]: 'Auction - KoiAuction',
      [path.blogs]: 'Blogs - KoiAuction',
      [path.about]: 'About - KoiAuction',
      [path.farms]: 'Farms - KoiAuction',
      [path.policy]: 'Policy - KoiAuction',
      [path.profile]: 'Profile - KoiAuction',
      [path.auctionHistory]: 'Auction History - KoiAuction',
      [path.createAuction]: 'Create Auction - KoiAuction',
      [path.method1]: 'Fixed Price Sale - KoiAuction',
      [path.method2]: 'Sealed Bid Auction - KoiAuction',
      [path.method3]: 'Ascending Bid Auction - KoiAuction',
      [path.method4]: 'Descending Bid Auction - KoiAuction',
      [path.admin]: 'Auction - Admin',
      [path.accountManagement]: 'Account Management - Admin',
      [path.transactionManagement]: 'Transaction Management - Admin',
      [path.auctionRequest]: 'Auction Request - Staff',
      [path.koibreederRequest]: 'Koi Breeder Request - Staff'
    }

    const dynamicPathPatterns = [
      { pattern: /^\/staff\/auction-request-detail\/\d+$/, title: 'Auction Request Detail - Staff' },
      { pattern: /^\/staff\/koibreeder-request-detail\/\d+$/, title: 'Koi Breeder Request Detail - Staff' }
    ]

    let title = pathToTitleMap[location.pathname] || 'KoiAuction'

    dynamicPathPatterns.forEach(({ pattern, title: dynamicTitle }) => {
      if (pattern.test(location.pathname)) {
        title = dynamicTitle
      }
    })

    document.title = title
  }, [location, id])
}
