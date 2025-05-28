"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle, TrendingUp, DollarSign, ShoppingCart } from "lucide-react"

export default function DashboardStats({
  stats,
}: {
  stats: {
    totalInventory?: number
    lowStock?: number
    totalSales?: number
    totalProducts?: number
    totalSalesValue?: number
    outOfStock?: number
  }
}) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
          Dashboard Overview
        </h2>
        <p className="text-slate-600 text-lg">Monitor your inventory and sales performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <StatCard
          title="Total Products"
          value={(stats.totalProducts ?? 0).toLocaleString()}
          subtitle="Products in system"
          icon={<Package className="h-5 w-5 text-white" />}
          color="from-blue-500 to-blue-600"
          progress="w-3/4"
        />
        {/* <StatCard
          title="Total Inventory"
          value={(stats.totalInventory ?? 0).toLocaleString()}
          subtitle="Items in stock"
          icon={<ShoppingCart className="h-5 w-5 text-white" />}
          color="from-purple-500 to-purple-600"
          progress="w-3/4"
        /> */}
        <StatCard
          title="Total Sales"
          value={stats.totalSales ?? 0}
          subtitle="This month"
          icon={<TrendingUp className="h-5 w-5 text-white" />}
          color="from-green-500 to-emerald-600"
          progress="w-2/3"
          valueColor="text-green-600"
        />
        <StatCard
          title="Sales Value"
          value={`$${(stats.totalSalesValue ?? 0).toLocaleString()}`}
          subtitle="Total revenue"
          icon={<DollarSign className="h-5 w-5 text-white" />}
          color="from-yellow-500 to-yellow-600"
          progress="w-2/3"
          valueColor="text-yellow-600"
        />
        <StatCard
          title="Low Stock Alert"
          value={stats.lowStock ?? 0}
          subtitle="Below threshold"
          icon={<AlertTriangle className="h-5 w-5 text-white" />}
          color="from-orange-500 to-red-500"
          progress="w-1/4"
          valueColor="text-orange-600"
        />
        <StatCard
          title="Out of Stock"
          value={stats.outOfStock ?? 0}
          subtitle="Items to restock"
          icon={<AlertTriangle className="h-5 w-5 text-white" />}
          color="from-red-500 to-red-600"
          progress="w-1/4"
          valueColor="text-red-600"
        />
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
  progress,
  valueColor = "text-slate-800",
}: {
  title: string
  value: number | string
  subtitle: string
  icon: React.ReactNode
  color: string
  progress: string
  valueColor?: string
}) {
  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wide">{title}</CardTitle>
        <div className={`p-2 bg-gradient-to-br ${color} rounded-lg shadow-lg`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${valueColor} mb-1`}>{value}</div>
        <p className="text-sm text-slate-500">{subtitle}</p>
        <div className="mt-3 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div className={`h-full ${progress} bg-gradient-to-r ${color} rounded-full`}></div>
        </div>
      </CardContent>
    </Card>
  )
}
