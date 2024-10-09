import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const koiList = [
    {
      id: 1,
      name: 'Asagi',
      code: '#Koi2412',
      sex: 'Male',
      reservePrice: '150,000 $',
      age: 12,
      variety: 'Doitsu',
      timeLeft: '8h 30m 15s',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FKoiFishAuction.png?alt=media&token=6389f149-aea2-4b57-9411-70fd4a3fd32b'
    },
    {
      id: 2,
      name: 'Kohaku',
      code: '#Koi5234',
      sex: 'Female',
      reservePrice: '200,000 $',
      age: 9,
      variety: 'Kohaku',
      timeLeft: '5h 12m 45s',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FKoiFishAuction.png?alt=media&token=6389f149-aea2-4b57-9411-70fd4a3fd32b'
    },
    {
      id: 3,
      name: 'Showa',
      code: '#Koi1211',
      sex: 'Male',
      reservePrice: '180,000 $',
      age: 10,
      variety: 'Showa',
      timeLeft: '12h 20m 00s',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FKoiFishAuction.png?alt=media&token=6389f149-aea2-4b57-9411-70fd4a3fd32b'
    },
    {
      id: 4,
      name: 'Showa',
      code: '#Koi1211',
      sex: 'Male',
      reservePrice: '180,000 $',
      age: 10,
      variety: 'Showa',
      timeLeft: '12h 20m 00s',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FKoiFishAuction.png?alt=media&token=6389f149-aea2-4b57-9411-70fd4a3fd32b'
    }
  ]

  const [searchName, setSearchName] = useState('')
  const [searchSex, setSearchSex] = useState('')
  const [searchVariety, setSearchVariety] = useState('')

  // Filtered koi list based on search input
  const filteredKoiList = koiList.filter(
    (koi) =>
      (!searchName || koi.name.toLowerCase().includes(searchName.toLowerCase())) &&
      (!searchSex || koi.sex.toLowerCase() === searchSex.toLowerCase()) &&
      (!searchVariety || koi.variety.toLowerCase() === searchVariety.toLowerCase())
  )

  return (
    <div className='min-h-screen bg-white flex flex-col justify-between'>
      <main className='container mx-auto px-10 lg:px-14 py-8 space-y-12'>
        <section className='flex flex-col md:flex-row items-center justify-between lg:m-10 lg:mb-40 sm-md:mb-20'>
          <div className='md:w-1/2 mb-8 md:mb-0'>
            <h1 className='text-4xl font-bold mb-4'>KOI AUCTION</h1>
            <p className='text-gray-600 mb-6 max-w-md'>
              An online platform designed to facilitate the buying and selling of Koi fish through live auctions. It
              serves as a marketplace for Koi enthusiasts, breeders, and collectors to find, bid on, and purchase
              high-quality Koi fish.
            </p>
            <Link to='/sign-up'>
              <button className='bg-red text-white px-6 py-2 rounded hover:bg-white hover:text-red border border-red-600 transition duration-300'>
                Sign Up
              </button>
            </Link>
          </div>
          <div className='md:w-1/2 flex justify-center my-10'>
            <img
              src='https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FKoiBG.png?alt=media&token=fdf8297e-dc36-474b-b863-acffbfe9478b'
              alt='Colorful Koi fish illustration'
              className='w-2/3 h-auto'
            />
          </div>
        </section>

        {/* <div className='h-[100px]'>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FWaveBG.png?alt=media&token=f6247cbd-ef51-4f6b-aa4b-95a353851bcb'
            alt='Koi fish background'
            className='w-full h-full object-cover object-bottom'
          />
        </div> */}

        <section className='flex flex-col-reverse md:flex-row mt-20 md:items-center md:space-x-8 justify-between'>
          <div className='md:w-3/4 mt-4 md:mt-0 lg:w-1/3'>
            <p className='text-gray-700'>
              This website will have a section dedicated to current live auctions, showing active bidding processes with
              countdown timers and real-time updates. Upcoming auctions are displayed with start times, preview images,
              and details.
            </p>
          </div>
          <div className='md:w-1/3'>
            <img
              src='https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FAuctionBanner.png?alt=media&token=652696d6-17eb-447f-ae59-d40d4063e820'
              alt='Auction banner'
              className='w-full h-auto'
            />
          </div>
        </section>

        <section className='bg-gray-200 p-6 rounded-lg'>
          <h2 className='text-2xl font-semibold mb-4'>Search All Our Available Koi</h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <input
              type='text'
              placeholder='Search by name'
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className='w-full px-3 py-2 rounded border border-gray-300'
            />
            <select
              value={searchSex}
              onChange={(e) => setSearchSex(e.target.value)}
              className='w-full px-3 py-2 rounded border border-gray-300'
            >
              <option value=''>Search by sex</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
            <select
              value={searchVariety}
              onChange={(e) => setSearchVariety(e.target.value)}
              className='w-full px-3 py-2 rounded border border-gray-300'
            >
              <option value=''>Search by variety</option>
              <option value='kohaku'>Kohaku</option>
              <option value='sanke'>Sanke</option>
              <option value='showa'>Showa</option>
            </select>
          </div>
        </section>

        <div className='mt-20'>
          <section className='grid md:grid-cols-2 gap-10'>
            {filteredKoiList.map((koi) => (
              <div key={koi.id} className='border rounded-lg overflow-hidden shadow-md flex p-5'>
                <img src={koi.imageUrl} alt={`${koi.name} Koi fish`} className='w-1/4 h-auto object-cover' />
                <div className='p-4 space-y-2 flex-1'>
                  <p className='text-red font-medium'>Time Left: {koi.timeLeft}</p>
                  <h3 className='text-xl font-bold'>Koi Name: {koi.name}</h3>
                  <p>Code: {koi.code}</p>
                  <p>Sex: {koi.sex}</p>
                  <p>Reserve price: {koi.reservePrice}</p>
                  <p>Age: {koi.age}</p>
                  <p>Variety: {koi.variety}</p>
                  <button className='mt-2 bg-red text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300'>
                    View
                  </button>
                </div>
              </div>
            ))}
            {filteredKoiList.length === 0 && <p>No Koi found matching your search criteria.</p>}
          </section>
        </div>
      </main>
    </div>
  )
}
