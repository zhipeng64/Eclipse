import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import fs from "fs";

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: "./.env.development" });
} else if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "./.env.production" });
}

export default defineConfig({
  plugins: [tailwindcss(), react()],
  root: "./src/frontend",
  // For production build, output to ./dist
  build: {
    outDir: "./dist",
  },
  server: {
    // Configure HTTPS for development only
    ...(process.env.NODE_ENV === "development" && {
      https: {
        key: fs.readFileSync(process.env.CERT_PRIVATE_KEY_PATH),
        cert: fs.readFileSync(process.env.CERT_PATH),
      },
    }),
    host: "localhost",
    port: 5173,
  },
});
