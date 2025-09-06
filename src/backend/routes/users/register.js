import express from "express";
import { registrationValidator } from "../../middleware/validator.js";
import { validateResult } from "../../middleware/validateResult.js";
import { registrationSanitizer } from "../../middleware/sanitization.js";
import userController from "../../controllers/UserController.js";

const router = express.Router();
// Account Registration Endpoint, /registration
router.post(
  "/",
  registrationValidator,
  validateResult,
  registrationSanitizer,
  userController.register.bind(userController) // Binds 'this' to object, since it is used as callback.
);

export { router };
