"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { SaleProduct } from "@/types"

export default function SaleDetail({ saleProducts }: { saleProducts: SaleProduct[] }) {
  const total = saleProducts.reduce((sum, item) => sum + item.total, 0)

  return (
    <div className="p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
            Sale Entry Details
          </h2>
          <p className="text-slate-600 text-lg">Sale dated 12 April 2025</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
          <Edit className="w-4 h-4 mr-2" />
          Edit Sale
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
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <TableHead className="w-16 font-semibold text-slate-700">#</TableHead>
                <TableHead className="font-semibold text-slate-700">Product</TableHead>
                <TableHead className="font-semibold text-slate-700">Price</TableHead>
                <TableHead className="font-semibold text-slate-700">Quantity</TableHead>
                <TableHead className="font-semibold text-slate-700">Total</TableHead>
                <TableHead className="w-32 font-semibold text-slate-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {saleProducts.map((item, index) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-colors duration-200"
                >
                  <TableCell className="font-medium text-slate-600">{index + 1}</TableCell>
                  <TableCell className="font-semibold text-slate-800">{item.product}</TableCell>
                  <TableCell className="text-slate-600">${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {item.quantity}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-green-600">${item.total.toFixed(2)}</TableCell>
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
              {Array.from({ length: 4 }, (_, i) => (
                <TableRow key={`empty-${i}`} className="hover:bg-slate-50/50 transition-colors duration-200">
                  <TableCell className="text-slate-400">{saleProducts.length + i + 1}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" className="border-slate-200 text-slate-400">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-slate-200 text-slate-400">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center p-6 bg-gradient-to-r from-slate-50 to-white border-t border-slate-100">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
            <div className="text-right">
              <p className="text-sm text-slate-500 mb-1">Total Amount</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
