import './index.scss'
import accountImg from '../../assets/img/account.png'
import historyImg from '../../assets/img/history.png'
import changePasswordImg from '../../assets/img/changepassword.png'
import { useState } from 'react' // Import useState
import ImageUpload from '../../components/UploadImage'
import { Button, Form, Input, Modal } from 'antd'
import TabNavigation from '../../components/TagNavigation'

function Profile() {
  const [activeItem, setActiveItem] = useState('account')
  const [form] = Form.useForm()

  const handleItemClick = (item: any) => {
    setActiveItem(item)
  }
  // Lưu trữ thông tin người dùng trong state
  const [userInfo, setUserInfo] = useState({
    username: 'Junnie',
    fullName: 'NLHD',
    email: 'Junnie@gmail.com',
    phone: '0123123123',
    address: '221B Baker Street, London'
  })

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    // Set lại giá trị của form với thông tin người dùng hiện tại
    form.setFieldsValue({
      fullName: userInfo.fullName,
      phone: userInfo.phone,
      address: userInfo.address
    })
    setIsModalVisible(true)
  }

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Cập nhật thông tin người dùng
        setUserInfo((prev) => ({
          ...prev,
          fullName: values.fullName,
          phone: values.phone,
          address: values.address
        }))
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
          {/* Hiển thị đầy đủ thông tin người dùng */}
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

          {/* Nút chỉnh sửa */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '80%' }}>
            <Button type='primary' danger onClick={showModal}>
              Edit Profile
            </Button>
          </div>

          {/* Modal để chỉnh sửa chỉ 3 thông tin FullName, Phone, Address */}
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
