"use client"

import DashboardStats from "@/components/dashboard/DashboardStats"
import RecentSales from "@/components/dashboard/RecentSales"

export default function DashboardPage() {
  const stats = {
    totalInventory: 1247,
    lowStock: 23,
    totalSales: 89,
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <DashboardStats stats={stats} />
      <RecentSales onEdit={() => {}} />
    </div>
  )
} 