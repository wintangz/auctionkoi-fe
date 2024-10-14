import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import { FormRegister } from '../../types/FormRegister.type'

interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  name: keyof FormRegister
  register: UseFormRegister<FormRegister>
  rules?: RegisterOptions<FormRegister>
}

export default function Input({ type, errorMessage, placeholder, className, name, register, rules }: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red'
        placeholder={placeholder}
        {...register(name, rules)}
      />
      <div className='mt-1 text-red min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}
