import { useSearchParams } from "react-router";
import { useCategories } from "../hooks/useCategories";

interface Props {
  hideCategory?: boolean
  searchTerm: string
  onSearch: (v:string) => void
}

export function FilterSidebar({ hideCategory, searchTerm, onSearch }: Props) {
  const [params, setParams] = useSearchParams()
  const categories = useCategories()
  const active = params.get('category') ?? ''

  const update = (key:string, value:string) => setParams((prev) => {
    const next = new URLSearchParams(prev)
    value ? next.set(key, value) : next.delete(key)
    return next
  })

  return (
    <aside className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium">Buscar</label>
        <input value={searchTerm} onChange={(e) => onSearch(e.target.value)}
        placeholder="Nome do produto..."
        className="w-full rounded-lg border border-line bg-canva px-3 py-2
        text-sm outline-none focus:border-brand" />
      </div>

      {!hideCategory && (
        <div>
          <p className="mb-2 text-sm font-medium">Categoria</p>
          <ul className="max-h-64 space-y-1 overflow-y-auto text-sm">
            <li>
              <button 
              onClick={() => update('category', '')}
              className={!active ? 'text-brand' : 'text-muted hover:text-ink'}>Todas</button>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <button 
                onClick={() => update('category', c.slug)}
                className={active === c.slug ? 'text-brand' : 'text-muted hover:text-ink'}>
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <p className="mb-2 text-sm font-medium">Preço (R$)</p>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="mín" defaultValue={params.get('min') ?? ''}
            onBlur={(e) => update('min', e.target.value)}
            className="w-full rounded-lg border border-line bg-canvas px-2 py-1.5 text-sm" />
          <span className="text-muted">–</span>
          <input type="number" placeholder="máx" defaultValue={params.get('max') ?? ''}
            onBlur={(e) => update('max', e.target.value)}
            className="w-full rounded-lg border border-line bg-canvas px-2 py-1.5 text-sm" />
        </div>
      </div>

      <button 
      className="text-sm text-muted underline hover:text-ink"
      onClick={() => setParams()}>Limpar filtros</button>
    </aside>
  )
}