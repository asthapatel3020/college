import React, { FC } from 'react'
import { Button, ButtonProps, makeStyles } from '@material-ui/core'
import { EditIcon } from '../../utils/icon'

type EditButtonProps = ButtonProps

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    padding: '1.5rem'
  },
  margin: {
    // margin: theme.spacing(1),
    width: '100%',
    color: '#009AAA',
    background: '#ECEFF1',
    height: 45,
    borderRadius: 25,
    fontFamily: 'Merriweather',
    fontSize: 15,
    lineHeight: 1,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#ECEFF1',
      color: '#009AAA'
    },
    '& .MuiButton-label': {
      justifyContent: 'center',
      alignItems: 'center',
      '& .MuiButton-iconSizeLarge': {
        marginRight: 2,
        marginTop: 4,
        '& > *:first-child': {
          fontSize: 17
        }
      }
    }
  }
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditButton: FC<EditButtonProps> = ({ onClick }) => {
  const classes = useStyles()
  return (
    <Button onClick={onClick} variant="contained" size="large" startIcon={<EditIcon />} className={classes.margin}>
      Edit
    </Button>
  )
}
