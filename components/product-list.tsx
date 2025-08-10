"use client"

import type { Product } from "@/lib/types"
import ProductCard from "./product-card"

type ProductListProps = { products?: Product[] }
const defaultProps: Required<ProductListProps> = { products: [] }

export default function ProductList(props: ProductListProps = defaultProps) {
  const { products } = { ...defaultProps, ...props }

  return (
    <ul
      className="
        grid gap-6
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {products.map((p) => (
        <li key={p.id}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  )
}
