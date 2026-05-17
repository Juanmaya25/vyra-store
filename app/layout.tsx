import type { Metadata, Viewport } from "next";
import { Unbounded, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "900"],
});
const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
});
const mono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://juanmaya25.github.io/vyra-store"),
  title: "VYRA — El futuro, a tu puerta",
  description:
    "VYRA · Tecnología y moda de nueva generación. Productos curados, envíos a Colombia y USA. El futuro llegó.",
  keywords: ["VYRA", "tienda tecnología", "moda", "gadgets", "Colombia", "USA", "ecommerce premium"],
  openGraph: {
    title: "VYRA — El futuro, a tu puerta",
    description: "Tecnología y moda de nueva generación. Curado. Premium. Entregado.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
