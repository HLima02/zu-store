import { Header } from "./Header"
import { Footer } from "./Footer"
import { Outlet } from "react-router"
import { CartDrawer } from "@/features/cart/components/CartDrawer"

export  function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header/>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer/>
    </div>
  )
}
