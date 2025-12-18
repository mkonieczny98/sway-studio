'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  Home, 
  Dumbbell, 
  CreditCard, 
  MessageSquare, 
  HelpCircle, 
  Settings, 
  FileText,
  Image,
  Menu,
  Navigation,
  Mail,
  ScrollText
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const navigation = [
  {
    title: 'Dashboard',
    items: [
      { name: 'Przegląd', href: '/panel', icon: Home },
    ]
  },
  {
    title: 'Treści',
    items: [
      { name: 'Zajęcia', href: '/panel/zajecia', icon: Dumbbell },
      { name: 'Karnety', href: '/panel/karnety', icon: CreditCard },
      { name: 'Opinie', href: '/panel/opinie', icon: MessageSquare },
      { name: 'FAQ', href: '/panel/faq', icon: HelpCircle },
      { name: 'Media', href: '/panel/media', icon: Image },
    ]
  },
  {
    title: 'Strony',
    items: [
      { name: 'Strona główna', href: '/panel/strony/homepage', icon: Home },
      { name: 'Zajęcia', href: '/panel/strony/zajecia', icon: FileText },
      { name: 'Cennik', href: '/panel/strony/cennik', icon: FileText },
      { name: 'Kontakt', href: '/panel/strony/kontakt', icon: Mail },
      { name: 'FAQ', href: '/panel/strony/faq', icon: FileText },
      { name: 'Regulamin', href: '/panel/strony/regulamin', icon: ScrollText },
    ]
  },
  {
    title: 'Ustawienia',
    items: [
      { name: 'Ogólne', href: '/panel/ustawienia', icon: Settings },
      { name: 'Nawigacja', href: '/panel/ustawienia/nawigacja', icon: Navigation },
      { name: 'Stopka', href: '/panel/ustawienia/stopka', icon: Menu },
    ]
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-border bg-card lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gold font-bold text-black">
            S
          </div>
          <span className="text-lg font-semibold">Sway Studio</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navigation.map((group, groupIdx) => (
            <div key={group.title} className={cn(groupIdx > 0 && 'mt-6')}>
              <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== '/admin' && pathname.startsWith(item.href))
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-gold/10 text-gold'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">
              Panel Admina v1.0
            </p>
            <Link 
              href="/" 
              className="mt-1 text-xs text-gold hover:underline"
              target="_blank"
            >
              Otwórz stronę →
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
