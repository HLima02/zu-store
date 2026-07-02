import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'

const linkClass = ({ isActive }: { isActive: boolean}) =>  
  `text-sm transition hover:text-ink ${ isActive ? 'text-ink font-medium' : 'text-muted'}`

export function Header() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const cartCount = 0

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && q.trim()){
      navigate(`/busca?q=${encodeURIComponent(q.trim())}`)
    }
  }

  return (
    <header className='sticky top-0 z-40 border-b border-line bg-surface/80 backdrop-blur'>
      <div className='mx-auto flex h-16 max-w-6xl items-center gap-5 px-4'>
        <Link to="/" className='font-display text-xl font-bold shrink-0'>
          Zu<span className='text-brand'>Store</span>
        </Link>

        <nav className='hidden items-center gap-5 md:flex'>
          <NavLink to="/produtos" className={linkClass}>Produtos</NavLink>
          <NavLink to="/favoritos" className={linkClass}>Favoritos</NavLink>
        </nav>

        <input 
        type="text" 
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={onSearch}
        placeholder='Buscar produtos'
        className='mx-auto hidden w-full max-w-xs rounded-lg border border-line bg-canvas px-3 py-2 text-sm outline-none focus:border-brand sm:block '
        />

        <div className='ml-suto flex items-center gap-4'>
          <Link to="/conta" aria-label="Conta" className="text-muted hover:text-ink">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>

          <Link to="/carrinho" aria-label='Conta' className='relative text-muted hover:text-ink'>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            { cartCount > 0 && (
              <span className='absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-brand text-[11px] font-bold text-white'>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
