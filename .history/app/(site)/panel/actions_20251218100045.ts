'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { revalidatePath } from 'next/cache'

// ============ ZAJECIA ============

export async function getZajecia() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'zajecia',
    limit: 100,
    sort: 'order',
  })
  return result.docs
}

export async function getZajeciaById(id: string) {
  const payload = await getPayload({ config })
  const result = await payload.findByID({
    collection: 'zajecia',
    id,
  })
  return result
}

export async function createZajecia(data: any) {
  const payload = await getPayload({ config })
  const result = await payload.create({
    collection: 'zajecia',
    data,
  })
  revalidatePath('/panel/zajecia')
  revalidatePath('/zajecia')
  return result
}

export async function updateZajecia(id: string, data: any) {
  const payload = await getPayload({ config })
  const result = await payload.update({
    collection: 'zajecia',
    id,
    data,
  })
  revalidatePath('/panel/zajecia')
  revalidatePath('/zajecia')
  return result
}

export async function deleteZajecia(id: string) {
  const payload = await getPayload({ config })
  await payload.delete({
    collection: 'zajecia',
    id,
  })
  revalidatePath('/panel/zajecia')
  revalidatePath('/zajecia')
}

// ============ KARNETY ============

export async function getKarnety() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'karnety',
    limit: 100,
    sort: 'order',
  })
  return result.docs
}

export async function getKarnetById(id: string) {
  const payload = await getPayload({ config })
  const result = await payload.findByID({
    collection: 'karnety',
    id,
  })
  return result
}

export async function createKarnet(data: any) {
  const payload = await getPayload({ config })
  const result = await payload.create({
    collection: 'karnety',
    data,
  })
  revalidatePath('/panel/karnety')
  revalidatePath('/cennik')
  return result
}

export async function updateKarnet(id: string, data: any) {
  const payload = await getPayload({ config })
  const result = await payload.update({
    collection: 'karnety',
    id,
    data,
  })
  revalidatePath('/panel/karnety')
  revalidatePath('/cennik')
  return result
}

export async function deleteKarnet(id: string) {
  const payload = await getPayload({ config })
  await payload.delete({
    collection: 'karnety',
    id,
  })
  revalidatePath('/panel/karnety')
  revalidatePath('/cennik')
}

// ============ OPINIE ============

export async function getOpinie() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'opinie',
    limit: 100,
  })
  return result.docs
}

export async function getOpiniaById(id: string) {
  const payload = await getPayload({ config })
  const result = await payload.findByID({
    collection: 'opinie',
    id,
  })
  return result
}

export async function createOpinia(data: any) {
  const payload = await getPayload({ config })
  const result = await payload.create({
    collection: 'opinie',
    data,
  })
  revalidatePath('/panel/opinie')
  revalidatePath('/')
  return result
}

export async function updateOpinia(id: string, data: any) {
  const payload = await getPayload({ config })
  const result = await payload.update({
    collection: 'opinie',
    id,
    data,
  })
  revalidatePath('/panel/opinie')
  revalidatePath('/')
  return result
}

export async function deleteOpinia(id: string) {
  const payload = await getPayload({ config })
  await payload.delete({
    collection: 'opinie',
    id,
  })
  revalidatePath('/panel/opinie')
  revalidatePath('/')
}

// ============ FAQ ============

export async function getFAQ() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'faq',
    limit: 100,
    sort: 'order',
  })
  return result.docs
}

export async function getFAQById(id: string) {
  const payload = await getPayload({ config })
  const result = await payload.findByID({
    collection: 'faq',
    id,
  })
  return result
}

export async function createFAQ(data: any) {
  const payload = await getPayload({ config })
  const result = await payload.create({
    collection: 'faq',
    data,
  })
  revalidatePath('/panel/faq')
  revalidatePath('/faq')
  return result
}

export async function updateFAQ(id: string, data: any) {
  const payload = await getPayload({ config })
  const result = await payload.update({
    collection: 'faq',
    id,
    data,
  })
  revalidatePath('/panel/faq')
  revalidatePath('/faq')
  return result
}

export async function deleteFAQ(id: string) {
  const payload = await getPayload({ config })
  await payload.delete({
    collection: 'faq',
    id,
  })
  revalidatePath('/panel/faq')
  revalidatePath('/faq')
}

// ============ GLOBALS ============

export async function getHomepage() {
  const payload = await getPayload({ config })
  const result = await payload.findGlobal({
    slug: 'homepage',
  })
  return result
}

export async function updateHomepage(data: any) {
  const payload = await getPayload({ config })
  const result = await payload.updateGlobal({
    slug: 'homepage',
    data,
  })
  revalidatePath('/panel/strony/homepage')
  revalidatePath('/')
  return result
}

export async function getSettings() {
  const payload = await getPayload({ config })
  const result = await payload.findGlobal({
    slug: 'settings',
  })
  return result
}

export async function updateSettings(data: any) {
  const payload = await getPayload({ config })
  const result = await payload.updateGlobal({
    slug: 'settings',
    data,
  })
  revalidatePath('/panel/ustawienia')
  revalidatePath('/')
  return result
}
