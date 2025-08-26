import express from "express";
import { verifyJWTToken, verifyRefreshToken } from "../middleware/auth.js";
import { loginSanitizer } from "../schemas/auth.js";
import { validateResult } from "../middleware/validateResult.js";

const router = express.Router();
router.post(
  "/",
  verifyJWTToken,
  verifyRefreshToken,
  loginSanitizer,
  validateResult,
  (req, res) => {
    // At this point, cookies are present and body is sanitized
    console.log("Cookies:", req.cookies);
    console.log("Body:", req.body);
    res.status(200).json({ message: "OK" });
  }
);

export { router };
