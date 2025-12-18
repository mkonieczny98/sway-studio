'use server'

import { revalidatePath } from 'next/cache'
import * as content from '@/lib/content'

// ============ ZAJECIA ============

export async function getZajecia() {
  return content.getAllZajecia()
}

export async function getZajeciaById(id: string) {
  return content.getZajeciaById(id)
}

export async function createZajecia(data: any) {
  const result = await content.createZajecia(data)
  revalidatePath('/panel/zajecia')
  revalidatePath('/zajecia')
  return result
}

export async function updateZajecia(id: string, data: any) {
  const result = await content.updateZajecia(id, data)
  revalidatePath('/panel/zajecia')
  revalidatePath('/zajecia')
  return result
}

export async function deleteZajecia(id: string) {
  await content.deleteZajecia(id)
  revalidatePath('/panel/zajecia')
  revalidatePath('/zajecia')
}

// ============ KARNETY ============

export async function getKarnety() {
  return content.getAllKarnety()
}

export async function getKarnetById(id: string) {
  return content.getKarnetById(id)
}

export async function createKarnet(data: any) {
  const result = await content.createKarnet(data)
  revalidatePath('/panel/karnety')
  revalidatePath('/cennik')
  return result
}

export async function updateKarnet(id: string, data: any) {
  const result = await content.updateKarnet(id, data)
  revalidatePath('/panel/karnety')
  revalidatePath('/cennik')
  return result
}

export async function deleteKarnet(id: string) {
  await content.deleteKarnet(id)
  revalidatePath('/panel/karnety')
  revalidatePath('/cennik')
}

// ============ OPINIE ============

export async function getOpinie() {
  return content.getAllOpinie()
}

export async function getOpiniaById(id: string) {
  return content.getOpiniaById(id)
}

export async function createOpinia(data: any) {
  const result = await content.createOpinia(data)
  revalidatePath('/panel/opinie')
  revalidatePath('/')
  return result
}

export async function updateOpinia(id: string, data: any) {
  const result = await content.updateOpinia(id, data)
  revalidatePath('/panel/opinie')
  revalidatePath('/')
  return result
}

export async function deleteOpinia(id: string) {
  await content.deleteOpinia(id)
  revalidatePath('/panel/opinie')
  revalidatePath('/')
}

// ============ FAQ ============

export async function getFAQ() {
  return content.getAllFAQ()
}

export async function getFAQById(id: string) {
  return content.getFAQById(id)
}

export async function createFAQ(data: any) {
  const result = await content.createFAQ(data)
  revalidatePath('/panel/faq')
  revalidatePath('/faq')
  return result
}

export async function updateFAQ(id: string, data: any) {
  const result = await content.updateFAQ(id, data)
  revalidatePath('/panel/faq')
  revalidatePath('/faq')
  return result
}

export async function deleteFAQ(id: string) {
  await content.deleteFAQ(id)
  revalidatePath('/panel/faq')
  revalidatePath('/faq')
}

// ============ GLOBALS ============

export async function getHomepage() {
  return content.getHomepage()
}

export async function updateHomepage(data: any) {
  const result = await content.updateHomepage(data)
  revalidatePath('/panel/strony/homepage')
  revalidatePath('/')
  return result
}

export async function getSettings() {
  return content.getSettings()
}

export async function updateSettings(data: any) {
  const result = await content.updateSettings(data)
  revalidatePath('/panel/ustawienia')
  revalidatePath('/')
  return result
}
