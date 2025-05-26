"use client"

import { Badge } from "@/app/inventory-management/components/ui/badge"
import { Button } from "@/app/inventory-management/components/ui/button"
import { Card, CardContent, CardHeader } from "@/app/inventory-management/components/ui/card"
import { Input } from "@/app/inventory-management/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/inventory-management/components/ui/table"
import { Search, Edit, Trash2 } from "lucide-react"
import { Product } from "@/types"

export default function InventoryList({ products }: { products: Product[] }) {
  return (
    <div className="p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
            Inventory Management
          </h2>
          <p className="text-slate-600 text-lg">Manage your product inventory and stock levels</p>
        </div>
      </div>

      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center space-x-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                placeholder="Search products..."
                className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
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
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-colors duration-200"
                >
                  <TableCell className="font-semibold text-slate-800">{product.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={product.quantity < 20 ? "destructive" : "secondary"}
                      className={product.quantity < 20 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}
                    >
                      {product.quantity}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-slate-700">${product.price.toFixed(2)}</TableCell>
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
                      {product.shortName}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
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
