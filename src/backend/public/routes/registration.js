import express from "express";

const router = express.Router();

// Base route
router.post("/", (req, res) => {
  console.log(req.body);
});

export { router };
