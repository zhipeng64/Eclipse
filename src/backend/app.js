// Core modules and frameworks
import express from "express";
import https from "https";
import { createServer } from "node:http";
import fs from "fs"; // Import Node.js 'fs' module

// Third party modules
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Load the environment variables prior to custom modules
dotenv.config({ path: "../../.env" });

// Local custom modules
import { router as accountRouter } from "./routes/users/account.js";
import { router as authRouter } from "./routes/auth.js";
import { closeMongoConnection } from "./database/connection.js";
import { errorHandler } from "./middleware/error.js";

// https://expressjs.com/en/resources/middleware/cors.html
// https://treblle.com/blog/setup-cors-rest-api#heading-how-to-configure-cors-for-your-rest-api
const app = express();
const corsConfiguration = {
  origin: process.env.CORS_ALLOW_LIST.split(","),
  methods: ["GET", "POST"],
  credentials: true,
};

// Configure to use SSL Certificate
const privateKey = fs.readFileSync(process.env.CERT_PRIVATE_KEY_PATH);
const cert = fs.readFileSync(process.env.CERT_PATH);
const options = {
  key: privateKey,
  cert: cert,
};
const httpsServer = https.createServer(options, app);

// Socket IO Server
const io = new Server(httpsServer, {
  cors: corsConfiguration, // Need separate CORS configuration for SocketIO, not shared with ExpressJS
});

app.use(cors(corsConfiguration)); // Cors settings applied to all imported public  routes
app.use(express.json()); // Accepts incoming JSON data in HTTP requests
app.use(cookieParser()); // For parsing cookies from a client
app.use("/users", accountRouter);
app.use("/authentication", authRouter);

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

// Accept socket connections
io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("client socket disconnected ");
  });
});

app.use(errorHandler);

// Start the backend server
httpsServer.listen(process.env.BACKEND_PORT, process.env.BACKEND_IP, () => {
  console.log(
    `HTTPS Server listening at ${process.env.BACKEND_IP}:${process.env.BACKEND_PORT}`
  );
});
