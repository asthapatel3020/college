import React, { FC } from 'react'
import { Button, makeStyles } from '@material-ui/core'

interface CancelButtonProps {
  onPress: () => void
  label: string
}

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    padding: '1.5rem'
  },
  margin: {
    // margin: theme.spacing(1),
    width: '100%',
    color: '#009AAA',
    background: '#ECEFF1',
    height: 40,
    borderRadius: 25,
    fontFamily: 'Merriweather',
    fontSize: 15,
    lineHeight: 1,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#ECEFF1',
      color: '#009AAA'
    }
  }
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CancelButton: FC<CancelButtonProps> = ({ onPress, label }) => {
  const classes = useStyles()
  return (
    <Button onClick={onPress} variant="contained" size="large" className={classes.margin}>
      {label}
    </Button>
  )
}
