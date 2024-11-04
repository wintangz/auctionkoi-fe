import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import path from '../constants/path'

export function usePageTitle() {
  const location = useLocation()

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
      [path.admin]: 'Auction - Admin',
      [path.accountManagement]: 'Account Management - Admin',
      [path.transactionManagement]: 'Transaction Management - Admin',
      [path.auctionRequest]: 'Auction Request - Staff',
      [path.auctionRequestDetail]: 'Auction Request Detail - Staff',
      [path.koibreederRequest]: 'Koi Breeder Request - Staff'
    }

    const title = pathToTitleMap[location.pathname] || 'KoiAuction'
    document.title = title
  }, [location])
}
