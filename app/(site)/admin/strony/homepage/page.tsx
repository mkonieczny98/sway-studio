import { getPayload } from 'payload'
import config from '@payload-config'
import { HomepageForm } from '@/components/admin/HomepageForm'

async function getHomepage() {
  const payload = await getPayload({ config })
  try {
    const doc = await payload.findGlobal({
      slug: 'homepage',
    })
    return doc
  } catch {
    return null
  }
}

export default async function HomepageEditorPage() {
  const homepage = await getHomepage()
  return <HomepageForm initialData={homepage} />
}
