import express ,{Request,Response} from "express";
import { json } from "node:stream/consumers";
import mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();
const x:string = process.env.DATABASE_CONN||"";
mongoose.connect(x);
// const smtn = jwt.sign({
//   name:'aerin',pass:'12345'
// },process.env.JWT_SECRET || "12345");
// console.log(smtn);
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Typescript + Express")
});

app.post('/api/v1/signup',(req:Request,res:Response) =>{
  const data = (req.body);
  console.log(req.body);
  
  res.send(data);
});

app.listen('3000',() => {
  console.log('server running on 3000');
})
// ts,mono,jwt,exp