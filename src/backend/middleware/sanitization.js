// Sanitizes user input
import { body } from "express-validator";

// Account registration sanitizer
const registrationSanitizer = [
  body("username").trim().escape(), // escape HTML chars like <, >, &, etc.

  body("email").trim().escape().normalizeEmail(),
];

export { registrationSanitizer };
