import React, { FC } from 'react'
import { AppBar, Toolbar, Box, Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SolvitudeLogo from '../assets/solvitude.svg'
import DanfordLogo from '../assets/danford.svg'
import moment from 'moment-timezone'
import { CampusMenu } from './common/CampusMenu'
import { DropDownMenu } from './common/DropDownMenu'
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white',
    color: theme.palette.text.primary,
    // display: 'flex',
    // flexDirection: 'row',
    // paddingLeft: '1.5rem',
    // position: 'relative',
    '& a': {
      alignItems: 'center',
      color: 'white',
      background: '#FF9E45',
      fontWeight: 'bold',
      fontFamily: 'Merriweather',
      display: 'flex',
      textDecoration: 'none'
    },
    '& .MuiListItem-button': {
      // padding: '0 1.5rem'
    },
    '& .MuiList-root': {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      height: '100%',
      justifyContent: 'flex-end',
      padding: 0,
      '& a': {
        borderBottomColor: 'transparent',
        borderBottomStyle: 'solid',
        borderBottomWidth: '2px',
        height: '100%',
        '& .MuiButtonBase-root': {
          height: '100%',
          paddingBottom: 0,
          paddingTop: 0
        },
        opacity: 0.8,
        '&:hover': {
          opacity: 1,
          borderBottomColor: 'rgba(0, 0, 0, 0.04)'
        }
      },
      '& a.active': {
        borderBottomColor: theme.palette.secondary.main,
        opacity: 1
      },
      '& a.active:hover': {
        borderBottomColor: theme.palette.secondary.main
      }
    }
  },
  title: {
    alignSelf: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.94px',
    color: theme.palette.text.primary,
    '& span': {
      color: theme.palette.error.main
    },
    [theme.breakpoints.up('lg')]: {
      alignSelf: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      textAlign: 'center'
    }
  },
  toolbar: { marginLeft: '15%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', display: 'flex' }
}))

interface TopBarProps {
  signOut: () => void
}

export const TopBar: FC<TopBarProps> = ({ signOut }) => {
  const classes = useStyles()
  const location = useLocation()

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Box
        borderBottom={1}
        borderColor={'#E5E5E5'}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Toolbar>
          <div className={classes.toolbar}>
            <img src={SolvitudeLogo} style={{ marginRight: 10 }}></img>
            <Divider orientation="vertical" flexItem />
            <img src={DanfordLogo} style={{ marginLeft: 10 }}></img>
          </div>
        </Toolbar>
        <div style={{ margin: 15, display: 'flex', alignItems: 'center' }}>
          {location.pathname !== '/campus' && (
            <>
              <Typography
                variant="caption"
                style={{ fontFamily: 'Lato', color: '#3B3A3C', fontSize: 13, textTransform: 'capitalize' }}
              >
                {moment.tz('Australia/Sydney').format('ddd, DD MMM h:mm A')} AEDT
              </Typography>
              <CampusMenu />
            </>
          )}
          <DropDownMenu signOut={signOut} />
        </div>
      </Box>
    </AppBar>
  )
}
