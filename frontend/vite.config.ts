import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://nauti-nootz-be.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
    host: "0.0.0.0",
    fs: {
      strict: false,
    },
  },
});
