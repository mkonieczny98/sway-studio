import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: '🧭 Menu nawigacji',
  admin: {
    group: 'Ustawienia',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'menuItems',
      type: 'array',
      label: 'Pozycje w menu',
      fields: [
        { name: 'label', type: 'text', label: 'Nazwa', required: true },
        { name: 'href', type: 'text', label: 'Link (np. /zajecia)', required: true },
      ],
    },
    { name: 'ctaButtonText', type: 'text', label: 'Tekst przycisku "Zapisz się"', defaultValue: 'Zapisz się' },
  ],
}
