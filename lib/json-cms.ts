// Adapter - mapuje dane z plików JSON na format oczekiwany przez komponenty
// Używa GitHub API do zapisu na produkcji (Vercel ma read-only filesystem)

import fs from 'fs/promises'
import path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// GitHub config for production writes
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_REPO = process.env.GITHUB_REPO || 'mkonieczny98/sway-studio'
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main'

// ============ FILE OPERATIONS ============

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const fullPath = path.join(CONTENT_DIR, filePath)
    const content = await fs.readFile(fullPath, 'utf-8')
    return JSON.parse(content) as T
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
    return null
  }
}

async function readDirectory(dirPath: string): Promise<string[]> {
  try {
    const fullPath = path.join(CONTENT_DIR, dirPath)
    const entries = await fs.readdir(fullPath, { withFileTypes: true })
    return entries
      .filter(e => e.isFile() && e.name.endsWith('.json'))
      .map(e => e.name)
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error)
    return []
  }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<boolean> {
  const content = JSON.stringify(data, null, 2)
  
  // On production (Vercel), use GitHub API
  if (process.env.VERCEL && GITHUB_TOKEN) {
    return writeViaGitHub(filePath, content)
  }
  
  // Local development - write directly
  try {
    const fullPath = path.join(CONTENT_DIR, filePath)
    await fs.writeFile(fullPath, content, 'utf-8')
    return true
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error)
    return false
  }
}

async function deleteFile(filePath: string): Promise<boolean> {
  // On production (Vercel), use GitHub API
  if (process.env.VERCEL && GITHUB_TOKEN) {
    return deleteViaGitHub(filePath)
  }
  
  // Local development - delete directly
  try {
    const fullPath = path.join(CONTENT_DIR, filePath)
    await fs.unlink(fullPath)
    return true
  } catch (error) {
    console.error(`Error deleting ${filePath}:`, error)
    return false
  }
}

// ============ GITHUB API ============

async function getFileSha(filePath: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/content/${filePath}?ref=${GITHUB_BRANCH}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )
    if (response.ok) {
      const data = await response.json()
      return data.sha
    }
    return null
  } catch {
    return null
  }
}

async function writeViaGitHub(filePath: string, content: string): Promise<boolean> {
  try {
    const sha = await getFileSha(filePath)
    
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/content/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Update ${filePath} via CMS`,
          content: Buffer.from(content).toString('base64'),
          branch: GITHUB_BRANCH,
          ...(sha && { sha }),
        }),
      }
    )
    
    if (!response.ok) {
      const error = await response.text()
      console.error('GitHub API error:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Error writing via GitHub:', error)
    return false
  }
}

async function deleteViaGitHub(filePath: string): Promise<boolean> {
  try {
    const sha = await getFileSha(filePath)
    if (!sha) return false
    
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/content/${filePath}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Delete ${filePath} via CMS`,
          sha,
          branch: GITHUB_BRANCH,
        }),
      }
    )
    
    return response.ok
  } catch (error) {
    console.error('Error deleting via GitHub:', error)
    return false
  }
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[ąàáâãäå]/g, 'a')
    .replace(/[ćç]/g, 'c')
    .replace(/[ęèéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[łl]/g, 'l')
    .replace(/[ńñ]/g, 'n')
    .replace(/[óòôõö]/g, 'o')
    .replace(/[śş]/g, 's')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ýÿ]/g, 'y')
    .replace(/[źżž]/g, 'z')
    .replace(/[^a-z0-9-]/g, '')
}

// ============ ZAJECIA ============

export interface Zajecia {
  id: string
  title: string
  slug: string
  shortDesc?: string
  fullDesc?: string
  image?: string
  imageOrientation?: string
  maxPeople?: string
  duration?: string
  requirements?: string
  features?: { feature: string }[]
  showOnHome?: boolean
  order?: number
  icon?: string
}

export async function getAllZajecia(): Promise<Zajecia[]> {
  const files = await readDirectory('zajecia')
  const items: Zajecia[] = []
  
  for (const file of files) {
    const data = await readJsonFile<Omit<Zajecia, 'id'>>(`zajecia/${file}`)
    if (data) {
      items.push({
        ...data,
        id: file.replace('.json', ''),
      })
    }
  }
  
  return items.sort((a, b) => (a.order || 0) - (b.order || 0))
}

export async function getZajeciaById(id: string): Promise<Zajecia | null> {
  const data = await readJsonFile<Omit<Zajecia, 'id'>>(`zajecia/${id}.json`)
  if (!data) return null
  return { ...data, id }
}

export async function getZajeciaBySlug(slug: string): Promise<Zajecia | null> {
  const all = await getAllZajecia()
  return all.find(z => z.slug === slug) || null
}

