import express from "express";
import { verifyJWTToken } from "../middleware/auth.js";

const router = express.Router();
router.get("/", verifyJWTToken, (_, res) => {
  console.log("inside auth endpoint");
  res.status(200).end();
});

export { router };
