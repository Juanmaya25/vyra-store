// ════════════════════════════════════════════════════════════
//  VYRA · Notificaciones de WhatsApp al admin
//  Usa CallMeBot (gratis) — necesita configuración 1 sola vez:
//  1. Agrega el contacto +34 644 51 95 23 a tu WhatsApp
//  2. Envíale: "I allow callmebot to send me messages"
//  3. Te responde con tu API key
//  4. Pega esa API key en CALLMEBOT_API_KEY abajo
// ════════════════════════════════════════════════════════════

const ADMIN_PHONE = "573192859483";            // tu número (sin +)
const CALLMEBOT_API_KEY = "";                  // ← pega tu API key aquí

export async function notifyOrder(orderId: number, cliente: string, total: number, pais: string, coupon: string | null) {
  if (!CALLMEBOT_API_KEY) return; // no configurado → no envía
  const msg = [
    `🛒 *Nuevo pedido VYRA #VY-${orderId}*`,
    `👤 ${cliente}`,
    `🌎 ${pais}`,
    `💰 $${total.toFixed(2)} USD`,
    coupon ? `🎟️ Cupón: ${coupon}` : "",
    `\n➡️ Revisa el panel: https://juanmaya25.github.io/vyra-store/admin/`,
  ].filter(Boolean).join("\n");

  const url = `https://api.callmebot.com/whatsapp.php?phone=${ADMIN_PHONE}&text=${encodeURIComponent(msg)}&apikey=${CALLMEBOT_API_KEY}`;
  try {
    await fetch(url, { mode: "no-cors" });
  } catch { /* silencioso: si falla, no rompe el pedido */ }
}
