import * as yup from 'yup'

const REQUIRED = `is required`

export interface PersonalDetailFormValue {
  fname: string
  lname: string
  email: string
  phonenumber: string
}

export const personalDetailValidationSchema = yup.object({})

export interface PasswordSettingFormValue {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export const passwordSettingValidationSchema = yup.object({
  newPassword: yup.string().required(`New Password ${REQUIRED}`),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword'), ''], 'Confirm Passwords and New Password must match')
})
