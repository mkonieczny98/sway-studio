import type { GlobalConfig } from 'payload'

export const KontaktPage: GlobalConfig = {
  slug: 'kontakt-page',
  label: '📞 Strona Kontakt',
  admin: {
    group: 'Strony',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'heroTitle', type: 'text', label: 'Tytuł strony', defaultValue: 'Kontakt' },
    { name: 'heroSubtitle', type: 'text', label: 'Podtytuł', defaultValue: 'Skontaktuj się z nami' },
    { name: 'hoursText', type: 'textarea', label: 'Godziny otwarcia', defaultValue: 'Pon-Pt: 16:00-21:00\nSob: 10:00-14:00' },
  ],
}
