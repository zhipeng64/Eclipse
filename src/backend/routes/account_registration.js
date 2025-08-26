import express from "express";
import { registerUser } from "../services/authService.js";
import { createCookieOptions } from "../utils/cookie.js";
import { registerPolicy } from "../middleware/account_registration.js";
import { validateResult } from "../middleware/validateResult.js";
import { registrationSanitizer } from "../middleware/sanitization.js";

const router = express.Router();
router.post(
  "/",
  registerPolicy,
  validateResult,
  registrationSanitizer,
  async (req, res) => {
    const { username, email, password } = req.body;
    try {
      // Register user if not already exists
      const { userId, jwt, refreshToken, jwtExpiresAt, refreshTokenExpiresAt } =
        await registerUser({ username, email, password });

      // Set jwt and refresh tokens as cookies
      res
        .cookie("jwt", jwt, createCookieOptions(jwtExpiresAt))
        .cookie(
          "refreshToken",
          refreshToken,
          createCookieOptions(refreshTokenExpiresAt)
        )
        .status(201)
        .json({ id: userId });
    } catch (err) {
      if (err.message === "UserAlreadyExists") {
        return res.status(400).end();
      }
      console.error("Registration error:", err);
      res.status(400).end();
    }
  }
);

export { router };
