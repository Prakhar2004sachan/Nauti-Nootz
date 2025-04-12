import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://nauti-nootz-be.vercel.app",
        changeOrigin: true,
        secure: true, // should be true for https in prod
      },
      "/auth": {
        target: "https://nauti-nootz-be.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
    host: "localhost",
    port: 5173,
    fs: {
      strict: false,
    },
  },
});
