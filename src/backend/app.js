// Core modules and frameworks
import express from "express";

// Third party modules
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Load the environment variables prior to custom modules
dotenv.config({ path: "../../.env" });

// Local custom modules
import { router as accountRouter } from "./routes/account_registration.js";
import { router as loginRouter } from "./routes/account_login.js";
import { closeMongoConnection } from "./database/connection.js";

// https://expressjs.com/en/resources/middleware/cors.html
// https://treblle.com/blog/setup-cors-rest-api#heading-how-to-configure-cors-for-your-rest-api
const app = express();
const corsConfiguration = {
  origin: process.env.CORS_ALLOW_LIST.split(","),
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsConfiguration)); // Cors settings applied to all imported public  routes
app.use(express.json()); // Accepts incoming JSON data in HTTP requests
app.use(cookieParser()); // For parsing cookies from a client
app.use("/users", accountRouter);
app.use("/session", loginRouter);

// In case the backend may terminate due to runtime errors (which don't generate signals) or signals,
// handle it gracefully by performing any cleanup operations.
const gracefulShutdown = async () => {
  console.log("Shutting down gracefully...");
  // Close DB, server, cleanup, etc.
  await closeMongoConnection();
  process.exit(0);
};

// OS signals
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

// Runtime errors
process.on("uncaughtException", async (err) => {
  console.error(err);
  await gracefulShutdown();
});
process.on("unhandledRejection", async (reason) => {
  console.error(reason);
  await gracefulShutdown();
});

// Start the backend server
const port = 3000;
app.listen(port, process.env.BACKEND_IP, () => {
  console.log(`Server listening at port ${process.env.BACKEND_IP}:${port}`);
});