export async function createZajecia(data: Omit<Zajecia, 'id'>): Promise<Zajecia> {
  const slug = data.slug || generateSlug(data.title)
  const id = slug
  const zajecia = { ...data, slug }
  await writeJsonFile(`zajecia/${id}.json`, zajecia)
  return { ...zajecia, id }
}

export async function updateZajecia(id: string, data: Partial<Zajecia>): Promise<Zajecia | null> {
  const existing = await getZajeciaById(id)
  if (!existing) return null
  
  const updated = { ...existing, ...data }
  const { id: _, ...dataToSave } = updated
  await writeJsonFile(`zajecia/${id}.json`, dataToSave)
  return updated
}

export async function deleteZajecia(id: string): Promise<boolean> {
  return deleteFile(`zajecia/${id}.json`)
}

// ============ KARNETY ============

export interface Karnet {
  id: string
  name: string
  subtitle?: string
  price: string
  priceNote?: string
  features?: { feature: string }[]
  isPopular?: boolean
  order?: number
}

export async function getAllKarnety(): Promise<Karnet[]> {
  const files = await readDirectory('karnety')
  const items: Karnet[] = []
  
  for (const file of files) {
    const data = await readJsonFile<Omit<Karnet, 'id'>>(`karnety/${file}`)
    if (data) {
      items.push({
        ...data,
        id: file.replace('.json', ''),
      })
    }
  }
  
  return items.sort((a, b) => (a.order || 0) - (b.order || 0))
}

export async function getKarnetById(id: string): Promise<Karnet | null> {
  const data = await readJsonFile<Omit<Karnet, 'id'>>(`karnety/${id}.json`)
  if (!data) return null
  return { ...data, id }
}

export async function createKarnet(data: Omit<Karnet, 'id'>): Promise<Karnet> {
  const id = generateSlug(data.name)
  await writeJsonFile(`karnety/${id}.json`, data)
  return { ...data, id }
}

export async function updateKarnet(id: string, data: Partial<Karnet>): Promise<Karnet | null> {
  const existing = await getKarnetById(id)
  if (!existing) return null
  
  const updated = { ...existing, ...data }
  const { id: _, ...dataToSave } = updated
  await writeJsonFile(`karnety/${id}.json`, dataToSave)
  return updated
}

export async function deleteKarnet(id: string): Promise<boolean> {
  return deleteFile(`karnety/${id}.json`)
}

// ============ OPINIE ============

export interface Opinia {
  id: string
  author: string
  content?: string
  text?: string
  rating?: number
}

export async function getAllOpinie(): Promise<Opinia[]> {
  const files = await readDirectory('opinie')
  const items: Opinia[] = []
  
  for (const file of files) {
    const data = await readJsonFile<Omit<Opinia, 'id'>>(`opinie/${file}`)
    if (data) {
      items.push({
        ...data,
        id: file.replace('.json', ''),
      })
    }
  }
  
  return items
}

export async function getOpiniaById(id: string): Promise<Opinia | null> {
  const data = await readJsonFile<Omit<Opinia, 'id'>>(`opinie/${id}.json`)
  if (!data) return null
  return { ...data, id }
}

export async function createOpinia(data: Omit<Opinia, 'id'>): Promise<Opinia> {
  const id = generateSlug(data.author) + '-' + Date.now()
  await writeJsonFile(`opinie/${id}.json`, data)
  return { ...data, id }
}

export async function updateOpinia(id: string, data: Partial<Opinia>): Promise<Opinia | null> {
  const existing = await getOpiniaById(id)
  if (!existing) return null
  
  const updated = { ...existing, ...data }
  const { id: _, ...dataToSave } = updated
  await writeJsonFile(`opinie/${id}.json`, dataToSave)
  return updated
}

export async function deleteOpinia(id: string): Promise<boolean> {
  return deleteFile(`opinie/${id}.json`)
}

// ============ FAQ ============

export interface FAQ {
  id: string
  question: string
  answer: string
  order?: number
}

export async function getAllFAQ(): Promise<FAQ[]> {
  const files = await readDirectory('faq')
  const items: FAQ[] = []
  
  for (const file of files) {
    const data = await readJsonFile<Omit<FAQ, 'id'>>(`faq/${file}`)
    if (data) {
      items.push({
        ...data,
        id: file.replace('.json', ''),
      })
    }
  }
  
  return items.sort((a, b) => (a.order || 0) - (b.order || 0))
}

export async function getFAQById(id: string): Promise<FAQ | null> {
  const data = await readJsonFile<Omit<FAQ, 'id'>>(`faq/${id}.json`)
  if (!data) return null
  return { ...data, id }
}

