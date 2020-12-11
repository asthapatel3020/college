/* eslint-disable react/no-unescaped-entities */
import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { FC, useState } from 'react'
import { CancelButton } from '../../CancelButton'
import { Modal } from '../../Modal'
import { SubmitButton } from '../../SubmitButton'

interface WarningModalProps {
  open: boolean
  onCloseModal: () => void
  sendResult: (accept: boolean) => void
}

const useStyle = makeStyles(() => ({
  infoText: {
    fontFamily: 'Lato',
    fontSize: 16,
    color: '#3B3A3C'
  }
}))

export const WarningModal: FC<WarningModalProps> = ({ open, onCloseModal, sendResult }) => {
  const classes = useStyle()
  const [accept, setAccept] = useState<boolean>(false)
  return (
    <>
      <Modal open={open} onCloseModal={onCloseModal} title="Warning!" maxWidth="xs">
        <Typography className={classes.infoText}>
          You are trying to split under 'Apply Knowlegde of WHS legislation in the workplace' into two parts.
        </Typography>
        <Typography className={classes.infoText}>Are you sure you want to split?</Typography>
        <Grid container direction="row" spacing={3} justify="flex-end" alignContent="flex-end" alignItems="flex-end">
          <Grid item xs={1} sm={2}>
            <CancelButton
              onPress={() => {
                setAccept(true)
                sendResult(accept)
              }}
              label="Yes"
            />
          </Grid>
          <Grid item xs={2} sm={2}>
            <SubmitButton
              onPress={() => {
                setAccept(false)
                sendResult(accept)
              }}
              label="No"
            />
          </Grid>
        </Grid>
      </Modal>
    </>
  )
}
