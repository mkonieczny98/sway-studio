import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings, Palette, Globe, Bell } from 'lucide-react'
import Link from 'next/link'

const settingsGroups = [
  {
    title: 'Ogólne',
    description: 'Podstawowe ustawienia strony',
    icon: Settings,
    href: '/admin/ustawienia/ogolne',
  },
  {
    title: 'Nawigacja',
    description: 'Menu i linki nawigacyjne',
    icon: Globe,
    href: '/admin/ustawienia/nawigacja',
  },
  {
    title: 'Stopka',
    description: 'Treść stopki i linki',
    icon: Palette,
    href: '/admin/ustawienia/stopka',
  },
]

export default function UstawieniaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ustawienia</h1>
        <p className="text-muted-foreground">
          Konfiguracja strony Sway Studio
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {settingsGroups.map((group) => (
          <Link key={group.title} href={group.href}>
            <Card className="transition-all hover:shadow-md hover:border-gold/50 cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
                    <group.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{group.title}</CardTitle>
                    <CardDescription>{group.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
