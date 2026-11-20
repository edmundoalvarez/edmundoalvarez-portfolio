import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Edmundo Alvarez · Full Stack & React Native Developer",
    short_name: "Edmundo Alvarez",
    description: "Portfolio of Edmundo Alvarez, Full Stack & React Native developer based in Buenos Aires.",
    start_url: "/en",
    display: "browser",
    background_color: "#ededed",
    theme_color: "#ededed",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
