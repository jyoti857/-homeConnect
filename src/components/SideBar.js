import { Button, makeStyles, TextField, Typography, Grid, Paper } from '@material-ui/core';
import { Phone, PhoneDisabled } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { SocketContext } from '../context/Context';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    width: '600px',
    margin: '15px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%'
    }
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  paper: {
    padding: '1px 20px',
    background: "linear-gradient(-90deg, rgba(2,0,36,1) 0%, rgba(222,58,222,1) 27%, rgba(219,188,227,1) 100%);",
    border: '2px solid linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(137,46,182,1) 66%, rgba(0,212,255,1) 100%);',
    color: 'white'
  },
  margin: {marginTop: 10},
  padding: {padding: '4px'},
  button: {
    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(137,46,182,1) 66%, rgba(0,212,255,1) 100%);',
    marginTop: 10
  }
}))
const Sidebar= ({children}) => {
  const {callAccepted, callEnded, name, setName, me, callUser, leaveCall } = useContext(SocketContext);
  const classes = useStyles();
  const [idToCall, setIdToCall] = useState('');
  console.log("from side bar -->", me )
  return (  
    <Grid className = {classes.container}>
      <Paper elevation = {10} className = {classes.paper}>
        <form className = {classes.root} noValidate autoComplete = 'off'>
          <Grid container className = {classes.gridContainer}>
            <Grid item xs = {12} md = {6} className = {classes.padding}>
              <Typography variant = 'h9' gutterBottom>Account Info</Typography>
              <TextField label = 'Name'  value = {name} onChange = {e => setName(e.target.value)} fullWidth/>
              <CopyToClipboard text = {me} className = {classes.margin}>
                <Button variant = 'contained' fullWidth
                  color = 'primary'
                >Copy your ID</Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs = {12} md ={6} className = {classes.padding}>
              <Typography gutterBottom variant = 'h9'>Make a call</Typography>
              <TextField label = "ID to call" value = {idToCall} onChange = {e => setIdToCall(e.target.value)} fullWidth />
              {callAccepted && !callEnded ? (
                <Button
                  variant = 'contained'
                  color = 'secondary'
                  startIcon = {<PhoneDisabled fontSize = 'large'/>}
                  onClick = {leaveCall}
                  className = {classes.margin}
                  fullWidth
                >Hang up</Button>
              ):(
                <Button
                  variant = 'contained'
                  startIcon = {<Phone fontSize = 'large'/>}
                  onClick = {() => callUser(idToCall)}
                  className = {classes.button}
                  fullWidth
                >Call </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Grid>
  );
}
 
export default Sidebar;