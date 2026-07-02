import { Link } from "react-router"

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="font-display text-6xl font-bold text-brand">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold">Página não encontrada</h1>
      <Link to="/" className="mt-6 inline-block rounded-lg bg-brand px-5 py-2.5
        text-sm font-medium text-white hover:bg-brand-dark">
        Voltar à loja
      </Link>
    </div>
  )
}
