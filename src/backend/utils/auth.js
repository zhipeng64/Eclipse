import jwt from "jsonwebtoken";
import crypto from "crypto";

const createJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const createRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

export { createJWT, createRefreshToken };
