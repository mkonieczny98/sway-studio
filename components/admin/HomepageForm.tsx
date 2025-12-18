'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

interface HomepageFormProps {
  initialData?: any
}

export function HomepageForm({ initialData }: HomepageFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    heroSection: initialData?.heroSection || {
      title: 'Naucz się',
      highlight: 'latać',
      subtitle: 'Pole Dance Studio w Poznaniu',
      description: '',
      buttonText: 'Zapisz się na zajęcia',
    },
    aboutSection: initialData?.aboutSection || {
      title: 'Witaj w Sway!',
      text: '',
      feature1: 'Profesjonalna kadra',
      feature2: 'Małe grupy',
      feature3: 'Przyjazna atmosfera',
    },
    promoSection: initialData?.promoSection || {
      title: 'Pierwsze zajęcia',
      price: '35 zł',
      description: '',
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/globals/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error('Error saving:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateSection = (section: string, field: string, value: string) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section as keyof typeof formData],
        [field]: value,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Strona główna</h1>
            <p className="text-muted-foreground">
              Edytuj zawartość strony głównej
            </p>
          </div>
        </div>
        <Button type="submit" disabled={loading} className="gap-2">
          <Save className="h-4 w-4" />
          {loading ? 'Zapisywanie...' : 'Zapisz zmiany'}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hero">🎬 Hero</TabsTrigger>
          <TabsTrigger value="about">📖 O nas</TabsTrigger>
          <TabsTrigger value="promo">🎁 Promocja</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Sekcja Hero</CardTitle>
              <CardDescription>Górna część strony z głównym przekazem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tytuł (przed złotym słowem)</Label>
                  <Input
                    value={formData.heroSection.title}
                    onChange={(e) => updateSection('heroSection', 'title', e.target.value)}
                    placeholder="Naucz się"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Złote słowo</Label>
                  <Input
                    value={formData.heroSection.highlight}
                    onChange={(e) => updateSection('heroSection', 'highlight', e.target.value)}
                    placeholder="latać"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Podtytuł</Label>
                <Input
                  value={formData.heroSection.subtitle}
                  onChange={(e) => updateSection('heroSection', 'subtitle', e.target.value)}
                  placeholder="Pole Dance Studio w Poznaniu"
                />
              </div>

              <div className="space-y-2">
                <Label>Opis</Label>
                <Textarea
                  value={formData.heroSection.description}
                  onChange={(e) => updateSection('heroSection', 'description', e.target.value)}
                  placeholder="Krótki opis zachęcający do zapisania się..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Tekst przycisku</Label>
                <Input
                  value={formData.heroSection.buttonText}
                  onChange={(e) => updateSection('heroSection', 'buttonText', e.target.value)}
                  placeholder="Zapisz się na zajęcia"
                />
              </div>

              {/* Preview */}
              <div className="mt-6 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 text-white">
                <p className="text-sm text-muted-foreground mb-2">Podgląd:</p>
                <h2 className="text-3xl font-bold">
                  {formData.heroSection.title}{' '}
                  <span className="text-gold">{formData.heroSection.highlight}</span>
                </h2>
                <p className="text-gold mt-2">{formData.heroSection.subtitle}</p>
                <p className="text-neutral-300 mt-2 text-sm">{formData.heroSection.description}</p>
                <button className="mt-4 rounded-lg bg-gold px-4 py-2 text-sm font-medium text-black">
                  {formData.heroSection.buttonText}
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Section */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>Sekcja O nas</CardTitle>
              <CardDescription>Informacje o studiu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tytuł sekcji</Label>
                <Input
                  value={formData.aboutSection.title}
                  onChange={(e) => updateSection('aboutSection', 'title', e.target.value)}
                  placeholder="Witaj w Sway!"
                />
              </div>

              <div className="space-y-2">
                <Label>Tekst główny</Label>
                <Textarea
                  value={formData.aboutSection.text}
                  onChange={(e) => updateSection('aboutSection', 'text', e.target.value)}
                  placeholder="Opis studia..."
                  rows={5}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Cecha 1</Label>
                  <Input
                    value={formData.aboutSection.feature1}
                    onChange={(e) => updateSection('aboutSection', 'feature1', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cecha 2</Label>
                  <Input
                    value={formData.aboutSection.feature2}
                    onChange={(e) => updateSection('aboutSection', 'feature2', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cecha 3</Label>
                  <Input
                    value={formData.aboutSection.feature3}
                    onChange={(e) => updateSection('aboutSection', 'feature3', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Promo Section */}
        <TabsContent value="promo">
          <Card>
            <CardHeader>
              <CardTitle>Sekcja Promocja</CardTitle>
              <CardDescription>Oferta promocyjna dla nowych klientów</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tytuł</Label>
                  <Input
                    value={formData.promoSection.title}
                    onChange={(e) => updateSection('promoSection', 'title', e.target.value)}
                    placeholder="Pierwsze zajęcia"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cena</Label>
                  <Input
                    value={formData.promoSection.price}
                    onChange={(e) => updateSection('promoSection', 'price', e.target.value)}
                    placeholder="35 zł"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Opis promocji</Label>
                <Textarea
                  value={formData.promoSection.description}
                  onChange={(e) => updateSection('promoSection', 'description', e.target.value)}
                  placeholder="Szczegóły promocji..."
                  rows={3}
                />
              </div>

              {/* Preview */}
              <div className="mt-6 rounded-lg bg-gold/10 border border-gold/20 p-6">
                <p className="text-sm text-muted-foreground mb-2">Podgląd:</p>
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-gold">{formData.promoSection.price}</div>
                  <div>
                    <h3 className="font-semibold">{formData.promoSection.title}</h3>
                    <p className="text-sm text-muted-foreground">{formData.promoSection.description}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  )
}
