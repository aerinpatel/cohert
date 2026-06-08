import { useEffect, useRef, useState } from 'react'

import './App.css'

const [msg,setMsg] = useState(['heleo']);
const wsRef = useRef();
function App() {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (e) => {
      setMsg([...msg,e.data])
    }
    wsRef.current = ws;
    // return
  },[])
  return (<>
   
  </>);
}

export default App
