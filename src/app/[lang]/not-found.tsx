import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-[1328px] px-4 py-16 sm:px-6 lg:px-14">
      <div className="glass flex flex-col items-start gap-5 p-8 sm:p-14">
        <p className="mono-label">404</p>
        <h1 className="text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">
          Page not found <span className="text-muted">/ Página no encontrada</span>
        </h1>
        <div className="flex flex-wrap gap-2.5">
          <Link href="/en" className="btn btn-dark">Go home</Link>
          <Link href="/es" className="btn btn-light">Ir al inicio</Link>
        </div>
      </div>
    </section>
  );
}
