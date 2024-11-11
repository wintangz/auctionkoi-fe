import accountImg from '../../assets/img/account.png'
import changePasswordImg from '../../assets/img/changepassword.png'
import historyImg from '../../assets/img/history.png'
import { useNavigate } from 'react-router-dom'
import './index.scss'
interface TabNavigationProps {
  activeItem: string
  handleItemClick: (item: string) => void
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeItem, handleItemClick }) => {
  const navigate = useNavigate()

  const handleNavigation = (item: string) => {
    handleItemClick(item)
    switch (item) {
      case 'account':
        navigate('/profile')
        break
      case 'changePassword':
        navigate('/change-password')
        break
      case 'auctionHistory':
        navigate('/auction-history')
        break
      default:
        break
    }
  }

  return (
    <div className='tab-navigation'>
      <div
        className={`tab-navigation__item ${activeItem === 'account' ? 'active' : ''}`}
        onClick={() => handleNavigation('account')}
      >
        <i className='tab-navigation__icon'>
          <img width={55} src={accountImg} alt='Account Icon' />
        </i>
        <span>Account</span>
      </div>
      <div
        className={`tab-navigation__item ${activeItem === 'changePassword' ? 'active' : ''}`}
        onClick={() => handleNavigation('changePassword')}
      >
        <i className='tab-navigation__icon'>
          <img width={50} src={changePasswordImg} alt='Change Password Icon' />
        </i>
        <span>Change Password</span>
      </div>
      <div
        className={`tab-navigation__item ${activeItem === 'auctionHistory' ? 'active' : ''}`}
        onClick={() => handleNavigation('auctionHistory')}
      >
        <i className='tab-navigation__icon'>
          <img width={50} src={historyImg} alt='Auction History Icon' />
        </i>
        <span>Auction History</span>
      </div>
    </div>
  )
}

export default TabNavigation
