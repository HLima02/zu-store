import { Routes, Route } from "react-router";
import { RootLayout } from "./layout/RootLayout";
import { HomePage } from "@/features/home/HomePage";
import { CatalogPage } from '@/features/products/CatalogPage'
import { CategoryPage } from '@/features/products/CategoryPage'
import { SearchPage } from '@/features/products/SearchPage'
import { ProductPage } from '@/features/products/ProductPage'
import { CartPage } from '@/features/cart/CartPage'
import { CheckoutPage } from '@/features/checkout/CheckoutPage'
import { OrderPage } from '@/features/checkout/OrderPage'
import { WishlistPage } from '@/features/wishlist/WishlistPage'
import { LoginPage } from '@/features/auth/LoginPage'
import { AccountPage } from '@/features/account/AccountPage'
import { NotFoundPage } from "@/shared/ui/NotFoundPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={ <RootLayout />} >
        <Route index element={ <HomePage /> } />
        <Route path="produtos" element={ <CatalogPage/>} />
        <Route path="c/:slug" element={ <CategoryPage /> } />
        <Route path="busca" element={<SearchPage />} />
        <Route path="produto/:id" element={<ProductPage />} />
        <Route path="carrinho" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="pedido/:id" element={<OrderPage />} />
        <Route path="favoritos" element={<WishlistPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="conta" element={<AccountPage />} />
        <Route path="*" element={ <NotFoundPage/> } />
      </Route>
    </Routes>
  )
}
