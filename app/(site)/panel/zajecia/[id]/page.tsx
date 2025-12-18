import { getPayload } from 'payload'
import config from '@payload-config'
import { ZajeciaForm } from '@/components/admin/ZajeciaForm'
import { notFound } from 'next/navigation'

async function getZajecia(id: string) {
  const payload = await getPayload({ config })
  try {
    const doc = await payload.findByID({
      collection: 'zajecia',
      id,
    })
    return doc
  } catch {
    return null
  }
}

export default async function EditZajeciaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const zajecia = await getZajecia(id)

  if (!zajecia) {
    notFound()
  }

  return <ZajeciaForm initialData={zajecia} />
}
