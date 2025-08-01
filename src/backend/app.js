// Core modules and frameworks
import express from "express";

// Third party modules
import dotenv from "dotenv";
import cors from "cors";

// Load the environment variables prior to custom modules
dotenv.config({ path: "../../.env" });

// Local custom modules
import { router as accountsRouter } from "./public/routes/registration.js";

// https://expressjs.com/en/resources/middleware/cors.html
// https://treblle.com/blog/setup-cors-rest-api#heading-how-to-configure-cors-for-your-rest-api
const app = express();
const corsConfiguration = {
  origin: process.env.CORS_ALLOW_LIST.split(","),
  methods: ["GET", "POST"],
};
app.use(cors(corsConfiguration)); // Cors settings applied to all imported public  routes
app.use(express.json()); // Accepts incoming JSON data in HTTP requests
app.use("/users", accountsRouter);

// Start the backend server
const port = 3000;
app.listen(port, process.env.BACKEND_IP, () => {
  console.log(`Server listening at port ${process.env.BACKEND_IP}:${port}`);
});
