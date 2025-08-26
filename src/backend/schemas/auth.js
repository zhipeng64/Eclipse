import { body } from "express-validator";

const REFRESH_TOKEN_LIFESPAN_DAYS = 7;
const JWT_TOKEN_LIFESPAN_MINUTES = 5;

// Add body field sanitization for username/password in body
const loginSanitizer = [body("username").optional().trim().escape()];
export {
  REFRESH_TOKEN_LIFESPAN_DAYS,
  JWT_TOKEN_LIFESPAN_MINUTES,
  loginSanitizer,
};
