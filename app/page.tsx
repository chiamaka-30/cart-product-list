import type { Product } from "@/lib/types"
import { products } from "@/lib/products"
import ClientPage from "@/components/client-page"

export default function Page() {
  const items: Product[] = products
  return <ClientPage products={items} />
}
