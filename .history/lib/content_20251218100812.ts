import fs from 'fs/promises'
import path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// ============ GENERIC HELPERS ============

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

async function writeJsonFile<T>(filePath: string, data: T): Promise<boolean> {
  try {
    const fullPath = path.join(CONTENT_DIR, filePath)
    await fs.writeFile(fullPath, JSON.stringify(data, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error)
    return false
  }
}

async function readDirectory(dirPath: string): Promise<string[]> {
  try {
    const fullPath = path.join(CONTENT_DIR, dirPath)
    const files = await fs.readdir(fullPath)
    return files.filter(f => f.endsWith('.json'))
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error)
    return []
  }
}

async function deleteJsonFile(filePath: string): Promise<boolean> {
  try {
    const fullPath = path.join(CONTENT_DIR, filePath)
    await fs.unlink(fullPath)
    return true
  } catch (error) {
    console.error(`Error deleting ${filePath}:`, error)
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
  delete (updated as any).id // Don't save id in file
  await writeJsonFile(`zajecia/${id}.json`, updated)
  return { ...updated, id }
}

export async function deleteZajecia(id: string): Promise<boolean> {
  return deleteJsonFile(`zajecia/${id}.json`)
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
  delete (updated as any).id
  await writeJsonFile(`karnety/${id}.json`, updated)
  return { ...updated, id }
}

export async function deleteKarnet(id: string): Promise<boolean> {
  return deleteJsonFile(`karnety/${id}.json`)
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
  delete (updated as any).id
  await writeJsonFile(`opinie/${id}.json`, updated)
  return { ...updated, id }
}

export async function deleteOpinia(id: string): Promise<boolean> {
  return deleteJsonFile(`opinie/${id}.json`)
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
  delete (updated as any).id
  await writeJsonFile(`faq/${id}.json`, updated)
  return { ...updated, id }
}

export async function deleteFAQ(id: string): Promise<boolean> {
  return deleteJsonFile(`faq/${id}.json`)
}

// ============ GLOBALS ============

export interface Homepage {
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: string
  aboutTitle?: string
  aboutSubtitle?: string
  aboutDescription?: string
  aboutImage?: string
  classesTitle?: string
  classesSubtitle?: string
  testimonialsTitle?: string
  testimonialsSubtitle?: string
  ctaTitle?: string
  ctaSubtitle?: string
  ctaButtonText?: string
  ctaButtonUrl?: string
}

export async function getHomepage(): Promise<Homepage | null> {
  return readJsonFile<Homepage>('homepage.json')
}

export async function updateHomepage(data: Partial<Homepage>): Promise<Homepage | null> {
  const existing = await getHomepage()
  const updated = { ...existing, ...data }
  await writeJsonFile('homepage.json', updated)
  return updated
}

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

export async function getSettings(): Promise<Settings | null> {
  return readJsonFile<Settings>('settings.json')
}

export async function updateSettings(data: Partial<Settings>): Promise<Settings | null> {
  const existing = await getSettings()
  const updated = { ...existing, ...data }
  await writeJsonFile('settings.json', updated)
  return updated
}

export interface Navigation {
  items?: { label: string; href: string; order?: number }[]
}

export async function getNavigation(): Promise<Navigation | null> {
  return readJsonFile<Navigation>('navigation.json')
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

export async function getFooter(): Promise<Footer | null> {
  return readJsonFile<Footer>('footer.json')
}

export async function updateFooter(data: Partial<Footer>): Promise<Footer | null> {
  const existing = await getFooter()
  const updated = { ...existing, ...data }
  await writeJsonFile('footer.json', updated)
  return updated
}
