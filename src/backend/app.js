// Core modules and frameworks
import express from "express";
import http from "http";
// import https from "https";
// import fs from "fs";

// Third party modules
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Load the environment variables prior to custom modules
dotenv.config({ path: "../../.env" });

// Local custom modules
import { router as registerRouter } from "./routes/users/register.js";
import { router as userRouter } from "./routes/authenticated/user.js";
import { router as authRouter } from "./routes/authenticated/auth.js";
import { errorHandler } from "./middleware/error.js";
import initializeGracefulShutdown from "./shutdown.js";
import { initializeSocket } from "./socket.js";

// https://expressjs.com/en/resources/middleware/cors.html
// https://treblle.com/blog/setup-cors-rest-api#heading-how-to-configure-cors-for-your-rest-api
const app = express();
const corsConfiguration = {
  origin: process.env.CORS_ALLOW_LIST.split(","),
  methods: ["GET", "POST"],
  credentials: true,
};

// Initialize an HTTPS server
// const privateKey = fs.readFileSync(process.env.CERT_PRIVATE_KEY_PATH);
// const cert = fs.readFileSync(process.env.CERT_PATH);
// const options = {
//   key: privateKey,
//   cert: cert,
// };
// const httpsServer = https.createServer(options, app);

// Initialize an HTTP server
const httpServer = http.createServer(app);

// Initialize all route configuration and parser middlewares
// Enable CORS only in non-production environments. In production the reverse
// proxy (nginx) should be responsible for CORS and origin restrictions.
if (process.env.NODE_ENV !== "production") {
  app.use(cors(corsConfiguration)); // Cors settings applied to all imported public routes
}
app.use(express.json()); // Accepts incoming JSON data in HTTP requests
app.use(cookieParser()); // For parsing cookies from a client

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
initializeSocket(httpServer);

// Initialize a global error-handling middleware
app.use(errorHandler);

// Start the backend server
httpServer.listen(process.env.BACKEND_PORT, process.env.BACKEND_IP, () => {
  console.log(
    `HTTP Server listening at ${process.env.BACKEND_IP}:${process.env.BACKEND_PORT}`
  );
});
