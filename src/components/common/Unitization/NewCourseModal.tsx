import React, { FC, useState } from 'react'
import { makeStyles, Grid, Typography } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import { Modal } from '../Modal'
import { BasicForm } from '../BasicForm'
import { CourseFormValue, newCourseValidationSchema } from './utils'
import { Input } from '../Input'
import { InputDatePicker } from '../InputDatePicker'
import { InputCheckBox } from '../InputCheckBox'
import { CancelButton } from '../CancelButton'
import { SubmitButton } from '../SubmitButton'
import moment from 'moment'
import { AutoHideSnackBar } from '../AutoHideSnakBar'
import { Feedback, getSuccessFeedback, getErrorFeedback } from '../../../utils/feedback'

interface NewCourseModalProps {
  open: boolean
  onCloseModal: () => void
}

const ADD_COURSES = loader('../../../graphql/common/addCourses.graphql')
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  label: {
    fontFamily: 'Lato-Light',
    fontSize: 16,
    color: '#607D8B',
    fontWeight: 500,
    marginLeft: 5
  },
  asterik: {
    marginLeft: 5,
    color: '#3EC1D3'
  }
}))

const campuses = [
  {
    name: 'check-box-1',
    key: 'checkBox1',
    label: 'King St, Melbourne'
  },
  {
    name: 'check-box-2',
    key: 'checkBox2',
    label: 'Willian St, Melbourne'
  },
  {
    name: 'check-box-3',
    key: 'checkBox3',
    label: 'Mauritius'
  }
]

