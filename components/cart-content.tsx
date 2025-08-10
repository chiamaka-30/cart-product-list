"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCart } from "./cart-provider"
import { formatCurrency } from "@/lib/format"

export default function CartContent() {
  const { items, removeItem, updateQuantity } = useCart()

  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">Your cart is empty.</p>
  }

  return (
    <ScrollArea className="h-[50vh] pr-4">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted shrink-0">
              <Image
                src={item.image || "/placeholder.svg?height=64&width=64&query=product%20image"}
                alt={item.name}
                fill
                sizes="64px"
                className="object-cover"
                priority={false}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2">
                <p className="font-medium leading-none truncate">{item.name}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto h-8 w-8"
                  aria-label={`Remove ${item.name} from cart`}
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{formatCurrency(item.price)}</p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    aria-label={`Decrease quantity of ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="text-sm tabular-nums w-6 text-center" aria-live="polite">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    aria-label={`Increase quantity of ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div className="mt-1 text-sm">
                <span className="text-muted-foreground">Line total:</span>{" "}
                <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Separator className="my-4" />
    </ScrollArea>
  )
}
