import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Upload, Image as ImageIcon, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media</h1>
          <p className="text-muted-foreground">
            Zarządzaj zdjęciami i plikami
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Dodaj plik
        </Button>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2">Zarządzanie mediami</p>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Pliki są przechowywane w Cloudinary. Możesz dodawać URL-e bezpośrednio w formularzach edycji.
          </p>
          <Link href="https://cloudinary.com/console" target="_blank" className="mt-4">
            <Button variant="outline">
              Otwórz Cloudinary Console →
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
