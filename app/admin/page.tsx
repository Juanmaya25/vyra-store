"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  TrendingUp, ShoppingBag, Users, DollarSign, Package,
  ArrowUpRight, ArrowDownRight, Lock, Eye, EyeOff, Globe, LayoutDashboard, Calculator
} from "lucide-react";

/* ── Demo data ── */
const revenue = [
  { d: "Lun", v: 1840000 }, { d: "Mar", v: 2310000 }, { d: "Mié", v: 1980000 },
  { d: "Jue", v: 3120000 }, { d: "Vie", v: 4280000 }, { d: "Sáb", v: 5640000 },
  { d: "Dom", v: 4910000 },
];
const monthly = [
  { m: "Ene", v: 38 }, { m: "Feb", v: 44 }, { m: "Mar", v: 51 },
  { m: "Abr", v: 67 }, { m: "May", v: 82 },
];
const byCat = [
  { name: "Tecnología", value: 62, fill: "#15B968" },
  { name: "Moda", value: 38, fill: "#0FA88A" },
];
const byCountry = [
  { name: "Colombia", value: 71, fill: "#15B968" },
  { name: "USA", value: 29, fill: "#FF4D8D" },
];
const topProducts = [
  { name: "VYRA Vortex Runner", sold: 1406, rev: "$8.9M" },
  { name: "VYRA Aura Buds Pro", sold: 1842, rev: "$10.8M" },
  { name: "VYRA Pulse Smartwatch", sold: 1189, rev: "$8.8M" },
  { name: "VYRA Flux Tech Jacket", sold: 734, rev: "$6.5M" },
];
const orders = [
  { id: "#VY-2841", cliente: "Carlos M.", pais: "🇨🇴 CO", total: "$236.000", estado: "Enviado" },
  { id: "#VY-2840", cliente: "Mike T.", pais: "🇺🇸 US", total: "$74 USD", estado: "Procesando" },
  { id: "#VY-2839", cliente: "Valentina R.", pais: "🇨🇴 CO", total: "$359.000", estado: "Entregado" },
  { id: "#VY-2838", cliente: "Sofía L.", pais: "🇨🇴 CO", total: "$178.000", estado: "Enviado" },
  { id: "#VY-2837", cliente: "Ryan C.", pais: "🇺🇸 US", total: "$128 USD", estado: "Entregado" },
];

const estadoColor: Record<string, string> = {
  Enviado: "text-[#15B968] bg-[#15B968]/10",
  Procesando: "text-[#FFB84D] bg-[#FFB84D]/10",
  Entregado: "text-[#0FA88A] bg-[#0FA88A]/10",
};

function Tip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-3 py-2 text-xs font-mono">
      <p className="text-[#14201A]/50">{label}</p>
      <p className="text-[#15B968] font-bold">{payload[0].value.toLocaleString()}</p>
    </div>
  );
}

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);

  if (!auth) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-6">
        <div className="aurora" /><div className="grain" />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          className="relative z-10 glass rounded-3xl p-8 w-full max-w-sm">
          <div className="w-14 h-14 rounded-2xl bg-[#15B968]/15 flex items-center justify-center mb-5">
            <Lock size={24} className="text-[#15B968]" />
          </div>
          <p className="font-display font-black text-2xl">Panel VYRA</p>
          <p className="text-[#14201A]/45 text-sm mt-1 mb-6">Acceso solo administrador</p>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={pass}
              onChange={(e) => { setPass(e.target.value); setErr(false); }}
              onKeyDown={(e) => e.key === "Enter" && (pass === "vyra2026" ? setAuth(true) : setErr(true))}
              placeholder="Contraseña"
              className="w-full glass rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:border-[#15B968]"
            />
            <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#14201A]/40">
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {err && <p className="text-[#FF4D8D] text-xs mt-2 font-mono">Contraseña incorrecta</p>}
          <button onClick={() => (pass === "vyra2026" ? setAuth(true) : setErr(true))}
            className="btn-lime w-full py-3 rounded-xl mt-4">Entrar</button>
          <p className="text-[#14201A]/30 text-[11px] mt-4 font-mono text-center">Demo · contraseña: vyra2026</p>
        </motion.div>
      </div>
    );
  }

  return <Dashboard />;
}

type AdminOrder = { id: number; created_at?: string; cliente: string; email?: string; pais: string; items?: unknown; total_usd: number; estado: string };
type AdminRow = { rawId?: number; id: string; cliente: string; pais: string; total: string; estado: string };

