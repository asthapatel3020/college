import { IconButton, InputAdornment, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { BasePage } from '../../components/BasePage'
import { BasicForm } from '../../components/common/BasicForm'
import { SubmitButton } from '../../components/common/SubmitButton'
import { resetPasswordFormValue, resetPasswordValidationSchema } from './utils'
import { Auth } from 'aws-amplify'
import { VisibilityOffOutlined, VisibilityOutlined } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { AutoHideSnackBar } from '../../components/common/AutoHideSnakBar'
import { Feedback, getSuccessFeedback, getErrorFeedback } from '../../utils/feedback'

type historyData = { email: string }

export const ResetPassword = () => {
  const [autoHideFeedback, setAutoHideFeedback] = useState<Feedback | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const history = useHistory()
  const state = history.location.state
  const initialValues: resetPasswordFormValue = {
    password: '',
    showPassword: false,
    confirmpassword: '',
    showconfirmpassword: false,
    otp: ''
  }

  const handleForgotPassword = (values: any) => {
    // Auth.forgotPassword()
    setLoading(true)
    const email = (state as historyData) && ((state as historyData).email as string)
    Auth.forgotPasswordSubmit(email, values.otp, values.password)
      .then(() => {
        setLoading(false)
        setAutoHideFeedback(getSuccessFeedback('Reset Password Successfully!'))
        history.push('/')
      })
      .catch(() => {
        setLoading(false)
        setAutoHideFeedback(getErrorFeedback('OTP has been experied!'))
      })
  }

  return (
    <BasePage title="Reset Password">
      <BasicForm
        initialValues={initialValues}
        validationSchema={resetPasswordValidationSchema}
        onSubmit={(values: any) => handleForgotPassword(values)}
      >
        {(props: any) => {
          const { values, errors, setFieldValue, touched, handleSubmit } = props
          return (
            <>
              <TextField
                id="otp"
                InputLabelProps={{
                  shrink: true,
                  style: { color: '#607D8B', fontFamily: 'Lato', fontSize: 15 }
                }}
                style={{ width: '45%', marginTop: 20 }}
                error={!!errors.otp && !!touched.otp}
                helperText={touched.otp ? errors.otp : null}
                label="OTP"
                value={values.otp}
                onChange={(e) => setFieldValue('otp', e.target.value)}
              />
              <TextField
                id="password"
                InputLabelProps={{
                  shrink: true,
                  style: { color: '#607D8B', fontFamily: 'Lato', fontSize: 15 }
                }}
                style={{ width: '45%', marginTop: 20 }}
                error={!!errors.password && !!touched.password}
                helperText={touched.password ? errors.password : null}
                InputProps={{
                  type: values.showPassword ? 'text' : 'password',
                  style: { color: '#3B3A3C', fontFamily: 'Lato', fontSize: 16 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setFieldValue('showPassword', !values.showPassword)}
                        onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                          event.preventDefault()
                        }}
                      >
                        {values.showPassword ? (
                          <VisibilityOutlined fontSize="small" style={{ color: '#B0BEC5' }} />
                        ) : (
                          <VisibilityOffOutlined style={{ color: '#B0BEC5' }} fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                label="New Password"
                value={values.password}
                onChange={(e) => setFieldValue('password', e.target.value)}
              />

              <TextField
                id="confirmpassword"
                InputLabelProps={{
                  shrink: true,
                  style: { color: '#607D8B', fontFamily: 'Lato', fontSize: 15 }
                }}
                style={{ width: '45%', marginTop: 20 }}
                error={!!errors.confirmpassword && !!touched.confirmpassword}
                helperText={touched.confirmpassword ? errors.confirmpassword : null}
                InputProps={{
                  type: values.showconfirmpassword ? 'text' : 'password',
                  style: { color: '#3B3A3C', fontFamily: 'Lato', fontSize: 16 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setFieldValue('showconfirmpassword', !values.showconfirmpassword)}
                        onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                          event.preventDefault()
                        }}
                      >
                        {values.showconfirmpassword ? (
                          <VisibilityOutlined fontSize="small" style={{ color: '#B0BEC5' }} />
                        ) : (
                          <VisibilityOffOutlined style={{ color: '#B0BEC5' }} fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                label="Confirm Password"
                value={values.confirmpassword}
                onChange={(e) => setFieldValue('confirmpassword', e.target.value)}
              />
              <div style={{ width: '50%', marginTop: 25 }}>
                <SubmitButton loading={isLoading} label="Reset Password" onPress={handleSubmit} />
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
