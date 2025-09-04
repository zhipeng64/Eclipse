import express from "express";
import { registerPolicy } from "../../middleware/auth.js";
import { loginSanitizer } from "../../schemas/auth.js";
import { validateResult } from "../../middleware/validateResult.js";
import { registrationSanitizer } from "../../middleware/sanitization.js";
import userController from "../../controllers/UserController.js";

const router = express.Router();
// /users
router.post(
  "/",
  registerPolicy,
  validateResult,
  registrationSanitizer,
  userController.register.bind(userController) // Binds 'this' to object, since it is used as callback.
);

// /users/session
router.post(
  "/session",
  loginSanitizer,
  validateResult,
  userController.loginHandler.bind(userController)
);
export { router };
