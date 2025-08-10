"use client"

import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Product } from "@/lib/types"
import { formatCurrency } from "@/lib/format"
import { useCart } from "./cart-provider"
import { useState } from "react"

type Props = { product?: Product }

const fallbackProduct: Product = {
  id: "sample",
  name: "Sample Dessert",
  price: 0,
  image: "/delicious-dessert.png",
  category: "Dessert",
}

export default function ProductCard({ product = fallbackProduct }: Props = { product: fallbackProduct }) {
  const { addItem } = useCart()
  const FALLBACK_IMG = "/delicious-dessert.png"
  const [imgSrc, setImgSrc] = useState(product.image || FALLBACK_IMG)

  return (
    <Card className="overflow-hidden bg-white shadow-sm">
      <CardHeader className="p-0">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={imgSrc || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 370px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            onError={() => {
              console.warn("Image failed for", product.name, product.image)
              setImgSrc(FALLBACK_IMG)
            }}
            priority={false}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {"category" in product && product.category ? (
          <p className="text-xs text-stone-500">{product.category}</p>
        ) : null}
        <h3 className="mt-1 font-semibold text-stone-900">{product.name}</h3>
        <p className="mt-1 text-sm font-semibold text-orange-600">{formatCurrency(product.price)}</p>
      </CardContent>
      <CardFooter className="pt-2 pb-5">
        <Button
          onClick={() => addItem(product, 1)}
          className="w-full justify-center gap-2 rounded-full border border-orange-600 bg-white text-orange-700 hover:bg-orange-50"
          variant="outline"
        >
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          <span>Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
