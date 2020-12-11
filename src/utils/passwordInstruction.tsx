import { makeStyles } from '@material-ui/core'
import { Check } from '@material-ui/icons'
import React, { FC } from 'react'

const useStyles = makeStyles(() => ({
  checkContainer: {
    height: 20,
    width: 20,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  listContainer: {},
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    '& span': {
      marginLeft: 6,
      fontFamily: 'Lato',
      fontSize: 16,
      color: '#607D8B'
    }
  }
}))

interface PasswordInstructionProps {
  isLengthValid: boolean
  isUpperLowerCaseValid: boolean
  isSpecialCharValid: boolean
}

export const PasswordInstruction: FC<PasswordInstructionProps> = ({
  isLengthValid,
  isSpecialCharValid,
  isUpperLowerCaseValid
}) => {
  const classes = useStyles()
  return (
    <div style={{ margin: 10 }}>
      <div className={classes.listItemContainer}>
        <div style={{ background: isLengthValid ? '#73E1D4' : '#ECEFF1' }} className={classes.checkContainer}>
          <Check style={{ fontSize: 14, color: isLengthValid ? '#009AAA' : '#B0BEC5' }}></Check>
        </div>
        <span>8 characters long</span>
      </div>
      <div className={classes.listItemContainer}>
        <div style={{ background: isSpecialCharValid ? '#73E1D4' : '#ECEFF1' }} className={classes.checkContainer}>
          <Check style={{ fontSize: 14, color: isSpecialCharValid ? '#009AAA' : '#B0BEC5' }}></Check>
        </div>
        <span>Contain Special Characters</span>
      </div>
      <div className={classes.listItemContainer}>
        <div style={{ background: isUpperLowerCaseValid ? '#73E1D4' : '#ECEFF1' }} className={classes.checkContainer}>
          <Check style={{ fontSize: 14, color: isUpperLowerCaseValid ? '#009AAA' : '#B0BEC5' }}></Check>
        </div>
        <span>Contains uppercase and lower case letters</span>
      </div>
    </div>
  )
}
