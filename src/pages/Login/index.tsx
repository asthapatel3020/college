import { IconButton, InputAdornment, TextField, Typography } from '@material-ui/core'
import { VisibilityOutlined, VisibilityOffOutlined } from '@material-ui/icons'
import React, { FC, useEffect } from 'react'
import { BasicForm } from '../../components/common/BasicForm'
import { SubmitButton } from '../../components/common/SubmitButton'
import { LoginFormValue, loginValidationSchema } from './utils'
import { BasePage } from '../../components/BasePage'
import { Link } from 'react-router-dom'

interface LoginProps {
  signIn: (username: string, password: string) => void
  errorMessage: string | null
  isLoading: boolean
}

export const Login: FC<LoginProps> = ({ errorMessage, signIn, isLoading }) => {
  useEffect(() => {
    // signIn("astha.patel@solvitude.com","P@ssw0rd1")
  }, [])

  const initialValues: LoginFormValue = {
    email: '',
    password: '',
    showPassword: false
  }

  return (
    <BasePage title="Welcome Back!">
      {errorMessage && (
        <Typography
          variant="caption"
          style={{ fontFamily: 'Merriweather', fontSize: 15, color: 'red', width: '50%', textAlign: 'center' }}
        >
          {errorMessage}
        </Typography>
      )}
      <BasicForm
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={(values: any) => signIn(values.email, values.password)}
      >
        {(props: any) => {
          const { values, errors, setFieldValue, touched, handleSubmit } = props
          return (
            <>
              <TextField
                id="standard-basic"
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
              <TextField
                id="standard-basic"
                InputLabelProps={{ shrink: true, style: { color: '#607D8B', fontFamily: 'Lato', fontSize: 15 } }}
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
                label="Password"
                value={values.password}
                onChange={(e) => setFieldValue('password', e.target.value)}
              />
              <div style={{ width: '45%', textAlign: 'end', marginTop: 5 }}>
                <Link
                  to="/forgotpassword"
                  style={{ fontSize: 11, color: '#607D8B', fontFamily: 'Lato', textDecoration: 'none' }}
                >
                  Forgot Password?
                </Link>
              </div>
              <div style={{ width: '50%', marginTop: 25 }}>
                <SubmitButton loading={isLoading} label="Login" onPress={handleSubmit} />
              </div>
            </>
          )
        }}
      </BasicForm>
    </BasePage>
  )
}
