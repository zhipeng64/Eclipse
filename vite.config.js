import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// Load environment variables based on NODE_ENV
let env = {};
if (process.env.NODE_ENV === "development") {
  env = loadEnv("development", "./src/frontend", "VITE_");
} else if (process.env.NODE_ENV === "production") {
  env = loadEnv("vite.production", "./src/frontend", "VITE_");
}

export default defineConfig({
  plugins: [tailwindcss(), react()],
  root: "./src/frontend",
  // For production build, output to ./dist
  build: {
    outDir: "./dist",
  },
  define: {
    VITE_BACKEND_URL: JSON.stringify(env.VITE_BACKEND_URL ?? ""),
    VITE_EVENT_STATUS_INITIALIZE: JSON.stringify(
      env.VITE_EVENT_STATUS_INITIALIZE ?? ""
    ),
    VITE_EVENT_STATUS_PUSH: JSON.stringify(env.VITE_EVENT_STATUS_PUSH ?? ""),
    VITE_EVENT_STATUS_DELETE: JSON.stringify(
      env.VITE_EVENT_STATUS_DELETE ?? ""
    ),
  },
  server: {
    // Configure HTTPS for development only
    ...(process.env.NODE_ENV === "development" && {
      https: {
        key: fs.readFileSync(env.VITE_CERT_PRIVATE_KEY_PATH),
        cert: fs.readFileSync(env.VITE_CERT_PATH),
      },
    }),
    host: true,
    port: 5173,
  },
});
