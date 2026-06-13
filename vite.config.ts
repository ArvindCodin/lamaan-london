import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    reactRouter(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "~": path.resolve(import.meta.dirname, "app"),
    },
  },
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  build: {
    assetsInlineLimit: 0,
  },
  ssr: {
    noExternal: true,
  },
});
