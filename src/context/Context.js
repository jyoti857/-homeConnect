import Peer from 'simple-peer';
import React, {createContext, useState, useEffect, useRef} from 'react';
import {io} from 'socket.io-client';


const SocketContext = createContext();
const ContextProvider = ({children}) => {
  const [callAccepted, setCallAccepted ] = useState();
  const [callEnded, setCallEnded] = useState();
  const [stream, setStream] = useState();
  const [name, setName] = useState();
  const [call, setCall] = useState();
  const [me, setMe] = useState();

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  // const socket = io('http://localhost:5000');
  const socket = io('https://vast-falls-82073.herokuapp.com/');

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true})
      .then(currentStream => {
        setStream(currentStream)
        myVideo.current.srcObject = currentStream;
      });

      socket.on("me", (id) => setMe(id));

      socket.on("calluser", ({from, name: callerName, signal})=> {
        setCall({isReceivingCall: true, from, name: callerName, signal})
      });
  }, [socket]);
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({initiator: false, trickle: false, stream});
    peer.on('signal', data => {
      socket.emit('answercall', {signal: data, to: call.from})
    });

    peer.on('stream', currentStream => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({initiator: true, trickle: false, stream});

    peer.on('signal', data => {
      socket.emit('calluser', {userToCall: id, signalData: data, from: me, name });
    })
    peer.on('stream', currentStream => {
      userVideo.current.srcObject = currentStream;
    });
    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  }

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return ( 
    <SocketContext.Provider value = {{

      call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded,
      me, callUser, leaveCall, answerCall
    }}>
      {children}
    </SocketContext.Provider>
   );
}
 
export {ContextProvider, SocketContext};
