import { getOpiniaById } from '@/lib/content'
import { OpiniaForm } from '@/components/admin/OpiniaForm'
import { notFound } from 'next/navigation'

export default async function EditOpiniaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const opinia = await getOpiniaById(id)

  if (!opinia) {
    notFound()
  }

  return <OpiniaForm initialData={opinia} />
}
