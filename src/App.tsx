import { useEffect, useState } from 'react'
import { http } from './shared/lib/http'
import { formatBRL } from './shared/lib/format'
import type { Product } from './features/products/types'

export default function App() {
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    http<Product>('/products/1').then(setProduct).catch(console.error)
  }, [])

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className='max-w-sm rounded-2xl border border-line bg-surface p-6 shadow-sm'>
        <p className='font-mono text-xs uppercase tracking-widest text-brand'>
          ZuStore · Fase 00 · TS
        </p>  
        {product ? (
          <>
            <h1 className='font-display text-2xl font-bold mt-2'>
              {product.title}
            </h1>
            <p className='text-muted mt-1'>{product.description}</p>
            <p className="font-display text-3xl font-bold text-brand mt-4">
              {formatBRL(product.price)}
            </p>
          </>
        ) : (
          <p className="text-muted mt-2">Carregando produto...</p>
        )}
      </div>
    </main>
  )
}
