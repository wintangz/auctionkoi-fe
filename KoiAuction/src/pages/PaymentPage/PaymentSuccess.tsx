import { Link } from 'react-router-dom'
import './PaymentSuccess.scss'
import { CheckCircleOutlined } from '@ant-design/icons'

function PaymentSuccessPage() {
  return (
    <div className='payment-success-container'>
      <div className='payment-success-card'>
        <CheckCircleOutlined className='success-icon' />
        <h1>Payment succeeded!</h1>
        <p>
          Thank you for processing your most recent payment.
          <br />
          Your premium subscription will expire on June 2, 2024.
        </p>

        <button className='dashboard-button'>
          <Link to='/'>Home</Link>
        </button>
      </div>
    </div>
  )
}

export default PaymentSuccessPage
