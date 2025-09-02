import express from "express";
import { loginSanitizer } from "../schemas/auth.js";
import { validateResult } from "../middleware/validateResult.js";
import userController from "../controllers/UserController.js";

const router = express.Router();
router.post(
  "/",
  loginSanitizer,
  validateResult,
  userController.loginHandler.bind(userController)
);

export { router };
