import type { Product } from "../types"
import { Link } from "react-router"

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

      </div>
    </Link>
  )
}
