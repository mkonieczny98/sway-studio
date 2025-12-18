import { getPayload } from 'payload'
import config from '@payload-config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react'
import Link from 'next/link'

async function getZajecia() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'zajecia',
    sort: 'order',
    limit: 100,
  })
  return result.docs
}

export default async function ZajeciaPage() {
  const zajecia = await getZajecia()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Zajęcia</h1>
          <p className="text-muted-foreground">
            Zarządzaj ofertą zajęć w Sway Studio
          </p>
        </div>
        <Link href="/admin/zajecia/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Dodaj zajęcia
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {zajecia.map((item: any) => (
          <Card key={item.id} className="transition-all hover:shadow-md">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="cursor-grab text-muted-foreground hover:text-foreground">
                  <GripVertical className="h-5 w-5" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-2xl">
                  {item.icon || '💃'}
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {item.shortDescription || 'Brak opisu'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.showOnHome && (
                  <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                    Na stronie głównej
                  </span>
                )}
                <Link href={`/admin/zajecia/${item.id}`}>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {zajecia.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">Brak zajęć do wyświetlenia</p>
              <Link href="/admin/zajecia/new">
                <Button>Dodaj pierwsze zajęcia</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
