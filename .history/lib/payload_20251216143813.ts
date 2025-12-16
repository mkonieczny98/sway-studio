import { getPayload } from 'payload'
import config from '@payload-config'

// Get Payload instance (server-side only)
export async function getPayloadClient() {
  const payload = await getPayload({ config })
  return payload
}

// Helper functions for fetching data

// Globals
export async function getHomepage() {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({ slug: 'homepage' })
  return data
}

export async function getSettings() {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({ slug: 'settings' })
  return data
}

export async function getNavigation() {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({ slug: 'navigation' })
  return data
}

export async function getFooter() {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({ slug: 'footer' })
  return data
}

export async function getZajeciaPage() {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({ slug: 'zajecia-page' })
  return data
}

export async function getCennikPage() {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({ slug: 'cennik-page' })
  return data
}

export async function getKontaktPage() {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({ slug: 'kontakt-page' })
  return data
}

export async function getFAQPage() {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({ slug: 'faq-page' })
  return data
}

export async function getRegulaminPage() {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({ slug: 'regulamin-page' })
  return data
}

// Collections
export async function getZajecia() {
  const payload = await getPayloadClient()
  const data = await payload.find({
    collection: 'zajecia',
    sort: 'order',
  })
  return data.docs
}

export async function getZajeciaBySlug(slug: string) {
  const payload = await getPayloadClient()
  const data = await payload.find({
    collection: 'zajecia',
    where: { slug: { equals: slug } },
  })
  return data.docs[0] || null
}

export async function getKarnety() {
  const payload = await getPayloadClient()
  const data = await payload.find({
    collection: 'karnety',
    sort: 'order',
  })
  return data.docs
}

export async function getOpinie() {
  const payload = await getPayloadClient()
  const data = await payload.find({
    collection: 'opinie',
    sort: 'order',
  })
  return data.docs
}

export async function getFAQ() {
  const payload = await getPayloadClient()
  const data = await payload.find({
    collection: 'faq',
    sort: 'order',
  })
  return data.docs
}

// Media helper - get URL from media relation
export function getMediaUrl(media: { url?: string } | string | null | undefined): string | null {
  if (!media) return null
  if (typeof media === 'string') return media
  return media.url || null
}
