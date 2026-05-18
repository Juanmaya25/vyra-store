import type { Metadata } from "next";
import { LegalLayout } from "../ui";

export const metadata: Metadata = { title: "Política de Privacidad · VYRA" };

export default function Privacidad() {
  return (
    <LegalLayout title="Política de Privacidad">
      <p>En VYRA respetamos tu privacidad. Esta política explica qué datos recopilamos y cómo los usamos, conforme a la Ley 1581 de 2012 (Colombia) sobre protección de datos personales.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">1. Datos que recopilamos</h2>
      <p>Nombre, correo, teléfono, dirección de envío y datos de pago necesarios para procesar tu pedido. Los datos de pago son gestionados directamente por la pasarela y no se almacenan en nuestros servidores.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">2. Uso de la información</h2>
      <p>Usamos tus datos únicamente para procesar pedidos, enviar actualizaciones de tu compra y, si lo autorizas, comunicaciones de marketing.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">3. Tus derechos</h2>
      <p>Puedes solicitar acceso, corrección o eliminación de tus datos en cualquier momento contactándonos.</p>
      <h2 className="font-display font-bold text-[#14201A] text-lg pt-4">4. Cookies</h2>
      <p>Utilizamos almacenamiento local del navegador para recordar tu carrito y preferencias de moneda. No vendemos tus datos a terceros.</p>
      <p className="text-[#14201A]/35 text-xs font-mono pt-6">Última actualización: mayo 2026</p>
    </LegalLayout>
  );
}
