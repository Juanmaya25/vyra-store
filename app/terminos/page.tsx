import type { Metadata } from "next";
import { LegalLayout } from "../ui";

export const metadata: Metadata = { title: "Términos y Condiciones · VYRA" };

export default function Terminos() {
  return (
    <LegalLayout title="Términos y Condiciones">
      <p>Bienvenido a VYRA. Al usar este sitio y realizar una compra, aceptas los siguientes términos. Te recomendamos leerlos con atención.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">1. Productos y precios</h2>
      <p>Los precios se muestran en COP o USD según tu selección. Nos reservamos el derecho de modificar precios y disponibilidad sin previo aviso. Las imágenes son ilustrativas.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">2. Pedidos</h2>
      <p>Una vez confirmado el pago, recibirás un correo con el detalle de tu pedido. El despacho se realiza dentro de las 48 horas hábiles siguientes.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">3. Pagos</h2>
      <p>Aceptamos pagos a través de pasarelas seguras (Wompi, Stripe) y pago contra entrega en Colombia donde esté disponible.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">4. Propiedad intelectual</h2>
      <p>Todo el contenido, marca y diseño de VYRA es propiedad de la tienda y no puede reproducirse sin autorización.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">5. Contacto</h2>
      <p>Para cualquier consulta sobre estos términos, escríbenos por WhatsApp o a nuestro correo de soporte.</p>
      <p className="text-[#14201A]/35 text-xs font-mono pt-6">Última actualización: mayo 2026</p>
    </LegalLayout>
  );
}
