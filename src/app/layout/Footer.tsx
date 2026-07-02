import { Link } from "react-router"

export function Footer() {
  return (
    <footer className='border-t border-line bg-surface'>
      <div className='mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between'>
        <p className='font-display font-semibold text-ink'>
          Zu<span className='text-brand'>Store</span>
        </p>
        <nav className="flex gap-5">
          <Link to="/produtos" className="hover:text-ink">Produtos</Link>
          <Link to="/favoritos" className="hover:text-ink">Favoritos</Link>
          <Link to="/conta" className="hover:text-ink">Conta</Link>
        </nav>
        <p>© { new Date().getFullYear() } ZuStore</p>
      </div>
    </footer>
  )
}
