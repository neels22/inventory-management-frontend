import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import { Toaster } from "sonner"; // ✅ Add this

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory Management System",
  description: "A modern inventory management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-50">
          <Sidebar />
          <main className="flex-1 p-6 ml-72">
            {children}
          </main>
        </div>
        <Toaster richColors position="top-right" /> {/* ✅ Add this */}

      </body>
    </html>
  );
}
