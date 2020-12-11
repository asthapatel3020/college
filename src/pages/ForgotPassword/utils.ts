import * as yup from 'yup'

const REQUIRED = `is required`

export interface FPFormValue {
  email: string
}

export const fpValidationSchema = yup.object({
  email: yup.string().required(`Email ${REQUIRED}`).email('Enter valid email address')
})
