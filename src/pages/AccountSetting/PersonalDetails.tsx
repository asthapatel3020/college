import { Divider, Grid, Typography } from '@material-ui/core'
import { Auth } from 'aws-amplify'
import React, { useContext, FC, useState } from 'react'
import { AutoHideSnackBar } from '../../components/common/AutoHideSnakBar'
import { BasicForm } from '../../components/common/BasicForm'
import { CancelButton } from '../../components/common/CancelButton'
import { Input } from '../../components/common/Input'
import { SubmitButton } from '../../components/common/SubmitButton'
import { CurrentUserContext } from '../../contexts'
import { PersonalDetailFormValue, personalDetailValidationSchema } from './utils'
import { Feedback, getSuccessFeedback, getErrorFeedback } from '../../utils/feedback'

interface PersonalDetialProps {
  handleEdit: () => void
  enableEdit: boolean
}

export const PersonalDetails: FC<PersonalDetialProps> = ({ handleEdit, enableEdit }) => {
  const curs = useContext(CurrentUserContext)
  const [autoHideFeedback, setAutoHideFeedback] = useState<Feedback | null>(null)
  // const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const initialValues: PersonalDetailFormValue = {
    fname: curs.fname ? curs.fname : '',
    lname: curs.lname ? curs.lname : '',
    email: curs.email ? curs.email : '',
    phonenumber: curs.phoneNumber ? curs.phoneNumber : ''
  }

  const handleSubmit = (values: any) => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log(values.phonenumber)
        return Auth.updateUserAttributes(user, {
          // 'email': values.email,
          phone_number: values.phonenumber,
          'custom:firstName': values.fname,
          'custom:lastName': values.lname
        })
      })
      .then((data) => {
        console.log(data)
        if (data) {
          handleEdit()

          // setErrorMessage("")
          setAutoHideFeedback(getSuccessFeedback('Profile Details Updated Successfully!'))
        }
      })
      .catch((err) => setAutoHideFeedback(getErrorFeedback(err)))
  }

  return (
    <Grid spacing={1} container direction="column">
      <BasicForm
        initialValues={initialValues}
        validationSchema={personalDetailValidationSchema}
        onSubmit={(values: any) => handleSubmit(values)}
      >
        {(props: any) => {
          const { values, errors, touched, handleSubmit, handleBlur, handleChange } = props
          return (
            <form style={{ width: '100%' }} onSubmit={handleSubmit}>
              <Grid container justify="space-between" direction="row">
                <Grid item>
                  <Typography
                    style={{ fontFamily: 'Merriweather', fontWeight: 'bold', fontSize: 20, color: '#3B3A3C' }}
                  >
                    {' '}
                    Personal Details
                  </Typography>
                </Grid>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginRight: 30 }}>
                  <Grid item xs={1}>
                    <CancelButton onPress={() => console.log('!')} label="Cancel"></CancelButton>
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

              <Grid container spacing={4}>
                <Grid item xs={4} sm={4}>
                  <Input
                    autoComplete={'off'}
                    fullWidth
                    disabled={!enableEdit}
                    id="fname"
                    label="First Name"
                    name="fname"
                    title="First Name"
                    value={values.fname}
                    onBlur={handleBlur}
                    textFieldBreakpoints={{ xs: 12 }}
                    placeholder="Enter first name"
                    onChange={handleChange}
                    error={!!errors.fname && !!touched.fname}
                    helperText={touched.fname ? errors.fname : null}
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Input
                    autoComplete={'off'}
                    fullWidth
                    disabled={!enableEdit}
                    id="lname"
                    label="Last Name"
                    name="lname"
                    title="Last Name"
                    value={values.lname}
                    onBlur={handleBlur}
                    textFieldBreakpoints={{ xs: 12 }}
                    placeholder="Enter last name"
                    onChange={handleChange}
                    error={!!errors.lname && !!touched.lname}
                    helperText={touched.lname ? errors.lname : null}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid item xs={4} sm={4}>
                  <Input
                    autoComplete={'off'}
                    fullWidth
                    disabled
                    id="email"
                    label="Email"
                    name="email"
                    title="Email"
                    value={values.email}
                    onBlur={handleBlur}
                    textFieldBreakpoints={{ xs: 12 }}
                    placeholder="Enter email address"
                    onChange={handleChange}
                    error={!!errors.email && !!touched.email}
                    helperText={touched.email ? errors.email : null}
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Input
                    autoComplete={'off'}
                    fullWidth
                    disabled={!enableEdit}
                    id="phonenumber"
                    label="Phone number"
                    name="phonenumber"
                    title="Mobile Number"
                    value={values.phonenumber}
                    onBlur={handleBlur}
                    textFieldBreakpoints={{ xs: 12 }}
                    placeholder="Enter mobile number"
                    onChange={handleChange}
                    error={!!errors.phonenumber && !!touched.phonenumber}
                    helperText={touched.phonenumber ? errors.phonenumber : null}
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
