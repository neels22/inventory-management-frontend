"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { authenticatedFetch } from "@/lib/auth"

interface Product {
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

interface SaleProduct {
  product_id: number
  quantity: number
  name: string
  price: number
  total: number
}

export default function NewSale() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [saleProducts, setSaleProducts] = useState<SaleProduct[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/products/search/?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error("Error searching products:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    searchProducts(query)
  }

  const addProductToSale = (product: Product) => {
    setSaleProducts(prevProducts => {
      const existingProduct = prevProducts.find(p => p.product_id === product.id)
      
      if (existingProduct) {
        return prevProducts.map(p => 
          p.product_id === product.id 
            ? { ...p, quantity: p.quantity + 1, total: (p.quantity + 1) * p.price }
            : p
        )
      }

      return [...prevProducts, {
        product_id: product.id,
        quantity: 1,
        name: product.name,
        price: product.price / 100, // Convert from cents to dollars
        total: product.price / 100
      }]
    })
    setSearchQuery("")
    setSearchResults([])
  }

  const updateProductQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setSaleProducts(prevProducts =>
      prevProducts.map(p =>
        p.product_id === productId
          ? { ...p, quantity: newQuantity, total: newQuantity * p.price }
          : p
      )
    )
  }

  const removeProductFromSale = (productId: number) => {
    setSaleProducts(prevProducts => prevProducts.filter(p => p.product_id !== productId))
  }

  const calculateTotal = () => {
    return saleProducts.reduce((sum, product) => sum + product.total, 0)
  }

  const handleSubmitSale = async () => {
    if (saleProducts.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one product to the sale",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    try {
      const requestBody = {
        products: saleProducts.map(p => ({
          product_id: p.product_id,
          quantity: p.quantity
        }))
      };
      console.log('Request body:', JSON.stringify(requestBody));
      const response = await authenticatedFetch('http://127.0.0.1:8000/api/v1/sales/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        let errorData = null;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = await response.text();
        }
        console.error('Backend error:', errorData);
        throw new Error('Failed to create sale');
      }

      const data = await response.json()
      
      toast({
        title: "Success",
        description: `Sale created successfully! Total: $${(data.total_price / 100).toFixed(2)}`,
      })

      // Reset the form
      setSaleProducts([])
      setSearchQuery("")
    } catch (error) {
      console.error('Error creating sale:', error)
      toast({
        title: "Error",
        description: "Failed to create sale. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
          New Sale Entry
        </h2>
        <p className="text-slate-600 text-lg">Create a new sales transaction</p>
      </div>

      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <CardTitle className="text-xl font-bold text-slate-800">Sale Details</CardTitle>
          <div className="flex items-center space-x-3 mt-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                placeholder="Search products to add..."
                className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
          </div>
          {searchResults.length > 0 && (
            <div className="mt-2 max-h-60 overflow-y-auto border border-slate-200 rounded-lg bg-white">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0"
                  onClick={() => addProductToSale(product)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-slate-800">{product.name}</p>
                      <p className="text-sm text-slate-500">
                        {product.brand} • {product.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-slate-800">₹{(product.price / 100).toFixed(2)}</p>
                      <p className="text-sm text-slate-500">Stock: {product.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <TableHead className="font-semibold text-slate-700">Product</TableHead>
                <TableHead className="font-semibold text-slate-700">Price</TableHead>
                <TableHead className="font-semibold text-slate-700">Quantity</TableHead>
                <TableHead className="font-semibold text-slate-700">Total</TableHead>
                <TableHead className="w-32 font-semibold text-slate-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {saleProducts.map((product) => (
                <TableRow key={product.product_id} className="hover:bg-slate-50/50 transition-colors duration-200">
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>₹{product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) => updateProductQuantity(product.product_id, parseInt(e.target.value))}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>₹{product.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-slate-200 text-red-500 hover:text-red-600"
                        onClick={() => removeProductFromSale(product.product_id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {saleProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-slate-500 py-8">
                    No products added to sale. Search and select products above.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center p-6 bg-gradient-to-r from-slate-50 to-white border-t border-slate-100">
            <Button 
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
              onClick={handleSubmitSale}
              disabled={isSubmitting || saleProducts.length === 0}
            >
              {isSubmitting ? "Submitting..." : "Submit Sale"}
            </Button>
            <div className="text-right">
              <p className="text-sm text-slate-500 mb-1">Total Amount</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ₹{calculateTotal().toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
