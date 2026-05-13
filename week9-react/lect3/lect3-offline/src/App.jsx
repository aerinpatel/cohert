// import { useState } from 'react'
import "./App.css";

function App() {
  const center = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    // <profileCard />
    <div
      style={{
        color: "black",
        backgroundColor: "#b2bec3",
        height: "100vh",
        ...center,
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* <h1>Counter</h1> */}
      <ProfileCard/>
      <div>
      <PostComponent />
      </div>
    </div>
  );

  function PostComponent() {
    return (
      <div
        style={{
          border: "1px solid grey",
          padding: "20px",
          borderRadius: "5px",
          backgroundColor: "#dfe6e9",
          // display: "flex",
          margin: '1rem',
          width: "600px",
          // justifyContent: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            // alignItems: "center",
            // flexDirection: "column",
          }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_1lQathHbelJme68JASa3e7bkDd6J8HvP2g&s"
            alt="img"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              // marginBottom: "10px"
            }}
          />
          <div style={{ marginLeft: "10px" }}>
            <h2 style={{ margin: "0" }}>Aerinn</h2>
            <p style={{ margin: "0", color: "grey" }}>
              developer by mind problem solver by heart
            </p>
            <div style={{ color: "gray" }}>6d --</div>
          </div>
          
        </div>
        <div style={{ marginTop: "1rem" }}>
            <p>Hello Connections</p>
        </div>
      </div>
    );
  }
}
function ProfileCard(){
  return(
    <div style={{position: "absolute", top: "20px", left: "20px", border: "1px solid grey", padding: "20px", borderRadius: "5px", backgroundColor: "#dfe6e9", width: "300px",display: "flex", flexDirection: "column", alignItems: "center"}}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_1lQathHbelJme68JASa3e7bkDd6J8HvP2g&s"
        alt="img"
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          // marginBottom: "10px"
        }}
      />
      <h2>Aerinn</h2>
      <p>developer by mind problem solver by heart</p>
      <div style={{ color: "gray" }}>surat, Gujarat</div>
      <div>vellor institue of tech</div>
    </div>
  );
}
export default App;
