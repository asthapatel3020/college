import { Dialog, DialogContent, Grid } from '@material-ui/core'
import React, { FC, useState } from 'react'
import { CancelButton } from '../../CancelButton'
import { InputDatePicker } from '../../InputDatePicker'
import { SubmitButton } from '../../SubmitButton'
import moment from 'moment'
import { parse } from 'date-fns'

interface SelectDateModalProps {
  open: boolean
  onCloseModal: () => void
  onView: (startDate: string, endDate: string) => void
}

export const SelectDateModal: FC<SelectDateModalProps> = ({ open, onCloseModal, onView }) => {
  const [fromDate, setFromDate] = useState<string>(moment(new Date()).format('DD/MM/yyyy'))
  const [toDate, setToDate] = useState<string>(moment(new Date()).add(1, 'y').format('DD/MM/yyyy'))
  return (
    <>
      <Dialog onClose={onCloseModal} open={open} maxWidth={'sm'} fullWidth aria-labelledby="customized-dialog-title">
        <DialogContent>
          <>
            <Grid container spacing={4}>
              <Grid item xs={6} sm={6}>
                <InputDatePicker
                  title={'From'}
                  placeholder="DD/MM/YYYY"
                  selectedDate={fromDate}
                  onHandleDateChange={(date) => setFromDate(moment(date).format('DD/MM/yyyy'))}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <InputDatePicker
                  title={'To'}
                  placeholder="DD/MM/YYYY"
                  selectedDate={toDate}
                  onHandleDateChange={(date) => setToDate(moment(date).format('DD/MM/yyyy'))}
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              spacing={3}
              justify="flex-end"
              alignContent="flex-end"
              alignItems="flex-end"
            >
              <Grid item xs={1} sm={2}>
                <CancelButton onPress={onCloseModal} label={'Reset'} />
              </Grid>
              <Grid item xs={2} sm={2}>
                <SubmitButton
                  onPress={() =>
                    onView(
                      moment(parse(fromDate, 'dd/MM/yyyy', new Date())).format('DD MMM yyyy'),
                      moment(parse(toDate, 'dd/MM/yyyy', new Date())).format('DD MMM yyyy')
                    )
                  }
                  label="View"
                />
              </Grid>
            </Grid>
          </>
        </DialogContent>
      </Dialog>
    </>
  )
}
