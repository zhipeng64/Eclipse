import { body } from "express-validator";
import { isValidPassword, isSamePassword } from "../validators/password.js";

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
export { registerPolicy };
