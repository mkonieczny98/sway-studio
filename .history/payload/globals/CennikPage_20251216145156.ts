import type { GlobalConfig } from 'payload'

export const CennikPage: GlobalConfig = {
  slug: 'cennik-page',
  label: '💰 Strona Cennik',
  admin: {
    group: 'Strony',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'heroTitle', type: 'text', label: 'Tytuł strony', defaultValue: 'Cennik' },
    { name: 'heroSubtitle', type: 'text', label: 'Podtytuł', defaultValue: 'Wszystkie karnety ważne są 30 dni od daty pierwszych zajęć' },
    
    // Kategorie cenowe
    {
      name: 'categories',
      type: 'array',
      label: '📋 Kategorie cenowe',
      fields: [
        { name: 'name', type: 'text', label: 'Nazwa kategorii' },
        {
          name: 'items',
          type: 'array',
          label: 'Pozycje cenowe',
          fields: [
            { name: 'name', type: 'text', label: 'Nazwa usługi' },
            { name: 'price', type: 'text', label: 'Cena' },
          ],
        },
      ],
    },

    // Dane do przelewu
    {
      name: 'bankSection',
      type: 'group',
      label: '🏦 Dane do przelewu',
      fields: [
        { name: 'bankName', type: 'text', label: 'Nazwa banku', defaultValue: 'Mbank' },
        { name: 'accountNumber', type: 'text', label: 'Numer konta', defaultValue: '56 1140 2004 0000 3702 8505 7568' },
        { name: 'recipient', type: 'text', label: 'Odbiorca', defaultValue: 'Sway Pole Dance Studio Joanna Olejniczak' },
        { name: 'titleInfo', type: 'text', label: 'Info o tytule przelewu', defaultValue: 'Imię i nazwisko + rodzaj karnetu' },
      ],
    },

    // Uwagi
    {
      name: 'notes',
      type: 'richText',
      label: '⚠️ Uwagi na dole strony',
    },
  ],
}
