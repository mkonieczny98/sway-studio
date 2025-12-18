import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function OgolnePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/ustawienia">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ustawienia ogólne</h1>
            <p className="text-muted-foreground">
              Podstawowa konfiguracja strony
            </p>
          </div>
        </div>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Zapisz
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>W budowie</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Ustawienia ogólne będą dostępne wkrótce.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
