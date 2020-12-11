import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Content } from './Content'
import { SideBar } from './SideBar'
import { TopBar } from './TopBar'
import { Drawer, Toolbar, Hidden } from '@material-ui/core'
import { useLocation } from 'react-router-dom'

const drawerWidth = 190

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    height: '100%',
    padding: theme.spacing(3),
    background: '#E5E5E5'
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0
  }
}))

export const Main: FC<{ signOut: () => void }> = ({ signOut }) => {
  const classes = useStyles()
  const location = useLocation()
  // console.log(location.pathname);
  // const theme = useTheme();
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  // function handleDrawerToggle() {
  //     setMobileOpen(!mobileOpen)
  // }

  return (
    <div className={classes.main} data-testid="app-main">
      {/* <CssBaseline /> */}
      <TopBar signOut={signOut} />

      {/* <Hidden lgUp implementation="css"> */}
      {/* <Drawer
                        className={classes.drawer}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
                            <CloseOutlined />
                        </IconButton>
                       
                        <SideBar />
                       
                    </Drawer>
                </Hidden> */}
      {location.pathname !== '/accountSettings' && location.pathname !== '/campus' ? (
        <nav className={classes.drawer}>
          <Hidden xsDown implementation="css">
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <Toolbar></Toolbar>
              <SideBar />
            </Drawer>
          </Hidden>
        </nav>
      ) : (
        <></>
      )}
      {/* </nav> */}

      <div className={classes.content}>
        <div className={classes.toolbar} />
        <Content />
      </div>
    </div>
  )
}
