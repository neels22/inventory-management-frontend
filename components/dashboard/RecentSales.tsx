"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Package, Edit, Trash2 } from "lucide-react"
import { Sale } from "@/types"
import { useState, useEffect } from "react"
import { authenticatedFetch } from "@/lib/auth"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function RecentSales() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null)
  const [saleToDelete, setSaleToDelete] = useState<Sale | null>(null)

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/sales/?skip=0&limit=100')
        const data = await response.json()
        setSales(data)
      } catch (error) {
        console.error('Error fetching sales:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSales()
  }, [])

  const filteredSales = sales
    .filter((sale) =>
      new Date(sale.date).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const handleDelete = async (sale: Sale) => {
    setSaleToDelete(sale)
  }

  const confirmDelete = async () => {
    if (!saleToDelete) return

    setDeleteLoading(saleToDelete.id)
    try {
      const response = await authenticatedFetch(`http://127.0.0.1:8000/api/v1/sales/${saleToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json'
        }
      })

      if (response.ok) {
        setSales(sales.filter(sale => sale.id !== saleToDelete.id))
      } else {
        console.error('Failed to delete sale')
      }
    } catch (error) {
      console.error('Error deleting sale:', error)
    } finally {
      setDeleteLoading(null)
      setSaleToDelete(null)
    }
  }

  if (loading) {
    return (
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <p className="text-slate-600">Loading sales...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <CardTitle className="text-xl font-bold text-slate-800">Recent Sales</CardTitle>
          <div className="flex items-center space-x-3 mt-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                placeholder="Search sales by date..."
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
                      Sale dated {new Date(sale.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      <span className="inline-flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        {sale.products.length} products
                      </span>
                      <span className="mx-2">•</span>
                      <span className="font-medium text-green-600">
                        ${sale.total_price.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/sale/${sale.id}`)}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(sale)}
                    disabled={deleteLoading === sale.id}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    {deleteLoading === sale.id ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!saleToDelete} onOpenChange={() => setSaleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the sale record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
