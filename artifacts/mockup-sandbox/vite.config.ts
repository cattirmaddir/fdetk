import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { mockupPreviewPlugin } from "./mockupPreviewPlugin";

export default defineConfig(({ command }) => {
  const isServe = command === "serve";
  let port = 3000; 
  let basePath = "/"; 

  // Enforce required runtime environment variables ONLY during interactive serve execution
  if (isServe) {
    const rawPort = process.env.PORT;
    if (!rawPort) {
      throw new Error(
        "PORT environment variable is required but was not provided.",
      );
    }

    port = Number(rawPort);
    if (Number.isNaN(port) || port <= 0) {
      throw new Error(`Invalid PORT value: "${rawPort}"`);
    }

    const envBasePath = process.env.BASE_PATH;
    if (!envBasePath) {
      throw new Error(
        "BASE_PATH environment variable is required but was not provided.",
      );
    }
    basePath = envBasePath;
  } else {
    // Graceful build stage fallbacks
    if (process.env.PORT) port = Number(process.env.PORT);
    if (process.env.BASE_PATH) basePath = process.env.BASE_PATH;
  }

  // Define explicitly typed plugins array mapping to avoid TypeScript declaration mismatches
  const dynamicPlugins: UserConfig["plugins"] = [
    mockupPreviewPlugin(),
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
  ];

  // Safely inject conditional dynamic plugins without causing signature issues
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    const cartographerPromise = import("@replit/vite-plugin-cartographer").then((m) =>
      m.cartographer({
        root: path.resolve(import.meta.dirname, ".."),
      }),
    );
    dynamicPlugins.push(cartographerPromise as any);
  }

  return {
    base: basePath,
    plugins: dynamicPlugins,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
      },
    },
    root: path.resolve(import.meta.dirname),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
    },
    server: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
      fs: {
        strict: true,
      },
    },
    preview: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});
