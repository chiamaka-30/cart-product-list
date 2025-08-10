"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { CartItem, Product } from "@/lib/types"

type CartContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  addItem: (product: Product, qty?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = "cart:v1"

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function CartProvider({ children = null as unknown as ReactNode }: { children?: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = safeParse<CartItem[]>(typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null, [])
    if (Array.isArray(saved)) setItems(saved)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
  }, [items])

  const addItem = useCallback((product: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: Math.max(1, i.quantity + qty) } : i))
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price: product.price, image: product.image, quantity: Math.max(1, qty) },
      ]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity: Math.max(0, qty) } : i)).filter((i) => i.quantity > 0),
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const count = useMemo(() => items.reduce((acc, i) => acc + i.quantity, 0), [items])
  const subtotal = useMemo(() => items.reduce((acc, i) => acc + i.price * i.quantity, 0), [items])

  const value = useMemo(
    () => ({ items, count, subtotal, addItem, removeItem, updateQuantity, clear }),
    [items, count, subtotal, addItem, removeItem, updateQuantity, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}
