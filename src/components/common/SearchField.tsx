import React, { FC } from 'react'
import { InputAdornment, makeStyles, TextField } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    padding: '1.5rem'
  },
  margin: {
    // margin: theme.spacing(1),
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 25,
      height: 45,
      background: 'white',
      boxShadow: '0 3 5 rgba(176, 190, 197, 0.32)',
      '&:hover': {
        borderColor: '#FFFFFF',
        borderWidth: 2
      }
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0000003b'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0000003b'
    }
  },
  searchTxt: {
    fontFamily: 'Lato-Regular',
    color: '#3B3A3C',
    fontSize: 17,
    '&:hover': {
      borderColor: '#FFFFFF',
      borderWidth: 2
    }
  }
}))

interface SearchFieldProps {
  placeholder: string
  onChange: (searchText: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SearchField: FC<SearchFieldProps> = ({ placeholder, onChange }) => {
  const classes = useStyles()
  return (
    <TextField
      className={classes.margin}
      id="input-with-icon-textfield"
      variant="outlined"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        classes: {
          input: classes.searchTxt
        },
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlined style={{ color: '#90A4AE', fontFamily: 'Lato-Regular' }} />
          </InputAdornment>
        )
      }}
    />
  )
}
