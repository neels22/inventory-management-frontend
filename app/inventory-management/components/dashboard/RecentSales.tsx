"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/inventory-management/components/ui/card"
import { Input } from "@/app/inventory-management/components/ui/input"
import { Button } from "@/app/inventory-management/components/ui/button"
import { Search, Package, Edit, Trash2 } from "lucide-react"
import { Sale } from "@/types"
import { useState } from "react"

export default function RecentSales({
  sales,
  onEdit,
}: {
  sales: Sale[]
  onEdit: () => void
}) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSales = sales.filter((sale) =>
    sale.date.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <CardTitle className="text-xl font-bold text-slate-800">Recent Sales</CardTitle>
        <div className="flex items-center space-x-3 mt-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              placeholder="Search sales..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {filteredSales.map((sale, index) => (
            <div
              key={sale.id}
              className="flex items-center justify-between p-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center text-sm font-semibold text-slate-600">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 group-hover:text-slate-900">
                    Sale dated {sale.date}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    <span className="inline-flex items-center gap-1">
                      <Package className="w-3 h-3" />
                      {sale.products} products
                    </span>
                    <span className="mx-2">•</span>
                    <span className="font-medium text-green-600">
                      ${sale.amount.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onEdit}
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
