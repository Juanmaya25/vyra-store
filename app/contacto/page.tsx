"use client";

import { useState } from "react";
import { MessageCircle, Mail, Clock, Check } from "lucide-react";
import { Nav, Footer, WhatsAppFloat } from "../ui";

const WA = "573192859483";
const EMAIL = "hola.vyra.store@gmail.com";

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const body = encodeURIComponent(`Nombre: ${form.nombre}\nCorreo: ${form.email}\n\n${form.msg}`);
    window.open(`mailto:${EMAIL}?subject=${encodeURIComponent("Contacto VYRA - " + form.nombre)}&body=${body}`);
    setSent(true);
  }

  return (
    <div className="relative min-h-screen">
      <div className="aurora" /><div className="grain" />
      <Nav base="../" />
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <h1 className="font-display font-black text-4xl mb-3">Hablemos</h1>
        <p className="text-[#14201A]/50 mb-10 max-w-lg">¿Dudas sobre un producto, tu pedido o quieres ser mayorista? Estamos para ayudarte.</p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 glass rounded-2xl p-5 hover:border-[#15B968] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 flex items-center justify-center"><MessageCircle size={22} className="text-[#25D366]" /></div>
              <div><p className="font-bold">WhatsApp</p><p className="text-[#14201A]/50 text-sm">Respuesta inmediata · lo más rápido</p></div>
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 glass rounded-2xl p-5 hover:border-[#15B968] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#15B968]/15 flex items-center justify-center"><Mail size={22} className="text-[#15B968]" /></div>
              <div><p className="font-bold">Correo</p><p className="text-[#14201A]/50 text-sm">{EMAIL}</p></div>
            </a>
            <div className="flex items-center gap-4 glass rounded-2xl p-5">
              <div className="w-12 h-12 rounded-xl bg-[#0FA88A]/15 flex items-center justify-center"><Clock size={22} className="text-[#0FA88A]" /></div>
              <div><p className="font-bold">Horario</p><p className="text-[#14201A]/50 text-sm">Lun a Sáb · 8am – 8pm (COL)</p></div>
            </div>
          </div>

          <div className="glass rounded-3xl p-7">
            {sent ? (
              <div className="text-center py-10">
                <Check size={40} className="text-[#15B968] mx-auto mb-3" />
                <p className="font-display font-bold text-lg">¡Mensaje listo!</p>
                <p className="text-[#14201A]/50 text-sm mt-2">Se abrió tu correo. También puedes escribirnos directo por WhatsApp.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <h2 className="font-display font-bold text-lg">Envíanos un mensaje</h2>
                <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Tu nombre" className="w-full glass rounded-xl px-4 py-3 text-sm outline-none focus:border-[#15B968]" />
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Tu correo" className="w-full glass rounded-xl px-4 py-3 text-sm outline-none focus:border-[#15B968]" />
                <textarea required rows={4} value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  placeholder="¿En qué te ayudamos?" className="w-full glass rounded-xl px-4 py-3 text-sm outline-none focus:border-[#15B968] resize-none" />
                <button className="btn-lime w-full py-3.5 rounded-xl">Enviar mensaje</button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer base="../" />
      <WhatsAppFloat />
    </div>
  );
}
