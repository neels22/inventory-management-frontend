export type Page = "dashboard" | "new-sale" | "sale-detail" | "manage-inventory" | "add-product"

export interface Sale {
  id: number
  date: string
  products: number
  amount: number
}

export interface SaleProduct {
  id: number
  product: string
  price: number
  quantity: number
  total: number
}

export interface Product {
  id: number
  name: string
  shortname: string
  barcode: string
  quantity: number
  price: number
  discount: number
  threshold: number
  location: string
  category: string
  brand: string
}
