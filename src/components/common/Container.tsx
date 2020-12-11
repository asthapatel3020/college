import React, { FC, PropsWithChildren } from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  container: {
    height: '100%',
    padding: '1.5rem'
  }
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Container: FC<PropsWithChildren<any>> = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.container}>{children}</div>
}
