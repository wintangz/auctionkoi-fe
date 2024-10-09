import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className='min-h-screen bg-white flex flex-col justify-between'>
      <main className='container mx-auto lg:px-14 lg:py-20 py-0 space-y-12 lg:mt-0 mt-10 px-5 flex justify-center'>
        <div className='w-full max-w-5xl bg-white rounded-lg'>
          <div className='flex mb-6'>
            <div className='hidden lg:w-1/3 lg:block'>
              <img
                src='https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/LoginLogout%2FKoiLogin.png?alt=media&token=2a7623dd-2b2f-4597-877d-8d1837eb021a' // Use a valid path for your image
                alt='Koi fish illustration'
                className='mx-auto w-full h-auto'
              />
            </div>
            <div className='w-full lg:w-3/5 pl-4'>
              <h1 className='text-2xl font-semibold text-center mb-10'>Welcome to Koi Auction</h1>
              <table className='w-full'>
                <tbody>
                  <tr className='flex flex-col md:flex-row md:items-center'>
                    <td className='text-sm font-medium text-gray-700 md:w-1/3'>Username:</td>
                    <td className='md:w-2/3'>
                      <input
                        type='text'
                        id='username'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500'
                      />
                    </td>
                  </tr>
                  <tr className='flex flex-col md:flex-row md:items-center mt-4'>
                    <td className='text-sm font-medium text-gray-700 md:w-1/3'>Password:</td>
                    <td className='md:w-2/3'>
                      <input
                        type='password'
                        id='password'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500'
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className='text-center'>
                      <div className='flex justify-end items-end space-x-4 mt-4 lg:mb-10 mb-5'>
                        <button
                          type='button'
                          className='flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                        >
                          Login with
                          <img
                            src='https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/Icon%2FGoogleIcon.png?alt=media&token=cf52345a-64c4-4f27-b3ab-8eddf16079b4'
                            alt='Google logo'
                            className='ml-2 lg:mr-44 mr-32 w-5 h-5'
                          />
                        </button>
                        <button
                          type='submit'
                          className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red hover:bg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                        >
                          Login
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className='text-center'>
                      <hr className='my-4 border-gray-300' />
                      <span className='text-sm text-gray-600'>I don't have an account</span>
                      <Link to='/register' className='text-sm text-red hover:underline ml-2'>
                        Sign Up
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
