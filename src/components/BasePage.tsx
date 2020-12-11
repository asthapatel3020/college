import { Divider, Grid, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { Footer } from './common/Login/Footer'
import SolvitudeLogo from '../assets/solvitude.svg'
import DanfordLogo from '../assets/danford.svg'
import loginBg from '../assets/loginbackground.png'

export const BasePage: FC<{ title: string }> = ({ title, children }) => {
  return (
    <Grid
      container
      style={{
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Grid item xs={12} sm={6}>
        <div
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            display: 'flex',
            marginTop: 50
          }}
        >
          <img src={SolvitudeLogo} style={{ marginRight: 10 }}></img>
          <Divider orientation="vertical" flexItem />
          <img src={DanfordLogo} style={{ marginLeft: 10 }}></img>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '60%'
          }}
        >
          <Typography variant="h6" style={{ fontFamily: 'Merriweather-Regular', fontWeight: 'bold', color: '#3B3A3C' }}>
            {title}
          </Typography>
          {children}
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <img
          src={loginBg}
          alt={'login'}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </Grid>
      <Footer />
    </Grid>
  )
}
