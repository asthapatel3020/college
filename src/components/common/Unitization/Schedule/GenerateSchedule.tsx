/* eslint-disable react/no-unescaped-entities */
import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { FC, useState } from 'react'
import moment from 'moment'
import { InputDatePicker } from '../../InputDatePicker'
import { Modal } from '../../Modal'
import { CancelButton } from '../../CancelButton'
import { SubmitButton } from '../../SubmitButton'
import { parse } from 'date-fns'

interface GenerateModalProps {
  open: boolean
  onCloseModal: () => void
  handleWarningModal: (startDate: string) => void
}

const useStyle = makeStyles(() => ({
  infoText: {
    fontFamily: 'Lato',
    fontSize: 16,
    color: '#3B3A3C'
  }
}))

export const GenerateSchedule: FC<GenerateModalProps> = ({ open, onCloseModal, handleWarningModal }) => {
  const classes = useStyle()
  const [startDate, setStartDate] = useState<string>('')
  return (
    <>
      <Modal open={open} onCloseModal={onCloseModal} title="Generate Schedule" maxWidth="xs">
        <Typography className={classes.infoText}>
          Generating schedule for 'BSB61218 Advance Diploma of Program Management'
        </Typography>
        <Grid item xs={6} sm={6} style={{ marginTop: 15 }}>
          <InputDatePicker
            title={'Select Start Date'}
            placeholder="DD/MM/YYYY"
            selectedDate={startDate}
            onHandleDateChange={(date) => setStartDate(moment(date).format('DD/MM/yyyy'))}
          />
        </Grid>
        <Grid container direction="row" spacing={3} justify="flex-end" alignContent="flex-end" alignItems="flex-end">
          <Grid item xs={1} sm={2}>
            <CancelButton onPress={onCloseModal} label={'Cancel'} />
          </Grid>
          <Grid item xs={2} sm={2}>
            <SubmitButton
              onPress={() =>
                handleWarningModal(moment(parse(startDate, 'dd/MM/yyyy', new Date())).format('DD MMM yyyy'))
              }
              label="Go"
            />
          </Grid>
        </Grid>
      </Modal>
    </>
  )
}
