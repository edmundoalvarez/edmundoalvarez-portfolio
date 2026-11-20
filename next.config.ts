import type { NextConfig } from "next";

// Sitio 100 % estático: sin Cache Components, así `dynamicParams = false`
// devuelve un 404 real para rutas desconocidas.
const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
