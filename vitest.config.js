// Vitest configuration to test frontend and backend
// When running vitest, this configuration file overrides vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  root: "./tests",
  include: ["./**/*.test.js?(x)"],
});
