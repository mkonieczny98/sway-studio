import { getPayload } from 'payload'
import config from '@payload-config'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, HelpCircle } from 'lucide-react'
import Link from 'next/link'

async function getFAQ() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'faq',
    sort: 'order',
    limit: 100,
  })
  return result.docs
}

export default async function FAQPage() {
  const faq = await getFAQ()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">FAQ</h1>
          <p className="text-muted-foreground">
            Zarządzaj często zadawanymi pytaniami
          </p>
        </div>
        <Link href="/panel/faq/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Dodaj pytanie
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {faq.map((item: any, index: number) => (
          <Card key={item.id} className="transition-all hover:shadow-md group">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-gold font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.question}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                    {item.answer || 'Brak odpowiedzi'}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/admin/faq/${item.id}`}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {faq.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Brak pytań FAQ</p>
              <Link href="/panel/faq/new">
                <Button>Dodaj pierwsze pytanie</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
