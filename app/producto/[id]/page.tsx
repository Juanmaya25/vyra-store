import type { Metadata } from "next";
import { PRODUCTS } from "../../products";
import ProductView from "./ProductView";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return { title: "Producto · VYRA" };
  return {
    title: `${p.name} · VYRA`,
    description: `${p.tagline}. ${p.description.slice(0, 120)}`,
    openGraph: {
      title: `${p.name} · VYRA`,
      description: p.tagline,
      images: [p.images[0]],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((x) => x.id === id) ?? PRODUCTS[0];
  const related = PRODUCTS.filter((x) => x.category === product.category && x.id !== product.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    brand: { "@type": "Brand", name: "VYRA" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.priceUSD,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductView product={product} related={related} />
    </>
  );
}
