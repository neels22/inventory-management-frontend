"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ArrowLeft } from "lucide-react"
import { Sale } from "@/types"
import Link from "next/link"
import { authenticatedFetch } from "@/lib/auth"
import { Input } from "@/components/ui/input"

export default function SalePage() {
  const params = useParams()
  const [sale, setSale] = useState<Sale | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editedProducts, setEditedProducts] = useState<{ product_id: number; quantity: number }[]>([])

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await authenticatedFetch(`http://127.0.0.1:8000/api/v1/sales/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch sale')
        }
        const data = await response.json()
        setSale(data)
        // Initialize edited products with current quantities
        setEditedProducts(data.products.map((p: { product_id: number; quantity: number }) => ({
          product_id: p.product_id,
          quantity: p.quantity
        })))
      } catch (error) {
        console.error('Error fetching sale:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSale()
  }, [params.id])

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setEditedProducts(prev => 
      prev.map(p => p.product_id === productId ? { ...p, quantity: newQuantity } : p)
    )
  }

  const handleUpdate = async () => {
    try {
      const response = await authenticatedFetch(
        `http://127.0.0.1:8000/api/v1/sales/${params.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            products: editedProducts
          })
        }
      )
      
      if (!response.ok) {
        throw new Error('Failed to update sale')
      }
      
      const updatedSale = await response.json()
      setSale(updatedSale)
      setEditing(false)
    } catch (error) {
      console.error('Error updating sale:', error)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-slate-600">Loading sale details...</p>
      </div>
    )
  }

  if (!sale) {
    return (
      <div className="p-6">
        <p className="text-red-600">Sale not found</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/dashboard">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
        {!editing ? (
          <Button onClick={() => setEditing(true)}>Edit Sale</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => {
              setEditing(false)
              setEditedProducts(sale?.products.map(p => ({
                product_id: p.product_id,
                quantity: p.quantity
              })) || [])
            }}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </div>
        )}
      </div>

      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <CardTitle className="text-xl font-bold text-slate-800">
            Sale Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-slate-500">Date</h3>
              <p className="mt-1 text-lg text-slate-900">
                {new Date(sale.date).toLocaleDateString()}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-500">Total Price</h3>
              <p className="mt-1 text-lg font-semibold text-green-600">
                ${sale.total_price.toFixed(2)}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-3">Products</h3>
              <div className="space-y-3">
                {sale.products
                  .filter(product => {
                    const editedProduct = editedProducts.find(p => p.product_id === product.product_id);
                    return editing 
                      ? (editedProduct?.quantity ?? product.quantity) > 0
                      : product.quantity > 0;
                  })
                  .map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                  >
                    <Package className="w-5 h-5 text-slate-400" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{product.product_name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-slate-500">
                          Quantity: {editing ? (
                            <Input
                              type="number"
                              min="0"
                              value={editedProducts.find(p => p.product_id === product.product_id)?.quantity ?? product.quantity}
                              onChange={(e) => {
                                const value = e.target.value === '' ? 0 : parseInt(e.target.value);
                                if (!isNaN(value)) {
                                  handleQuantityChange(product.product_id, value);
                                }
                              }}
                              className="w-20 inline-block"
                            />
                          ) : (
                            product.quantity
                          )}
                        </p>
                        <p className="text-sm text-slate-500">
                          Price: ${product.unit_price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
