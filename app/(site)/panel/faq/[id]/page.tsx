import { getPayload } from 'payload'
import config from '@payload-config'
import { FAQForm } from '@/components/admin/FAQForm'
import { notFound } from 'next/navigation'

async function getFAQItem(id: string) {
  const payload = await getPayload({ config })
  try {
    const doc = await payload.findByID({
      collection: 'faq',
      id,
    })
    return doc
  } catch {
    return null
  }
}

export default async function EditFAQPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const faqItem = await getFAQItem(id)

  if (!faqItem) {
    notFound()
  }

  return <FAQForm initialData={faqItem} />
}
