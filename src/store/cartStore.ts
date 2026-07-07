import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/features/products/types";


export interface CartItem {
  id:number
  title: string
  price: number
  thumbnail: string
  qty: number
}

interface CartState {
  items: CartItem[]
  addItem: (Product:Product, qty?:number) => void
  removeItem: (id:number, qty?:number) => void
  updateQty: (id: number, qty:number) => void
  clear: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, qty = 1) => {
        set((state) => {
          const exists = state.items.find((i) => i.id === product.id)
          if(exists) {
            return {
              items: state.items.map((i) => i.id === product.id ? {...i, qty: i.qty + qty} : i)
            }
          }
          
          return {
            items: [...state.items, {
              id: product.id,
              title: product.title,
              price: product.price,
              thumbnail: product.thumbnail,
              qty,
            }]
          }
        })
      },
      removeItem: (id) => {
        set((state) => ({items: state.items.filter((s) => s.id !== id)}))
      },
      updateQty: (id, qty) => {
        set((state) => ({
          items: state.items.map((i) => i.id === id ? {...i, qty: Math.max(1, qty)} : i),
        }))
      },
      clear: () => set({ items: []})
    }),
    {name: 'zustore-cart'}
  )
)

export const selectTotalItems = (s: CartState) => s.items.reduce((n, i) => n + i.qty, 0)
export const selectTotalPrice = (s: CartState) => s.items.reduce((n, i) => n + i.price * i.qty, 0)