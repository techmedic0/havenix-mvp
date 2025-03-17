import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/havenix-mvp/" : "/", // ✅ Use `/` locally, `/havenix-mvp/` in production
});
