"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Barcode, Save } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authenticatedFetch } from "@/lib/auth"
import { toast } from "sonner"
import { Product } from "@/types"

interface EditProductFormProps {
  productId: string
}

export default function EditProductForm({ productId }: EditProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    shortname: "",
    barcode: "",
    quantity: 0,
    price: 0,
    threshold: 10,
    location: "",
    category: "",
    brand: ""
  })

  // Fetch product data when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await authenticatedFetch(`http://127.0.0.1:8000/api/v1/products/${productId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch product')
        }
        const product: Product = await response.json()
        
        // Pre-fill form with existing product data
        setFormData({
          name: product.name,
          shortname: product.shortname,
          barcode: product.barcode,
          quantity: product.quantity,
          price: product.price, // Price is already in cents from API
          threshold: product.threshold,
          location: product.location || "",
          category: product.category || "",
          brand: product.brand || ""
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: id === "price" ? parseFloat(value) * 100 : // Convert to cents
             ["quantity", "threshold"].includes(id) ? parseInt(value) || 0 :
             value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await authenticatedFetch(`http://127.0.0.1:8000/api/v1/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.detail || 'Failed to update product')
      }

      const updatedProduct = await response.json()
      console.log('Product updated successfully:', updatedProduct)
      
      toast.success('Product updated successfully')
      router.push('/products')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update product'
      toast.error(errorMessage)
      console.error('Error updating product:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-slate-600">Loading product data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <Button onClick={() => router.push('/products')} variant="outline">
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
          Edit Product
        </h2>
        <p className="text-slate-600 text-lg">Update product information in your inventory system</p>
      </div>

      <Card className="max-w-3xl border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <CardTitle className="text-xl font-bold text-slate-800">Product Information</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Product Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="shortname" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Short Name
                </Label>
                <Input
                  id="shortname"
                  value={formData.shortname}
                  onChange={handleInputChange}
                  placeholder="Enter short name"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="barcode" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Product Barcode
              </Label>
              <div className="flex">
                <Input
                  id="barcode"
                  value={formData.barcode}
                  onChange={handleInputChange}
                  placeholder="Enter barcode"
                  className="h-12 rounded-r-none border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 rounded-l-none border-l-0 border-slate-200 hover:bg-blue-50"
                >
                  <Barcode className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="quantity" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                  required
                  min="0"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="price" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price / 100} // Convert from cents to dollars for display
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="threshold" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Low Stock Threshold
              </Label>
              <Input
                id="threshold"
                type="number"
                value={formData.threshold}
                onChange={handleInputChange}
                placeholder="10"
                className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                required
                min="0"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label htmlFor="location" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Storage location"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="category" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Category
                </Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Product category"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="brand" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Brand
                </Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="Brand name"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                  required
                />
              </div>
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5 mr-2" />
                {isSubmitting ? "UPDATING PRODUCT..." : "UPDATE PRODUCT"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 