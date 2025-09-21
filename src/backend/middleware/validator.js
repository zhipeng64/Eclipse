import { body, query } from "express-validator";
import passwordValidator from "../validators/PasswordValidator.js";

// Reusable validation rules
const isNonEmptyString = (field, location = body) =>
  location(field)
    .isString()
    .withMessage(`${field} must be a string`)
    .notEmpty()
    .withMessage(`${field} is required`);

const isValidPassword = () =>
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .custom((password) => {
      if (!passwordValidator.isValidPassword(password)) {
        throw new Error("Password is invalid.");
      }
      return true;
    });

const isMatchingPassword = () =>
  body("confirmPassword").custom((confirmPassword, { req }) => {
    if (!passwordValidator.isSamePassword(confirmPassword, req.body.password)) {
      throw new Error("Passwords do not match.");
    }
    return true;
  });

//Route-specific validators
// Registration
const registrationValidator = [
  body("email")
    .isString()
    .withMessage("Email must be a string")
    .isEmail()
    .withMessage("Email is invalid"),

  isNonEmptyString("username"),
  isValidPassword(),
  isMatchingPassword(),
];

// Login
const loginValidator = [isNonEmptyString("username"), isValidPassword()];

// User lookup (query param)
const userLookupValidator = [isNonEmptyString("username", query)];

// Friend request (body param)
const friendRequestValidator = [isNonEmptyString("username")];

export {
  registrationValidator,
  loginValidator,
  userLookupValidator,
  friendRequestValidator,
};
