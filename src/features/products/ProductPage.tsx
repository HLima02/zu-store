import { Link, useParams } from "react-router";
import { useState } from "react";
import { useProduct } from "./hooks/useProduct";
import { ProductGallery } from "./components/ProductGallery";
import { ProductCardSkeleton } from "./components/ProductCardSkeleton";
import { Star } from "@/shared/ui/Stars";
import { formatBRL } from "@/shared/lib/format";
import { useCartStore } from "@/store/cartStore";

export function ProductPage() {
  const { id } = useParams()
  const { product, loading, error } = useProduct(id)
  const [qtd, setQtd] = useState(1)

  //Store
  const addItem = useCartStore((s) => s.addItem)

  //Função para adicionar produto ao carrinho
  const handleAdd = () => {
    addItem(product, qtd)
  }

  if(loading) return <ProductCardSkeleton />
  if(error || !product){
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Produto não encontrado</h1>
        <Link to="/produtos" className="mt-6 inline-block rounded-lg bg-brand
          px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark">
          Ver catálogo
        </Link>
      </div>
    )
  }

  const hasDiscount = product.discountPercentage > 0
  const original = product.price / (1 - product.discountPercentage / 100)
  const outOfStock = product.stock === 0

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="mb-6 text-sm text-muted">
        <Link to="/produtos" className="hover:text-ink" >Produtos</Link> / {product?.category}
      </p>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} title={product.title} />

        <div>
          {product?.brand && (
            <p className="text-sm uppercase tracking-wide text-muted">{ product.brand }</p>
          )}
          <h1 className="mt-1 font-display text-3xl font-bold">{ product?.title}</h1>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted">
            <Star value={product.rating} />
            <span>{product.rating.toFixed(1)}</span>
          </div>

          <div className="mt-4 flex items-end gap-3">
            <span className="font-display text-3xl font-bold">
              {formatBRL(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-muted line-through">
                {formatBRL(original)}
              </span>
            )}
          </div>

          <p className={`mt-2 text-sm ${outOfStock ? 'text-red-600' : 'text-emerald-600'}`}>
            {outOfStock ? 'Esgotado' 
            : product.stock <= 5 ? `Ultimas ${product.stock} unidades`
            : 'Em destaque'}
          </p>

          <p className="mt-4 text-muted">{product.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-line">
              <button onClick={() => setQtd((q) => Math.max(1, q - 1))} className="px-3 py-2 text-lg">-</button>
              <span className="w-10 text-center">{ qtd }</span>
              <button onClick={() => setQtd((q) => Math.max(1, q + 1))} className="px-3 py-2 text-lg">+</button>
            </div>

            <button
              disabled={outOfStock}
              // Fase 04: onClick={() => addItem(product, qty)}
              className="flex-1 rounded-lg bg-brand px-6 py-3 font-medium
                text-white transition hover:bg-brand-dark disabled:opacity-50"
                onClick={handleAdd}
            >
              {outOfStock ? 'Esgotado' : 'Adicionar ao carrinho'}
            </button>
          </div>

          {product.shippingInformation && (
            <p className="mt-4 text-sm text-muted">🚚 {product.shippingInformation}</p>
          )}
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Avaliações</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {product.reviews.map(( r, i) => (
              <div key={`${r.date}-${i}`} className="rounded-xl border border-line bg-surface p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-ink">{ r.reviewerName }</p>
                  <Star value={r.rating} />
                </div>
                <p className="mt-2 text-sm text-muted">{r.commet}</p>
                <p className="mt-2 text-xs text-muted">
                  {new Date(r.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
   )
  }
