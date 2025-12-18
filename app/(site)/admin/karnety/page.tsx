import { getPayload } from 'payload'
import config from '@payload-config'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

async function getKarnety() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'karnety',
    sort: 'order',
    limit: 100,
  })
  return result.docs
}

export default async function KarnetyPage() {
  const karnety = await getKarnety()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Karnety</h1>
          <p className="text-muted-foreground">
            Zarządzaj ofertą karnetów i cenami
          </p>
        </div>
        <Link href="/admin/karnety/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Dodaj karnet
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {karnety.map((item: any) => (
          <Card key={item.id} className="transition-all hover:shadow-md group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  {item.subtitle && (
                    <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                  )}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/admin/karnety/${item.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-gold">{item.price}</span>
                <span className="text-muted-foreground">zł</span>
              </div>

              {item.features && item.features.length > 0 && (
                <ul className="space-y-2 text-sm">
                  {item.features.slice(0, 3).map((feature: any, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-gold">✓</span>
                      {feature.feature}
                    </li>
                  ))}
                  {item.features.length > 3 && (
                    <li className="text-muted-foreground">
                      +{item.features.length - 3} więcej...
                    </li>
                  )}
                </ul>
              )}

              {item.isPopular && (
                <div className="mt-4">
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                    Popularny
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {karnety.length === 0 && (
          <Card className="md:col-span-2 lg:col-span-3">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">Brak karnetów do wyświetlenia</p>
              <Link href="/admin/karnety/new">
                <Button>Dodaj pierwszy karnet</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
