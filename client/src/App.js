import logo from './logo.svg';
import './App.css';
import Zoom from "./Zoom";
import { useState } from "react";

function App() {
  const [joinMeeting,setJoiningMeeting] = useState(false);
  return (
    <div className="App">
      {
        joinMeeting?(
          <Zoom/>
        ) : (
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <button style={{border:'1px solid #fff'}} onClick={()=>setJoiningMeeting(true)}>Join Meeting</button>
          </header>
        )
      }
    </div>
  );
}

export default App;
