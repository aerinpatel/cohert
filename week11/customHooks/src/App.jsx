// import { useState } from 'react'
// import { useState,useEffect } from 'react'
import { useRef } from 'react';
import './App.css'
// import { useFetchPost } from './hooks/useFetchPost'
// import { useFetch } from './hooks/useFetch';

function App() {
  const timer = useRef();
  function useDebounce(){
    clearTimeout(timer.current);
    timer.current = setTimeout(sendData,250);
  }
  function sendData(){
    console.log('request sent');
  }

  return (
    <>
      <input type='text' onChange={useDebounce}></input>
    </>
  )
}


export default App
