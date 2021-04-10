import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { SocketContext } from '../context/Context';

const useStyles = makeStyles((theme) => ({
  video: {
    width: "450px",
    height: '200px',
    [theme.breakpoints.down('xs')]: {
      width: "330px"
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  paper: {
    marginLeft: '5px',
    marginRight: '5px',
    padding: '1px',
    border: '2px solid black'
  }
}));
const VideoPlayer = () => {
  const {stream, name, myVideo, callAccepted, callEnded, userVideo, call} = useContext(SocketContext);
  const classes = useStyles();
  return (  
    <Grid container className = {classes.gridContainer}>
      {stream && (
        <Paper className = {classes.paper}>
          <Grid item xs = {12} md = {6}>
            <Typography variant = 'h5' gutterBottom color = 'red'>{name || "anonymous"}</Typography>
            <video playsInline muted ref = {myVideo} autoPlay className = {classes.video}/>
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Nameqwewqee'}</Typography>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
}
 
export default VideoPlayer;