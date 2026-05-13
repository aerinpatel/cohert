import { createContext, useContext, useState } from "react"
const Context = createContext();

function ContextProvider({children}){
  const [count,setCount] = useState(0);
  return(
    <Context.Provider value={{count,setCount}}>
      {/* // {childeren} */}
      {children}
    </Context.Provider>
  )
}

function Incrase() {
  const {setCount} = useContext(Context);
  return <button onClick={() => setCount((x) => x+1)}>Increase</button>;
}
function Decrease() {
  const {setCount} = useContext(Context);
  return <button onClick={() => setCount((x) => x-1)}>Decrease</button>;
}
function Value(){
  const {count} = useContext(Context);
  return <div>count: {count}</div>
}
function App() {

  return (
    <>
      <ContextProvider>

        <Incrase/>
        <Decrease/>
        <Value/>
      </ContextProvider>
      {/* <button onClick={() => setCount(x => x+1)}>increase</button>
      <button onClick={() => setCount(x => x-1)}>decrease</button>
      <div>Count: {count}</div> */}
    </>
  )
}

export default App;