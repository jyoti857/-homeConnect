import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { SocketContext } from '../context/Context';


const Notifications = () => {
  const {call, callAccepted, answerCall} = useContext(SocketContext);
  console.log("call ---> ", call, callAccepted, answerCall)
  return ( 
    <>
      {call && call.isReceivingCall && !callAccepted && (
        <div>
           <h1> 
            {call.name} is calling!!!
          </h1>
          <Button
            color = 'primary'
            variant = 'contained'
            onClick = {answerCall}
          >Answer</Button>
        </div>
      )}
    </>
   );
}
 
export default Notifications;