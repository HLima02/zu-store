import { useParams } from 'react-router'
import { ProductsBrowser } from './components/ProductsBrowser'

export function CategoryPage() {
  const { slug } = useParams()
  return <ProductsBrowser lockedCategory={slug} title={slug ?? 'Categoria'} />
}