import { useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const socket = useRef<WebSocket | null>(null);
  const inp = useRef<HTMLInputElement | null>(null);
  const [res,setRes] = useState<string[]>([]);
  // const [msg,setMsg] = useState<string[]>([]);
  const [msg,setMsg] = useState<string>("");
  // const [res,setRes] = useState<string>("");

  function sendMsg(){
    if(!socket.current) return;
    const ele = inp.current?.value || "";
    setMsg(ele);
    socket.current?.send(ele);
  }

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:8080");
    
    socket.current.onmessage = (ev) => {setRes([...res,ev.data])};
  },[res])
  return (
    <>
      <input ref={inp}/>
      <button onClick={sendMsg}>Send</button>
      <div className='flex flex-col'>
        {/* {msg?.map((e) => <div className='flex-end'>{e}</div>)} */}
        <div className='flex-end'>Your message: {msg}</div>
        {res?.map((e) => <div className='flex-end'>{e}</div>)}
        {/* <div className='flex-start'>{res}</div> */}
      </div>
    </>
  )
}

export default App
