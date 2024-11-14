import { Button, Input, Table } from 'antd'
import './TransactionPage.scss'
import { User } from '../../types/User.type'
import { useEffect, useState } from 'react'
import http from '../../utils/http'
import { toast } from 'react-toastify'

const TransactionPage = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const [rechargeAmount, setRechargeAmount] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Lấy thông tin người dùng từ API
    const fetchUserInfo = async () => {
      try {
        setLoading(true)
        const response = await http.get<{ message: string; value: User }>('User/get-current-user')
        setUserInfo(response.data.value || null)
      } catch (error) {
        console.error('Error fetching user data:', error)
        toast.error('Failed to fetch user information')
      } finally {
        setLoading(false)
      }
    }
    fetchUserInfo()
  }, [])

  const handleRecharge = async () => {
    if (rechargeAmount < 10000) {
      toast.error('The amount must be greater than 10,000 VND')
      return
    }

    try {
      const response = await http.post('Transaction/wallet', {
        depositAmount: rechargeAmount
      })

      toast.success(response.data.message)
      window.location.href = response.data.value
    } catch (error) {
      console.error('Error during recharge:', error)
      toast.error('An error occurred during recharge.')
    }
  }

  // Dữ liệu bảng giá trị chuyển đổi
  const dataSource = [
    { key: '1', vnd: 10000, usd: 1000 },
    { key: '2', vnd: 20000, usd: 2000 },
    { key: '3', vnd: 30000, usd: 3000 },
    { key: '4', vnd: 40000, usd: 4000 },
    { key: '5', vnd: 50000, usd: 5000 },
    { key: '6', vnd: 60000, usd: 6000 }
  ]

  const columns = [
    {
      title: 'VND',
      dataIndex: 'vnd',
      key: 'vnd',
      render: (value: number) => `${value.toLocaleString()} VND`
    },
    {
      title: 'Equivalent in USD',
      dataIndex: 'usd',
      key: 'usd',
      render: (value: number) => `$${value.toLocaleString()}`
    }
  ]

  if (loading || !userInfo) {
    return <div>Loading...</div>
  }

  return (
    <div className='transaction-page'>
      {/* Phần bên trái */}
      <div className='transaction-page__left'>
        <div className='user-info'>
          <img src={userInfo.urlAvatar} alt='User Avatar' className='avatar' />
          <h2>{userInfo.fullName}</h2>
          <p>Balance: {userInfo.balance.toLocaleString()} VND</p>
        </div>

        <div className='recharge-section'>
          <Input
            type='number'
            placeholder='Enter amount to recharge'
            value={rechargeAmount}
            onChange={(e) => setRechargeAmount(Number(e.target.value))}
          />
          <Button
            style={{
              width: '50%'
            }}
            type='primary'
            onClick={handleRecharge}
          >
            Recharge
          </Button>
        </div>
      </div>

      {/* Phần bên phải */}
      <div className='transaction-page__right'>
        <h2>Recharge Conversion Rates</h2>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    </div>
  )
}

export default TransactionPage
