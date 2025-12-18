import { getPayload } from 'payload'
import config from '@payload-config'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Star } from 'lucide-react'
import Link from 'next/link'

async function getOpinie() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'opinie',
    limit: 100,
  })
  return result.docs
}

export default async function OpiniePage() {
  const opinie = await getOpinie()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Opinie</h1>
          <p className="text-muted-foreground">
            Zarządzaj opiniami klientów
          </p>
        </div>
        <Link href="/admin/opinie/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Dodaj opinię
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {opinie.map((item: any) => (
          <Card key={item.id} className="transition-all hover:shadow-md group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-sm font-semibold text-black">
                    {item.author?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.author || 'Anonim'}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < (item.rating || 5) ? 'fill-gold text-gold' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/admin/opinie/${item.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-3">
                &ldquo;{item.content || item.text || 'Brak treści'}&rdquo;
              </p>
            </CardContent>
          </Card>
        ))}

        {opinie.length === 0 && (
          <Card className="md:col-span-2">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">Brak opinii do wyświetlenia</p>
              <Link href="/admin/opinie/new">
                <Button>Dodaj pierwszą opinię</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
