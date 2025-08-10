export type Product = {
  id: string
  name: string
  price: number
  image: string
  category?: string
}

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}
