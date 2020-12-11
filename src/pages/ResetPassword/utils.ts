import * as yup from 'yup'

const REQUIRED = `is required`

export interface resetPasswordFormValue {
  password: string
  showPassword: boolean
  confirmpassword: string
  showconfirmpassword: boolean
  otp: string
}

export const resetPasswordValidationSchema = yup.object({
  password: yup.string().required(`New Password ${REQUIRED}`)
})
