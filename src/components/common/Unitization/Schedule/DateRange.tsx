import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { CalendarIcon } from '../../../../utils/icon'

const useStyle = makeStyles(() => ({
  contianer: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #009AAA',
    boxSizing: 'border-box',
    borderRadius: 25,
    padding: '8px 14px',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  dateRangeText: {
    fontFamily: 'Merriweather',
    color: '#009AAA',
    textTransform: 'capitalize',
    fontSize: 16
  }
}))

interface DateRangeProps {
  startDate: string
  endDate: string
  onClick: () => void
}

export const DateRange: FC<DateRangeProps> = ({ startDate, endDate, onClick }) => {
  const classes = useStyle()
  return (
    <Box className={classes.contianer} onClick={onClick}>
      <CalendarIcon style={{ margin: '6px -5px -5px 0px', fontSize: '1.7rem' }} />
      <Typography className={classes.dateRangeText}>{startDate + ' - ' + endDate}</Typography>
    </Box>
  )
}
