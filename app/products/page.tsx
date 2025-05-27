import InventoryList from "@/components/inventory/InventoryList"

export default function ProductsPage() {
  const products = [
    {
      id: "1",
      name: "Product 1",
      sku: "SKU001",
      price: 99.99,
      stock: 100,
      category: "Electronics",
    },
    // Add more products as needed
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
      </div>
      <InventoryList products={products} />
    </div>
  )
} 