import type { Product } from "../types"
import { Link } from "react-router"
import { formatBRL } from "@/shared/lib/format"

interface ProductCardProps {
  product:Product
}

export function ProductCard({ product }:ProductCardProps) {
  return (
    <Link to={`/produto/${product.id}`} className="group flex flex-col overflow-hidden rounded-xl border
    border-line bg-surface transition hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-canvas">
        <img 
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
        className="h-full w-full object-contain p-4 transition group-hover:scale-105" />

        { product.discountPercentage > 0 && (
          <span className="absolute left-2 top-2 rounded-md bg-brand px-2 py-1 text-[11px] font-bold text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        ) }
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-sm uppercase tracking-wide text-muted">{ product.category}</p>
        <h3 className="line-clamp-1 font-medium text-ink">{ product.title}</h3>
        <div className="flex items-center gap-1 text xs text-muted">
          <span className="text-amber-500">*</span>{ product.rating.toFixed(1)}
        </div>
        <p className="mt-auto pt-2 font-display text-lg font-bold text ink">
          {formatBRL(product.price)}
        </p>
      </div>
    </Link>
  )
}
