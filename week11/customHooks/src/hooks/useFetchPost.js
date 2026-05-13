import { useEffect, useState } from "react";

export function useFetchPost() {
  const [post, setPost] = useState(null);

  async function fetchpost() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const ans = await response.json();
    setPost(ans);
  }
  useEffect(() => {
    setTimeout(() => {
      fetchpost();
    }, 2000);
  }, []);
  return post;
}

