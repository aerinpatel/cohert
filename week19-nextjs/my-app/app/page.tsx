// import Image from "next/image";
// "use client";
import axios from "axios";

// import { useEffect, useState } from "react";

type UserDetails = {
  email?: string;
  name?: string;
} | null;

export default async function Home() {
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState<UserDetails>(null);

  // useEffect(() => {
  //   setLoading(true);

  //   axios
  //     .get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details")
  //     .then((res) => {
  //       setData(res.data);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to load user details:", error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);


  // if (loading) {
  //   return <div>loading...</div>;
  // }
  
  // const responce = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details");
    // const data = responce.data;
    const data ={email:'aerin',name:'adsfads'}

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>routing is so easy in this mannnn!!!!!!!!!</div>
      <div>
        {data?.email}
        {data?.name}
      </div>
    </div>
  );
}
