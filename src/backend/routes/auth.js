import express from "express";
import userController from "../controllers/UserController.js";

// Authentication Endpoint
const router = express.Router();
router.get("/", userController.authHandler.bind(userController));

export { router };
