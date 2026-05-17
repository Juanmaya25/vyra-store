export type Review = {
  author: string;
  rating: number;
  date: string;
  text: string;
  photo?: string;
};

export type Product = {
  id: string;
  name: string;
  category: "Tecnología" | "Moda";
  tagline: string;
  priceUSD: number;
  compareUSD: number;
  images: string[];
  rating: number;        // imported from supplier
  reviewsCount: number;  // imported
  sold: number;          // imported
  badge?: string;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  description: string;
  reviews: Review[];
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const PRODUCTS: Product[] = [
  {
    id: "aura-buds",
    name: "VYRA Aura Buds Pro",
    category: "Tecnología",
    tagline: "Audio espacial · Cancelación adaptativa",
    priceUSD: 59,
    compareUSD: 119,
    images: [u("1606220588913-b3aacb4d2f46"), u("1572569511254-d8f925fe2cbb"), u("1590658268037-6bf12165a8df")],
    rating: 4.8,
    reviewsCount: 3127,
    sold: 18420,
    badge: "MÁS VENDIDO",
    colors: [{ name: "Negro", hex: "#15151c" }, { name: "Lima", hex: "#C6FF3D" }, { name: "Blanco", hex: "#ECECEC" }],
    description:
      "Sonido envolvente con ANC inteligente que se adapta a tu entorno. 36h de batería, latencia ultrabaja y resistencia al agua IPX5. El compañero perfecto para todo.",
    reviews: [
      { author: "Carlos M.", rating: 5, date: "12 abr 2026", text: "Increíble el sonido, mejor que unos que pagué el triple. Llegó en 6 días.", photo: u("1505740420928-5e560c06d30e") },
      { author: "Valentina R.", rating: 5, date: "3 abr 2026", text: "La cancelación de ruido es brutal, los uso en el bus y no escucho nada." },
      { author: "Mike T.", rating: 4, date: "28 mar 2026", text: "Great battery life. Bass could be slightly stronger but for the price it's amazing." },
    ],
  },
  {
    id: "neon-watch",
    name: "VYRA Pulse Smartwatch",
    category: "Tecnología",
    tagline: "AMOLED 1.9\" · SpO2 · 14 días batería",
    priceUSD: 74,
    compareUSD: 149,
    images: [u("1523275335684-37898b6baf30"), u("1546868871-7041f2a55e12"), u("1579586337278-3befd40fd17a")],
    rating: 4.7,
    reviewsCount: 2056,
    sold: 11890,
    badge: "TENDENCIA",
    colors: [{ name: "Grafito", hex: "#1c1c24" }, { name: "Arena", hex: "#C9B79C" }],
    sizes: ["S/M", "L/XL"],
    description:
      "Pantalla AMOLED siempre activa, más de 100 modos deportivos, monitoreo de oxígeno, sueño y ritmo cardíaco. Llamadas Bluetooth y resistencia 5ATM.",
    reviews: [
      { author: "Andrés P.", rating: 5, date: "9 abr 2026", text: "La pantalla se ve espectacular al sol. Batería real de 12 días con uso normal.", photo: u("1434493789847-2f02dc6ca35d") },
      { author: "Sofía L.", rating: 5, date: "1 abr 2026", text: "Elegante y preciso con los pasos. Me encanta el modo siempre activo." },
      { author: "Daniel K.", rating: 4, date: "22 mar 2026", text: "Solid watch. App could be better translated but functionality is on point." },
    ],
  },
  {
    id: "flux-jacket",
    name: "VYRA Flux Tech Jacket",
    category: "Moda",
    tagline: "Impermeable · Térmica · Reflectiva",
    priceUSD: 89,
    compareUSD: 179,
    images: [u("1551028719-00167b16eac5"), u("1591047139829-d91aecb6caea"), u("1578587018452-892bacefd3f2")],
    rating: 4.9,
    reviewsCount: 1488,
    sold: 7340,
    badge: "EDICIÓN LIMITADA",
    colors: [{ name: "Negro", hex: "#101015" }, { name: "Verde militar", hex: "#3a4a32" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Chaqueta técnica con membrana impermeable, costuras selladas y detalles reflectivos para la ciudad. Diseño minimalista futurista que va con todo.",
    reviews: [
      { author: "Juan David", rating: 5, date: "11 abr 2026", text: "La calidad sorprende, parece de marca cara. El corte queda perfecto.", photo: u("1483985988355-763728e1935b") },
      { author: "Camila S.", rating: 5, date: "5 abr 2026", text: "Me cuidó de un aguacero terrible y no se mojó nada por dentro. Brutal." },
      { author: "Alex R.", rating: 5, date: "30 mar 2026", text: "Best jacket I've bought online. Fit is true to size." },
    ],
  },
  {
    id: "orbit-lamp",
    name: "VYRA Orbit RGB Lamp",
    category: "Tecnología",
    tagline: "16M colores · App + voz · Música sync",
    priceUSD: 39,
    compareUSD: 79,
    images: [u("1517991104123-1d56a6e81ed9"), u("1565814329452-e1efa11c5b89"), u("1534073828943-f801091bb18c")],
    rating: 4.6,
    reviewsCount: 982,
    sold: 5210,
    colors: [{ name: "Blanco", hex: "#ECECEC" }],
    description:
      "Lámpara ambiental que reacciona a tu música, 16 millones de colores, control por app y asistentes de voz. Transforma cualquier espacio en segundos.",
    reviews: [
      { author: "Laura G.", rating: 5, date: "8 abr 2026", text: "Mi cuarto cambió totalmente, la sincronización con música funciona increíble." },
      { author: "Tom H.", rating: 4, date: "20 mar 2026", text: "Looks premium, app is intuitive. Wish it were a bit brighter." },
    ],
  },
  {
    id: "vortex-sneaker",
    name: "VYRA Vortex Runner",
    category: "Moda",
    tagline: "Ultraligera · Espuma reactiva · Knit",
    priceUSD: 64,
    compareUSD: 129,
    images: [u("1542291026-7eec264c27ff"), u("1606107557195-0e29a4b5b4aa"), u("1595950653106-6c9ebd614d3a")],
    rating: 4.8,
    reviewsCount: 2671,
    sold: 14060,
    badge: "MÁS VENDIDO",
    colors: [{ name: "Negro/Lima", hex: "#15151c" }, { name: "Blanco hueso", hex: "#E8E4DA" }],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    description:
      "Tejido knit transpirable con espuma de retorno energético. Diseñadas para el día completo: del gym a la calle sin perder estilo.",
    reviews: [
      { author: "Felipe A.", rating: 5, date: "10 abr 2026", text: "Comodísimas desde el primer día, no necesitan adaptación. Diseño top.", photo: u("1460353581641-37baddab0fa2") },
      { author: "Nicole B.", rating: 5, date: "2 abr 2026", text: "Recibo muchos cumplidos. Tallaje exacto, pedí mi número normal." },
      { author: "Ryan C.", rating: 4, date: "25 mar 2026", text: "Very comfortable and light. Shipping took 9 days to the US but worth it." },
    ],
  },
  {
    id: "halo-charger",
    name: "VYRA Halo MagSafe 3-en-1",
    category: "Tecnología",
    tagline: "Carga rápida · Plegable · 15W",
    priceUSD: 44,
    compareUSD: 89,
    images: [u("1591290619762-d4ba2bb7ef8a"), u("1583863788434-e58a36330cf0"), u("1572569511254-d8f925fe2cbb")],
    rating: 4.7,
    reviewsCount: 1320,
    sold: 6890,
    badge: "TENDENCIA",
    colors: [{ name: "Negro", hex: "#15151c" }],
    description:
      "Estación de carga inalámbrica 3-en-1 para teléfono, reloj y audífonos. Diseño plegable de viaje, carga magnética rápida y certificación de seguridad.",
    reviews: [
      { author: "María José", rating: 5, date: "7 abr 2026", text: "Carga todo mi setup de noche, ocupa nada en la mesa. Excelente acabado." },
      { author: "Kevin D.", rating: 5, date: "18 mar 2026", text: "Perfect for travel. Folds flat and charges fast." },
    ],
  },
];

export const CATEGORIES = ["Todos", "Tecnología", "Moda"] as const;

export const USD_TO_COP = 4050;

export function fmt(priceUSD: number, currency: "USD" | "COP") {
  if (currency === "USD") return `$${priceUSD.toFixed(0)} USD`;
  const cop = Math.round((priceUSD * USD_TO_COP) / 1000) * 1000;
  return `$${cop.toLocaleString("es-CO")} COP`;
}
