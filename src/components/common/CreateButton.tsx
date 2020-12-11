import React, { FC } from 'react'
import { Button, ButtonProps, makeStyles } from '@material-ui/core'

interface CreateButtonProps extends ButtonProps {
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
    color: '#FFFFFF',
    background: '#009AAA',
    height: 45,
    borderRadius: 25,
    fontFamily: 'Merriweather',
    fontSize: 18,
    lineHeight: 1,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#009AAA',
      color: '#FFF'
    }
  }
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CreateButton: FC<CreateButtonProps> = ({ label, startIcon, onClick }) => {
  const classes = useStyles()
  return (
    <Button {...{ startIcon, onClick }} variant="contained" size="large" className={classes.margin}>
      {label}
    </Button>
  )
}
