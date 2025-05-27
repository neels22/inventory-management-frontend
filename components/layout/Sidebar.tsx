"use client"

import { Button } from "@/components/ui/button"
import { Home, Plus, Package } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-6 min-h-screen border-r border-slate-700/50 backdrop-blur-xl">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <Package className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Inventory Pro
          </h1>
        </div>
        <p className="text-slate-400 text-sm ml-11">Management System</p>
      </div>

      <nav className="space-y-3">
        <SidebarButton
          label="Dashboard"
          icon={<Home className="w-5 h-5 mr-3" />}
          active={pathname === "/dashboard"}
          href="/dashboard"
        />
        <SidebarButton
          label="New Sale Entry"
          icon={<Plus className="w-5 h-5 mr-3" />}
          active={pathname === "/orders"}
          href="/orders"
        />
        <SidebarButton
          label="Manage Inventory"
          icon={<Package className="w-5 h-5 mr-3" />}
          active={pathname === "/products"}
          href="/products"
        />
      </nav>

      <div className="mt-auto pt-8">
        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
          <p className="text-xs text-slate-400 mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarButton({
  label,
  icon,
  active,
  href,
}: {
  label: string
  icon: React.ReactNode
  active: boolean
  href: string
}) {
  return (
    <Link href={href}>
      <Button
        variant={active ? "secondary" : "ghost"}
        className={`w-full justify-start h-12 text-left transition-all duration-200 ${
          active
            ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg"
            : "text-slate-300 hover:text-white hover:bg-white/10 border-transparent"
        }`}
      >
        {icon}
        {label}
      </Button>
    </Link>
  )
}
