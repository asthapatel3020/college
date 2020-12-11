import { Avatar, Grid, ListItem, makeStyles, Typography } from '@material-ui/core'
import React, { FC, useState } from 'react'
import CampusOne from '../../assets/campusone.png'
import CampusTwo from '../../assets/campustwo.png'
import CampusThree from '../../assets/campusthree.png'
import { SubmitButton } from '../../components/common/SubmitButton'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  label: {
    fontFamily: 'Merriweather',
    fontSize: 25,
    color: '#3B3A3C'
  },
  campusContainer: {
    display: 'flex',
    marginTop: '1.5rem',
    '& .MuiListItem-root': {
      margin: '1rem',
      display: 'flex',
      flexDirection: 'column'
    },
    '& .active': {
      border: '7px solid #3EC1D3',
      boxSizing: 'border-box',
      filter: 'drop-shadow(0px 4px 50px rgba(0, 154, 170, 0.3))'
    }
  },
  campusImg: {
    width: 150,
    height: 150
  },
  campusName: {
    fontFamily: 'Merriweather',
    fontWeight: 'bold',
    color: '#3B3A3C',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
    width: 150
  }
}))

const campus = [
  {
    id: '100',
    image: CampusThree,
    name: 'King St, Melburone, AU'
  },
  {
    id: '101',
    image: CampusOne,
    name: 'William St, Melburone, AU'
  },
  {
    id: '102',
    image: CampusTwo,
    name: 'Maruritius'
  }
]

export const SelectCampus: FC<{ campusId: string[] }> = ({ campusId }) => {
  const history = useHistory()
  const classes = useStyles()
  const [campusID, setCampusID] = useState('')
  const [campusName, setCampusName] = useState('')
  console.log(campusId)
  const filterCampus = campus.map((val) => {
    if (campusId.find((id) => val.id === id)) {
      return val
    }
  })

  return (
    <Grid
      spacing={4}
      justify="center"
      alignItems="center"
      direction="column"
      style={{ display: 'flex', marginTop: 15 }}
    >
      <Grid item>
        <Typography className={classes.label}>Select a Campus</Typography>
      </Grid>
      <Grid className={classes.campusContainer} direction="row" justify="space-between">
        {filterCampus.map(
          (val) =>
            val && (
              <ListItem
                button
                onClick={() => {
                  setCampusName(val.name)
                  setCampusID(val.id)
                }}
              >
                <Avatar alt="R" src={val.image} className={`${classes.campusImg} ${val.id === campusID && 'active'}`} />
                <Typography className={classes.campusName}>{val.name}</Typography>
              </ListItem>
            )
        )}
      </Grid>
      <Grid item style={{ marginTop: '1rem' }}>
        <SubmitButton
          onPress={() => {
            localStorage.setItem('campusID', campusID)
            localStorage.setItem('campusName', campusName)
            history.push('/unitization')
          }}
          label="Go To Campus"
        ></SubmitButton>
      </Grid>
    </Grid>
  )
}
