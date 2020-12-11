import { Avatar, Badge, Divider, makeStyles, Typography } from '@material-ui/core'
import { CreateOutlined } from '@material-ui/icons'
import React, { FC } from 'react'

const useStyles = makeStyles(() => ({
  nameDiv: {
    height: 50,
    width: 50,
    background: '#FF9E45',
    borderRadius: 32,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    fontSize: 20,
    fontFamily: 'Merriweather',
    fontWeight: 'bold'
  },
  iconDiv: {
    color: 'rgb(0, 154, 170)',
    transform: 'rotate(-10deg)',
    background: '#FFFFFF',
    // position: 'absolute',
    // marginLeft: 37,
    // top: '29.5%',
    fontSize: 16,
    borderRadius: 25,
    padding: 4
  }
}))

export const ProfilePicEdit: FC<{ nickname: string; name: string; handleEdit: () => void }> = ({
  nickname,
  name,
  handleEdit
}) => {
  const classes = useStyles()
  return (
    <div style={{ padding: 10 }}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        onClick={handleEdit}
        badgeContent={<CreateOutlined className={classes.iconDiv}></CreateOutlined>}
      >
        <Avatar onClick={handleEdit} alt="AJd" src="" className={classes.nameDiv}>
          {nickname}
        </Avatar>
      </Badge>
      <Typography
        style={{ fontFamily: 'Merriweather', fontSize: 20, fontWeight: 'bold', color: '#fff', marginTop: 10 }}
      >
        {name}
      </Typography>
      <Typography variant="caption" style={{ fontFamily: 'Lato', fontSize: 14, color: '#B0BEC5', marginTop: 10 }}>
        Campus Ambassador
      </Typography>
      <Divider
        variant="fullWidth"
        style={{ marginTop: 10, marginBottom: 15, backgroundColor: 'rgb(229 231 232 / 0.2)' }}
      ></Divider>
    </div>
  )
}
