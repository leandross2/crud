import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import PersonPin from '@material-ui/icons/PersonPin'
import Link from '@material-ui/core/Link'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: '#1b2635',
      color: '#dcdcdc'
    },
    mainTitle: {
      margin: '0 auto',
      letterSpacing: '3px',
      fontSize: '31px'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3)
    }
  })
)

function PermanentDrawerLeft(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.mainTitle} variant="h6" noWrap>
            Vnda
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Clientes'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <PersonPin />
              </ListItemIcon>
              <Link href="/" className={makeStyles.link}>
                <ListItemText primary={text} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main paragraph className={classes.content}>
        <div className={classes.toolbar} />
        <div paragraph>{props.children}</div>
      </main>
    </div>
  )
}

export default PermanentDrawerLeft
