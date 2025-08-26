import fs from "fs"; // Import Node.js 'fs' module
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv"; // Looks for .env file in ./.env

dotenv.config();
export default defineConfig({
  plugins: [tailwindcss(), react()],
  root: "./src/frontend",
  dir: "./tests",

  server: {
    https: {
      key: fs.readFileSync(process.env.CERT_PRIVATE_KEY_PATH),
      cert: fs.readFileSync(process.env.CERT_PATH),
    },
  },
});
