import type { MetadataRoute } from "next";
import { PRODUCTS } from "./products";

const BASE = "https://juanmaya25.github.io/vyra-store";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/terminos", "/privacidad", "/devoluciones", "/envios"];
  return [
    ...staticPaths.map((p) => ({ url: `${BASE}${p}/`, lastModified: now, priority: p === "" ? 1 : 0.5 })),
    ...PRODUCTS.map((p) => ({ url: `${BASE}/producto/${p.id}/`, lastModified: now, priority: 0.8 })),
  ];
}
