import { getKarnetById } from '@/lib/content'
import { KarnetForm } from '@/components/admin/KarnetForm'
import { notFound } from 'next/navigation'

export default async function EditKarnetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const karnet = await getKarnetById(id)

  if (!karnet) {
    notFound()
  }

  return <KarnetForm initialData={karnet} />
}
