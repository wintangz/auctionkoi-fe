import { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts'
import axios from 'axios'
import { Percentage } from '../../../types/Percentage.type'
import { Revenue } from '../../../types/Revenue.type'

ChartJS.register(ArcElement, Tooltip, Legend)

const AdminHome = () => {
  const [auctionStats, setAuctionStats] = useState<Percentage[]>([])
  const [financialData, setFinancialData] = useState<Revenue>()
  const [loading, setLoading] = useState<boolean>(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>('')

  const [selectedMonth, setSelectedMonth] = useState<number>(5)
  const [selectedYear, setSelectedYear] = useState<number>(2023)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError('')

      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setError('No token found')
          return
        }

        const auctionStatsResponse = await axios.get(
          `https://koiauctionwebapp.azurewebsites.net/api/AuctionMethod/percentage-users?year=${selectedYear}&month=${selectedMonth}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        setAuctionStats(auctionStatsResponse.data.value)

        const financialDataResponse = await axios.get(
          `https://koiauctionwebapp.azurewebsites.net/api/AuctionMethod/revenue/${selectedYear}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        setFinancialData(financialDataResponse.data.value)
      } catch (err) {
        setError('Error fetching data. Please try again later.')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedMonth, selectedYear])

  const doughnutChartData = {
    labels: auctionStats.map((stat) => stat.auctionMethodName),
    datasets: [
      {
        data: auctionStats.map((stat) => stat.percentage),
        backgroundColor: ['#FF4960', '#EDEF78', '#717DCC', '#5EE073'],
        hoverBackgroundColor: ['#FF4960', '#EDEF78', '#717DCC', '#5EE073']
      }
    ]
  }

  const barChartData =
    financialData?.monthlyRevenueList.map((item) => ({
      month: item.month,
      value: item.revenue
    })) || []

  return (
    <div className='min-h-screen bg-bg-admin lg:px-0 px-5'>
      <main className='container mx-auto lg:px-32 md:px-10 pb-28 pt-10 mt-10'>
        <div className='flex flex-col space-y-8'>
          {/* Auction Statistics */}
          <div className='bg-white shadow-lg rounded-lg p-10'>
            <div className='flex flex-col md:flex-row justify-between items-center mb-6'>
              <h1 className='text-lg md:text-2xl font-bold text-red mb-4 md:mb-0'>AUCTION STATISTIC</h1>
              <div className='flex space-x-2'>
                <select
                  value={selectedMonth} // Bind selected month to state
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className='text-blue border rounded border-red px-2 py-1'
                >
                  <option value='1'>January</option>
                  <option value='2'>February</option>
                  <option value='3'>March</option>
                  <option value='4'>April</option>
                  <option value='5'>May</option>
                  <option value='6'>June</option>
                  <option value='7'>July</option>
                  <option value='8'>August</option>
                  <option value='9'>September</option>
                  <option value='10'>October</option>
                  <option value='11'>November</option>
                  <option value='12'>December</option>
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className='text-blue border rounded px-2 py-1 border-red'
                >
                  <option value='2023'>2023</option>
                  <option value='2024'>2024</option>
                  <option value='2025'>2025</option>
                </select>
              </div>
            </div>

            <div className='flex flex-col sm-md:flex-row justify-between'>
              <div className='w-full sm-md:w-1/2 sm-md:h-80 md:h-80 lg:h-auto relative lg:p-16 lg:ml-10 ml-0 p-2'>
                {loading ? (
                  <p className='text-red text-base'>Loading...</p>
                ) : (
                  <Doughnut
                    data={doughnutChartData}
                    options={{ responsive: true, maintainAspectRatio: false, cutout: '70%' }}
                  />
                )}
              </div>
              <div className='w-full sm-md:w-1/3 pt-4 sm-md:pt-20'>
                {auctionStats.map((stat, index) => (
                  <div key={index} className='flex items-center mb-4 border border-blue rounded-lg p-4'>
                    <div
                      className='w-4 h-4 mr-2 rounded-full'
                      style={{ backgroundColor: ['#FF4960', '#EDEF78', '#717DCC', '#5EE073'][index] }}
                    ></div>
                    <div className='flex-grow'>
                      <span className='font-bold'>{stat.auctionMethodName}</span>
                      <span className='block'>
                        Number of Users: {stat.numberUsers} - {stat.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='bg-white shadow-lg rounded-lg p-10'>
            <div className='flex flex-col md:flex-row justify-between items-center mb-20'>
              <div className='mb-4 md:mb-0'>
                <h2 className='text-2xl font-bold text-red'>FINANCIAL OVERVIEW</h2>
              </div>
              <div className='flex space-x-2'>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className='text-blue border rounded px-2 py-1 border-red'
                >
                  <option value='2023'>2023</option>
                  <option value='2024'>2024</option>
                  <option value='2025'>2025</option>
                </select>
              </div>
            </div>

            <div className='w-full mx-auto rounded-lg'>
              <ResponsiveContainer width='100%' height={400}>
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray='3 3' vertical={false} />
                  <XAxis dataKey='month' axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#888', fontSize: 12 }}
                    tickFormatter={(value) => `${value.toLocaleString()} $`}
                  />
                  <Bar dataKey='value' fill='#4C0099' radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminHome
