import { Link, useLocation } from 'react-router-dom'
import './PaymentSuccess.scss'
import { CheckCircleOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import http from '../../utils/http'
import { toast } from 'react-toastify'

function PaymentSuccessPage() {
  const location = useLocation()

  useEffect(() => {
    // Trích xuất các tham số từ URL
    const searchParams = new URLSearchParams(location.search)
    const userID = searchParams.get('userID')
    const amount = searchParams.get('amount')
    const status = searchParams.get('status')

    // Kiểm tra nếu các tham số cần thiết có mặt
    if (userID && amount && status) {
      const fetchTransactionResult = async () => {
        try {
          const response = await http.get('Transaction/result', {
            params: { userID, amount, status }
          })
          console.log('Transaction result:', response.data)
        } catch (error) {
          console.error('Error fetching transaction result:', error)
          toast.error('Failed to retrieve transaction result')
        }
      }

      // Gọi API sau khi trang đã render
      fetchTransactionResult()
    }
  }, [location.search])

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
