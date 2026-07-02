import { useCallback, useEffect, useState } from "react";
import { http } from "@/shared/lib/http";
import type { Product, ProductsResponse } from "../types";

const PAGE_SIZE = 12

interface UseProducts {
  products: Product[]
  total: number
  loading: boolean
  error: string | null
  hasMore: boolean
  loadMore: () => void
}

export function useProducts(): UseProducts {
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError(null)

    http<ProductsResponse>(`/products?limit=${PAGE_SIZE}&skip=${skip}`)
    .then((data) => {
      if(ignore) return 
      setProducts((prev) => skip === 0 ? data.products : [...prev, ...data.products])
      setTotal(data.total)
    })
    .catch((err: unknown) => {
      if(!ignore) setError(err instanceof Error? err.message : 'Erro ao carregar')
    })
    .finally(() => {
      if (!ignore) setLoading(false)
    })
    
    return () => { ignore = true }
  }, [skip])

  const loadMore = useCallback(() => {
    setSkip((s) => s + PAGE_SIZE)
  }, [])

  return { products, total, loading, error, hasMore: products.length < total, loadMore }
}