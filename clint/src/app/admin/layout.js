"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Sheet, SheetContent } from "@/app/components/ui/sheet";
import { cn } from "@/lib/utils"
import { Bell, ChevronDown, Home, LayoutDashboard, Menu, Settings, Users } from 'lucide-react'

const sidebarItems = [
  { icon: Home, label: 'Home', href: '/admin' },
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

export default function AdminLayoutComponent({
  children
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    (<div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-[240px] sm:w-[300px] p-0">
          <MobileSidebar />
        </SheetContent>
      </Sheet>
      {/* Desktop Sidebar */}
      <aside
        className="fixed left-0 top-0 z-40 hidden h-screen w-64 transition-transform md:translate-x-0 md:block">
        <DesktopSidebar />
      </aside>
      {/* Main Content */}
      <div className="md:ml-64">
        {/* Navbar */}
        <nav
          className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center justify-start">
              <Button
                variant="ghost"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => setIsSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
                <span className="sr-only">Open sidebar</span>
              </Button>
              <Link href="/admin" className="flex ml-2 md:mr-24">
                <span
                  className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Admin Panel</span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="hidden md:flex mr-4">
                <Input type="text" placeholder="Search..." className="max-w-sm" />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
                <div
                  className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">3</div>
              </Button>
              <Button variant="ghost" size="sm" className="ml-4">
                <img
                  className="w-8 h-8 rounded-full"
                  src="/placeholder.svg?height=32&width=32"
                  alt="User" />
                <span className="flex-1 ml-3 text-left">
                  <div className="font-medium truncate">John Doe</div>
                </span>
                <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
              </Button>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="p-4 md:p-8 mt-14">
          {children}
        </main>
      </div>
    </div>)
  );
}

function MobileSidebar() {
  return (
    (<div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <Link href="/admin" className="flex items-center pl-2.5 mb-5">
        <span
          className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Admin Panel</span>
      </Link>
      <SidebarContent />
    </div>)
  );
}

function DesktopSidebar() {
  return (
    (<div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <Link href="/admin" className="flex items-center pl-2.5 mb-5">
        <span
          className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Admin Panel</span>
      </Link>
      <SidebarContent />
    </div>)
  );
}

function SidebarContent() {
  const pathname = usePathname()

  return (
    (<ul className="space-y-2 font-medium">
      {sidebarItems.map((item, index) => (
        <li key={index}>
          <Link
            href={item.href}
            className={cn(
              "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
              pathname === item.href && "bg-gray-100 dark:bg-gray-700"
            )}>
            <item.icon
              className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span className="ml-3">{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>)
  );
}