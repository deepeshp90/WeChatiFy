import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (userId, res) => {
  const {JWT_SECRET} = process.env;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 *60 * 1000, //  7 days in ms
    httpOnly: true, // prevent xss attacks : cross site scripting
    sameSite: "strict", // prevent CSRF attack
    secure: process.env.NODE_ENV === "development" ? false : true,
  });
  return token;
};