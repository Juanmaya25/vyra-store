import type { Metadata } from "next";
import { LegalLayout } from "../ui";

export const metadata: Metadata = { title: "Envíos · VYRA" };

export default function Envios() {
  return (
    <LegalLayout title="Política de Envíos">
      <p>Enviamos a toda Colombia y Estados Unidos con seguimiento en tiempo real.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">1. Tiempos de entrega</h2>
      <p><strong className="text-[#15B968]">Colombia:</strong> 3 a 7 días hábiles según la ciudad. Despacho dentro de las 48h tras confirmar el pedido.</p>
      <p><strong className="text-[#15B968]">Estados Unidos:</strong> 7 a 14 días hábiles según el destino.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">2. Costos de envío</h2>
      <p>Envío gratis en pedidos superiores a $50 USD. Para pedidos menores, el costo se calcula al finalizar la compra según tu ubicación.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">3. Pago contra entrega</h2>
      <p>Disponible en las principales ciudades de Colombia. Pagas en efectivo al recibir tu pedido.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">4. Seguimiento</h2>
      <p>Una vez despachado tu pedido, recibirás un número de guía para rastrear tu envío en todo momento.</p>
      <p className="text-[#14201A]/35 text-xs font-mono pt-6">Última actualización: mayo 2026</p>
    </LegalLayout>
  );
}
