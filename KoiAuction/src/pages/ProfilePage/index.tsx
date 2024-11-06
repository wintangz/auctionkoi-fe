import './index.scss'
import { useEffect, useState } from 'react' // Import useState
import ImageUpload from '../../components/UploadImage'
import { Button, Form, Input, Modal } from 'antd'
import TabNavigation from '../../components/TagNavigation'
import { User } from '../../types/User.type'
import http from '../../utils/http'

function Profile() {
  const [activeItem, setActiveItem] = useState('account')
  const [form] = Form.useForm()

  const handleItemClick = (item: any) => {
    setActiveItem(item)
  }
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const fetchFarmData = async () => {
    try {
      setLoading(true)
      const response = await http.get<{ message: string; value: User }>('User/get-current-user')
      setUserInfo(response.data.value || null)
    } catch (error) {
      console.error('Error fetching farm data:', error)
      setUserInfo(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFarmData()
  }, [])
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    if (userInfo) {
      form.setFieldsValue({
        fullName: userInfo.fullName,
        phone: userInfo.phone,
        address: userInfo.address
      })
      setIsModalVisible(true)
    }
  }

  if (loading || !userInfo) {
    return <div>Loading...</div>
  }

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setUserInfo((prev) =>
          prev
            ? {
                ...prev,
                fullName: values.fullName,
                phone: values.phone,
                address: values.address
              }
            : null
        )
        setIsModalVisible(false)
      })
      .catch((info) => {
        console.log('Validation Failed:', info)
      })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className='profile'>
      <div className='profile__top'>
        <TabNavigation activeItem={activeItem} handleItemClick={handleItemClick} />
      </div>
      <div className='profile__bottom'>
        <div className='profile__bottom__img'>
          <ImageUpload />
        </div>
        <div className='profile__bottom__info'>
          <div className='info-item'>
            <span>Username:</span> <span>{userInfo.username}</span>
          </div>
          <div className='info-item'>
            <span>Full Name:</span> <span>{userInfo.fullName}</span>
          </div>
          <div className='info-item'>
            <span>Email:</span> <span>{userInfo.email}</span>
          </div>
          <div className='info-item'>
            <span>Phone:</span> <span>{userInfo.phone}</span>
          </div>
          <div className='info-item'>
            <span>Address:</span> <span>{userInfo.address}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '80%' }}>
            <Button type='primary' danger onClick={showModal}>
              Edit Profile
            </Button>
          </div>

          <Modal title='Edit Profile' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} layout='vertical' name='editProfileForm'>
              <Form.Item
                label='Full Name'
                name='fullName'
                rules={[{ required: true, message: 'Please input your full name!' }]}
              >
                <Input placeholder='Enter your full name' />
              </Form.Item>

              <Form.Item
                label='Phone'
                name='phone'
                rules={[
                  { required: true, message: 'Please input your phone number!' },
                  { pattern: /^[0-9]{10}$/, message: 'Phone number must be 10 digits!' }
                ]}
              >
                <Input placeholder='Enter your phone number' />
              </Form.Item>

              <Form.Item
                label='Address'
                name='address'
                rules={[{ required: true, message: 'Please input your address!' }]}
              >
                <Input placeholder='Enter your address' />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default Profile
