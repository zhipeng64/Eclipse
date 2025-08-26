import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { SALT_ROUNDS } from "../schemas/password.js";

const createJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const createRefreshToken = () => {
  const refreshToken = crypto.randomBytes(64).toString("hex");
  return refreshToken;
};

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
};

export { createJWT, createRefreshToken, hashPassword };
