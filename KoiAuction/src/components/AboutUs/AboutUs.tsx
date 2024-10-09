export default function AboutUs() {
  return (
    <div className='min-h-screen bg-white flex flex-col justify-between'>
      <main className='container mx-auto lg:px-14 lg:py-20 py-0 space-y-12 lg:mt-0 mt-10 px-5'>
        <div className='md:w-1/3'>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FAboutBanner.png?alt=media&token=9861c7de-46f2-4b53-a721-6b217a44d631'
            alt='Auction banner'
            className='w-full h-auto'
          />
        </div>
        <div className='flex flex-col md:flex-row gap-20 justify-between'>
          <div className='w-full md:w-1/3'>
            <div className='relative'>
              <img
                src='https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FKoiAbout.png?alt=media&token=dd2d7673-1669-4bd4-84c1-95b681beea77'
                alt='Koi fish illustration'
                className='w-full h-auto object-cover'
              />
            </div>
          </div>
          <div className='w-full md:w-3/5 flex flex-col items-end'>
            <div className='w-full md:w-4/5'>
              <h2 className='text-2xl font-bold mb-4'>Our Journey</h2>
              <p className='mb-4 text-base' style={{ textAlign: 'justify' }}>
                We began our journey in 1967 when Mamoru Kodama founded Miyoshiike Co., Ltd. in Japan and now decades
                later our business serves koi lovers around the world.
              </p>
              <h3 style={{ textAlign: 'justify' }} className='text-xl font-semibold mb-2'>
                Raised with care, love, and the highest quality food.
              </h3>
              <p className='mb-4 text-base' style={{ textAlign: 'justify' }}>
                Our koi are raised with care and love. Fed the highest quality koi food in similar conditions to the
                Niigata region. Niigata is where selective breeding of carp began when it was noticed that in adapting
                to the harsh winters of the region, some were born with beautiful colors such as red, yellow, and even
                patterns.
              </p>
              <p className='mb-4 text-base' style={{ textAlign: 'justify' }}>
                Our Nishikigoi have excellent color with the type of unique features that are sure to add beautiful new
                patterns to your pond.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
