'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { createFAQ, updateFAQ } from '@/app/(site)/panel/actions'

interface FAQFormProps {
  initialData?: any
  isNew?: boolean
}

export function FAQForm({ initialData, isNew = false }: FAQFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    question: initialData?.question || '',
    answer: initialData?.answer || '',
    order: initialData?.order || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      if (isNew) {
        await createFAQ(formData)
      } else {
        await updateFAQ(initialData.id, formData)
      }
      router.push('/panel/faq')
      router.refresh()
    } catch (err: any) {
      console.error('Error saving:', err)
      setError(err.message || 'Wystąpił błąd podczas zapisywania')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/panel/faq">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isNew ? 'Nowe pytanie FAQ' : 'Edytuj pytanie'}
            </h1>
            <p className="text-muted-foreground">
              {isNew ? 'Dodaj nowe pytanie i odpowiedź' : 'Edytuj pytanie i odpowiedź'}
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
              <CardTitle>Pytanie i odpowiedź</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Pytanie *</Label>
                <Input
                  id="question"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="np. Jak zapisać się na zajęcia?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="answer">Odpowiedź *</Label>
                <Textarea
                  id="answer"
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Odpowiedź na pytanie..."
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Kolejność</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-32"
                />
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
                <h4 className="font-medium mb-2">
                  {formData.question || 'Pytanie...'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {formData.answer || 'Odpowiedź...'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}

