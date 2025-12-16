import type { GlobalConfig } from 'payload'

export const ZajeciaPage: GlobalConfig = {
  slug: 'zajecia-page',
  label: '💃 Strona Zajęcia',
  admin: {
    group: 'Strony',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'heroTitle', type: 'text', label: 'Tytuł strony', defaultValue: 'Nasza oferta' },
    { name: 'heroSubtitle', type: 'text', label: 'Podtytuł', defaultValue: 'Poznaj wszystkie rodzaje zajęć' },
    { name: 'groupClassesTitle', type: 'text', label: 'Tytuł sekcji zajęć grupowych', defaultValue: 'Zajęcia grupowe' },
    { name: 'additionalTitle', type: 'text', label: 'Tytuł sekcji dodatkowej oferty', defaultValue: 'Pozostała oferta' },
  ],
}
