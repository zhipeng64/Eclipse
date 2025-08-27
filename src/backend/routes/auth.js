import express from "express";
import { verifyJWTToken } from "../middleware/auth.js";

const router = express.Router();
router.get("/", verifyJWTToken, (_, res) => {
  res.json(200).end();
});

export { router };
