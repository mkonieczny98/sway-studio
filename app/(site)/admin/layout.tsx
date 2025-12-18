import './globals.css'
import { Inter } from 'next/font/google'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Panel Admina - Sway Studio',
  description: 'Zarządzaj treścią Sway Studio',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className="dark">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden bg-background">
          <AdminSidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <AdminHeader />
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
