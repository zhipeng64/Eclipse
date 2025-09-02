import express from "express";
import { registerPolicy } from "../middleware/auth.js";
import { validateResult } from "../middleware/validateResult.js";
import { registrationSanitizer } from "../middleware/sanitization.js";
import userController from "../controllers/UserController.js";

const router = express.Router();
router.post(
  "/",
  registerPolicy,
  validateResult,
  registrationSanitizer,
  userController.register.bind(userController) // Binds 'this' to object, since it is used as callback.
);

export { router };
