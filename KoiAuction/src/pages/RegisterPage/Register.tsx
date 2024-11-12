import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { schema, Schema } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../components/Input/Input'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '../../apis/Auth.api'
import { FormRegister } from '../../types/FormRegister.type'
import { omit } from 'lodash'
import { isAxiosUnProcessableEntityError } from '../../utils/utils'
import { ErrorResponseApi } from '../../types/Utils.type'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import Button from '../../components/Button/Button'
import { toast } from 'react-toastify'

export default function Register() {
  const { setIsAuthenticated } = useContext(AppContext)
  const nagivate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Schema>({
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirmPassword'])
    registerAccountMutation.mutate(body, {
      onSuccess: () => {
        setIsAuthenticated(true)
        toast.warn('Please update your profile first')
        nagivate('/')
      },
      onError: (error) => {
        if (isAxiosUnProcessableEntityError<ErrorResponseApi<Omit<FormRegister, 'confirmPassword'>>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormRegister, 'confirmPassword'>) => registerAccount(body)
  })

  return (
    <div className='min-h-screen bg-white flex flex-col justify-between'>
      <main className='container mx-auto lg:px-14 lg:py-20 py-0 space-y-12 lg:mt-0 mt-10 px-5 flex justify-center'>
        <div className='w-full max-w-6xl bg-white rounded-lg'>
          <div className='flex flex-col lg:flex-row lg:mb-6 mb-0 justify-between'>
            <div className='lg:w-1/3 w-full flex justify-center mb-6 lg:mb-0'>
              <img
                src='https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/LoginLogout%2FKoiLogin.png?alt=media&token=2a7623dd-2b2f-4597-877d-8d1837eb021a'
                alt='Koi fish illustration'
                className='w-full h-auto max-w-xs lg:max-w-full'
              />
            </div>
            <div className='w-full lg:w-3/5'>
              <h1 className='text-2xl font-semibold text-center mb-10'>Create Your New Account</h1>
              <form onSubmit={onSubmit} noValidate>
                <table className='w-full'>
                  <tbody>
                    <tr className='flex flex-col md:flex-row'>
                      <td className='text-sm font-bold text-gray-700 md:w-1/4 mr-0 lg:pt-2 pt-0'>Email:</td>
                      <td className='md:w-2/3'>
                        <Input
                          name='email'
                          register={register}
                          type='email'
                          className=''
                          errorMessage={errors.email?.message}
                          placeholder='Email'
                        />
                      </td>
                    </tr>
                    <tr className='flex flex-col md:flex-row'>
                      <td className='text-sm font-bold text-gray-700 md:w-1/4 mr-0 lg:pt-2 pt-0'>Password:</td>
                      <td className='md:w-2/3'>
                        <Input
                          name='password'
                          register={register}
                          type='password'
                          className=''
                          errorMessage={errors.password?.message}
                          placeholder='Password'
                        />
                      </td>
                    </tr>
                    <tr className='flex flex-col md:flex-row'>
                      <td className='text-sm font-bold text-gray-700 md:w-1/4 mr-0 lg:pt-2 pt-0'>Confirm Password:</td>
                      <td className='md:w-2/3'>
                        <Input
                          name='confirmPassword'
                          register={register}
                          type='password'
                          className=''
                          errorMessage={errors.confirmPassword?.message}
                          placeholder='Re-enter Password'
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className='text-center'>
                        <div className='flex justify-end items-end space-x-4 lg:px-14 md:px-14 px-0 mt-4 lg:mb-10 mb-5'>
                          <button className='flex justify-end px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-white'>
                            Sign Up with
                            <img
                              src='https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/Icon%2FGoogleIcon.png?alt=media&token=cf52345a-64c4-4f27-b3ab-8eddf16079b4'
                              alt='Google logo'
                              className='ml-2 w-5 h-5'
                            />
                          </button>
                          <Button
                            type='submit'
                            className='px-4 py-2 flex justify-center items-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red hover:bg-red'
                            isLoading={registerAccountMutation.isPending}
                            disabled={registerAccountMutation.isPending}
                          >
                            Sign Up
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className='text-center'>
                        <hr className='my-4 border-gray-300' />
                        <span className='text-sm text-gray-600'>I already have an account</span>
                        <Link to='/login' className='text-sm font-bold text-red hover:underline ml-2'>
                          Login
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
