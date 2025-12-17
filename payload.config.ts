import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './payload/collections/Users.ts'
import { Media } from './payload/collections/Media.ts'
import { Zajecia } from './payload/collections/Zajecia.ts'
import { Karnety } from './payload/collections/Karnety.ts'
import { Opinie } from './payload/collections/Opinie.ts'
import { FAQ } from './payload/collections/FAQ.ts'

// Globals
import { Homepage } from './payload/globals/Homepage.ts'
import { Settings } from './payload/globals/Settings.ts'
import { Navigation } from './payload/globals/Navigation.ts'
import { Footer } from './payload/globals/Footer.ts'
import { ZajeciaPage } from './payload/globals/ZajeciaPage.ts'
import { CennikPage } from './payload/globals/CennikPage.ts'
import { KontaktPage } from './payload/globals/KontaktPage.ts'
import { FAQPage } from './payload/globals/FAQPage.ts'
import { RegulaminPage } from './payload/globals/RegulaminPage.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Sway Studio',
    },
  },
  collections: [Users, Media, Zajecia, Karnety, Opinie, FAQ],
  globals: [
    Homepage,
    Settings,
    Navigation,
    Footer,
    ZajeciaPage,
    CennikPage,
    KontaktPage,
    FAQPage,
    RegulaminPage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'super-secret-key-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
})
