import 'date-fns'
import parse from 'date-fns/parse'
import React, { FC } from 'react'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { createMuiTheme, FormControl, FormHelperText, Grid, makeStyles, MuiThemeProvider } from '@material-ui/core'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

interface InputDatePickerProps {
  selectedDate: string
  onHandleDateChange: (date: any) => void
  title: string
  placeholder: string
  required?: boolean
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3EC1D3',
      light: '#3EC1D3',
      dark: '#3EC1D3'
    },
    secondary: {
      main: '#3EC1D3  '
    }
  }
})

const useStyles = makeStyles(() => ({
  container: {
    '& .MuiOutlinedInput-root': {
      // borderRadius: 15,
      '& .MuiOutlinedInput-input': {
        padding: '12.5px 14px'
      },
      '& .MuiInputAdornment-root': {
        marginRight: 0,
        '& .MuiButtonBase-root': {
          padding: 0
        }
      }
    },
    '.MuiPaper-rounded': {
      borderRadius: 10,
      '.MuiPickersDay-daySelected': {
        background: '#3EC1D3'
      }
    }
  },
  label: {
    fontFamily: 'Lato-Light',
    fontSize: 16,
    color: '#607D8B',
    fontWeight: 500
  },
  asterik: {
    marginLeft: 5,
    color: '#3EC1D3'
  }
}))

export const InputDatePicker: FC<InputDatePickerProps> = ({
  selectedDate,
  onHandleDateChange,
  title,
  placeholder,
  required
}) => {
  const classes = useStyles()
  return (
    <>
      {title ? (
        <Grid item style={{ marginLeft: 6, marginBottom: 5 }}>
          <FormControl style={{ alignItems: 'center', flexDirection: 'row' }}>
            <FormHelperText id="filled-weight-helper-text" className={classes.label}>
              {title}
            </FormHelperText>
            {required && <span className={classes.asterik}>&#42;</span>}
            {/* <Typography variant="subtitle2" style={{fontFamily:"Lato-Light", fontSize:18, color:"#607D8B"}}>{title}</Typography> */}
          </FormControl>
        </Grid>
      ) : null}
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            // disableFuture
            className={classes.container}
            disableToolbar
            variant="inline"
            leftArrowIcon={<KeyboardArrowLeft />}
            rightArrowIcon={<KeyboardArrowRight />}
            inputVariant="outlined"
            // label="With keyboard"
            placeholder={placeholder}
            format="dd/MM/yyyy"
            value={selectedDate && parse(selectedDate, 'dd/MM/yyyy', new Date())}
            InputProps={{ style: { borderRadius: 10 } }}
            InputAdornmentProps={{ position: 'start', color: '#B0BEC5' }}
            onChange={onHandleDateChange}
          />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </>
  )
}
