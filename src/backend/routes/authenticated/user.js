// Login endpoint
import express from "express";
import { authHandler } from "../../middleware/auth.js";
import userController from "../../controllers/UserController.js";
import {
  loginSanitizer,
  userLookupSanitizer,
  friendRequestSanitizer,
} from "../../middleware/sanitization.js";
import { validateResult } from "../../middleware/validateResult.js";

const router = express.Router();

// Login Endpoint, /users/login
router.post(
  "/login",
  loginSanitizer,
  validateResult,
  userController.loginHandler.bind(userController)
);

// User Search Endpoint, /users/lookup
router.get(
  "/lookup",
  authHandler,
  userLookupSanitizer,
  validateResult,
  userController.lookupUser.bind(userController)
);

// User Friend Request Endpoint, /users/friend-requests
router.post(
  "/friend-requests",
  authHandler,
  friendRequestSanitizer,
  validateResult,
  userController.addUser.bind(userController)
);

export { router };
