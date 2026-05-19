import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VYRA — El futuro, a tu puerta",
    short_name: "VYRA",
    description: "Tecnología y moda de nueva generación. Envíos a 8 países.",
    start_url: "/vyra-store/",
    scope: "/vyra-store/",
    display: "standalone",
    background_color: "#F7F9F6",
    theme_color: "#15B968",
    icons: [
      { src: "/vyra-store/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
