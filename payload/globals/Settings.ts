import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: '⚙️ Ustawienia strony',
  admin: {
    group: 'Ustawienia',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'siteName', type: 'text', label: 'Nazwa studia', defaultValue: 'Sway Pole Dance Studio' },
    { name: 'email', type: 'text', label: 'Email', defaultValue: 'studiopoledance.sway@gmail.com' },
    { name: 'phone', type: 'text', label: 'Telefon' },
    { name: 'address', type: 'text', label: 'Adres', defaultValue: 'ul. Jesionowa 18/1, 61-429 Poznań' },
    { name: 'nip', type: 'text', label: 'NIP', defaultValue: '7812027493' },
    { name: 'companyName', type: 'text', label: 'Pełna nazwa firmy', defaultValue: 'Sway Pole Dance Studio Joanna Olejniczak' },
    { name: 'fitssey', type: 'text', label: 'Link do systemu rezerwacji FITSSEY' },
    { name: 'facebook', type: 'text', label: 'Facebook' },
    { name: 'instagram', type: 'text', label: 'Instagram' },
    
    // ========== KOLORY GLOBALNE ==========
    {
      name: 'colors',
      type: 'group',
      label: '🎨 Kolory globalne',
      admin: {
        description: 'Podstawowe kolory używane na całej stronie',
      },
      fields: [
        { name: 'primary', type: 'text', label: 'Kolor główny (akcent)', defaultValue: '#7d8c6e' },
        { name: 'primaryLight', type: 'text', label: 'Kolor główny jasny', defaultValue: '#9aab8a' },
        { name: 'primaryDark', type: 'text', label: 'Kolor główny ciemny', defaultValue: '#5f6b52' },
        { name: 'secondary', type: 'text', label: 'Kolor sekundowy (tło sekcji)', defaultValue: '#f5f0e8' },
        { name: 'dark', type: 'text', label: 'Kolor ciemny (tekst główny)', defaultValue: '#3d3329' },
        { name: 'light', type: 'text', label: 'Kolor jasny (tło strony)', defaultValue: '#fdfbf7' },
        { name: 'gray', type: 'text', label: 'Kolor szary', defaultValue: '#8a7f72' },
        { name: 'grayLight', type: 'text', label: 'Kolor szary jasny', defaultValue: '#e8e2d9' },
        { name: 'grayDark', type: 'text', label: 'Kolor szary ciemny', defaultValue: '#5c5145' },
      ],
    },
  ],
}
