import { AppBar, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import './App.css';
import Notifications from './components/Notifications';
import Sidebar from './components/SideBar';
import VideoPlayer from './components/VideoPlayer';

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    textAlign: 'center',
    margin: '10px 30px',
    borderRadius: 15,
    width: '600px',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    border: '4px solid black',
    [theme.breakpoints.down('xs')]: {
      width: '90%'
    }
  }, 
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column'
  }
}))
function App() {
  const classes = useStyles();
  return (
    <div className = {classes.wrapper}>
      <AppBar className = {classes.appBar} color = 'inherit' position = 'static'>
        <Typography variant = 'h4' align= 'center'>Video call</Typography>
      </AppBar>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </div>
  );
}

export default App;
