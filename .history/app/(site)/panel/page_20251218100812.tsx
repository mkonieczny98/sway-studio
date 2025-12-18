import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dumbbell, CreditCard, MessageSquare, HelpCircle, Eye, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { getAllZajecia, getAllKarnety, getAllOpinie, getAllFAQ } from '@/lib/content'

export default async function AdminDashboard() {
  const [zajecia, karnety, opinie, faq] = await Promise.all([
    getAllZajecia(),
    getAllKarnety(),
    getAllOpinie(),
    getAllFAQ(),
  ])

  const stats = [
    {
      title: 'Zajęcia',
      value: zajecia.length.toString(),
      description: 'aktywnych kursów',
      icon: Dumbbell,
      href: '/panel/zajecia',
      color: 'text-blue-500',
    },
    {
      title: 'Karnety',
      value: karnety.length.toString(),
      description: 'dostępnych opcji',
      icon: CreditCard,
      href: '/panel/karnety',
      color: 'text-green-500',
    },
    {
      title: 'Opinie',
      value: opinie.length.toString(),
      description: 'od klientów',
      icon: MessageSquare,
      href: '/panel/opinie',
      color: 'text-purple-500',
    },
    {
      title: 'FAQ',
      value: faq.length.toString(),
      description: 'pytań i odpowiedzi',
      icon: HelpCircle,
      href: '/panel/faq',
      color: 'text-orange-500',
    },
  ]

  const quickActions = [
    { title: 'Dodaj zajęcia', href: '/panel/zajecia/new', icon: Dumbbell },
    { title: 'Dodaj karnet', href: '/panel/karnety/new', icon: CreditCard },
    { title: 'Dodaj opinię', href: '/panel/opinie/new', icon: MessageSquare },
    { title: 'Dodaj FAQ', href: '/panel/faq/new', icon: HelpCircle },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Witaj w panelu administracyjnym Sway Studio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="transition-all hover:shadow-md hover:border-gold/50 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Szybkie akcje</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="transition-all hover:shadow-md hover:border-gold/50 cursor-pointer group">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold group-hover:bg-gold group-hover:text-black transition-colors">
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{action.title}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-gold" />
              Ostatnie zmiany
            </CardTitle>
            <CardDescription>
              Historia ostatnich modyfikacji treści
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Zaktualizowano', item: 'Strona główna', time: '2 godz. temu' },
                { action: 'Dodano', item: 'Nowe zajęcia: Stretching', time: '5 godz. temu' },
                { action: 'Edytowano', item: 'Cennik VIP', time: 'wczoraj' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.item}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-gold" />
              Szybki podgląd
            </CardTitle>
            <CardDescription>
              Najważniejsze elementy do sprawdzenia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm font-medium">Strona główna</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Hero, sekcje, promocje - wszystko w jednym miejscu
                </p>
                <Link href="/panel/strony/homepage" className="mt-2 inline-block text-xs text-gold hover:underline">
                  Edytuj →
                </Link>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm font-medium">Grafik zajęć</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Harmonogram wyświetlany na stronie
                </p>
                <Link href="/panel/ustawienia" className="mt-2 inline-block text-xs text-gold hover:underline">
                  Konfiguruj →
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
