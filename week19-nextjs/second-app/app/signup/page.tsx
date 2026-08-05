"use client"
import axios from "axios";
import { Ref, useRef } from "react";
// import { useState } from "react";

export default function Signin() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef =  useRef<HTMLInputElement>(null);
    // const res = useRef<string>("");
    
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Sign up
                        </div>
                    </div>
                    <div className="pt-2">
                        
                        <LabelledInput inputRef={emailRef} label="Username" placeholder="harkirat@gmail.com" />
                        <LabelledInput inputRef={passRef} label="Password" type={"password"} placeholder="123456" />
                        <button type="button" onClick={() => {
                            // console.log(emailRef.current);
                            // console.log(passRef.current);

                            // console.log(emailRef.current?.value);
                            // console.log(passRef.current?.value);
                            axios.post("/api/v1/signup", {
                                email: emailRef.current?.value,
                                pass: passRef.current?.value
                            }).then((res) => {console.log(res.data)
                                const token = res.data.token;
                                localStorage.setItem('token' , token);
                            });
                        }} className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign up</button>
                    </div>
                </div>
            </a>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    inputRef: React.RefObject<HTMLInputElement|null>;

}

function LabelledInput({ label, placeholder, type, inputRef}: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input ref={inputRef} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}