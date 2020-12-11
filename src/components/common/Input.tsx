import React from 'react'
import {
  Grid,
  FormControl,
  TextField,
  GridSize,
  BaseTextFieldProps,
  OutlinedTextFieldProps,
  InputAdornment,
  FormHelperText,
  makeStyles
} from '@material-ui/core'

import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'

const useStyles = makeStyles(() => ({
  margin: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 15,
      '& .MuiOutlinedInput-input': {
        padding: '12.5px 14px',
        fontFamily: 'Lato',
        color: '#3B3A3C',
        fontSize: 16
      },
      '& .Mui-disabled': {
        fontFamily: 'Lato',
        color: '#3B3A3C',
        fontSize: 16
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

interface CustomInputProps extends BaseTextFieldProps {
  textFieldBreakpoints?: Partial<Record<Breakpoint, boolean | GridSize>>
  titleBreakpoints?: Partial<Record<Breakpoint, boolean | GridSize>>
  adornment?: React.ReactNode
  adornmentPosition?: 'start' | 'end'
}
export type InputProps = CustomInputProps & Omit<OutlinedTextFieldProps, 'variant'>
export const Input = ({
  autoComplete,
  disabled,
  fullWidth,
  id,
  inputProps,
  placeholder,
  name,
  onBlur,
  onChange,
  textFieldBreakpoints,
  title,
  titleBreakpoints,
  type,
  value,
  error,
  helperText,
  adornment,
  rows,
  multiline = false,
  required = false,
  adornmentPosition = 'end'
}: InputProps) => {
  const classes = useStyles()
  return (
    <>
      {title ? (
        <Grid item {...titleBreakpoints} style={{ marginLeft: 6, marginBottom: 5 }}>
          <FormControl style={{ alignItems: 'center', flexDirection: 'row' }}>
            <FormHelperText id="filled-weight-helper-text" className={classes.label}>
              {title}
            </FormHelperText>
            {required && <span className={classes.asterik}>&#42;</span>}
            {/* <Typography variant="subtitle2" style={{fontFamily:"Lato-Light", fontSize:18, color:"#607D8B"}}>{title}</Typography> */}
          </FormControl>
        </Grid>
      ) : null}
      <Grid item {...textFieldBreakpoints}>
        <FormControl fullWidth={fullWidth}>
          <TextField
            className={classes.margin}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            id={id}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            type={type}
            value={value}
            variant="outlined"
            rows={rows}
            error={error}
            multiline={multiline}
            helperText={helperText}
            inputProps={inputProps}
            InputProps={{
              type: type,
              endAdornment:
                adornment && adornmentPosition === 'end' ? (
                  <InputAdornment position={adornmentPosition}>{adornment}</InputAdornment>
                ) : null,
              startAdornment:
                adornment && adornmentPosition === 'start' ? (
                  <InputAdornment position={adornmentPosition}>{adornment}</InputAdornment>
                ) : null
            }}
          />
        </FormControl>
      </Grid>
    </>
  )
}
