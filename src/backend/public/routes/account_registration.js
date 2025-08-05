import express from "express";

import { registerPolicy } from "../middleware/account_registration.js";
import { validateResult } from "../middleware/validate.js";

const router = express.Router();

// Base route
router.post("/", registerPolicy, validateResult, (req, res) => {
  res.status(200).send("OK");
});

export { router };