export async function createFAQ(data: Omit<FAQ, 'id'>): Promise<FAQ> {
  const id = generateSlug(data.question.slice(0, 50))
  await writeJsonFile(`faq/${id}.json`, data)
  return { ...data, id }
}

export async function updateFAQ(id: string, data: Partial<FAQ>): Promise<FAQ | null> {
  const existing = await getFAQById(id)
  if (!existing) return null
  
  const updated = { ...existing, ...data }
  const { id: _, ...dataToSave } = updated
  await writeJsonFile(`faq/${id}.json`, dataToSave)
  return updated
}

export async function deleteFAQ(id: string): Promise<boolean> {
  return deleteFile(`faq/${id}.json`)
}

// ============ GLOBALS ============

export interface Settings {
  siteName?: string
  email?: string
  phone?: string
  address?: string
  facebook?: string
  instagram?: string
  fitssey?: string
  colors?: {
    primary?: string
    secondary?: string
    primaryLight?: string
  }
}

export async function getSettings(): Promise<Settings> {
  const data = await readJsonFile<Settings>('settings.json')
  return data || {
    siteName: 'Sway Pole Dance Studio',
    colors: {
      primary: '#7d8c6e',
      secondary: '#f5f0e8',
      primaryLight: '#9aab8a',
    }
  }
}

export async function updateSettings(data: Partial<Settings>): Promise<Settings | null> {
  const existing = await getSettings()
  const updated = { ...existing, ...data }
  await writeJsonFile('settings.json', updated)
  return updated
}

export interface Homepage {
  heroSection?: {
    title?: string
    highlight?: string
    subtitle?: string
    description?: string
    buttonText?: string
    heroImage?: string
  }
  aboutSection?: {
    title?: string
    text?: string
    feature1?: string
    feature2?: string
    feature3?: string
    image1?: string
    image2?: string
  }
  promoSection?: {
    title?: string
    price?: string
    description?: string
    buttonText?: string
  }
  voucherSection?: {
    title?: string
    text?: string
    buttonText?: string
    image?: string
  }
  locationSection?: {
    title?: string
    address?: string
    parking?: string
    transport?: string
  }
}

export async function getHomepage(): Promise<Homepage> {
  const data = await readJsonFile<Homepage>('homepage.json')
  return data || {}
}

export async function updateHomepage(data: Partial<Homepage>): Promise<Homepage | null> {
  const existing = await getHomepage()
  const updated = { ...existing, ...data }
  await writeJsonFile('homepage.json', updated)
  return updated
}

export interface Navigation {
  items?: { label: string; href: string; order?: number }[]
}

export async function getNavigation(): Promise<Navigation> {
  const data = await readJsonFile<Navigation>('navigation.json')
  return data || { items: [] }
}

export async function updateNavigation(data: Navigation): Promise<Navigation | null> {
  await writeJsonFile('navigation.json', data)
  return data
}

export interface Footer {
  description?: string
  socialLinks?: { platform: string; url: string }[]
  copyright?: string
}

export async function getFooter(): Promise<Footer> {
  const data = await readJsonFile<Footer>('footer.json')
  return data || {}
}

export async function updateFooter(data: Partial<Footer>): Promise<Footer | null> {
  const existing = await getFooter()
  const updated = { ...existing, ...data }
  await writeJsonFile('footer.json', updated)
  return updated
}

// ============ PAGE DATA ============

export interface ZajeciaPage {
  title?: string
  subtitle?: string
  description?: string
}

export async function getZajeciaPage(): Promise<ZajeciaPage> {
  const data = await readJsonFile<ZajeciaPage>('zajecia-page.json')
  return data || {}
}

export interface CennikPage {
  title?: string
  subtitle?: string
  description?: string
  notes?: string
}

export async function getCennikPage(): Promise<CennikPage> {
  const data = await readJsonFile<CennikPage>('cennik-page.json')
  return data || {}
}

export interface KontaktPage {
  title?: string
  subtitle?: string
  description?: string
}

export async function getKontaktPage(): Promise<KontaktPage> {
  const data = await readJsonFile<KontaktPage>('kontakt-page.json')
  return data || {}
}

export interface FAQPage {
  title?: string
  subtitle?: string
  description?: string
}

export async function getFAQPage(): Promise<FAQPage> {
  const data = await readJsonFile<FAQPage>('faq-page.json')
  return data || {}
}

export interface RegulaminPage {
  title?: string
  content?: string
}

export async function getRegulaminPage(): Promise<RegulaminPage> {
  const data = await readJsonFile<RegulaminPage>('regulamin-page.json')
  return data || {}
}
