"use client"

import { useState } from "react"
import Sidebar from "./components/layout/Sidebar"
import DashboardStats from "./components/dashboard/DashboardStats"
import RecentSales from "./components/dashboard/RecentSales"
import SaleDetail from "./components/sales/SaleDetail"
import NewSale from "./components/sales/NewSale"
import InventoryList from "./components/inventory/InventoryList"
import AddProductForm from "./components/inventory/AddProductForm"

import { Page, Sale, Product, SaleProduct } from "@/types"

export default function InventoryManagementPage() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")
  const [searchTerm, setSearchTerm] = useState("")

  const stats = {
    totalInventory: 1247,
    lowStock: 23,
    totalSales: 89,
  }

  const sales: Sale[] = [/*...*/]
  const saleProducts: SaleProduct[] = [/*...*/]
  const products: Product[] = [/*...*/]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1">
        {currentPage === "dashboard" && (
          <>
            <DashboardStats stats={stats} />
            <RecentSales sales={sales} onEdit={() => setCurrentPage("sale-detail")} />
          </>
        )}
        {currentPage === "new-sale" && <NewSale />}
        {currentPage === "sale-detail" && <SaleDetail saleProducts={saleProducts} />}
        {currentPage === "manage-inventory" && <InventoryList products={products} />}
        {currentPage === "add-product" && <AddProductForm />}
      </div>
    </div>
  )
}
