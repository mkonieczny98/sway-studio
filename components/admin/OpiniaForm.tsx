'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Save, Star } from 'lucide-react'
import Link from 'next/link'

interface OpiniaFormProps {
  initialData?: any
  isNew?: boolean
}

export function OpiniaForm({ initialData, isNew = false }: OpiniaFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    author: initialData?.author || '',
    content: initialData?.content || initialData?.text || '',
    rating: initialData?.rating || 5,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const endpoint = isNew 
        ? '/api/opinie' 
        : `/api/opinie/${initialData.id}`
      
      const response = await fetch(endpoint, {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/opinie')
        router.refresh()
      }
    } catch (error) {
      console.error('Error saving:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/opinie">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isNew ? 'Nowa opinia' : 'Edytuj opinię'}
            </h1>
            <p className="text-muted-foreground">
              {isNew ? 'Dodaj nową opinię klienta' : `Edytujesz opinię: ${initialData?.author}`}
            </p>
          </div>
        </div>
        <Button type="submit" disabled={loading} className="gap-2">
          <Save className="h-4 w-4" />
          {loading ? 'Zapisywanie...' : 'Zapisz'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Treść opinii</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="author">Autor *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="np. Anna K."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Treść opinii *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Treść opinii klienta..."
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Ocena</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= formData.rating
                            ? 'fill-gold text-gold'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {formData.rating}/5
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-gold/20">
            <CardHeader>
              <CardTitle className="text-sm">Podgląd</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-sm font-semibold text-black">
                    {formData.author?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <p className="font-semibold">{formData.author || 'Autor'}</p>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < formData.rating
                              ? 'fill-gold text-gold'
                              : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "{formData.content || 'Treść opinii...'}"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
