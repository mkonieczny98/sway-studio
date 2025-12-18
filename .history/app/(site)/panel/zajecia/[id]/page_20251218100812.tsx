import { getZajeciaById } from '@/lib/content'
import { ZajeciaForm } from '@/components/admin/ZajeciaForm'
import { notFound } from 'next/navigation'

export default async function EditZajeciaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const zajecia = await getZajeciaById(id)

  if (!zajecia) {
    notFound()
  }

  return <ZajeciaForm initialData={zajecia} />
}
