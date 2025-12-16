import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: '🦶 Stopka',
  admin: {
    group: 'Ustawienia',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'description', type: 'textarea', label: 'Krótki opis studia' },
    { name: 'copyright', type: 'text', label: 'Tekst copyright', defaultValue: '© 2024 Sway Pole Dance Studio' },
  ],
}
