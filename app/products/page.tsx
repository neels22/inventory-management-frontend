import InventoryList from "@/components/inventory/InventoryList"

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
      </div>
      <InventoryList />
    </div>
  )
} 