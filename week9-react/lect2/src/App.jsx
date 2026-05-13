import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // let [counterVisible,setCountVisible] = useState(true);
  // useEffect(() => {
  //   setInterval(() => {
  //     setCountVisible(prev => !prev);
  //   },5000);
  // },[]);

  return(
    <div>
      hello react
      <Counter></Counter>

    </div>
    
  )
}

function Counter(){
  const [count,setcount] = useState(0);
  const increment = () => {
    setcount(count + 1);
  }
  const decrement = () => {
    setcount(count - 1);
  }
  console.log("rendering");
  useEffect(() => {
    console.log("mounting");    
    const count = setInterval(() => {
      console.log("counting");
      setcount(prevCount => prevCount + 1);
    }, 1000);

    return function(){
      console.log("unmounting");
      clearInterval(count);  
    }
  },[])


  return(
    <div>
      {/* <h2>1</h2> */}
      <h1>Counter</h1>
      <button onClick={increment}>+</button>
      <h2>{count}</h2>
      <button onClick={decrement}>-</button>
      <br/>
      <button onClick={() => setcount(0)}>reset</button>
    </div>
  )
}

export default App
