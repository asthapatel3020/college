import React, { FC, useState, MouseEvent, useContext } from 'react'
import { makeStyles, MenuItem, Menu, Theme } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    alignItems: 'center',
    height: '100%',
    display: 'flex',
    '& .MuiButtonBase-root': {
      height: '100%'
    },
    '& .MuiListItem-button': {
      // padding: '5px'
    },
    '& .MuiListItem-button:hover': {
      background: 'none'
    },
    '& .MuiTypography-root': {
      fontWeight: 'bold'
    },
    '& .popover_class::before': {
      content: '',
      position: 'absolute',
      top: -20,
      right: 5,
      borderBottom: 10,
      //   border-right: 10px solid transparent;
      //   border-left: 10px solid transparent;
      //   border-top: 10px solid transparent;
      zIndex: 10
    }
  },
  dropDown: {
    '&::before': {
      content: 'close-quote',
      position: 'absolute',
      top: 48,
      right: 43,
      borderBottom: '10px solid #3B3A3C',
      borderRight: '10px solid transparent',
      borderLeft: '10px solid transparent',
      borderTop: '10px solid transparent',
      //   border-right: 10px solid transparent;
      //   border-left: 10px solid transparent;
      //   border-top: 10px solid transparent;
      zIndex: 10
    },
    '& a': {
      color: theme.palette.text.primary,
      textDecoration: 'none'
    },
    '& .MuiMenu-paper': {
      background: '#3B3A3C',
      top: '4rem !important',
      left: 'initial !important',
      right: '1.5rem'
    }
  },
  greeting: {
    fontWeight: 'bold'
    // padding: '0 .5rem'
  },
  link: {
    color: theme.palette.text.primary,
    '&:hover': {
      color: 'inherit'
    }
  },
  option: {
    // opacity: 0.8,
    color: '#FFFFFF',
    fontFamily: 'Merriweather',
    fontSize: 16,
    // lineHeight:18,
    padding: '.5rem 1.5rem',
    marginRight: '1rem',
    '&:hover': {
      backgroundColor: 'rgb(62 193 211 / 0.4)',
      // opacity:0.8,
      borderRadius: '0px 30px 30px 0px',
      '&::before': {
        content: 'close-quote',
        position: 'absolute',
        backgroundColor: '#3EC1D3',
        height: 38,
        width: 10,
        marginLeft: -24,
        marginRight: 4
      }
    },
    '&:active': {}
  },
  drpBtn: {
    display: 'flex',
    backgroundColor: '#FF9E45',
    color: '#ffffff',
    height: 40,
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 45,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: '0px 10px',
    fontFamily: 'Merriweather',
    fontSize: 16,
    lineHeight: 1,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#FF9E45',
      color: '#ffffff'
    }
  }
}))

interface DropdownMenuProps {
  signOut: () => void
}

export const DropDownMenu: FC<DropdownMenuProps> = ({ signOut }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const currentUser = useContext(CurrentUserContext)
  const classes = useStyles()
  const history = useHistory()

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.container}>
      <MenuItem
        aria-label="current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleOpen}
      >
        <div className={classes.drpBtn}>
          {(currentUser.fname ? currentUser.fname.charAt(0) : '') +
            (currentUser.lname ? currentUser.lname.charAt(0) : '')}
        </div>
        {/* <KeyboardArrowDown /> */}
      </MenuItem>
      <Menu
        anchorEl={anchorEl}
        className={classes.dropDown}
        id="dropdown-menu"
        keepMounted
        onClick={handleClose}
        open={Boolean(anchorEl)}
      >
        <MenuItem className={classes.option} onClick={() => history.push('/accountSettings')}>
          Account Settings
        </MenuItem>
        <MenuItem className={classes.option} onClick={signOut}>
          <ExitToApp style={{ fontSize: 18, marginRight: 5 }}></ExitToApp>Logout
        </MenuItem>
      </Menu>
    </div>
  )
}
