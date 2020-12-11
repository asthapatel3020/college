import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import { Column } from 'material-table'
import React, { FC, useContext, useEffect, useState } from 'react'
import { SearchField } from '../../components/common/SearchField'
import { CreateButton } from '../../components/common/CreateButton'
import { Table } from '../../components/common/Table'
import { courseDataType } from '../../utils/unitizationdata'
import { NewCourseModal } from '../../components/common/Unitization/NewCourseModal'
import { CSVLink } from 'react-csv'
import { CurrentUserContext } from '../../contexts'
import { useHistory } from 'react-router-dom'
import { ExportIcon } from '../../utils/icon'
import { AddOutlined } from '@material-ui/icons'
// GraphQL
const GET_COURSES = loader('../../graphql/common/getCourses.graphql')

const useStyles = makeStyles(() => ({
  root: {
    background: '#FFFFFF',
    borderRadius: 15,
    marginRight: 20,
    marginLeft: 20
  },
  coursesCount: {
    fontFamily: 'Merriweather-Regular',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#3B3A3C'
  },
  exportCSV: {
    fontFamily: 'Merriweather-Regular',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#009AAA'
  },
  csvLink: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  }
}))

const columns: Column<courseDataType>[] = [
  {
    title: 'Code',
    field: 'courseCode',
    cellStyle: {
      fontFamily: 'Lato-Regular',
      color: '#3B3A3C',
      fontWeight: 'bold',
      fontStyle: 'normal'
    }
  },
  {
    title: 'Course Name',
    field: 'courseName',
    cellStyle: {
      fontFamily: 'Lato-Regular',
      color: '#3B3A3C',
      fontWeight: 'bold',
      fontStyle: 'normal'
    }
  },
  {
    title: 'Duration',
    field: 'courseHours',
    cellStyle: {
      fontFamily: 'Lato-Light',
      color: '#3B3A3C',
      fontWeight: 'normal',
      fontStyle: 'normal'
    },
    render: (rowData: courseDataType) => (
      <Grid container style={{ marginTop: 6, marginBottom: 6, marginLeft: 1 }} spacing={2}>
        <Grid container direction="row">
          {rowData.courseHours + ' Hours'}
        </Grid>
      </Grid>
    )
  },
  {
    title: 'Group',
    field: 'courseGroup',
    cellStyle: {
      fontFamily: 'Lato-Light',
      color: '#3B3A3C',
      fontWeight: 'normal',
      fontStyle: 'normal'
    }
  },
  {
    title: 'End Date',
    field: 'courseEndDate',
    cellStyle: {
      fontFamily: 'Lato-Light',
      color: '#3B3A3C',
      fontWeight: 'normal',
      fontStyle: 'normal'
    },
    render: (rowData: courseDataType) => (
      <Grid container style={{ marginTop: 6, marginBottom: 6, marginLeft: 1 }} spacing={2}>
        <Grid container direction="row">
          {rowData.courseEndDate ? rowData.courseEndDate : ' -'}
        </Grid>
      </Grid>
    )
  }
]

const Courses: FC<{ baseUrl: string }> = ({ baseUrl }) => {
  const classes = useStyles()
  const history = useHistory()
  const currentUser = useContext(CurrentUserContext)
  const [open, setOpen] = useState(false)
  const [searchText, setSearchText] = useState<string>('')
  const { loading, data } = useQuery(GET_COURSES, {
    variables: {
      campusId: '78286468-22e1-4ffa-be2b-8011a5c1b714'
    }
  })

  const handleModal = () => {
    setOpen(!open)
  }

  useEffect(() => {
    currentUser.resetPasswordFlag && currentUser.resetPasswordFlag === 'false' && localStorage.removeItem('fpassword')
  }, [data])

  return (
    <Grid container spacing={5}>
      <Grid item xs={8} md={10} lg={9}>
        <SearchField
          placeholder="Search by Course Name and Number"
          onChange={(searchText: string) => {
            if (searchText.length > 3) {
              setSearchText(searchText)
            } else {
              setSearchText('')
            }
          }}
        />
      </Grid>
      <Grid item xs={4} md={2} lg={3}>
        <CreateButton startIcon={<AddOutlined />} label="New Courses" onClick={() => setOpen(true)}></CreateButton>
      </Grid>
      <Grid item xs={12} className={classes.root}>
        <div
          style={{
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Button onClick={() => history.push(`${baseUrl}/summary`)}>Text</Button>
          {data && (
            <Typography variant="subtitle1" className={classes.coursesCount}>
              {(data?.searchCampusCourses?.courseList.length ?? 0) + ' Courses'}
            </Typography>
          )}
          {/* <Button href="#text-buttons" style={{ marginLeft: 10, textTransform: 'none' }}> */}
          <CSVLink
            data={data?.searchCampusCourses?.courseList || []}
            className={classes.csvLink}
            filename={'Unitization'}
            style={{ marginLeft: 10, textTransform: 'none' }}
          >
            <ExportIcon style={{ marginTop: 10, fontSize: 20 }} />
            <Typography variant="subtitle2" className={classes.exportCSV}>
              Export .csv
            </Typography>
          </CSVLink>
          {/* </Button> */}
        </div>
        <Table
          isLoading={loading}
          columns={columns}
          option={{ toolbar: false }}
          data={
            data?.searchCampusCourses?.courseList.filter(
              (val: any) =>
                val.courseName.toLowerCase().includes(searchText.toLowerCase()) ||
                val.courseCode.toLowerCase().includes(searchText.toLowerCase())
            ) || []
          }
        />
      </Grid>
      <NewCourseModal open={open} onCloseModal={handleModal} />
    </Grid>
  )
}

export default Courses
