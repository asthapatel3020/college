import { Checkbox, createStyles, FormControl, FormControlLabel, makeStyles, Theme } from '@material-ui/core'
import React, { FC } from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    formControl: {
      marginLeft: theme.spacing(3),
      '& .MuiCheckbox-colorSecondary.Mui-checked': {
        color: '#3EC1D3'
      },
      '& .MuiTypography-root': {
        color: '#3B3A3C',
        fontFamily: 'Lato',
        fontSize: 17
      },
      '& .MuiSvgIcon-root': {
        fontFamily: 'Lato',
        fontSize: 17
      }
    }
  })
)

interface InputCheckBoxProps {
  error: boolean
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
  name: string
  label: string
  key: string
}

export const InputCheckBox: FC<InputCheckBoxProps> = ({ error, checked, handleChange, name, label, key }) => {
  const classes = useStyles()

  return (
    <FormControl required error={error} component="fieldset" className={classes.formControl}>
      {/* <FormGroup> */}
      <FormControlLabel
        control={<Checkbox key={key} checked={checked} onChange={handleChange} name={name} style={{}} />}
        label={label}
      />
      {/* </FormGroup> */}
    </FormControl>
  )
}
