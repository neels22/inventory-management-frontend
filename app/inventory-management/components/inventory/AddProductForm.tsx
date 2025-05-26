"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/inventory-management/components/ui/card"
import { Input } from "@/app/inventory-management/components/ui/input"
import { Label } from "@/app/inventory-management/components/ui/label"
import { Button } from "@/app/inventory-management/components/ui/button"
import { Barcode, Plus } from "lucide-react"

export default function AddProductForm() {
  return (
    <div className="p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
          Add New Product
        </h2>
        <p className="text-slate-600 text-lg">Add a new product to your inventory system</p>
      </div>

      <Card className="max-w-3xl border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <CardTitle className="text-xl font-bold text-slate-800">Product Information</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="productName" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Product Name
                </Label>
                <Input
                  id="productName"
                  placeholder="Enter product name"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="shortName" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Short Name
                </Label>
                <Input
                  id="shortName"
                  placeholder="Enter short name"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
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
                  placeholder="Enter barcode"
                  className="h-12 rounded-r-none border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
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
                  placeholder="0"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
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
                  placeholder="0.00"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="discount" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Discount (%)
                </Label>
                <Input
                  id="discount"
                  type="number"
                  placeholder="0"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="threshold" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Low Stock Threshold
                </Label>
                <Input
                  id="threshold"
                  type="number"
                  placeholder="10"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label htmlFor="location" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="Storage location"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="category" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Category
                </Label>
                <Input
                  id="category"
                  placeholder="Product category"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="brand" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Brand
                </Label>
                <Input
                  id="brand"
                  placeholder="Brand name"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
                />
              </div>
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                ADD PRODUCT
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
