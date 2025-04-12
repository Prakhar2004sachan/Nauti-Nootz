import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://nauti-nootz-be.vercel.app",
    },
    host: "0.0.0.0",
    fs: {
      strict: false,
    },
  },
});
