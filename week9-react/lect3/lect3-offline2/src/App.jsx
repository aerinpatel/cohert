import { useState } from 'react'
import "./App.css";
import { PostComponent } from "./post";

const postArray = [{
  name: "aerin patel",
  subtitle: "20 follower",
  time: "3d",
  image:
    "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/67344e79cb7fb9001e44ae02.png",
  description: "i don't know why we can't use lorem in react",
},
{
  name: "aerin patel",
  subtitle: "90 follower",
  time: "16d",
  image:
    "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/67344e79cb7fb9001e44ae02.png",
  description: "i don't know why we can't use lorem in react",
},
{
  name: "aerin patel",
  subtitle: "10M follower",
  time: "2m",
  image:
    "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/67344e79cb7fb9001e44ae02.png",
  description: "i don't know why we can't use lorem in react",
}];

function App() {
  const [posts, setPosts] = useState(postArray);

  function addPost() {
    setPosts([
      ...posts, 
      {
        name: "aerin patel",
        subtitle: "20 follower",
        time: "3d",
        image: "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/67344e79cb7fb9001e44ae02.png", 
        description: "i don't know why we can't use lorem in react"
      }
    ]);
  }

  return (
    <div style={{backgroundColor: "#b2bec3", height: "100vh", display: "flex", justifyContent:"center", fontFamily: "Arial, Helvetica, sans-serif"}}>
      <button style={{position:"absolute", left:"1rem"}} onClick={addPost}>Add Post</button>
      <div>
        {posts.map((post, index) => (
          <PostComponent key={index}
            name={post.name}
            subtitle={post.subtitle}
            time={post.time}
            image={post.image}
            description={post.description}
          />
        ))}
        
      </div>
    </div>
  );
}

export default App;