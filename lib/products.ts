import type { Product } from "./types"

export const products: Product[] = [
  // Row 1 (matches your first row)
  {
    id: "waffle-berries",
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
    image: "/waffle-with-berries.png",
  },
  {
    id: "creme-brulee",
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
    image: "/classic-creme-brulee.png",
  },
  {
    id: "macaron-mix",
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
    image: "/assorted-macarons.png",
  },
  // Row 2
  {
    id: "tiramisu-classic",
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
    image: "/classic-tiramisu.png",
  },
  {
    id: "baklava-pistachio",
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
    image: "/pistachio-baklava.png",
  },
  {
    id: "lemon-meringue-pie",
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
    image: "/lemon-meringue-pie.png",
  },
  // Row 3
  {
    id: "cake-red-velvet",
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
    image: "/red-velvet-cake.png",
  },
  {
    id: "brownie-salted-caramel",
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 5.5,
    image: "/salted-caramel-brownie.png",
  },
  {
    id: "panna-cotta-vanilla",
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
    image: "/vanilla-panna-cotta.png",
  },
]
