import DashboardStats from "@/components/dashboard/DashboardStats"
import RecentSales from "@/components/dashboard/RecentSales"

export default function DashboardPage() {
  const stats = {
    totalInventory: 1247,
    lowStock: 23,
    totalSales: 89,
  }

  const sales = [
    {
      id: "1",
      customer: "John Doe",
      amount: 299.99,
      status: "completed",
      date: "2024-03-15",
    },
    // Add more sales data as needed
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <DashboardStats stats={stats} />
      <RecentSales sales={sales} />
    </div>
  )
} 