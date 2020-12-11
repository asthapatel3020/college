import React, { FC, useState, MouseEvent, useContext } from 'react'
import { makeStyles, MenuItem, Menu, Theme, Button, Avatar } from '@material-ui/core'
import { KeyboardArrowDown } from '@material-ui/icons'
import CampusOne from '../../assets/campusone.png'
import CampusTwo from '../../assets/campustwo.png'
import CampusThree from '../../assets/campusthree.png'
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
      top: 46,
      right: '8rem',
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
      right: '6.5rem',
      borderRadius: 5
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
    justifyContent: 'flex-start',
    '&:hover': {
      backgroundColor: 'rgb(62 193 211 / 0.4)',
      // opacity:0.8,
      borderRadius: '0px 30px 30px 0px',
      '&::before': {
        content: 'close-quote',
        position: 'absolute',
        backgroundColor: '#3EC1D3',
        height: 55,
        width: 10,
        marginLeft: -24,
        marginRight: 4
      }
    },
    '& .active': {
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
    }
  },
  drpBtn: {
    // margin: theme.spacing(1),
    color: '#009AAA',
    borderColor: '#009AAA',
    background: 'transparent',
    height: 45,
    borderRadius: 25,
    fontFamily: 'Merriweather',
    fontSize: 16,
    lineHeight: 1,
    textTransform: 'capitalize',
    '&:hover': {
      borderColor: '#3EC1D3',
      backgroundColor: '#3EC1D3',
      color: '#FFFFFF'
    }
  }
}))

const campus = [
  {
    id: '100',
    image: CampusThree,
    name: 'King St Campus'
  },
  {
    id: '101',
    image: CampusOne,
    name: 'William St Campus'
  },
  {
    id: '102',
    image: CampusTwo,
    name: 'Maruritius Campus'
  }
]

export const CampusMenu: FC = () => {
  const currentUser = useContext(CurrentUserContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [campusID, setCampusID] = useState('')
  const [campusName, setCampusName] = useState(localStorage.getItem('campusName'))
  const filterCampus = campus.map((val) => {
    if (currentUser.campusid) {
      if (currentUser.campusid.find((id) => val.id === id)) {
        return val
      }
    }
  })
  const classes = useStyles()

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
        <Button
          endIcon={<KeyboardArrowDown />}
          // onClick={() => {console.log()}}
          variant="outlined"
          size="large"
          className={classes.drpBtn}
        >
          {campusName}
        </Button>
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
        {currentUser.campusid
          ? filterCampus.map(
              (val) =>
                val && (
                  <MenuItem
                    className={`${classes.option} ${val?.id === campusID && 'active'}`}
                    onClick={() => {
                      setCampusName(val?.name ? val.name : '')
                      setCampusID(val?.id ? val.id : '')
                    }}
                  >
                    <Avatar alt="R" src={val?.image} style={{ marginRight: 10 }} />
                    {val?.name}
                  </MenuItem>
                )
            )
          : campus.map((val) => (
              // eslint-disable-next-line react/jsx-key
              <MenuItem
                className={`${classes.option} ${val.id === campusID && 'active'}`}
                onClick={() => {
                  setCampusName(val.name)
                  setCampusID(val.id)
                }}
              >
                <Avatar alt="R" src={val.image} style={{ marginRight: 10 }} />
                {val.name}
              </MenuItem>
            ))}
      </Menu>
    </div>
  )
}
