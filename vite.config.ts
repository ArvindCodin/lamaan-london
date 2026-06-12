import { hydrogen } from "@shopify/hydrogen/vite";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    hydrogen(),
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
    // Bundle all node_modules into the worker — Oxygen has no npm module resolution.
    // This replicates what @shopify/mini-oxygen/vite's oxygen() plugin provides.
    noExternal: true,
    target: "webworker",
    resolve: {
      conditions: ["worker", "workerd", "browser", "module", "import", "default"],
    },
    optimizeDeps: {
      include: [
        "react",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-dom",
        "react-dom/server",
        "react-router",
      ],
    },
  },
});
