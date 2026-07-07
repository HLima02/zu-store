import { Link } from "react-router"
import { formatBRL } from "@/shared/lib/format"

export function CartPage() {
  const items = [{id:1, title: 'teste'}]

  if(items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="font-display text-2xl font-bold">Seu carrinho está vazio</h1>
        <Link to="/produtos" className="mt-6 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-medium 
        text-white hover:bg-brand-dark">
        Ver Produtos
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 font-display text-3xl font-bold">Carrinho</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </div>
    </div>
  )
  
}
