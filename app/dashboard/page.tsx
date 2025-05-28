"use client"

import { useEffect, useState } from "react"
import DashboardStats from "@/components/dashboard/DashboardStats"
import RecentSales from "@/components/dashboard/RecentSales"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalInventory: 0, // Set this if your API provides it, otherwise keep as 0
    totalSales: 0,
    totalSalesValue: 0,
    lowStock: 0,
    outOfStock: 0,
  })

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/inventory/summary")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          totalProducts: data.total_products,
          totalInventory: 0, // Set this if your API provides it, otherwise keep as 0
          totalSales: data.total_sales,
          totalSalesValue: data.total_sales_value,
          lowStock: data.low_stock,
          outOfStock: data.out_of_stock,
        })
      })
      .catch((err) => {
        // Optionally handle error
        console.error("Failed to fetch stats", err)
      })
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <DashboardStats stats={stats} />
      <RecentSales onEdit={() => {}} />
    </div>
  )
} 