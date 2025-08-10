"use client"

import type { Product } from "@/lib/types"
import { CartProvider } from "./cart-provider"
import ProductList from "./product-list"
import CartAside from "./cart-aside"
import CartButton from "./cart-button"

type ClientPageProps = { products?: Product[] }

const defaultProps: Required<ClientPageProps> = { products: [] }

export default function ClientPage(props: ClientPageProps = defaultProps) {
  const { products } = { ...defaultProps, ...props }

  return (
    <CartProvider>
      <main className="min-h-screen bg-[#fff7f2]">
        <header className="bg-[#fff7f2]">
          <div className="container mx-auto px-4 py-8 flex items-center gap-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-800">Desserts</h1>
            <div className="ml-auto lg:hidden">
              <CartButton />
            </div>
          </div>
        </header>

        <section className="container mx-auto px-4 pb-12">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Products: 1 col mobile, 2 cols tablet, 3 cols desktop */}
            <div className="lg:col-span-8 xl:col-span-9">
              <ProductList products={products} />
            </div>
            {/* Desktop/large screens: sticky cart */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
              <CartAside />
            </aside>
          </div>
        </section>
      </main>
    </CartProvider>
  )
}
