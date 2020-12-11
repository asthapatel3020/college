/* eslint-disable @typescript-eslint/ban-types */
import React, { FC } from 'react'
import { Formik, FormikHelpers } from 'formik'

interface BasicFormProps {
  initialValues: Object
  validationSchema: any
  onSubmit: ((values: Object, formikHelpers: FormikHelpers<Object>) => void | Promise<any>) & ((values: Object) => void)
}

export const BasicForm: FC<BasicFormProps> = ({ initialValues, validationSchema, children, onSubmit }) => {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
      {children}
    </Formik>
  )
}
