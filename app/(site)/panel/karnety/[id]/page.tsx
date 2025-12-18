import { getPayload } from 'payload'
import config from '@payload-config'
import { KarnetForm } from '@/components/admin/KarnetForm'
import { notFound } from 'next/navigation'

async function getKarnet(id: string) {
  const payload = await getPayload({ config })
  try {
    const doc = await payload.findByID({
      collection: 'karnety',
      id,
    })
    return doc
  } catch {
    return null
  }
}

export default async function EditKarnetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const karnet = await getKarnet(id)

  if (!karnet) {
    notFound()
  }

  return <KarnetForm initialData={karnet} />
}
