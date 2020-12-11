import { Grid, makeStyles, SvgIcon, SvgIconProps, Tab, Tabs, Typography } from '@material-ui/core'
import { KeyboardArrowLeft } from '@material-ui/icons'
import React, { ChangeEvent, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AccountSettingTabPanel } from '../../components/common/AccountSetting/AccountSettingTabPanel'
import { CurrentUserContext } from '../../contexts'
import { a11yProps } from '../../utils/a11y'
import { PasswordSettings } from './PasswordSettings'
import { PersonalDetails } from './PersonalDetails'
import { ProfilePicEdit } from './ProfilePicEdit'

const useStyles = makeStyles(() => ({
  sideContianer: {
    background: '#3B3A3C',
    boxShadow: '3px 3px 10px #CFD8DC',
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    '& .MuiTab-textColorInherit': {
      opacity: 1
    },
    '& .MuiTabs-indicator': {
      display: 'none'
    },
    '& .Mui-selected': {
      backgroundColor: 'rgb(62 193 211 / 0.4)',
      // opacity:0.8,
      borderRadius: '0px 30px 30px 0px',
      marginRight: 15,
      '&::before': {
        content: 'close-quote',
        position: 'absolute',
        backgroundColor: '#3EC1D3',
        height: 71,
        width: 10,
        left: 0
        // marginRight: 4,
      }
    },
    '& .MuiTab-root': {
      textTransform: 'capitalize',
      fontFamily: 'Merriweather',
      fontSize: 15,
      marginTop: 10,
      padding: '4px 30px',
      color: '#FFFFFF',
      '& .MuiTab-wrapper': {
        alignItems: 'start'
      }
    }
  }
}))

function ProfileIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.03125 11.25C10.2087 11.25 12.7841 8.73112 12.7841 5.625C12.7841 2.51888 10.2087 0 7.03125 0C3.85376 0 1.27841 2.51888 1.27841 5.625C1.27841 8.73112 3.85376 11.25 7.03125 11.25ZM12.5942 9.74194C11.3082 11.3406 9.29787 12.375 7.03125 12.375C4.76463 12.375 2.75433 11.3406 1.46825 9.74194C0.577839 10.3562 0 11.3012 0 12.375V14.625C0 16.4886 1.71754 18 3.83523 18H10.2273C12.345 18 14.0625 16.4886 14.0625 14.625V12.375C14.0625 11.3012 13.4847 10.3562 12.5942 9.74194Z"
        fill="white"
      />
    </SvgIcon>
  )
}

function LockIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.625 16.875C3.13987 16.875 1.125 14.8601 1.125 12.375C1.125 9.88987 3.13987 7.875 5.625 7.875C8.02575 7.875 10.125 9.97425 10.125 12.375C10.125 14.8601 8.11013 16.875 5.625 16.875ZM2.25 4.5C2.25 2.63644 3.76144 1.125 5.625 1.125C7.48856 1.125 9 2.63644 9 4.5V7.88288C8.05894 7.17469 6.89344 6.75 5.625 6.75C4.35712 6.75 3.19106 7.17469 2.25 7.88288V4.5ZM10.125 9.01069V4.5C10.125 2.01487 8.11013 0 5.625 0C3.13987 0 1.125 2.01487 1.125 4.5V9.01069C0.421875 9.94951 0 11.1116 0 12.375C0 15.4817 2.51888 18 5.625 18C8.73112 18 11.25 15.4817 11.25 12.375C11.25 11.1116 10.8281 9.94951 10.125 9.01069ZM5.625 11.25C5.31394 11.25 5.0625 11.502 5.0625 11.8125V14.0625C5.0625 14.3736 5.31394 14.625 5.625 14.625C5.93606 14.625 6.1875 14.3736 6.1875 14.0625V11.8125C6.1875 11.502 5.93606 11.25 5.625 11.25Z"
        fill="white"
      />
    </SvgIcon>
  )
}

function HelpIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1146 10.0249C12.0263 10.0828 11.9261 10.125 11.8125 10.125H1.6875C1.377 10.125 1.125 9.87356 1.125 9.5625V5.0625C1.125 4.752 1.377 4.5 1.6875 4.5H11.8125C11.9323 4.5 12.0369 4.54556 12.1281 4.60913L13.4792 7.3035L12.1146 10.0249ZM7.875 15.75C7.875 16.371 7.371 16.875 6.75 16.875H5.625C5.004 16.875 4.5 16.371 4.5 15.75V11.25H7.875V15.75ZM4.5 2.25C4.5 1.629 5.004 1.125 5.625 1.125H6.75C7.371 1.125 7.875 1.629 7.875 2.25V3.375H4.5V2.25ZM14.4658 6.876L12.7896 3.53363C12.6697 3.41382 12.5106 3.36488 12.3536 3.375H9V2.25C9 1.00744 7.99256 0 6.75 0H5.625C4.38244 0 3.375 1.00744 3.375 2.25V3.375H1.125C0.504 3.375 0 3.879 0 4.5V10.125C0 10.746 0.504 11.25 1.125 11.25H3.375V15.75C3.375 16.9926 4.38244 18 5.625 18H6.75C7.99256 18 9 16.9926 9 15.75V11.25H12.375V11.2365C12.5246 11.2399 12.6754 11.1881 12.7896 11.0745L14.4658 7.73156C14.5924 7.49531 14.6092 7.41825 14.6261 7.3035C14.634 7.14994 14.5839 7.08975 14.4658 6.876Z"
        fill="white"
      />
    </SvgIcon>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const AccountSettings = () => {
  const history = useHistory()
  const classes = useStyles()
  const currentUser = useContext(CurrentUserContext)
  const [currentTab, setCurrentTab] = useState(0)
  const [enableEdit, setEnableEdit] = useState(false)
  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (_event: ChangeEvent<{}>, newTab: number) => setCurrentTab(newTab)
  const handleEdit = () => setEnableEdit(!enableEdit)

  return (
    <>
      {/* <Grid container spacing={4} direction="column"> */}
      <Grid container xs={12} sm={12} direction="row">
        <div
          onClick={() => history.push('/unitization')}
          style={{
            borderRadius: 15,
            height: 28,
            width: 28,
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <KeyboardArrowLeft style={{ color: '#009AAA', fontSize: 20 }} />
        </div>
        <Typography
          variant="subtitle2"
          style={{ fontFamily: 'Merriweather', fontSize: 18, marginLeft: 5, fontWeight: 'bold' }}
        >
          Account Settings
        </Typography>
      </Grid>
      <Grid container xs={12} sm={12} style={{ borderRadius: 15, marginTop: 20, marginBottom: 20, height: '70%' }}>
        <Grid item xs={'auto'} sm={2} className={classes.sideContianer}>
          <ProfilePicEdit
            name={currentUser.fname && currentUser.lname ? currentUser.fname + ' ' + currentUser.lname : ''}
            nickname={
              (currentUser.fname ? currentUser.fname.charAt(0) : '') +
              (currentUser.lname ? currentUser.lname.charAt(0) : '')
            }
            handleEdit={handleEdit}
          />
          <Tabs value={currentTab} onChange={handleChange} aria-label="projects tabs" orientation="vertical">
            <Tab label="Profile Details" icon={<ProfileIcon></ProfileIcon>} {...a11yProps(0)} />
            <Tab label="Password Settings" icon={<LockIcon></LockIcon>} {...a11yProps(1)} />
            <Tab label="Help" icon={<HelpIcon></HelpIcon>} {...a11yProps(2)} />
          </Tabs>
        </Grid>
        <Grid
          item
          xs={11}
          sm={10}
          style={{ background: '#ffffff', borderTopRightRadius: 10, borderBottomRightRadius: 10, padding: 10 }}
        >
          <AccountSettingTabPanel value={currentTab} index={0}>
            <PersonalDetails {...{ handleEdit, enableEdit }}></PersonalDetails>
          </AccountSettingTabPanel>
          <AccountSettingTabPanel value={currentTab} index={1}>
            <PasswordSettings></PasswordSettings>
          </AccountSettingTabPanel>
          <AccountSettingTabPanel value={currentTab} index={2}>
            <Typography
              variant="subtitle2"
              style={{ fontFamily: 'Merriweather', fontSize: 16, marginLeft: 5, fontWeight: 'bold' }}
            >
              This page is under development
            </Typography>
          </AccountSettingTabPanel>
        </Grid>
      </Grid>
      {/* </Grid> */}
    </>
  )
}
