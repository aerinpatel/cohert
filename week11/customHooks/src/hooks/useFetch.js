import { useEffect, useState } from "react";

export function useFetch(url){
    const [finalRes,setFinalRes] = useState(null);
    async function fetchData(url) {
        const response = await fetch(url);
        const ans = await response.json();
        setFinalRes(ans);
    }
    useEffect(() =>{
        fetchData(url);
    },[url]);
    return finalRes;
}