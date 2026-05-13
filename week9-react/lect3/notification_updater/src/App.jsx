import './App.css'
import { useState } from 'react'
import { useEffect } from 'react';

function App() {
  const [currentTab, setCurrentTab] = useState(1);
  const [tabData, setTabData] = useState({});
  const [isLoding,setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/todos/${currentTab}`).then(async res =>{
      const json = await res.json();
      for(let i = 0;i < 10000;i++){
        // heavy work
        console.log('hello');
      }
      setTabData(json.title);
      setIsLoading(false);
    })
    
  },[currentTab]);
  // function OutputData() {
  //   if(isLoding){
  //     return <div>
  //       <img src='https://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif'></img>
  //     </div>
  //   }else{
  //     return <div>
  //       {tabData}
  //     </div>
  //   }
  // }
  return (
    <div className="App">
      <button onClick={() => {setCurrentTab(1)}} style={{ backgroundColor: currentTab === 1 ? 'lightgray' : 'white' }}>Home</button>
      <button onClick={() => {setCurrentTab(2)}} style={{ backgroundColor: currentTab === 2 ? 'lightgray' : 'white' }}>Settings</button>
      <button onClick={() => {setCurrentTab(3)}} style={{ backgroundColor: currentTab === 3 ? 'lightgray' : 'white' }}>About</button>
      <button onClick={() => {setCurrentTab(4)}} style={{ backgroundColor: currentTab === 4 ? 'lightgray' : 'white' }}>Notifications</button>
      <button onClick={() => {setCurrentTab(5)}} style={{ backgroundColor: currentTab === 5 ? 'lightgray' : 'white' }}>Messages</button>
      {/* <OutputData/> */}
      {isLoding ? <img src='https://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif'></img>: <div>{tabData}</div>}
    </div>
  )
}

export default App
