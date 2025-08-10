"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import CartAside from "./cart-aside"
import { useCart } from "./cart-provider"

export default function CartButton() {
  const { count } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 rounded-full border-stone-300 bg-white/70 backdrop-blur">
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          <span>Cart</span>
          <span className="ml-1 inline-flex items-center justify-center rounded-full bg-stone-100 px-2 text-xs">
            {count}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart ({count})</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <CartAside embedMode="sheet" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
