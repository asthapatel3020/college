import { Divider, Grid, Typography } from '@material-ui/core'
import { Auth } from 'aws-amplify'
import React, { useState } from 'react'
import { AutoHideSnackBar } from '../../components/common/AutoHideSnakBar'
import { BasicForm } from '../../components/common/BasicForm'
import { CancelButton } from '../../components/common/CancelButton'
import { Input } from '../../components/common/Input'
import { SubmitButton } from '../../components/common/SubmitButton'
import { PasswordInstruction } from '../../utils/passwordInstruction'
import { passwordSettingValidationSchema, PasswordSettingFormValue } from './utils'
import { Feedback, getSuccessFeedback } from '../../utils/feedback'

const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
const regexUL = /^(?=.*[a-z])(?=.*[A-Z])/

export const PasswordSettings = () => {
  const [autoHideFeedback, setAutoHideFeedback] = useState<Feedback | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const initialValues: PasswordSettingFormValue = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  const handleSubmit = (values: any) => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(user, values.currentPassword, values.newPassword)
      })
      .then((data) => {
        if (data) {
          setErrorMessage('')
          setAutoHideFeedback(getSuccessFeedback('Password Change Successfully!'))
        }
      })
      .catch((err) => {
        if (err) {
          setErrorMessage('Please enter old password correct!')
        }
      })
  }

  return (
    <Grid spacing={1} container direction="column">
      <BasicForm
        initialValues={initialValues}
        validationSchema={passwordSettingValidationSchema}
        onSubmit={(values: any) => handleSubmit(values)}
      >
        {(props: any) => {
          const { values, errors, touched, handleSubmit, handleBlur, handleChange, handleReset } = props
          return (
            <form style={{ width: '100%' }} onSubmit={handleSubmit}>
              <Grid container justify="space-between" direction="row">
                <Grid item>
                  <Typography
                    style={{ fontFamily: 'Merriweather', fontWeight: 'bold', fontSize: 20, color: '#3B3A3C' }}
                  >
                    {' '}
                    Password Settings
                  </Typography>
                </Grid>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginRight: 30 }}>
                  <Grid item xs={1}>
                    <CancelButton onPress={handleReset} label="Cancel"></CancelButton>
                  </Grid>
                  <Grid item xs={1}>
                    <SubmitButton label="Save" onPress={handleSubmit}></SubmitButton>
                  </Grid>
                </div>
              </Grid>
              <Divider
                variant="fullWidth"
                style={{ marginTop: 25, marginBottom: 25, backgroundColor: '#E5E7E8' }}
              ></Divider>
              {errorMessage && (
                <Typography
                  variant="caption"
                  style={{ fontFamily: 'Merriweather', fontSize: 15, color: 'red', width: '50%', textAlign: 'center' }}
                >
                  {errorMessage}
                </Typography>
              )}
              <Grid container spacing={4}>
                <Grid item xs={4} sm={4}>
                  <Input
                    autoComplete={'off'}
                    fullWidth
                    id="currentPassword"
                    label="currentPassword"
                    name="currentPassword"
                    title="Current Password"
                    value={values.currentPassword}
                    onBlur={handleBlur}
                    textFieldBreakpoints={{ xs: 12 }}
                    placeholder="Old Password"
                    onChange={handleChange}
                    error={!!errors.currentPassword && !!touched.currentPassword}
                    helperText={touched.currentPassword ? errors.currentPassword : null}
                    type="password"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid item xs={4} sm={4}>
                  <Input
                    autoComplete={'off'}
                    fullWidth
                    id="newPassword"
                    label="newPassword"
                    name="newPassword"
                    title="New Password"
                    value={values.newPassword}
                    onBlur={handleBlur}
                    textFieldBreakpoints={{ xs: 12 }}
                    placeholder="New Password"
                    onChange={handleChange}
                    error={!!errors.newPassword && !!touched.newPassword}
                    helperText={touched.newPassword ? errors.newPassword : null}
                    type="password"
                  />
                  {values.newPassword && (
                    <PasswordInstruction
                      isLengthValid={values.newPassword.length > 8}
                      isSpecialCharValid={regex.test(values.newPassword)}
                      isUpperLowerCaseValid={regexUL.test(values.newPassword)}
                    />
                  )}
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Input
                    autoComplete={'off'}
                    fullWidth
                    id="confirmPassword"
                    label="confirmPassword"
                    name="confirmPassword"
                    title="Confirm Password"
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    textFieldBreakpoints={{ xs: 12 }}
                    placeholder="Re-enter New Password"
                    onChange={handleChange}
                    error={!!errors.confirmPassword && !!touched.confirmPassword}
                    helperText={touched.confirmPassword ? errors.confirmPassword : null}
                    type="password"
                  />
                </Grid>
              </Grid>
            </form>
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
    </Grid>
  )
}
