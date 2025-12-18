'use client'

import { Bell, Search, User, LogOut, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search */}
      <div className="hidden flex-1 md:block md:max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Szukaj..." 
            className="pl-9 bg-background"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gold" />
        </Button>
        
        <div className="mx-2 h-6 w-px bg-border" />
        
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-muted-foreground">admin@sway.pl</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-semibold text-black">
            A
          </div>
        </div>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
