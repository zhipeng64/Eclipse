// Sanitizes user input
// Built-in Methods: https://express-validator.github.io/docs/api/validation-chain
// Standard Methods: https://github.com/validatorjs/validator.js
import { body, query } from "express-validator";

// Reusable sanitizers based on input field type
// Text input sanitizer
const sanitizeText = (field) => body(field).trim().escape();

// Email sanitizer
const sanitizeEmail = (field) =>
  body(field).trim().escape().isEmail().normalizeEmail();

// Query param sanitizer
const sanitizeQueryText = (field) => query(field).trim().escape();

// Specific sanitizers based on endpoint
// Registration form
const registrationSanitizer = [
  sanitizeText("username"),
  sanitizeEmail("email"),
];

// Login form
const loginSanitizer = [sanitizeText("username")];

// User lookup (via query string)
const userLookupSanitizer = [sanitizeQueryText("username")];

// Friend request form
const friendRequestSanitizer = [sanitizeText("username")];
export {
  registrationSanitizer,
  loginSanitizer,
  userLookupSanitizer,
  friendRequestSanitizer,
};
