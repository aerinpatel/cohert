"use client"
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {
  const [count,setCount] = useState(0);
  const [isRunning,setIsRunning] = useState(false);
  // function onclickHandler(){
  //   setIsRunning(true);
  //     setInterval(() => {
  //       console.log(count);
  //       setCount((count) => count + 1);
  //     }, 1000);
  // }
  useEffect(() => {
    let counter:number|undefined;
    if(isRunning){
      // setIsRunning(true);
      counter = window.setInterval(() => {
        // console.log(count);
        setCount((x) => x+1);
      }, 1000);
    }
    return () => {clearInterval(counter);}
  },[isRunning])
  
  function onclickHandler(){
    setIsRunning((x) => !x);
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      hi there baby
      <button onClick={onclickHandler}>click me {count}</button>
    </div>
  );
}
