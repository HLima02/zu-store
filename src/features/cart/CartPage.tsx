import { Link } from "react-router"
import { useCartStore, selectTotalItems, selectTotalPrice } from "@/store/cartStore"
import { formatBRL } from "@/shared/lib/format"

export function CartPage() {
  const items = useCartStore((s) => s.items)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)
  const total = useCartStore(selectTotalPrice)
  const count = useCartStore(selectTotalItems)

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
    <div className=" px-4 py-8">
      <h1 className="mb-6 font-display text-3xl font-bold">Carrinho</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex flex-col w-full max-w-[320px] gap-4 rounded-xl border border-line bg-surface p-4">
              <img src={item.thumbnail} alt={item.title} className="w-full" />
              <div className="flex flex-1 flex-col">
                <Link className="font-medium hover:text-brand" to={`/produto/${item.id}`}>{item.title}</Link>
                <p className="text-sm text-muted my-3">{ formatBRL(item.price)}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-line">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}
                      className="px-3 py-1.5">−</button>
                    <span className="w-10 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}
                      className="px-3 py-1.5">+</button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{formatBRL(item.price * item.qty)}</span>
                    <button onClick={() => removeItem(item.id)}
                      className="text-sm text-muted hover:text-red-600">Remover</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-xl border border-line bg-surface p-6">
          <h2 className="font-display text-lg font-bold">Resumo</h2>
          <div className="mt-4 space-y-2 text-sm text-muted">
            <div className="flex justify-between">
              <span>Subtotal ({count} itens)</span><span>{formatBRL(total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Frete</span><span className="text-emerald-600">Grátis</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-line pt-4
            font-display text-lg font-bold">
            <span>Total</span><span>{formatBRL(total)}</span>
          </div>
          <Link to="/checkout" className="mt-6 block rounded-lg bg-brand py-3
            text-center font-medium text-white hover:bg-brand-dark">
            Finalizar compra
          </Link>
        </aside>
      </div>
    </div>
  )
  
}
