import express from "express";
import { verifyJWTToken, verifyRefreshToken } from "../middleware/auth.js";
import { loginSanitizer } from "../schemas/auth.js";
import { validateResult } from "../middleware/validateResult.js";
import { userController } from "../controllers/UserController.js";

const router = express.Router();
router.post(
  "/",
  verifyJWTToken,
  verifyRefreshToken,
  loginSanitizer,
  validateResult,
  userController.loginHandler.bind(userController)
);

export { router };
