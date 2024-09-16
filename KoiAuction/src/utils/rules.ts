export const rules = {
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
    }
  }
}
