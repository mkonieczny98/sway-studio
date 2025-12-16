import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: '🏠 Strona główna',
  admin: {
    group: 'Strony',
  },
  access: {
    read: () => true,
  },
  fields: [
    // ========== HERO SECTION ==========
    {
      name: 'heroSection',
      type: 'group',
      label: '🎬 Sekcja Hero (góra strony)',
      fields: [
        { name: 'title', type: 'text', label: 'Tytuł (przed złotym słowem)', defaultValue: 'Naucz się' },
        { name: 'highlight', type: 'text', label: 'Złote słowo', defaultValue: 'latać' },
        { name: 'subtitle', type: 'text', label: 'Podtytuł', defaultValue: 'Pole Dance Studio w Poznaniu' },
        { name: 'description', type: 'textarea', label: 'Opis' },
        { name: 'buttonText', type: 'text', label: 'Tekst przycisku', defaultValue: 'Zapisz się na zajęcia' },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: '🖼️ Zdjęcie tła Hero',
        },
        {
          name: 'colors',
          type: 'group',
          label: '🎨 Kolory sekcji Hero',
          fields: [
            { name: 'titleColor', type: 'text', label: 'Kolor tytułu', defaultValue: '#ffffff' },
            { name: 'highlightColor', type: 'text', label: 'Kolor wyróżnionego słowa', defaultValue: '#7d8c6e' },
            { name: 'subtitleColor', type: 'text', label: 'Kolor podtytułu', defaultValue: '#7d8c6e' },
            { name: 'descColor', type: 'text', label: 'Kolor opisu', defaultValue: '#e8e2d9' },
          ],
        },
      ],
    },

    // ========== ABOUT SECTION ==========
    {
      name: 'aboutSection',
      type: 'group',
      label: '📖 Sekcja O nas',
      fields: [
        { name: 'title', type: 'text', label: 'Tytuł', defaultValue: 'Witaj w Sway!' },
        { name: 'text', type: 'textarea', label: 'Tekst główny' },
        { name: 'feature1', type: 'text', label: 'Cecha 1', defaultValue: 'Profesjonalna kadra' },
        { name: 'feature2', type: 'text', label: 'Cecha 2', defaultValue: 'Małe grupy' },
        { name: 'feature3', type: 'text', label: 'Cecha 3', defaultValue: 'Przyjazna atmosfera' },
        { name: 'image1', type: 'upload', relationTo: 'media', label: '🖼️ Zdjęcie główne (duże)' },
        { name: 'image2', type: 'upload', relationTo: 'media', label: '🖼️ Zdjęcie drugie (mniejsze)' },
        {
          name: 'colors',
          type: 'group',
          label: '🎨 Kolory sekcji O nas',
          fields: [
            { name: 'bgColor', type: 'text', label: 'Kolor tła sekcji', defaultValue: '#fdfbf7' },
            { name: 'titleColor', type: 'text', label: 'Kolor tytułu', defaultValue: '#3d3329' },
            { name: 'textColor', type: 'text', label: 'Kolor tekstu', defaultValue: '#5c5145' },
            { name: 'featureIconColor', type: 'text', label: 'Kolor ikon cech', defaultValue: '#7d8c6e' },
            { name: 'featureTextColor', type: 'text', label: 'Kolor tekstu cech', defaultValue: '#3d3329' },
          ],
        },
      ],
    },

    // ========== PROMO SECTION ==========
    {
      name: 'promoSection',
      type: 'group',
      label: '🎁 Sekcja Promocja (35 zł)',
      fields: [
        { name: 'title', type: 'text', label: 'Tytuł', defaultValue: 'Pierwsze zajęcia' },
        { name: 'price', type: 'text', label: 'Cena', defaultValue: '35 zł' },
        { name: 'description', type: 'textarea', label: 'Opis' },
        { name: 'buttonText', type: 'text', label: 'Tekst przycisku', defaultValue: 'Zarezerwuj termin' },
        {
          name: 'colors',
          type: 'group',
          label: '🎨 Kolory sekcji Promo',
          fields: [
            { name: 'bgColor', type: 'text', label: 'Kolor tła karty', defaultValue: '#f5f0e8' },
            { name: 'labelColor', type: 'text', label: 'Kolor etykiety', defaultValue: '#7d8c6e' },
            { name: 'titleColor', type: 'text', label: 'Kolor tytułu', defaultValue: '#3d3329' },
            { name: 'priceColor', type: 'text', label: 'Kolor ceny', defaultValue: '#7d8c6e' },
            { name: 'textColor', type: 'text', label: 'Kolor opisu', defaultValue: '#5c5145' },
            { name: 'buttonBg', type: 'text', label: 'Kolor tła przycisku', defaultValue: '#7d8c6e' },
            { name: 'buttonText', type: 'text', label: 'Kolor tekstu przycisku', defaultValue: '#ffffff' },
          ],
        },
      ],
    },

    // ========== VOUCHER SECTION ==========
    {
      name: 'voucherSection',
      type: 'group',
      label: '🎀 Sekcja Voucher',
      fields: [
        { name: 'title', type: 'text', label: 'Tytuł', defaultValue: 'Podaruj wyjątkowy prezent' },
        { name: 'text', type: 'textarea', label: 'Opis' },
        { name: 'buttonText', type: 'text', label: 'Tekst przycisku', defaultValue: 'Kup voucher' },
        { name: 'image', type: 'upload', relationTo: 'media', label: '🖼️ Zdjęcie vouchera' },
        {
          name: 'colors',
          type: 'group',
          label: '🎨 Kolory sekcji Voucher',
          fields: [
            { name: 'bgColor', type: 'text', label: 'Kolor tła karty', defaultValue: '#f5f0e8' },
            { name: 'titleColor', type: 'text', label: 'Kolor tytułu', defaultValue: '#3d3329' },
            { name: 'textColor', type: 'text', label: 'Kolor tekstu', defaultValue: '#5c5145' },
            { name: 'buttonBg', type: 'text', label: 'Kolor tła przycisku', defaultValue: '#7d8c6e' },
            { name: 'buttonText', type: 'text', label: 'Kolor tekstu przycisku', defaultValue: '#ffffff' },
          ],
        },
      ],
    },

    // ========== LOCATION SECTION ==========
    {
      name: 'locationSection',
      type: 'group',
      label: '📍 Sekcja Lokalizacja',
      fields: [
        { name: 'title', type: 'text', label: 'Tytuł', defaultValue: 'Gdzie nas znajdziesz' },
        { name: 'address', type: 'text', label: 'Adres', defaultValue: 'ul. Jesionowa 18/1, 61-429 Poznań' },
        { name: 'parking', type: 'text', label: 'Info o parkingu', defaultValue: 'Duży parking na terenie studia' },
        { name: 'transport', type: 'textarea', label: 'Komunikacja' },
        {
          name: 'colors',
          type: 'group',
          label: '🎨 Kolory sekcji Lokalizacja',
          fields: [
            { name: 'bgColor', type: 'text', label: 'Kolor tła sekcji', defaultValue: '#fdfbf7' },
            { name: 'titleColor', type: 'text', label: 'Kolor tytułu', defaultValue: '#3d3329' },
            { name: 'textColor', type: 'text', label: 'Kolor tekstu', defaultValue: '#5c5145' },
            { name: 'iconColor', type: 'text', label: 'Kolor ikon', defaultValue: '#7d8c6e' },
          ],
        },
      ],
    },

    // ========== CTA SECTION ==========
    {
      name: 'ctaSection',
      type: 'group',
      label: '🚀 Sekcja CTA (dół strony)',
      fields: [
        { name: 'title', type: 'text', label: 'Tytuł', defaultValue: 'Gotowa na nowe wyzwanie?' },
        { name: 'text', type: 'text', label: 'Opis', defaultValue: 'Dołącz do nas i odkryj pole dance!' },
        { name: 'buttonText', type: 'text', label: 'Tekst przycisku', defaultValue: 'Zapisz się teraz' },
        {
          name: 'colors',
          type: 'group',
          label: '🎨 Kolory sekcji CTA',
          fields: [
            { name: 'bgColor', type: 'text', label: 'Kolor tła sekcji', defaultValue: '#7d8c6e' },
            { name: 'titleColor', type: 'text', label: 'Kolor tytułu', defaultValue: '#ffffff' },
            { name: 'textColor', type: 'text', label: 'Kolor tekstu', defaultValue: '#e8e2d9' },
            { name: 'buttonBg', type: 'text', label: 'Kolor tła przycisku', defaultValue: '#ffffff' },
            { name: 'buttonText', type: 'text', label: 'Kolor tekstu przycisku', defaultValue: '#7d8c6e' },
          ],
        },
      ],
    },

    // ========== KOLORY KART ZAJĘĆ ==========
    {
      name: 'classCardsColors',
      type: 'group',
      label: '🎨 Kolory kart zajęć',
      fields: [
        { name: 'cardBg', type: 'text', label: 'Kolor tła karty', defaultValue: '#ffffff' },
        { name: 'cardBorder', type: 'text', label: 'Kolor obramowania karty', defaultValue: '#e8e2d9' },
        { name: 'cardHoverBorder', type: 'text', label: 'Kolor obramowania przy hover', defaultValue: '#7d8c6e' },
        { name: 'iconColor', type: 'text', label: 'Kolor ikony', defaultValue: '#7d8c6e' },
        { name: 'titleColor', type: 'text', label: 'Kolor tytułu', defaultValue: '#3d3329' },
        { name: 'descColor', type: 'text', label: 'Kolor opisu', defaultValue: '#8a7f72' },
        { name: 'linkColor', type: 'text', label: 'Kolor linku', defaultValue: '#7d8c6e' },
      ],
    },

    // ========== KOLORY KARNETÓW ==========
    {
      name: 'pricingCardsColors',
      type: 'group',
      label: '🎨 Kolory kart cennikowych',
      fields: [
        { name: 'cardBg', type: 'text', label: 'Kolor tła karty', defaultValue: '#ffffff' },
        { name: 'cardBorder', type: 'text', label: 'Kolor obramowania', defaultValue: '#e8e2d9' },
        { name: 'featuredBg', type: 'text', label: 'Kolor tła karty wyróżnionej', defaultValue: '#7d8c6e' },
        { name: 'featuredText', type: 'text', label: 'Kolor tekstu karty wyróżnionej', defaultValue: '#ffffff' },
        { name: 'badgeColor', type: 'text', label: 'Kolor badge "Popularny"', defaultValue: '#7d8c6e' },
        { name: 'titleColor', type: 'text', label: 'Kolor tytułu', defaultValue: '#3d3329' },
        { name: 'subtitleColor', type: 'text', label: 'Kolor podtytułu', defaultValue: '#8a7f72' },
        { name: 'priceColor', type: 'text', label: 'Kolor ceny', defaultValue: '#7d8c6e' },
        { name: 'featuresColor', type: 'text', label: 'Kolor listy cech', defaultValue: '#5c5145' },
      ],
    },

    // ========== KOLORY OPINII ==========
    {
      name: 'testimonialsColors',
      type: 'group',
      label: '🎨 Kolory sekcji opinii',
      fields: [
        { name: 'cardBg', type: 'text', label: 'Kolor tła karty', defaultValue: '#f5f0e8' },
        { name: 'starsColor', type: 'text', label: 'Kolor gwiazdek', defaultValue: '#7d8c6e' },
        { name: 'textColor', type: 'text', label: 'Kolor tekstu opinii', defaultValue: '#3d3329' },
        { name: 'authorColor', type: 'text', label: 'Kolor imienia autora', defaultValue: '#3d3329' },
        { name: 'sourceColor', type: 'text', label: 'Kolor źródła', defaultValue: '#8a7f72' },
      ],
    },
  ],
}