const initialValues: CourseFormValue = {
  code: '',
  campuses: [],
  cricosCode: '',
  duration: '',
  endDate: moment(new Date()).format('DD/MM/yyyy'),
  group: '',
  name: ''
}
// eslint-disable-next-line no-empty-pattern
export const NewCourseModal: FC<NewCourseModalProps> = ({ open, onCloseModal }) => {
  const [autoHideFeedback, setAutoHideFeedback] = useState<Feedback | null>(null)
  const classes = useStyles()
  const [assignCourses] = useMutation(ADD_COURSES, {
    update(cache, result) {
      const addCourses = result.data?.addCourses
      if (addCourses) {
      }
    }
  })

  const handleSubmit = (values: any) => {
    /** GraphQLi Example Query
     * mutation{
     *     createCourse(
     *       courseCode:"BSBADM322",
     *       cricosCode:"BSBADM323",
     *       courseName:"Advance Web Dev",
     *       courseEndDate:"22/12/2020",
     *       campusList:["78286468-22e1-4ffa-be2b-8011a5c1b714"],
     *       courseGroup:"Lorem",
     *       courseHours:"30"
     *     ){
     *       courseId,
     *       courseName
     *     }
     *   }
     */

    assignCourses({
      variables: {
        // campusId: '78286468-22e1-4ffa-be2b-8011a5c1b714',
        // courseId: 'ff04a430-343f-4f99-9fa5-1133929da11b',
        campusList: ['78286468-22e1-4ffa-be2b-8011a5c1b714'],
        courseCode: values.code,
        cricosCode: values.cricosCode,
        courseName: values.name,
        courseEndDate: values.endDate,
        courseHours: values.duration,
        courseGroup: values.group
        // status: 'Active',
      }
    })
      .then(({ data }) => {
        console.log(`NEW COURSE DATA`, data)
        setAutoHideFeedback(getSuccessFeedback('Course Added Successfully!'))
        onCloseModal()
      })
      .catch((error) => {
        console.log(error)
        setAutoHideFeedback(getErrorFeedback(error.message))
      })
  }

  return (
    <>
      <Modal open={open} onCloseModal={onCloseModal} maxWidth={'md'} title="New Course">
        <BasicForm
          initialValues={initialValues}
          validationSchema={newCourseValidationSchema}
          onSubmit={(values: any) => handleSubmit(values)}
        >
          {(props: any) => {
            const { values, errors, handleBlur, handleChange, setFieldValue, touched, handleSubmit } = props
            return (
              <form style={{ width: '100%', marginTop: 10 }} onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item xs={4} sm={4}>
                    <Input
                      autoComplete={'off'}
                      fullWidth
                      id="code"
                      label="code"
                      name="code"
                      title="Code"
                      required
                      value={values.code}
                      onBlur={handleBlur}
                      textFieldBreakpoints={{ xs: 12 }}
                      placeholder="Eg: BSBADM311"
                      onChange={handleChange}
                      error={!!errors.code && !!touched.code}
                      helperText={touched.code ? errors.code : null}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <Input
                      autoComplete={'off'}
                      fullWidth
                      id="cricosCode"
                      label="cricosCode"
                      name="cricosCode"
                      title="Cricos Code"
                      required
                      placeholder="Eg: BSBADM311"
                      value={values.cricosCode}
                      onBlur={handleBlur}
                      textFieldBreakpoints={{ xs: 12 }}
                      onChange={handleChange}
                      error={!!errors.cricosCode && !!touched.cricosCode}
                      helperText={touched.cricosCode ? errors.cricosCode : null}
                    />
                  </Grid>
                </Grid>
                <Grid container xs={8} sm={8} spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <Input
                      autoComplete={'off'}
                      fullWidth
                      id="name"
                      label="name"
                      name="name"
                      title="Course Name"
                      required
                      placeholder="Eg: Advance Diploma of Program Management"
                      value={values.name}
                      onBlur={handleBlur}
                      textFieldBreakpoints={{ xs: 12 }}
                      onChange={handleChange}
                      error={!!errors.name && !!touched.name}
                      helperText={touched.name ? errors.name : null}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={4}>
                  <Grid item xs={4} sm={4}>
                    <Input
                      autoComplete={'off'}
                      fullWidth
                      id="duration"
                      label="duration"
                      name="duration"
                      title="Duration"
                      required
                      adornmentPosition="end"
                      adornment={'Hours'}
                      value={values.duration}
                      placeholder="Eg: 100"
                      onBlur={handleBlur}
                      textFieldBreakpoints={{ xs: 12 }}
                      onChange={handleChange}
                      error={!!errors.duration && !!touched.duration}
                      helperText={touched.duration ? errors.duration : null}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <Input
                      autoComplete={'off'}
                      fullWidth
                      id="group"
                      label="group"
                      name="group"
                      title="Group"
                      required
                      value={values.group}
                      onBlur={handleBlur}
                      placeholder="Eg: Lorem Ipsum"
                      textFieldBreakpoints={{ xs: 12 }}
                      onChange={handleChange}
                      error={!!errors.group && !!touched.group}
                      helperText={touched.group ? errors.group : null}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <InputDatePicker
                      required
                      title={'End Date'}
                      placeholder="DD/MM/YYYY"
                      selectedDate={values.endDate}
                      onHandleDateChange={(date) => {
                        setFieldValue('endDate', moment(date).format('DD/MM/yyyy'))
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container xs={10} sm={10} direction="column">
                  {/* <FormControl style={{ alignItems: 'center', flexDirection: 'row', marginTop:10 }}> */}
                  {/* <FormHelperText className={classes.label}>Select Campuses</FormHelperText><span className={classes.asterik}>&#42;</span> */}
                  <Typography variant="subtitle2" className={classes.label}>
                    Select Campuses
                    <span className={classes.asterik}>&#42;</span>
                  </Typography>
                  {/* </FormControl> */}
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {campuses.map((val) => (
                      <InputCheckBox
                        label={val.label}
                        error={false}
                        name={val.name}
                        key={val.key}
                        handleChange={(e) => {
                          let camp = []
                          if (values.campuses.includes(e.target.name)) {
                            camp = values.campuses.filter((cap: string) => e.target.name !== cap)
                            setFieldValue('campuses', camp)
                          } else {
                            e.target.checked && values.campuses.push(e.target.name)
                            setFieldValue('campuses', values.campuses)
                          }
                        }}
                        checked={values.campuses.find((camp: string) => val.name === camp)}
                      />
                    ))}
                  </div>
                </Grid>
                <Grid
                  container
                  direction="row"
                  spacing={3}
                  justify="flex-end"
                  alignContent="flex-end"
                  alignItems="flex-end"
                >
                  <Grid item xs={1} sm={2}>
                    <CancelButton onPress={onCloseModal} label={'Cancel'} />
                  </Grid>
                  <Grid item xs={2} sm={2}>
                    <SubmitButton onPress={handleSubmit} label="Add Course" />
                  </Grid>
                </Grid>
              </form>
            )
          }}
        </BasicForm>
      </Modal>
      <AutoHideSnackBar
        autoHideDuration={autoHideFeedback?.type === 'success' ? 3000 : 6000}
        handleClose={() => setAutoHideFeedback(null)}
        message={!!autoHideFeedback?.message ? autoHideFeedback.message : ''}
        severity={autoHideFeedback?.type}
        open={!!autoHideFeedback}
      />
    </>
  )
}
