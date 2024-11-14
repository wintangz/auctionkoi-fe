import { useEffect } from 'react'
import './PaymentCancel.scss'
import { CloseCircleOutlined } from '@ant-design/icons'
import confetti from 'canvas-confetti'
import { Link } from 'react-router-dom'

function PaymentCancelPage() {
  useEffect(() => {
    // Kích hoạt hiệu ứng confetti màu xám khi trang tải
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      confetti({
        particleCount: 5,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        },
        colors: ['#d3d3d3', '#808080', '#a9a9a9'] // Màu xám cho hiệu ứng hủy
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='payment-cancel-container'>
      <div className='payment-cancel-card'>
        <CloseCircleOutlined className='cancel-icon' />
        <h1>Payment Cancelled</h1>
        <p>
          Your payment has been cancelled.
          <br />
          If you have any questions, please contact support.
        </p>
        <button className='dashboard-button'>
          <Link to='/'>Go to Home</Link>
        </button>
      </div>
    </div>
  )
}

export default PaymentCancelPage
