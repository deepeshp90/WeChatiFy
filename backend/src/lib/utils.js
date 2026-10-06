import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 *60 * 1000, //  7 days in ms
    httpOnly: true, // prevent xss attacks : cross site scripting
    sameSite: "strict", // prevent CSRF attack
    secure: ENV.NODE_ENV === "development" ? false : true,
  });
  return token;
};