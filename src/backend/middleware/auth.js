// Middleware to validate JWT Tokens and Refresh Tokens
import { body } from "express-validator";
import { isValidPassword, isSamePassword } from "../validators/password.js";
import jwt from "jsonwebtoken";

// Account registration validation middleware
const registerPolicy = [
  body("email").isEmail().withMessage("Email is invalid"),

  body("username").notEmpty().withMessage("Username is required"),

  body("password").custom((password) => {
    if (!isValidPassword(password)) {
      throw new Error("Password is invalid.");
    }
    return true;
  }),

  body("confirmPassword").custom((confirmPassword, { req }) => {
    if (!isSamePassword(confirmPassword, req.body.password)) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
];

const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: "Missing refresh token." });
  }
  next();
};

// Checks for presence of jwt and refreshToken cookies, verifies and sanitizes them
const verifyJWTToken = (req, res, next) => {
  const jwtToken = req.cookies?.jwt;
  console.log("/auth endpoint, jwtToken from client: ", jwtToken);
  if (!jwtToken) {
    return res.status(401).json({ error: "Missing jwt token." });
  }
  try {
    // Verify JWT signature
    const decodedJwt = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log("decodedJWT:");
    console.log(decodedJwt);
    // Rigorous validation: check for expected fields and types
    if (
      typeof decodedJwt !== "object" ||
      !decodedJwt.id ||
      typeof decodedJwt.id !== "string"
    ) {
      throw new Error("JWT Token format failure");
    }
    req.user = decodedJwt;
    console.log("jwt decoded: ", req.user);
  } catch (err) {
    console.log(err);
    return res.status(401);
  }
  next();
};

export { verifyJWTToken, verifyRefreshToken, registerPolicy };
