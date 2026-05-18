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
    colors: [{ name: "Negro", hex: "#15151c" }, { name: "Lima", hex: "#2BE08A" }, { name: "Blanco", hex: "#ECECEC" }],
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
  {
    id: "shadow-hoodie",
    name: "VYRA Shadow Hoodie",
    category: "Moda",
    tagline: "Algodón premium · Oversize · Unisex",
    priceUSD: 49,
    compareUSD: 99,
    images: [u("1556821840-3a63f95609a7"), u("1620799140408-edc6dcb6d633"), u("1578768079052-aa76e52ff62e")],
    rating: 4.8,
    reviewsCount: 1934,
    sold: 9120,
    badge: "TENDENCIA",
    colors: [{ name: "Negro", hex: "#101015" }, { name: "Crema", hex: "#E8E1D2" }, { name: "Verde", hex: "#3a4a32" }],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Hoodie de algodón pesado con caída oversize perfecta. Interior afelpado, cordones metálicos y bordado minimalista. El básico premium que faltaba en tu clóset.",
    reviews: [
      { author: "Mariana T.", rating: 5, date: "13 abr 2026", text: "La tela es gruesa y suave, calidad real. Me quedó perfecto el oversize.", photo: u("1503342217505-b0a15ec3261c") },
      { author: "Jhon B.", rating: 5, date: "6 abr 2026", text: "Mejor hoodie que tengo, y he comprado caros. Recomendadísimo." },
      { author: "Emma W.", rating: 4, date: "29 mar 2026", text: "Love it, super comfy. Runs slightly large which I prefer." },
    ],
  },
  {
    id: "nova-projector",
    name: "VYRA Nova Mini Proyector",
    category: "Tecnología",
    tagline: "1080p · WiFi · 200\" · Portátil",
    priceUSD: 96,
    compareUSD: 199,
    images: [u("1626379953822-baec19c3accd"), u("1593784991095-a205069470b6"), u("1517604931442-7e0c8ed2963c")],
    rating: 4.6,
    reviewsCount: 1107,
    sold: 4580,
    colors: [{ name: "Blanco", hex: "#ECECEC" }],
    description:
      "Proyector portátil Full HD con WiFi y Bluetooth. Imagen de hasta 200 pulgadas, ideal para cine en casa o presentaciones. Conecta tu teléfono en segundos.",
    reviews: [
      { author: "Andrea P.", rating: 5, date: "10 abr 2026", text: "Convertí mi sala en un cine. La imagen se ve increíble de noche." },
      { author: "Luis F.", rating: 4, date: "24 mar 2026", text: "Buen brillo para el precio. Mejor usarlo en cuarto oscuro." },
    ],
  },
  {
    id: "titan-bottle",
    name: "VYRA Titan Bottle 1L",
    category: "Moda",
    tagline: "Acero · 24h frío · Térmica",
    priceUSD: 29,
    compareUSD: 59,
    images: [u("1602143407151-7111542de6e8"), u("1523362628745-0c100150b504"), u("1610824352934-c10d87b700cc")],
    rating: 4.9,
    reviewsCount: 2890,
    sold: 15670,
    badge: "MÁS VENDIDO",
    colors: [{ name: "Negro mate", hex: "#15151c" }, { name: "Lima", hex: "#2BE08A" }, { name: "Arena", hex: "#C9B79C" }],
    description:
      "Botella térmica de acero inoxidable que mantiene tus bebidas frías 24h o calientes 12h. Diseño antigoteo, libre de BPA y acabado premium antideslizante.",
    reviews: [
      { author: "Camilo R.", rating: 5, date: "12 abr 2026", text: "El agua sigue helada al otro día, no exageran. Calidad top." },
      { author: "Sara N.", rating: 5, date: "2 abr 2026", text: "La uso en el gym y la oficina, se ve elegante y no gotea nada." },
      { author: "Paul G.", rating: 5, date: "27 mar 2026", text: "Keeps ice for over a day. Best bottle I've owned." },
    ],
  },
  {
    id: "glow-ring",
    name: "VYRA Glow Ring Light Pro",
    category: "Tecnología",
    tagline: "18\" · 3 tonos · Trípode 2m",
    priceUSD: 42,
    compareUSD: 85,
    images: [u("1610792516307-bd87b8e2ce93"), u("1598550476439-6847785fcea6"), u("1565130838609-c3a86655db61")],
    rating: 4.7,
    reviewsCount: 1456,
    sold: 7210,
    colors: [{ name: "Negro", hex: "#15151c" }],
    description:
      "Aro de luz profesional de 18\" con 3 temperaturas de color y 10 niveles de intensidad. Incluye trípode de 2m y soporte para teléfono. Ideal para creadores de contenido.",
    reviews: [
      { author: "Daniela M.", rating: 5, date: "9 abr 2026", text: "Mis videos cambiaron totalmente, la luz es pareja y bonita." },
      { author: "Chris T.", rating: 4, date: "21 mar 2026", text: "Great light, sturdy tripod. App control would be a nice plus." },
    ],
  },
];

export const CATEGORIES = ["Todos", "Tecnología", "Moda"] as const;

/* ── Multi-país / multi-moneda ── */
export type CurrencyCode = "COP" | "USD" | "MXN" | "EUR" | "CLP" | "PEN" | "ARS" | "BRL";

export const CURRENCIES: Record<CurrencyCode, { flag: string; label: string; rate: number; locale: string; round: number }> = {
  COP: { flag: "🇨🇴", label: "Colombia", rate: 4050, locale: "es-CO", round: 1000 },
  USD: { flag: "🇺🇸", label: "USA", rate: 1, locale: "en-US", round: 1 },
  MXN: { flag: "🇲🇽", label: "México", rate: 17, locale: "es-MX", round: 5 },
  EUR: { flag: "🇪🇸", label: "España", rate: 0.92, locale: "es-ES", round: 1 },
  CLP: { flag: "🇨🇱", label: "Chile", rate: 950, locale: "es-CL", round: 100 },
  PEN: { flag: "🇵🇪", label: "Perú", rate: 3.7, locale: "es-PE", round: 1 },
  ARS: { flag: "🇦🇷", label: "Argentina", rate: 980, locale: "es-AR", round: 100 },
  BRL: { flag: "🇧🇷", label: "Brasil", rate: 5.1, locale: "pt-BR", round: 1 },
};

export function fmt(priceUSD: number, currency: CurrencyCode) {
  const c = CURRENCIES[currency] ?? CURRENCIES.USD;
  const raw = priceUSD * c.rate;
  const val = Math.round(raw / c.round) * c.round;
  return `$${val.toLocaleString(c.locale)} ${currency}`;
}
