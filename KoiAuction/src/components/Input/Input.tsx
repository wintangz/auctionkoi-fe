import { RegisterOptions, UseFormRegister, FieldValues, Path } from 'react-hook-form'

interface Props<T extends FieldValues> {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  name: Path<T>
  register: UseFormRegister<T>
  rules?: RegisterOptions<T>
}

export default function Input<T extends FieldValues>({
  type,
  errorMessage,
  placeholder,
  className,
  name,
  register,
  rules
}: Props<T>) {
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
