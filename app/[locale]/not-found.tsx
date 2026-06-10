import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-6xl font-bold text-petrol">404</p>
      <p className="mt-3 text-lg text-muted">
        Página no encontrada · Page not found
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-dark"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
