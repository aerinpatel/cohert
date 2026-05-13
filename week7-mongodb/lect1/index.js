// the main advantage of using teh mongo db over sql is its flexible schema as we can input data of any type and can change any time
// harkirat said that we will be switching slowly to tabular databases like postgress sql i don't remembber why probably because they are more secure and powerfull
//

const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { z } = require("zod");

const { Usermodel, todomodel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const app = express();
app.use(express.json());
const port = 3000;
console.log(JWT_SECRET);
// JWT_SECRET = "raveena";
// const saltRounds = 5;


async function start() {
  await mongoose.connect(
    ""
  );

  app.post("/signup", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const required_body = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(4)
    });
    // let namak = null;

    const parsedData = required_body.safeParse(req.body);
    const salt = await bcrypt.genSalt(5);
    console.log(salt);
    const hash = await bcrypt.hash(password, salt);
    

    if (!parsedData.success) {
      res.status(400).json({
        message: parsedData.error,
        error: parsedData.error.issues.message
      });
      return;
    }
    
    const existingUser = await Usermodel.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({
        message: "user already exist",
      });
      return;
    } else {
      await Usermodel.create({
        email: email,
        name: name,
        password: hash,
        namak: salt,
      });
      res.json({
        message: "you have signup succesfully!!",
      });
    }
  });
  app.post("/signin", async (req, res) => {
    const email = req.body.email;
    const input_password = req.body.password;
    
    const existingUser = await Usermodel.findOne({
      email: email,
    });

    const salt = existingUser.namak;
    console.log(salt);
    const hash = await bcrypt.hash(input_password, salt);
    
    console.log(existingUser);
    console.log(hash);
    if (hash === existingUser.password) {
      console.log(existingUser._id.toString());
      const token = jwt.sign({
          userId: existingUser._id.toString(),
        },
        JWT_SECRET
      );
      res.status(200).json({
        token,
      });
    } else {
      res.status(400).json({
        message: "incorrect creaditentilas",            
      });
    }
  });

  app.post("/todo", auth, async (req, res) => {
    const { todo, done } = req.body;
    const userId = req.userId;

    await todomodel.create({
      todo: todo,
      done: done,
      userid: userId,
    });
    res.json({
      message: "todo added succesfully",
    });
  });
  app.get("/todo", auth, async (req, res) => {
    console.log("-------get-todo-----");
    const userid = req.userId;
    console.log(userid);
    try {
      const todos = await todomodel.find({ userid: userid });
      res.status(200).json(todos);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "error" });
    }
  });
  app.patch("/todo/:id", auth, async (req, res) => {});
  app.listen("3000", () => {
    console.log("app is running on https://localhost:", port);
  });
}
start();
