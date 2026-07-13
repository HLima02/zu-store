import { useCallback, useEffect, useState } from "react";
import { http } from "@/shared/lib/http";
import type { Product, ProductsResponse } from "../types";

const PAGE_SIZE = 12

export interface CatalogParams {
  q: string
  category: string
  sortBy?:string
  order?: 'asc' | 'desc'
}

function buildUrl(p:CatalogParams, skip:number):string {
  const qs = new URLSearchParams({ limit: String(PAGE_SIZE), skip: String(skip)})
  if (p.sortBy) {
    qs.set('sortBy', p.sortBy)
    qs.set('order', p.order ?? 'asc')
  }

  if(p.q) {
    qs.set('q', p.q)
    return `/products/search?${qs}`
  }

  if(p.category) return `/products/category/${p.category}?${qs}`

  return `/products?${qs}`
}

export function useCatalog(params: CatalogParams){
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const key = JSON.stringify(params)

  useEffect(() => { setPage(0) }, [key])

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError(null)

    http<ProductsResponse>(buildUrl(JSON.parse(key), page * PAGE_SIZE))
    .then((data) => {
      if(ignore) return
      setProducts((prev) => page === 0 ? data.products: [...prev, ...data.products])
      setTotal(data.total)
    })
    .catch((err: unknown) => {
      if(!ignore) setError(err instanceof Error ? err.message: 'Erro ao carregar')
    })
    .finally(() => { if(!ignore) setLoading(false)})

    return () => { ignore: true }  
  }, [key, page])

  const loadMore = useCallback(() => setPage((p) => p + 1), [])
  return { products, total, loading, error, hasMore: products.length < total, loadMore }
}