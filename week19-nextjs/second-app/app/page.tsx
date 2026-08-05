import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  // const res = await axios.get('http://localhost:3000/api/v1/user/details');
  // const data = res.data;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* maa ka bosdaaa!!!!!!!!!!!! */}
      {/* {data?.name}  */}
      <div></div>
      {/* {data?.email} */}
      <Link href={"/signin"}>singin part</Link>
      <Link href={"/signup"}>singup part</Link>
    </div>
  );
}
