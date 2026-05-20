import express, { Request, Response } from "express";
import { Tag, User, Content, Link } from "./db";
import { json } from "node:stream/consumers";
import mongoose from "mongoose";
import { authMiddleware } from "./middleware";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
// dotenv.config();
// const x:string = process.env.DATABASE_CONN||"";
// mongoose.connect(x);
// const smtn = jwt.sign({
//   name:'aerin',pass:'12345'
// },process.env.JWT_SECRET || "12345");
// console.log(smtn);
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Typescript + Express");
});

app.post("/api/v1/signup", async (req: Request, res: Response) => {
  const data = req.body;
  console.log(req.body);
  // Tag.create(data)
  try {
    await User.create(data);
    res.status(200).json({ message: "user created" });
  } catch (e) {
    res.status(411).json({ message: "user already exist" });
  }
});

app.post("/api/v1/signin", async (req: Request, res: Response) => {
  console.log("/signin end point");
  const x = req.body;
  const data ={
    email:x.email,
    password:x.password
  }
  console.log(data);
  // Tag.create(data)
  const existingUser = await User.findOne(data);
  if (existingUser) {
    console.log(existingUser);
    const tk = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET || "12345",
    );

    res.status(206).json({ tk });
  } else if (!existingUser) {
    res.status(400).send({ message: "the user not found in the database" });
  }
  console.log(existingUser);
});

app.post(
  "/api/v1/content",
  authMiddleware,
  async (req: Request, res: Response) => {
    try{
      const data = req.body;
      console.log(data);
      //
      const link = data.link;
      const type = data.type;
      await Content.create({
        //@ts-ignore
        link:link,type:type,userId:req.userId,tags:[],title:data.title
      })
      res.status(200).json({msg:"post added"});
    }catch(e) {
      console.log({msg:"things go wrong in /content POST"});
    }
    // const token = req.header("authorization");
    // if (token) res.status(200).json({ msg: "token recived", token: token });
    // else res.status(400);

    // const Id = data
    
  },
);

app.get(
  "/api/v1/content",
  authMiddleware,
  async (req: Request, res: Response) => {
    try{
      const data = req.body;
      console.log("/content GET end point" ,data);
      //@ts-ignore
      const userPosts = await Content.find({userId:req.userId}).populate("userId","email");
      res.status(200).json({content:userPosts});
    }catch(e){console.log({msg:"things go wrong in /content GET"});}
  },
);

app.delete(
  "/api/v1/content",
  authMiddleware,
  async (req: Request, res: Response) => {
    try{
      const data = req.body;
      console.log("/content DELETE end point" ,data);
      //@ts-ignore
      await Content.deleteMany({
        //@ts-ignore
        userId:req.userId,
        _id:req.body.contentId
      })
      res.status(200).json({});
    }catch(e){console.log({msg:"things go wrong in /content DELETE"});}
  },
);

app.listen("3000", () => {
  console.log("server running on 3000");
});
// ts,mono,jwt,exp
