import { useEffect, useState } from 'react'
import { http } from '@/shared/lib/http'
import type { Product } from '../types'

interface UseProduct {
  product: Product | null
  loading: boolean
  error: string | null
}

export function useProduct(id: string | undefined): UseProduct{
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if(!id) return
    let ignore = false
    setLoading(true)
    setError(null)

    http<Product>(`/products/${id}`)
    .then((data) => { if (!ignore) setProduct(data)} )
    .catch((err: unknown) => {
      if(!ignore) setError(err instanceof Error ? err.message : 'Erro ao carregar')
    })
    .finally(() => { if (!ignore) setLoading(false) })

    return (() => { ignore = true} )
  }, [id])

  return {product, loading, error}
}