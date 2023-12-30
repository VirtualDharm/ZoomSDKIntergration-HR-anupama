import "./Zoom.css";
import {ZoomMtg} from '@zoomus/websdk';
import {useEffect} from 'react';
import { createHash, createHmac } from 'crypto-browserify';

function generateSignature(apiKey, apiSecret, meetingNumber, role) {
  return new Promise((res, rej) => {
    const timestamp = new Date().getTime() - 3000;
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64');
    const hash = createHmac('sha256', apiSecret).update(msg).digest('base64');
    const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64');
    res(signature);
  });
}

var apikey = 'JWT_API_KEY'
var apiSecret = ""
var meetingNumber = 123456789
var leaveUrl = 'http://localhost:3000'
var userName = 'WebSDK'
var userEmail = ''
var passWord = ''
var signature = ''
generateSignature(apiKey, apiSecret, meetingNumber, 0).then(()=>{
  signature = res
})

const Zoom = () => {
  useEffect(()=>{
    showZoomDiv()
    ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.0/lib','/av');
    ZoomMtg.preLoadWasm()
    ZoomMtg.prepareWebSDK()
    initiateMeeting()
  },[])
  const showZoomDiv = () => {
    document.getElementById("zmmtg-root").style.display = "block"
  }
  const initiateMeeting = () => {
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)
    
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apikey: apikey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })
    
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  return <div className="App">Zoom</div>
}

export default Zoom;