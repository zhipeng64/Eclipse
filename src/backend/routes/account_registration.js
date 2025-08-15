import express from "express";

import bcrypt from "bcrypt";

import { SALT_ROUNDS } from "../schemas/password.js";
import {
  REFRESH_TOKEN_LIFESPAN_DAYS,
  JWT_TOKEN_LIFESPAN_MINUTES,
} from "../schemas/auth.js";
import { registerPolicy } from "../middleware/account_registration.js";
import { registrationSanitizer } from "../middleware/sanitization.js";
import { validateResult } from "../middleware/validateResult.js";
import { getEntry, insertEntry } from "../database/user_services.js";
import { createJWT, createRefreshToken } from "../utils/auth.js";

const router = express.Router();

// Base route, need to be asynchronous
router.post(
  "/",
  registerPolicy,
  validateResult,
  registrationSanitizer,
  async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    // Check if user exists in database
    let queryObject = {
      query: { $or: [{ username }, { email }] },
      insertUser: {
        username,
        email,
        hashedPassword,
      },
      collection: "users",
    };

    const userExist = await getEntry(queryObject.query, queryObject.collection);
    if (!userExist) {
      const userId = (
        await insertEntry(queryObject.insertUser, queryObject.collection)
      ).insertedId.toHexString();
      if (userId) {
        const jwt = createJWT(userId);
        const refreshToken = createRefreshToken();
        queryObject.collection = "refresh_tokens";
        queryObject.insertRefreshToken = {
          userId: userId,
          token: refreshToken,
          expiresAt: new Date(
            Date.now() + REFRESH_TOKEN_LIFESPAN_DAYS * 24 * 60 * 60 * 1000
          ),
        };
        await insertEntry(
          queryObject.insertRefreshToken,
          queryObject.collection
        );

        // Set cookie containing the jwt token
        res.cookie("jwt", jwt, {
          httpOnly: true, // Prevents client-side JS from accessing cookie
          secure: false,
          sameSite: "Lax", // Protects against CSRF attacks
          expires: new Date(
            Date.now() + JWT_TOKEN_LIFESPAN_MINUTES * 60 * 1000
          ),
        });

        // Set another cookie containing the refresh token
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
          expires: queryObject.insertRefreshToken.expiresAt,
        });
        res.status(200).json({ message: "OK" });
      }
    } else {
      res.status(500).json({ message: "Request could not be completed" });
    }
  }
);

export { router };
