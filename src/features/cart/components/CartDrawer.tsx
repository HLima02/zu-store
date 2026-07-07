import React from 'react'
import { useUIStore } from '@/store/uiStore'
import { useCartStore, selectTotalPrice } from '@/store/cartStore'
import { formatBRL } from '@/shared/lib/format'
import { Link } from 'react-router'
export function CartDrawer() {
  const open = useUIStore((s) => s.cartOpen) 
  const close = useUIStore((s) => s.closeCart)
  const items = useCartStore((s) => s.items)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)
  const total = useCartStore(selectTotalPrice)

  return (
    <>
      <div onClick={close}
      className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${ 
        open ? 'opacity-100' : 'pointer-events-none opacity-0' }`} />

        <aside className={ `fixed right-0 top-0 z-50 flex h-full w-full max-w-sm
        flex-col bg-surface shadow-xl transition-transform ${
        open ? 'translate-x-0' : 'translate-x-full'}` }>
          <header className="flex items-center justify-between border-b border-line p-4">
            <h2 className="font-display text-lg font-bold">Seu carrinho</h2>
            <button onClick={close} aria-label="Fechar"
              className="text-muted hover:text-ink">✕</button>
          </header>

          {items.length === 0 ? (
            <div className='lex flex-1 flex-col items-center justify-center gap-3 p-6 text-center'>
              <p className="text-muted">Seu carrinho esta vazio</p>
              <Link to="/produtos" onClick={close}
              className="text-sm font-medium text-brand">Explorar produtos</Link>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-3">
                      <img src={item.thumbnail} alt={item.title}
                        className="h-16 w-16 rounded-lg border border-line object-contain p-1" />
                      <div className="flex flex-1 flex-col">
                        <p className="line-clamp-1 text-sm font-medium">{item.title}</p>
                        <p className="text-sm text-muted">{formatBRL(item.price)}</p>
                        <div className="mt-auto flex items-center gap-2">
                          <div className="flex items-center rounded-md border border-line text-sm">
                            <button onClick={() => updateQty(item.id, item.qty - 1)}
                              className="px-2">−</button>
                            <span className="w-8 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, item.qty + 1)}
                              className="px-2">+</button>
                          </div>
                          <button onClick={() => removeItem(item.id)}
                            className="text-xs text-muted hover:text-red-600">Remover</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <footer className="border-t border-line p-4">
                <div className="mb-3 flex justify-between font-medium">
                  <span>Subtotal</span><span>{formatBRL(total)}</span>
                </div>
                <Link to="/carrinho" onClick={close}
                  className="mb-2 block rounded-lg border border-line py-2.5
                    text-center text-sm font-medium hover:border-brand">Ver carrinho</Link>
                <Link to="/checkout" onClick={close}
                  className="block rounded-lg bg-brand py-2.5 text-center
                    text-sm font-medium text-white hover:bg-brand-dark">Finalizar compra</Link>
              </footer>
            </>
          )}
        </aside>
    </>
  )     
}
