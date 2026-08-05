import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
type User = {
    email:string;
    pass:string;
}

export async function POST(req:NextRequest){
    const body:User = await req.json();
    console.log(body);
    console.log("thatt teri ma ka bosdaa!!!!!!!!! " + process.env.JWT_NAHI_BATAUGA);
    const token = jwt.sign(body,process.env.JWT_NAHI_BATAUGA||"DSFDS");

    return NextResponse.json({
        msg:body.email+"has signed",
        status:200,
        token: token
    });
}