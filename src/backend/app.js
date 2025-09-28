// Load environment variables
import "./loadEnv.js";

// Core modules and frameworks
import express from "express";
import fs from "fs";

// Third party modules
import cors from "cors";
import cookieParser from "cookie-parser";

// Dynamic import based on NODE_ENV
let server;
if (process.env.NODE_ENV === "production") {
  // Renamed destructuring
  const { default: http } = await import("http");
  server = http;
} else {
  const { default: https } = await import("https");
  server = https;
}

// Local custom modules
import { router as registerRouter } from "./routes/users/register.js";
import { router as userRouter } from "./routes/authenticated/user.js";
import { router as authRouter } from "./routes/authenticated/auth.js";
import { errorHandler } from "./middleware/error.js";
import initializeGracefulShutdown from "./shutdown.js";
import { initializeSocket } from "./socket.js";

const app = express();

// Initialize server based on environment
let appServer;
if (process.env.NODE_ENV === "production") {
  // HTTP server for production (behind reverse proxy)
  appServer = server.createServer(app);
} else {
  // HTTPS server for development
  const privateKey = fs.readFileSync(process.env.CERT_PRIVATE_KEY_PATH);
  const cert = fs.readFileSync(process.env.CERT_PATH);
  const options = {
    key: privateKey,
    cert: cert,
  };
  appServer = server.createServer(options, app);
}

// Initialize all route configuration and parser middlewares
// Enable CORS only in non-production environments
if (process.env.NODE_ENV !== "production") {
  const corsConfiguration = {
    origin: process.env.CORS_ALLOW_LIST.split(","),
    methods: ["GET", "POST"],
    credentials: true,
  };
  app.use(cors(corsConfiguration));
}

app.use(express.json());
app.use(cookieParser());

// Check server status
app.get("/api", (req, res) => {
  return res.status(200).json({ status: "Welcome to Eclipse" });
});

// Modular routing
app.use("/api/authentication", authRouter);
app.use("/api/registration", registerRouter);
app.use("/api/users", userRouter);

// Initialize signal handlers
initializeGracefulShutdown();

// Initialize socket object and its listeners
initializeSocket(appServer);

// Initialize a global error-handling middleware
app.use(errorHandler);

// Start the backend server
const protocol = process.env.NODE_ENV === "production" ? "HTTP" : "HTTPS";
appServer.listen(process.env.BACKEND_PORT, process.env.BACKEND_IP, () => {
  console.log(
    `${protocol} Server listening at ${process.env.BACKEND_IP}:${process.env.BACKEND_PORT}`
  );
});
