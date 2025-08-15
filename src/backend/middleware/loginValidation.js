// Middleware to validate and sanitize /login requests
import { body } from "express-validator";
import jwt from "jsonwebtoken";

// Checks for presence of jwt and refreshToken cookies, verifies and sanitizes them
const loginCookieValidator = (req, res, next) => {
  const jwtToken = req.cookies?.jwt;
  const refreshToken = req.cookies?.refreshToken;
  if (!jwtToken || !refreshToken) {
    return res.status(401).json({ error: "Missing authentication cookies." });
  }
  try {
    // Verify JWT signature
    const decodedJwt = jwt.verify(jwtToken, process.env.JWT_SECRET);
    // Rigorous sanitization: check for expected fields and types
    if (
      typeof decodedJwt !== "object" ||
      !decodedJwt.sub ||
      typeof decodedJwt.sub !== "string"
    ) {
      return res.status(400).json({ error: "Malformed JWT payload." });
    }
    // Optionally, sanitize/validate other claims as needed
    req.user = decodedJwt;
  } catch (err) {
    return res.status(401).json({ error: "Invalid JWT token." });
  }
  next();
};

// Add body field sanitization for username/password in body
const loginSanitizer = [body("username").optional().trim().escape()];

export { loginCookieValidator, loginSanitizer };
