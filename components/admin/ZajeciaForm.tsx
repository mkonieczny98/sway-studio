'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Save, Plus, X } from 'lucide-react'
import Link from 'next/link'

interface ZajeciaFormProps {
  initialData?: any
  isNew?: boolean
}

export function ZajeciaForm({ initialData, isNew = false }: ZajeciaFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    shortDesc: initialData?.shortDesc || '',
    fullDesc: initialData?.fullDesc || '',
    image: initialData?.image || '',
    imageOrientation: initialData?.imageOrientation || 'horizontal',
    maxPeople: initialData?.maxPeople || '',
    duration: initialData?.duration || '60 min',
    requirements: initialData?.requirements || '',
    features: initialData?.features || [],
    showOnHome: initialData?.showOnHome ?? true,
    order: initialData?.order || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const endpoint = isNew 
        ? '/api/zajecia' 
        : `/api/zajecia/${initialData.id}`
      
      const response = await fetch(endpoint, {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/zajecia')
        router.refresh()
      }
    } catch (error) {
      console.error('Error saving:', error)
    } finally {
      setLoading(false)
    }
  }

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { feature: '' }],
    })
  }

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_: any, i: number) => i !== index),
    })
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = { feature: value }
    setFormData({ ...formData, features: newFeatures })
  }

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[ąàáâãäå]/g, 'a')
      .replace(/[ćç]/g, 'c')
      .replace(/[ęèéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[łl]/g, 'l')
      .replace(/[ńñ]/g, 'n')
      .replace(/[óòôõö]/g, 'o')
      .replace(/[śş]/g, 's')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ýÿ]/g, 'y')
      .replace(/[źżž]/g, 'z')
      .replace(/[^a-z0-9-]/g, '')
    setFormData({ ...formData, slug })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/zajecia">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isNew ? 'Nowe zajęcia' : 'Edytuj zajęcia'}
            </h1>
            <p className="text-muted-foreground">
              {isNew ? 'Dodaj nową ofertę zajęć' : `Edytujesz: ${initialData?.title}`}
            </p>
          </div>
        </div>
        <Button type="submit" disabled={loading} className="gap-2">
          <Save className="h-4 w-4" />
          {loading ? 'Zapisywanie...' : 'Zapisz'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Podstawowe informacje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Nazwa zajęć *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="np. Pole Dance"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL) *</Label>
                <div className="flex gap-2">
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="np. pole-dance"
                    required
                  />
                  <Button type="button" variant="outline" onClick={generateSlug}>
                    Generuj
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDesc">Krótki opis</Label>
                <Textarea
                  id="shortDesc"
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  placeholder="1-2 zdania opisujące zajęcia"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullDesc">Pełny opis</Label>
                <Textarea
                  id="fullDesc"
                  value={formData.fullDesc}
                  onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                  placeholder="Szczegółowy opis zajęć..."
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lista korzyści</CardTitle>
              <CardDescription>Dodaj punkty wyświetlane na stronie zajęć</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.features.map((feature: any, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature.feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder={`Korzyść ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFeature(index)}
                    className="text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addFeature} className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Dodaj korzyść
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zdjęcie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image">URL zdjęcia</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              {formData.image && (
                <div className="rounded-lg overflow-hidden border">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-full h-40 object-cover"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="orientation">Orientacja</Label>
                <select
                  id="orientation"
                  value={formData.imageOrientation}
                  onChange={(e) => setFormData({ ...formData, imageOrientation: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="horizontal">Poziome</option>
                  <option value="vertical">Pionowe</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Szczegóły</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxPeople">Max osób</Label>
                <Input
                  id="maxPeople"
                  value={formData.maxPeople}
                  onChange={(e) => setFormData({ ...formData, maxPeople: e.target.value })}
                  placeholder="np. max. 8 osób"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Czas trwania</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="np. 60 min"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Wymagania</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Wymagania dla uczestników..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ustawienia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="showOnHome">Pokaż na stronie głównej</Label>
                <input
                  type="checkbox"
                  id="showOnHome"
                  checked={formData.showOnHome}
                  onChange={(e) => setFormData({ ...formData, showOnHome: e.target.checked })}
                  className="h-4 w-4 accent-gold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Kolejność</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
