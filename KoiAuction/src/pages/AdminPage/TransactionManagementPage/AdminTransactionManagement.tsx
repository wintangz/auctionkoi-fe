import { useState, useEffect } from 'react'
import axios from 'axios'
import { Transaction } from '../../../types/Transaction.type'

export default function AdminTransactionManagement() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      setError('')

      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('https://koiauctionwebapp.azurewebsites.net/api/Transaction/Transactions', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setTransactions(response.data.value)
      } catch (error) {
        console.error('Error fetching transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  const filteredTransactions = transactions.filter((transaction) =>
    Object.values(transaction).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className='min-h-screen bg-bg-admin pb-32 lg:px-0 px-5'>
      <div className='container mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg lg:p-16'>
        <div>
          <div className='flex flex-col lg:flex-row justify-between items-center mb-6'>
            <h1 className='text-2xl font-bold text-red lg:mb-0 mb-10'>TRANSACTION MANAGEMENT</h1>
            <div className='w-full lg:w-auto'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Tìm kiếm...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full lg:w-64 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
                <svg
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                </svg>
              </div>
            </div>
          </div>

          {loading ? (
            <p className='text-base text-red'>Loading transactions...</p>
          ) : error ? (
            <p className='text-red-600'>{error}</p>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-blue uppercase tracking-wider'
                    >
                      Id
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-blue uppercase tracking-wider'
                    >
                      Date
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-blue uppercase tracking-wider'
                    >
                      PaymentMethod
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-blue uppercase tracking-wider'
                    >
                      CommissionRate
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-blue uppercase tracking-wider'
                    >
                      CommissionAmount
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-blue uppercase tracking-wider'
                    >
                      BidMethod
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-blue uppercase tracking-wider'
                    >
                      KoiName
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-blue uppercase tracking-wider'
                    >
                      BidderEmail
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-blue uppercase tracking-wider'
                    >
                      BidAmount
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-blue uppercase tracking-wider'
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {filteredTransactions.map((transaction, index) => (
                    <tr key={transaction.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {transaction.id}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm'>{transaction.transactionDate}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm'>{transaction.paymentMethod}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {transaction.commissionRate}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {transaction.commissionAmount} $
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{transaction.bidMethod}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{transaction.koiName}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{transaction.bidderEmail}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{transaction.bidAmount} $</td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.status === 'Payment failed'
                              ? 'bg-red text-white'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
