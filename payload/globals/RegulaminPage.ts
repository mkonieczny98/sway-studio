import type { GlobalConfig } from 'payload'

export const RegulaminPage: GlobalConfig = {
  slug: 'regulamin-page',
  label: '📜 Strona Regulamin',
  admin: {
    group: 'Strony',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'heroTitle', type: 'text', label: 'Tytuł strony', defaultValue: 'Regulamin' },
    { name: 'heroSubtitle', type: 'text', label: 'Podtytuł', defaultValue: 'Zasady korzystania z usług studia' },
    {
      name: 'content',
      type: 'richText',
      label: 'Treść regulaminu',
    },
  ],
}
