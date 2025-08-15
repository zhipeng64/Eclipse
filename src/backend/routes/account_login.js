import express from "express";
import {
  loginCookieValidator,
  loginSanitizer,
} from "../middleware/loginValidation.js";
import { validateResult } from "../middleware/validateResult.js";

const router = express.Router();
router.post(
  "/",
  loginCookieValidator,
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
