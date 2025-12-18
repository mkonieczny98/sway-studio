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

interface KarnetFormProps {
  initialData?: any
  isNew?: boolean
}

export function KarnetForm({ initialData, isNew = false }: KarnetFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    subtitle: initialData?.subtitle || '',
    price: initialData?.price || '',
    priceNote: initialData?.priceNote || '',
    features: initialData?.features || [],
    isPopular: initialData?.isPopular || false,
    order: initialData?.order || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const endpoint = isNew 
        ? '/api/karnety' 
        : `/api/karnety/${initialData.id}`
      
      const response = await fetch(endpoint, {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/karnety')
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/karnety">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isNew ? 'Nowy karnet' : 'Edytuj karnet'}
            </h1>
            <p className="text-muted-foreground">
              {isNew ? 'Dodaj nową ofertę karnetu' : `Edytujesz: ${initialData?.name}`}
            </p>
          </div>
        </div>
        <Button type="submit" disabled={loading} className="gap-2">
          <Save className="h-4 w-4" />
          {loading ? 'Zapisywanie...' : 'Zapisz'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informacje o karnecie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nazwa karnetu *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="np. Karnet 8x"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Podtytuł</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="np. Najczęściej wybierany"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Cena *</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="np. 320"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceNote">Uwaga do ceny</Label>
                  <Input
                    id="priceNote"
                    value={formData.priceNote}
                    onChange={(e) => setFormData({ ...formData, priceNote: e.target.value })}
                    placeholder="np. / miesiąc"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cechy karnetu</CardTitle>
              <CardDescription>Lista korzyści wyświetlana na stronie</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.features.map((feature: any, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature.feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder={`Cecha ${index + 1}`}
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
                Dodaj cechę
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ustawienia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="isPopular">Oznacz jako popularny</Label>
                <input
                  type="checkbox"
                  id="isPopular"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
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

          {/* Preview */}
          <Card className="border-gold/20">
            <CardHeader>
              <CardTitle className="text-sm">Podgląd</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-muted/50 p-4">
                <h3 className="font-semibold">{formData.name || 'Nazwa karnetu'}</h3>
                {formData.subtitle && (
                  <p className="text-xs text-muted-foreground">{formData.subtitle}</p>
                )}
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-2xl font-bold text-gold">{formData.price || '0'}</span>
                  <span className="text-sm text-muted-foreground">zł {formData.priceNote}</span>
                </div>
                {formData.isPopular && (
                  <span className="mt-2 inline-block rounded-full bg-gold/10 px-2 py-0.5 text-xs text-gold">
                    Popularny
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
