import * as yup from 'yup'

const REQUIRED = `is required`

export interface LoginFormValue {
  email: string
  password: string
  showPassword: boolean
}

export const loginValidationSchema = yup.object({
  email: yup.string().required(`Email ${REQUIRED}`).email('Enter valid email address'),
  password: yup.string().required(`Password ${REQUIRED}`)
  // .matches(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$`),"Password must contain one special character, one uppercase and number"),
})

export interface newPasswordFormValue {
  password: string
  showPassword: boolean
  confirmpassword: string
  showconfirmpassword: boolean
}

export const newPasswordValidationSchema = yup.object({
  password: yup.string().required(`New Password ${REQUIRED}`)
})
