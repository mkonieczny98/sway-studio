import type { GlobalConfig } from 'payload'

export const FAQPage: GlobalConfig = {
  slug: 'faq-page',
  label: '❓ Strona FAQ',
  admin: {
    group: 'Strony',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'heroTitle', type: 'text', label: 'Tytuł strony', defaultValue: 'Najczęściej zadawane pytania' },
    { name: 'heroSubtitle', type: 'text', label: 'Podtytuł', defaultValue: 'Znajdź odpowiedzi na swoje pytania' },
    { name: 'ctaText', type: 'text', label: 'Tekst CTA na dole', defaultValue: 'Nie znalazłaś odpowiedzi? Napisz do nas!' },
  ],
}
