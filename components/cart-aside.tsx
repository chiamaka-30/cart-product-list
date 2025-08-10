"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCart } from "./cart-provider"
import { formatCurrency } from "@/lib/format"

type Props = { embedMode?: "aside" | "sheet" }
const defaultProps: Required<Props> = { embedMode: "aside" }

export default function CartAside(props: Props = defaultProps) {
  const { embedMode } = { ...defaultProps, ...props }
  const { items, count, subtotal, updateQuantity, removeItem, clear } = useCart()

  return (
    <Card className={embedMode === "aside" ? "sticky top-6" : ""}>
      <CardHeader>
        <CardTitle className="text-xl text-orange-600">Your Cart ({count})</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="flex flex-col items-center text-center gap-4 py-6">
            <Image
              src={"/placeholder.svg?height=180&width=240&query=cute%20dessert%20illustration"}
              alt="Empty cart illustration"
              width={240}
              height={180}
            />
            <p className="text-sm text-muted-foreground">Your added items will appear here</p>
          </div>
        ) : (
          <>
            <ScrollArea className="max-h-[46vh] pr-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-md bg-stone-100 shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg?height=56&width=56&query=dessert%20photo"}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-cover"
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
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label={`Decrease quantity of ${item.name}`}
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
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label={`Increase quantity of ${item.name}`}
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
            </ScrollArea>
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={clear}>
                Clear
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-600/90">Checkout</Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
