/* eslint-disable react/no-unescaped-entities */
import { TextField, Typography } from '@material-ui/core'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import React, { useState } from 'react'
import { BasePage } from '../../components/BasePage'
import { BasicForm } from '../../components/common/BasicForm'
import { SubmitButton } from '../../components/common/SubmitButton'
import { FPFormValue, fpValidationSchema } from './utils'
import { Auth } from 'aws-amplify'
import { useHistory } from 'react-router-dom'
import { AutoHideSnackBar } from '../../components/common/AutoHideSnakBar'
import { Feedback, getSuccessFeedback, getErrorFeedback } from '../../utils/feedback'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ForgotPassword = () => {
  const [autoHideFeedback, setAutoHideFeedback] = useState<Feedback | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const history = useHistory()
  const initialValues: FPFormValue = {
    email: ''
  }

  const handleForgotPassword = (values: any) => {
    setLoading(true)
    Auth.forgotPassword(values.email)
      .then((data) => {
        if (data) {
          setLoading(false)
          setAutoHideFeedback(getSuccessFeedback('Email Sent Successfully!'))
          history.push('/resetpassword', { email: values.email })
        }
      })
      .catch(() => {
        setLoading(false)
        setAutoHideFeedback(getErrorFeedback('Please send request again!'))
      })
  }

  return (
    <BasePage title="Forgot Password?">
      <Typography
        variant="caption"
        style={{ fontFamily: 'Merriweather', fontSize: 15, color: '#607D8B', width: '50%', textAlign: 'center' }}
      >
        Don't worry. Enter your registered email address and we'll send you an OTP to reset your password.
      </Typography>
      <BasicForm
        initialValues={initialValues}
        validationSchema={fpValidationSchema}
        onSubmit={(values: any) => handleForgotPassword(values)}
      >
        {(props: any) => {
          const { values, errors, setFieldValue, touched, handleSubmit } = props
          return (
            <>
              <TextField
                id="email"
                value={values.email}
                onChange={(e) => setFieldValue('email', e.target.value)}
                InputLabelProps={{ shrink: true, style: { color: '#607D8B', fontFamily: 'Lato', fontSize: 15 } }}
                style={{ width: '45%', marginTop: 20 }}
                label="Email"
                InputProps={{
                  style: { color: '#3B3A3C', fontFamily: 'Lato', fontSize: 16 }
                }}
                error={!!errors.email && !!touched.email}
                helperText={touched.email ? errors.email : null}
              />

              <GoogleReCaptcha onVerify={(token) => console.log(token)} />

              <div style={{ width: '50%', marginTop: 25 }}>
                <SubmitButton loading={isLoading} label="Forgot Password" onPress={handleSubmit} />
              </div>
            </>
          )
        }}
      </BasicForm>
      <AutoHideSnackBar
        autoHideDuration={autoHideFeedback?.type === 'success' ? 3000 : 6000}
        handleClose={() => setAutoHideFeedback(null)}
        message={!!autoHideFeedback?.message ? autoHideFeedback.message : ''}
        severity={autoHideFeedback?.type}
        open={!!autoHideFeedback}
      />
    </BasePage>
  )
}
