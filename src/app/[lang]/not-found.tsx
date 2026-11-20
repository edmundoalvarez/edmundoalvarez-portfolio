import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-start gap-4 px-4 py-32 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="text-4xl font-semibold tracking-tight">
        Página no encontrada <span className="text-muted">/ Page not found</span>
      </h1>
      <div className="flex gap-5 text-sm font-medium">
        <Link href="/es" className="hover:text-accent">Ir al inicio</Link>
        <Link href="/en" className="hover:text-accent">Go home</Link>
      </div>
    </section>
  );
}
