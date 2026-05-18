import type { Metadata } from "next";
import { LegalLayout } from "../ui";

export const metadata: Metadata = { title: "Devoluciones y Garantía · VYRA" };

export default function Devoluciones() {
  return (
    <LegalLayout title="Devoluciones y Garantía">
      <p>Tu satisfacción es nuestra prioridad. Por eso ofrecemos la <strong className="text-[#15B968]">Garantía VYRA de 30 días</strong>.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">1. Derecho de retracto</h2>
      <p>Conforme a la ley colombiana, tienes 5 días hábiles desde la entrega para ejercer el derecho de retracto, siempre que el producto esté sin usar y en su empaque original.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">2. Garantía de 30 días</h2>
      <p>Si el producto presenta defectos de fábrica dentro de los primeros 30 días, lo cambiamos o devolvemos tu dinero sin preguntas incómodas.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">3. Cómo solicitar una devolución</h2>
      <p>Escríbenos por WhatsApp con tu número de pedido y una breve descripción. Te guiamos en todo el proceso de recogida o reenvío.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">4. Reembolsos</h2>
      <p>Los reembolsos se procesan en un plazo de 5 a 10 días hábiles al mismo medio de pago utilizado.</p>
      <p className="text-[#14201A]/35 text-xs font-mono pt-6">Última actualización: mayo 2026</p>
    </LegalLayout>
  );
}
