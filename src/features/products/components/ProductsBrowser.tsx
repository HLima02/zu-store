import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useCatalog } from '../hooks/useCatalog'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from './ProductCardSkeleton'
import { FilterSidebar } from './FiltersSidebar'


const SORT: Record<string, { sortBy: string; order: 'asc' | 'desc' } | undefined> = {
  '': undefined,
  'price-asc': { sortBy: 'price', order: 'asc' },
  'price-desc': { sortBy: 'price', order: 'desc' },
  'rating-desc': { sortBy: 'rating', order: 'desc' },
  'title-asc': { sortBy: 'title', order: 'asc' },
}

interface Props { lockedCategory?: string; title?: string }

export function ProductsBrowser({ lockedCategory, title = 'Produtos' }: Props) {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const category = lockedCategory ?? params.get('category') ?? ''
  const sort = params.get('sort') ?? ''
  const min = Number(params.get('min')) || 0
  const max = Number(params.get('max')) || 0

  const [term, setTerm] = useState(q)
  const debounced = useDebounce(term, 400)

  useEffect(() => {
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      debounced ? next.set('q', debounced) : next.delete('q')
      return next
    }, { replace: true })
  }, [debounced])

  const cfg = SORT[sort]
  const { products, total, loading, error, hasMore, loadMore } = useCatalog({
     q, category, sortBy: cfg?.sortBy, order: cfg?.order,
  })

  // filtro de preço no cliente
  const visible = products.filter(
    (p) => (!min || p.price >= min) && (!max || p.price <= max))

  const setSort = (v: string) =>
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      v ? next.set('sort', v) : next.delete('sort')
      return next
    })

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">{title}</h1>
          {total > 0 && <p className="mt-1 text-muted">{total} produtos</p>}
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-line bg-surface px-3 py-2 text-sm">
          <option value="">Relevância</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="rating-desc">Melhor avaliados</option>
          <option value="title-asc">Nome (A–Z)</option>
        </select>
      </header>

      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <FilterSidebar hideCategory={!!lockedCategory}
          searchTerm={term} onSearch={setTerm} />

        <div>
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-4
              text-sm text-red-700">Erro ao carregar. Tente novamente.</p>
          )}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {visible.map((p) => <ProductCard key={p.id} product={p} />)}
            {loading && Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={`sk-${i}`} />
            ))}
          </div>

          {!loading && visible.length === 0 && (
            <p className="py-16 text-center text-muted">
              Nenhum produto encontrado com esses filtros.
            </p>
          )}

          {hasMore && !loading && (
            <div className="mt-8 text-center">
              <button onClick={loadMore}
                className="rounded-lg border border-line bg-surface px-6 py-3
                  text-sm font-medium hover:border-brand hover:text-brand">
                Carregar mais
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}