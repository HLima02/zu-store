import { useEffect } from "react";
import { ProductCard } from "./components/ProductCard";
import { useProducts } from "./hooks/useProducts";


export function CatalogPage() {
  const { products, total, loading, error, hasMore, loadMore } = useProducts()
 
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold">Produtos</h1>

        {total > 0 && (
          <p className="mt-1 text-muted">
            { products.length} de { total } produtos
          </p>
        )}
      </header>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Não foi possivel carregar os produtos. Tente novamente
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
