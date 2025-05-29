"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, Plus } from "lucide-react"
import { Product } from "@/types"
import { useEffect, useState } from "react"
import { authenticatedFetch } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function InventoryList() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleDelete = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return
    }

    try {
      const response = await authenticatedFetch(`http://127.0.0.1:8000/api/v1/products/${productId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      // Remove the deleted product from the state
      setProducts(products.filter(product => product.id !== productId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await authenticatedFetch('http://127.0.0.1:8000/api/v1/products/?skip=0&limit=100')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    try {
      const response = await authenticatedFetch(`http://127.0.0.1:8000/api/v1/products/search/?q=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error('Failed to search products')
      }
      const data = await response.json()
      setSearchResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSearching(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <p className="text-slate-600">Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <p className="text-red-600">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
            Inventory Management
          </h2>
          <p className="text-slate-600 text-lg">Manage your product inventory and stock levels</p>
        </div>
        <Button 
          onClick={() => router.push('/products/add')}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center space-x-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                placeholder="Search products..."
                className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {searchResults.length > 0 && (
            <div className="absolute z-10 w-full max-w-md mt-1 bg-white rounded-lg shadow-lg border border-slate-200">
              <div className="p-2">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="p-2 hover:bg-slate-50 rounded-md cursor-pointer"
                    onClick={() => {
                      setSearchQuery("")
                      setSearchResults([])
                      // You can add navigation or other actions here
                    }}
                  >
                    <div className="font-semibold text-slate-800">{product.name}</div>
                    <div className="text-sm text-slate-600">
                      <span className="font-mono">{product.barcode}</span> • {product.quantity} in stock
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <TableHead className="font-semibold text-slate-700 w-16">#</TableHead>
                <TableHead className="font-semibold text-slate-700">Product Name</TableHead>
                <TableHead className="font-semibold text-slate-700">Stock</TableHead>
                <TableHead className="font-semibold text-slate-700">Price</TableHead>
                <TableHead className="font-semibold text-slate-700">Discount</TableHead>
                <TableHead className="font-semibold text-slate-700">Barcode</TableHead>
                <TableHead className="font-semibold text-slate-700">Short Name</TableHead>
                <TableHead className="w-32 font-semibold text-slate-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow
                  key={product.id}
                  className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-colors duration-200"
                >
                  <TableCell className="text-slate-500 font-medium">{index + 1}</TableCell>
                  <TableCell className="font-semibold text-slate-800">{product.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={product.quantity < product.threshold ? "destructive" : "secondary"}
                      className={product.quantity < product.threshold ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}
                    >
                      {product.quantity}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-slate-700">${(product.price / 100).toFixed(2)}</TableCell>
                  <TableCell>
                    {product.discount > 0 ? (
                      <Badge className="bg-orange-100 text-orange-800">{product.discount}%</Badge>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-slate-600">{product.barcode}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-slate-300 text-slate-600">
                      {product.shortname}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        onClick={() => router.push(`/products/edit/${product.id}`)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
