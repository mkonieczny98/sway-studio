import { getPayload } from 'payload'
import config from '@payload-config'
import { OpiniaForm } from '@/components/admin/OpiniaForm'
import { notFound } from 'next/navigation'

async function getOpinia(id: string) {
  const payload = await getPayload({ config })
  try {
    const doc = await payload.findByID({
      collection: 'opinie',
      id,
    })
    return doc
  } catch {
    return null
  }
}

export default async function EditOpiniaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const opinia = await getOpinia(id)

  if (!opinia) {
    notFound()
  }

  return <OpiniaForm initialData={opinia} />
}
