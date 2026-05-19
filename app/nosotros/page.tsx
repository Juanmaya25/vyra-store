import type { Metadata } from "next";
import { LegalLayout } from "../ui";

export const metadata: Metadata = { title: "Sobre Nosotros · VYRA" };

export default function Nosotros() {
  return (
    <LegalLayout title="Sobre VYRA">
      <p className="text-lg">Somos una tienda de <strong className="text-[#15B968]">tecnología y moda de nueva generación</strong>. Curamos cada producto uno a uno: solo vendemos lo que tiene calificación real comprobada.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">Nuestra misión</h2>
      <p>Acercar productos de calidad a Colombia y Estados Unidos, con precios justos, envíos seguimiento en tiempo real y un servicio honesto. Sin letra pequeña.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">Por qué confiar en VYRA</h2>
      <p>Mostramos reseñas reales (importadas y de clientes verificados), tenemos garantía de 30 días, pago seguro y soporte directo por WhatsApp. Tu satisfacción es nuestra prioridad.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">Compromiso</h2>
      <p>Cumplimos la normativa colombiana de protección de datos (Ley 1581 de 2012) y de comercio electrónico. Tus datos están seguros y nunca se venden a terceros.</p>
    </LegalLayout>
  );
}
