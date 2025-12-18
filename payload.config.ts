import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { pl } from '@payloadcms/translations/languages/pl'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Zajecia } from './payload/collections/Zajecia'
import { Karnety } from './payload/collections/Karnety'
import { Opinie } from './payload/collections/Opinie'
import { FAQ } from './payload/collections/FAQ'

// Globals
import { Homepage } from './payload/globals/Homepage'
import { Settings } from './payload/globals/Settings'
import { Navigation } from './payload/globals/Navigation'
import { Footer } from './payload/globals/Footer'
import { ZajeciaPage } from './payload/globals/ZajeciaPage'
import { CennikPage } from './payload/globals/CennikPage'
import { KontaktPage } from './payload/globals/KontaktPage'
import { FAQPage } from './payload/globals/FAQPage'
import { RegulaminPage } from './payload/globals/RegulaminPage'
import { PayloadLogo } from './components/PayloadLogo'
import { PayloadIcon } from './components/PayloadIcon'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Sway Studio',
    },
    components: {
      graphics: {
        Logo: PayloadLogo,
        Icon: PayloadIcon,
      },
    },
  },
  i18n: {
    supportedLanguages: { pl },
    fallbackLanguage: 'pl',
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
