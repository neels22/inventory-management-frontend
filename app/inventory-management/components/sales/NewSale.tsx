"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/inventory-management/components/ui/card"
import { Input } from "@/app/inventory-management/components/ui/input"
import { Button } from "@/app/inventory-management/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/inventory-management/components/ui/table"
import { Search, Edit, Trash2, Plus } from "lucide-react"

export default function NewSale() {
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
              />
            </div>
          </div>
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
              {Array.from({ length: 7 }, (_, i) => (
                <TableRow key={i} className="hover:bg-slate-50/50 transition-colors duration-200">
                  <TableCell className="h-14"></TableCell>
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
                $0.00
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
