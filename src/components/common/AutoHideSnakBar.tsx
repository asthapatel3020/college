import React from 'react'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import MuiAlert, { Color } from '@material-ui/lab/Alert'

interface AutoHideSnackBarProps {
  autoHideDuration?: number
  key?: string
  handleClose: () => void
  message?: string
  open: boolean
  severity?: Color
}
export const AutoHideSnackBar = ({
  autoHideDuration = 5000,
  key,
  handleClose,
  message,
  open,
  severity
}: AutoHideSnackBarProps) => {
  return (
    <Snackbar
      key={key}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      action={
        <>
          <IconButton aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </>
      }
    >
      <MuiAlert onClose={handleClose} severity={severity} variant={severity ? 'filled' : 'standard'}>
        {message}
      </MuiAlert>
    </Snackbar>
  )
}
