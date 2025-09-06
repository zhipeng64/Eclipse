import express from "express";
import { authHandler } from "../../middleware/auth.js";

// Authentication Endpoint, /authentication
const router = express.Router();
router.get("/", authHandler, (req, res) => {
  return res.status(200).json({ success: true });
});

export { router };
