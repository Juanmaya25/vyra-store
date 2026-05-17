export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 text-center">
      <div className="aurora" /><div className="grain" />
      <div className="relative z-10">
        <p className="font-display font-black text-8xl sm:text-9xl grad">404</p>
        <h1 className="font-display font-bold text-2xl mt-4">Esta página se fue al futuro</h1>
        <p className="text-white/50 mt-3 max-w-sm mx-auto">
          No encontramos lo que buscabas, pero el drop sigue activo.
        </p>
        <a href="/vyra-store/" className="btn-lime inline-flex items-center gap-2 px-8 py-4 rounded-full mt-8">
          Volver a la tienda
        </a>
      </div>
    </div>
  );
}
