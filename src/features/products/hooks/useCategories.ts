import { useEffect, useState } from "react";
import { http } from "@/shared/lib/http";

export interface Category {
  slug: string
  name: string
  url: string
}

export function useCategories():Category[] {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    let ignore = false
    http<Category[]>('/products/categories')
    .then((data) => { if (!ignore) setCategories(data) })
    .catch(() => {})

    return () => { ignore = true }
  })

  return categories
}