import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Home, CreditCard, Mail, HelpCircle, ScrollText, Dumbbell } from 'lucide-react'
import Link from 'next/link'

const pages = [
  {
    title: 'Strona główna',
    description: 'Hero, sekcje i promocje',
    icon: Home,
    href: '/admin/strony/homepage',
  },
  {
    title: 'Zajęcia',
    description: 'Podstrona z opisem zajęć',
    icon: Dumbbell,
    href: '/admin/strony/zajecia',
  },
  {
    title: 'Cennik',
    description: 'Strona z cennikiem karnetów',
    icon: CreditCard,
    href: '/admin/strony/cennik',
  },
  {
    title: 'Kontakt',
    description: 'Dane kontaktowe i mapa',
    icon: Mail,
    href: '/admin/strony/kontakt',
  },
  {
    title: 'FAQ',
    description: 'Często zadawane pytania',
    icon: HelpCircle,
    href: '/admin/strony/faq',
  },
  {
    title: 'Regulamin',
    description: 'Regulamin studia',
    icon: ScrollText,
    href: '/admin/strony/regulamin',
  },
]

export default function StronyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Strony</h1>
        <p className="text-muted-foreground">
          Edytuj zawartość poszczególnych podstron
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <Link key={page.title} href={page.href}>
            <Card className="transition-all hover:shadow-md hover:border-gold/50 cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
                    <page.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{page.title}</CardTitle>
                    <CardDescription>{page.description}</CardDescription>
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
