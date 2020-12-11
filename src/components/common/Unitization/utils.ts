import * as yup from 'yup'

const REQUIRED = `is required`

export interface CourseFormValue {
  code: string
  cricosCode: string
  name: string
  duration: string
  group: string
  endDate: string
  campuses: []
}

export const newCourseValidationSchema = yup.object({
  code: yup.string().required(`Course Code ${REQUIRED}`),
  cricosCode: yup.string().required(`Cricos Code ${REQUIRED}`),
  name: yup.string().required(`Course Name ${REQUIRED}`),
  duration: yup.number().required(`Duration ${REQUIRED}`),
  group: yup.string().required(`Group ${REQUIRED}`)
})
