import { getFAQById } from '@/lib/content'
import { FAQForm } from '@/components/admin/FAQForm'
import { notFound } from 'next/navigation'

export default async function EditFAQPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const faqItem = await getFAQById(id)

  if (!faqItem) {
    notFound()
  }

  return <FAQForm initialData={faqItem} />
}
