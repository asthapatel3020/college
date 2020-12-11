import React from 'react'
import { Navigation } from './common/Navigation'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  box: {
    flex: 1,
    height: '100%',
    borderColor: '#E5E5E5',
    flexDirection: 'column',
    backgroundColor: '#3B3A3C',
    '& ul': {
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      height: '100%',
      marginTop: '20%',
      '& a': {
        color: 'black',
        // fontWeight: '',
        opacity: 1,
        textDecoration: 'none',
        textTransform: 'capitalize'
      },
      '& .MuiListItem-root': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        fontSize: 16,
        boxPack: 'end',
        justifyContent: 'flex-start',
        padding: '18px 25px',
        opacity: 0.8,
        fontFamily: 'Merriweather',
        color: '#FFFFFF'
        // '&:hover': {
        //   opacity: 1
        // }
      },
      '& .active': {
        backgroundColor: 'rgb(62 193 211 / 0.4)',
        // opacity:0.8,
        borderRadius: '0px 30px 30px 0px',
        marginRight: 15,
        '&::before': {
          content: 'close-quote',
          position: 'absolute',
          backgroundColor: '#3EC1D3',
          height: 75,
          width: 10,
          left: 0
          // marginRight: 4,
        },
        '& .MuiListItem-root': {
          // backgroundColor: theme.palette.secondary.main,
          // borderRadius: '0 6px 6px 0',
          // // paddingRight: '3.75rem',
          // opacity: 1,
          // transform: 'translate(0.75rem)'
        }
      }
    }
  }
}))

export const SideBar = () => {
  const classes = useStyles()

  return (
    // <Hidden mdDown>
    <Box className={classes.box} borderRight={1} borderColor={'#E5E5E5'}>
      <Navigation />
    </Box>
    // </Hidden>
  )
}