function Dashboard() {
  const [realOrders, setRealOrders] = useState<AdminOrder[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { supabase } = await import("../supabase");
        const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(50);
        setRealOrders((data ?? []) as AdminOrder[]);
      } catch { setRealOrders([]); }
    })();
  }, []);

  const liveCount = realOrders?.length ?? 0;
  const liveRevenue = (realOrders ?? []).reduce((s, o) => s + Number(o.total_usd || 0), 0);

  const kpis = [
    { icon: DollarSign, label: "Ingresos reales (USD)", value: liveCount ? `$${liveRevenue.toLocaleString()}` : "$82.4M COP", delta: liveCount ? "EN VIVO" : "+23%", up: true },
    { icon: ShoppingBag, label: "Pedidos reales", value: liveCount ? String(liveCount) : "1,284", delta: liveCount ? "EN VIVO" : "+18%", up: true },
    { icon: Users, label: "Clientes nuevos", value: "642", delta: "+31%", up: true },
    { icon: TrendingUp, label: "Tasa conversión", value: "3.8%", delta: "-0.4%", up: false },
  ];

  const liveRows = (realOrders ?? []).map((o) => ({
    rawId: o.id as number,
    id: `#VY-${o.id}`,
    cliente: o.cliente,
    pais: o.pais,
    total: `$${Number(o.total_usd).toLocaleString()} USD`,
    estado: o.estado,
  }));
  const rows: AdminRow[] = liveRows.length ? liveRows : orders;

  async function setStatus(rawId: number, estado: string) {
    setRealOrders((prev) => (prev ?? []).map((o) => (o.id === rawId ? { ...o, estado } : o)));
    try {
      const { supabase } = await import("../supabase");
      await supabase.from("orders").update({ estado }).eq("id", rawId);
    } catch {
      alert("No se pudo actualizar. Ejecuta el SQL de permiso de update en Supabase.");
    }
  }

  const nuevos = (realOrders ?? []).filter((o) => o.estado === "Procesando").length;

  return (
    <div className="relative min-h-screen">
      <div className="aurora" /><div className="grain" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {nuevos > 0 && (
          <div className="glass rounded-2xl px-5 py-3 mb-6 flex items-center gap-3 border-l-4 border-[#15B968]">
            <span className="w-7 h-7 rounded-full bg-[#15B968] text-[#06120B] text-xs font-bold flex items-center justify-center">{nuevos}</span>
            <p className="text-sm font-medium">Tienes <strong>{nuevos}</strong> pedido(s) nuevo(s) por procesar 🔔</p>
          </div>
        )}
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#15B968] text-[#06120B] flex items-center justify-center">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <p className="font-display font-black text-xl">VY<span className="text-[#15B968]">R</span>A · Admin</p>
              <p className="text-[#14201A]/40 text-xs font-mono">Dashboard · datos demo</p>
            </div>
          </div>
          <a href="./" className="btn-ghost px-5 py-2.5 rounded-full text-sm">← Ver tienda</a>
        </div>

        {/* KPIs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {kpis.map(({ icon: Icon, label, value, delta, up }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }} className="glass rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#15B968]/15 flex items-center justify-center">
                  <Icon size={20} className="text-[#15B968]" />
                </div>
                <span className={`flex items-center gap-1 text-xs font-mono font-bold ${up ? "text-[#15B968]" : "text-[#FF4D8D]"}`}>
                  {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{delta}
                </span>
              </div>
              <p className="font-display font-black text-2xl">{value}</p>
              <p className="text-[#14201A]/45 text-sm mt-1">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid lg:grid-cols-3 gap-5 mb-6">
          <div className="lg:col-span-2 glass rounded-3xl p-6">
            <p className="font-display font-bold mb-1">Ingresos esta semana</p>
            <p className="text-[#14201A]/40 text-xs font-mono mb-5">COP · últimos 7 días</p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenue}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#15B968" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#15B968" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
                <XAxis dataKey="d" stroke="#8B8B97" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#8B8B97" fontSize={11} tickLine={false} axisLine={false}
                  tickFormatter={(v) => `${v / 1000000}M`} />
                <Tooltip content={<Tip />} />
                <Area type="monotone" dataKey="v" stroke="#15B968" strokeWidth={2.5} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="glass rounded-3xl p-6">
            <p className="font-display font-bold mb-1">Ventas por categoría</p>
            <p className="text-[#14201A]/40 text-xs font-mono mb-3">% del total</p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={byCat} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={4} stroke="none">
                  {byCat.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Pie>
                <Tooltip content={<Tip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-5">
              {byCat.map((c) => (
                <div key={c.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.fill }} />
                  <span className="text-[#14201A]/60">{c.name} {c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid lg:grid-cols-3 gap-5 mb-6">
          <div className="glass rounded-3xl p-6">
            <p className="font-display font-bold mb-1">Crecimiento mensual</p>
            <p className="text-[#14201A]/40 text-xs font-mono mb-5">Ingresos M COP</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
                <XAxis dataKey="m" stroke="#8B8B97" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<Tip />} cursor={{ fill: "rgba(198,255,61,0.05)" }} />
                <Bar dataKey="v" fill="#0FA88A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="glass rounded-3xl p-6">
            <p className="font-display font-bold mb-1 flex items-center gap-2"><Globe size={16} className="text-[#15B968]" /> Ventas por país</p>
            <p className="text-[#14201A]/40 text-xs font-mono mb-3">Colombia vs USA</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={byCountry} dataKey="value" innerRadius={50} outerRadius={82} paddingAngle={4} stroke="none">
                  {byCountry.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Pie>
                <Tooltip content={<Tip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-5">
              {byCountry.map((c) => (
                <div key={c.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.fill }} />
                  <span className="text-[#14201A]/60">{c.name} {c.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-3xl p-6">
            <p className="font-display font-bold mb-4 flex items-center gap-2"><Package size={16} className="text-[#15B968]" /> Top productos</p>
            <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#14201A]/30 w-4">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-tight">{p.name}</p>
                    <p className="text-[#14201A]/40 text-xs">{p.sold.toLocaleString()} vendidos</p>
                  </div>
                  <span className="font-mono text-sm text-[#15B968]">{p.rev}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <PricingEngine />

        {/* Orders */}
        <div className="glass rounded-3xl p-6">
          <p className="font-display font-bold mb-5 flex items-center gap-2">
            Pedidos recientes
            {liveRows.length > 0
              ? <span className="text-[10px] font-mono bg-[#15B968]/15 text-[#15B968] px-2 py-0.5 rounded-full">● EN VIVO · Supabase</span>
              : <span className="text-[10px] font-mono text-[#14201A]/40">(demo · sin pedidos reales aún)</span>}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#14201A]/40 font-mono text-xs uppercase tracking-wider border-b border-[var(--line)]">
                  <th className="text-left pb-3 font-normal">Pedido</th>
                  <th className="text-left pb-3 font-normal">Cliente</th>
                  <th className="text-left pb-3 font-normal">País</th>
                  <th className="text-left pb-3 font-normal">Total</th>
                  <th className="text-left pb-3 font-normal">Estado</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((o, i) => (
                  <tr key={i} className="border-b border-[var(--line)] last:border-0">
                    <td className="py-3.5 font-mono text-[#15B968]">{o.id}</td>
                    <td className="py-3.5">{o.cliente}</td>
                    <td className="py-3.5 text-[#14201A]/60">{o.pais}</td>
                    <td className="py-3.5 font-mono">{o.total}</td>
                    <td className="py-3.5">
                      {o.rawId ? (
                        <select value={o.estado} onChange={(e) => setStatus(o.rawId as number, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-medium outline-none cursor-pointer border-0 ${estadoColor[o.estado] ?? "text-[#15B968] bg-[#15B968]/10"}`}>
                          {["Procesando", "Enviado", "Entregado", "Cancelado"].map((s) => (
                            <option key={s} value={s} className="bg-white text-[#14201A]">{s}</option>
                          ))}
                        </select>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${estadoColor[o.estado] ?? "text-[#15B968] bg-[#15B968]/10"}`}>{o.estado}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingEngine() {
  const [cost, setCost] = useState(20);
  const [margin, setMargin] = useState(150);
  const [comp, setComp] = useState(55);
  const suggested = +(cost * (1 + margin / 100)).toFixed(2);
  const profit = +(suggested - cost).toFixed(2);
  const competitive = suggested <= comp;
  return (
    <div className="glass rounded-3xl p-6 mb-6">
      <p className="font-display font-bold mb-1 flex items-center gap-2">
        <Calculator size={16} className="text-[#15B968]" /> Motor de precios inteligente
      </p>
      <p className="text-[#14201A]/40 text-xs font-mono mb-5">Calcula tu precio óptimo según costo, margen y competencia (USD)</p>
      <div className="grid sm:grid-cols-3 gap-4 mb-5">
        {[
          { label: "Costo proveedor", val: cost, set: setCost },
          { label: "Margen deseado %", val: margin, set: setMargin },
          { label: "Precio competencia", val: comp, set: setComp },
        ].map((f) => (
          <div key={f.label}>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#14201A]/40 mb-1.5">{f.label}</label>
            <input type="number" value={f.val} onChange={(e) => f.set(Number(e.target.value))}
              className="w-full glass rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#15B968]" />
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-4">
          <p className="text-[#14201A]/45 text-xs">Precio sugerido</p>
          <p className="font-display font-black text-2xl text-[#15B968]">${suggested}</p>
        </div>
        <div className="glass rounded-2xl p-4">
          <p className="text-[#14201A]/45 text-xs">Ganancia por venta</p>
          <p className="font-display font-black text-2xl">${profit}</p>
        </div>
        <div className={`rounded-2xl p-4 ${competitive ? "bg-[#15B968]/10" : "bg-[#E0457E]/10"}`}>
          <p className="text-[#14201A]/45 text-xs">Competitividad</p>
          <p className={`font-display font-black text-lg ${competitive ? "text-[#15B968]" : "text-[#E0457E]"}`}>
            {competitive ? "✓ Competitivo" : "✗ Estás caro"}
          </p>
        </div>
      </div>
    </div>
  );
}
