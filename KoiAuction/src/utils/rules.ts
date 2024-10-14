import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import { FormRegister } from '../types/FormRegister.type'
import * as yup from 'yup'

type Rules = { [key in keyof FormRegister]?: RegisterOptions<FormRegister, key> }

export const getRules = (getValues?: UseFormGetValues<FormRegister>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài ký tự từ 5 - 160'
    },
    minLength: {
      value: 5,
      message: 'Độ dài ký tự từ 5 - 160'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài ký tự từ 6 - 160'
    },
    minLength: {
      value: 6,
      message: 'Độ dài ký tự từ 6 - 160'
    }
  },
  confirmPassword: {
    required: {
      value: true,
      message: 'Confirm Password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài ký tự từ 6 - 160'
    },
    minLength: {
      value: 6,
      message: 'Độ dài ký tự từ 6 - 160'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Confirm Password không khớp Password'
        : undefined
  }
})

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài ký tự từ 5 - 160')
    .max(160, 'Độ dài ký tự từ 5 - 160'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài ký tự từ 6 - 160')
    .max(160, 'Độ dài ký tự từ 6 - 160'),
  confirmPassword: yup
    .string()
    .required('Confirm Password là bắt buộc')
    .min(6, 'Độ dài ký tự từ 6 - 160')
    .max(160, 'Độ dài ký tự từ 6 - 160')
    .oneOf([yup.ref('password')], 'Confirm Password không khớp Password')
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loginSchema = schema.omit(['confirmPassword'])

export type LoginSchema = yup.InferType<typeof loginSchema>

export type Schema = yup.InferType<typeof schema>
