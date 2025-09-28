// Wraps the loading of environment variables since
// JS hoists import statements up to the top
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Determine the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let envPath;
// path.resolve to ensure cross-platform compatibility
if (process.env.NODE_ENV === "development") {
  envPath = path.resolve(__dirname, "../../.env.development");
} else if (process.env.NODE_ENV === "production") {
  envPath = path.resolve(__dirname, "../../.env.production");
}
// Load the environment variables prior to custom modules
// If NODE_ENV is set to 'development', load .env.development
console.log("Current NODE_ENV:", process.env.NODE_ENV);
dotenv.config({ path: envPath });
console.log("Environment variables loaded from:", envPath);
