import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv"; // Looks for .env file in ./.env

dotenv.config();
export default defineConfig({
  plugins: [tailwindcss(), react()],
  root: "./src/frontend",
  build: {
    outDir: "../../docker/nginx-reverse-proxy/",
  },
});
