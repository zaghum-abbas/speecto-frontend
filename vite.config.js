import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Example alias configuration for Firebase
      "firebase/app": "firebase/app",
      "firebase/auth": "firebase/auth",
      // Add other Firebase modules as needed
    },
  },
});
