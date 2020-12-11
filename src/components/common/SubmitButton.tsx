import React, { FC } from 'react'
import { Button, CircularProgress, makeStyles } from '@material-ui/core'

interface SubmitButtonProps {
  onPress: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  label: string
  loading?: boolean
}

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    padding: '1.5rem'
  },
  margin: {
    // margin: theme.spacing(1),
    width: '100%',
    color: '#FFFFFF',
    background: '#009AAA',
    height: 40,
    borderRadius: 25,
    fontFamily: 'Merriweather',
    fontSize: 15,
    lineHeight: 1,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#009AAA',
      color: '#FFF'
    }
  }
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SubmitButton: FC<SubmitButtonProps> = ({ label, onPress, loading }) => {
  const classes = useStyles()
  return (
    <Button onClick={onPress} variant="contained" size="large" className={classes.margin}>
      {loading && <CircularProgress size={15} style={{ color: '#FFFFFF' }} />}
      {!loading && label}
      {/* {label} */}
    </Button>
  )
}
