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
    border: '4px solid linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(137,46,182,1) 66%, rgba(0,212,255,1) 100%);',
    [theme.breakpoints.down('xs')]: {
      width: '90%'
    },
    background: 'linear-gradient(-90deg, rgba(0,212,255,1) 0%, rgba(137,46,182,1) 22%, rgba(0,212,255,1) 120%);',
  }, 
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column'
  },
  textColor: {
    color: '#892eb6'
  }
}))
function App() {
  const classes = useStyles();
  return (
    <div className = {classes.wrapper}>
      <AppBar className = {classes.appBar} color = 'inherit' position = 'static'>
        <Typography variant = 'h4' align= 'center'
          className = {classes.textColor}
        >Video call</Typography>
      </AppBar>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </div>
  );
}

export default App;
