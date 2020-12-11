import React, { FC } from 'react'
import { Dialog, DialogContent, DialogTitle, Typography, makeStyles, IconButton, DialogProps } from '@material-ui/core'
import { CancelOutlined } from '@material-ui/icons'

interface ModalProps extends DialogProps {
  onCloseModal: () => void
  open: boolean
  onRefetch?: () => void
  title: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}))

export const Modal: FC<ModalProps> = ({ onCloseModal, open, children, title, maxWidth }) => {
  const classes = useStyles()
  return (
    <Dialog onClose={onCloseModal} open={open} maxWidth={maxWidth} fullWidth aria-labelledby="customized-dialog-title">
      <DialogTitle disableTypography className={classes.root}>
        <Typography
          variant="h6"
          component="h6"
          style={{ fontFamily: 'Merriweather-Regular', color: '#3B3A3C', fontWeight: 'bold' }}
        >
          {title}
        </Typography>
        {onCloseModal ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onCloseModal}>
            <CancelOutlined style={{ color: '#B0BEC5' }} />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  )
}
