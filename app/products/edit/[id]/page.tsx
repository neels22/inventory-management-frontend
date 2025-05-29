import EditProductForm from "@/components/inventory/EditProductForm"

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit Product</h1>
      <EditProductForm productId={id} />
    </div>
  )
} 