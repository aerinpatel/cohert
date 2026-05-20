import * as dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "./db";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // const data = req.body;
  try {
    console.log(
      "middle ware starets================================================",
    );
    // console.log(req.header("authorization"));
    const tk = req.header("authorization") || "";
    console.log(tk);
    const data: jwt.JwtPayload = jwt.verify(
      tk,
      process.env.JWT_SECRET || "12345",
    ) as jwt.JwtPayload;
    // const u = await User.findById(data.id);
    console.log(" ->>>> ", data);
    // const u = "hulids"
    if (data) {
      // console.log(u);
      // @ts-ignore
      req.userId = data.id;
      next();
      // res.status(200).json({message:"user verified"});
    } else {
      console.log(data);
      res.status(402).json({ message: "You are not logged in" });
    }
  } catch (e) {
    console.log({ msg: "something has gone wrong" });
  }
};
