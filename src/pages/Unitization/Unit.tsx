import { Grid, makeStyles, Tab, Tabs } from '@material-ui/core'
import React, { ChangeEvent, FC, useState } from 'react'
import { SummaryTabPanel } from '../../components/common/Unitization/SummaryTabPanel'
import { a11yProps } from '../../utils/a11y'
import { Schedule } from './Schedule'

const useStyles = makeStyles(() => ({
  sideContianer: {
    // boxShadow: '3px 3px 10px #CFD8DC',
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    // borderBottomLeftRadius: 10,
    '& .MuiTab-textColorInherit': {
      opacity: 1
    },
    '& .MuiTabs-indicator': {
      display: 'none'
    },
    '& .Mui-selected': {
      background: '#FFF !important',
      color: '#3B3A3C !important',
      fontWeight: 'bold !important'
    },
    '& .MuiTab-root': {
      textTransform: 'capitalize',
      fontFamily: 'Merriweather',
      fontSize: 15,
      marginTop: 10,
      fontWeight: 'normal',
      minHeight: 40,
      minWidth: 110,
      color: '#3B3A3C',
      background: '#ECEFF1',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      '&::before': {
        borderRight: 0,
        // -moz-border-radius:0px 0 0 15px;
        // -webkit-border-radius:0px 0 0 15px;
        right: -40.7
      },
      '& .MuiTab-wrapper': {
        alignItems: 'center'
      }
    },
    '& .MuiTypography-body1': {
      background: '#FFFFFF',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10
    }
  }
}))

export const Unit: FC<{ baseUrl: string }> = () => {
  const classes = useStyles()
  const [currentTab, setCurrentTab] = useState(0)
  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (_event: ChangeEvent<{}>, newTab: number) => setCurrentTab(newTab)

  return (
    <Grid className={classes.sideContianer}>
      <Tabs value={currentTab} onChange={handleChange} aria-label="projects tabs" orientation="horizontal">
        <Tab label="Summary" {...a11yProps(0)} />
        <Tab label="Schedule" {...a11yProps(1)} />
      </Tabs>
      <SummaryTabPanel value={currentTab} index={0}>
        <p> Under counstruction</p>
      </SummaryTabPanel>
      <SummaryTabPanel value={currentTab} index={1}>
        <Schedule />
      </SummaryTabPanel>
    </Grid>
  )
}
