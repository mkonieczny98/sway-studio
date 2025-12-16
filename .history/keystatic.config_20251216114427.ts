import { config, fields, collection, singleton } from '@keystatic/core';
import { colorField } from './lib/color-field';

// Na Vercel używamy GitHub storage, lokalnie - local
const isVercel = process.env.VERCEL === '1';

export default config({
  storage: isVercel
    ? {
        kind: 'github',
        repo: 'mkonieczny98/sway-studio',
      }
    : {
        kind: 'local',
      },
  ui: {
    brand: {
      name: 'Sway Studio - Panel',
    },
    navigation: {
      'Strony': ['homepage', 'zajeciaPage', 'cennikPage', 'kontaktPage', 'faqPage', 'regulaminPage'],
      'Treści': ['zajecia', 'karnety', 'opinie', 'faq'],
      'Ustawienia': ['settings', 'navigation', 'footer'],
    },
  },
  singletons: {
    // ========== STRONA GŁÓWNA ==========
    homepage: singleton({
      label: '🏠 Strona główna',
      path: 'content/homepage',
      format: { data: 'json' },
      schema: {
        heroSection: fields.object({
          title: fields.text({ label: 'Tytuł (przed złotym słowem)', defaultValue: 'Naucz się' }),
          highlight: fields.text({ label: 'Złote słowo', defaultValue: 'latać' }),
          subtitle: fields.text({ label: 'Podtytuł', defaultValue: 'Pole Dance Studio w Poznaniu' }),
          description: fields.text({ label: 'Opis', multiline: true }),
          buttonText: fields.text({ label: 'Tekst przycisku', defaultValue: 'Zapisz się na zajęcia' }),
          // Zdjęcie Hero
          heroImage: fields.image({
            label: '🖼️ Zdjęcie tła Hero',
            description: 'Główne zdjęcie w tle sekcji Hero. Zalecany rozmiar: 1920x1080px lub większe.',
            directory: 'public/images/hero',
            publicPath: '/images/hero/',
          }),
          // Kolory Hero
          colors: fields.object({
            titleColor: colorField({ label: 'Kolor tytułu', defaultValue: '#ffffff' }),
            highlightColor: colorField({ label: 'Kolor wyróżnionego słowa', defaultValue: '#7d8c6e' }),
            subtitleColor: colorField({ label: 'Kolor podtytułu', defaultValue: '#7d8c6e' }),
            descColor: colorField({ label: 'Kolor opisu', defaultValue: '#e8e2d9' }),
          }, { label: '🎨 Kolory sekcji Hero' }),
        }, { label: '🎬 Sekcja Hero (góra strony)', description: 'Główny baner na górze strony' }),

        aboutSection: fields.object({
          title: fields.text({ label: 'Tytuł', defaultValue: 'Witaj w Sway!' }),
          text: fields.text({ label: 'Tekst główny', multiline: true }),
          feature1: fields.text({ label: 'Cecha 1', defaultValue: 'Profesjonalna kadra' }),
          feature2: fields.text({ label: 'Cecha 2', defaultValue: 'Małe grupy' }),
          feature3: fields.text({ label: 'Cecha 3', defaultValue: 'Przyjazna atmosfera' }),
          // Zdjęcia
          image1: fields.image({
            label: '🖼️ Zdjęcie główne (duże)',
            description: 'Zalecany rozmiar: 800x700px',
            directory: 'public/images/about',
            publicPath: '/images/about/',
          }),
          image2: fields.image({
            label: '🖼️ Zdjęcie drugie (mniejsze)',
            description: 'Zalecany rozmiar: 700x440px',
            directory: 'public/images/about',
            publicPath: '/images/about/',
          }),
          // Kolory About
          colors: fields.object({
            bgColor: colorField({ label: 'Kolor tła sekcji', defaultValue: '#fdfbf7' }),
            titleColor: colorField({ label: 'Kolor tytułu', defaultValue: '#3d3329' }),
            textColor: colorField({ label: 'Kolor tekstu', defaultValue: '#5c5145' }),
            featureIconColor: colorField({ label: 'Kolor ikon cech', defaultValue: '#7d8c6e' }),
            featureTextColor: colorField({ label: 'Kolor tekstu cech', defaultValue: '#3d3329' }),
          }, { label: '🎨 Kolory sekcji O nas' }),
        }, { label: '📖 Sekcja O nas' }),

        promoSection: fields.object({
          title: fields.text({ label: 'Tytuł', defaultValue: 'Pierwsze zajęcia' }),
          price: fields.text({ label: 'Cena', defaultValue: '35 zł' }),
          description: fields.text({ label: 'Opis', multiline: true }),
          buttonText: fields.text({ label: 'Tekst przycisku', defaultValue: 'Zarezerwuj termin' }),
          // Kolory Promo
          colors: fields.object({
            bgColor: colorField({ label: 'Kolor tła karty', defaultValue: '#f5f0e8' }),
            labelColor: colorField({ label: 'Kolor etykiety "Oferta specjalna"', defaultValue: '#7d8c6e' }),
            titleColor: colorField({ label: 'Kolor tytułu', defaultValue: '#3d3329' }),
            priceColor: colorField({ label: 'Kolor ceny', defaultValue: '#7d8c6e' }),
            textColor: colorField({ label: 'Kolor opisu', defaultValue: '#5c5145' }),
            buttonBg: colorField({ label: 'Kolor tła przycisku', defaultValue: '#7d8c6e' }),
            buttonText: colorField({ label: 'Kolor tekstu przycisku', defaultValue: '#ffffff' }),
          }, { label: '🎨 Kolory sekcji Promo' }),
        }, { label: '🎁 Sekcja Promocja (35 zł)' }),

        voucherSection: fields.object({
          title: fields.text({ label: 'Tytuł', defaultValue: 'Podaruj wyjątkowy prezent' }),
          text: fields.text({ label: 'Opis', multiline: true }),
          buttonText: fields.text({ label: 'Tekst przycisku', defaultValue: 'Kup voucher' }),
          // Zdjęcie
          image: fields.image({
            label: '🖼️ Zdjęcie vouchera',
            description: 'Zalecany rozmiar: 1000x800px',
            directory: 'public/images/promo',
            publicPath: '/images/promo/',
          }),
          // Kolory Voucher
          colors: fields.object({
            bgColor: colorField({ label: 'Kolor tła karty', defaultValue: '#f5f0e8' }),
            titleColor: colorField({ label: 'Kolor tytułu', defaultValue: '#3d3329' }),
            textColor: colorField({ label: 'Kolor tekstu', defaultValue: '#5c5145' }),
            buttonBg: colorField({ label: 'Kolor tła przycisku', defaultValue: '#7d8c6e' }),
            buttonText: colorField({ label: 'Kolor tekstu przycisku', defaultValue: '#ffffff' }),
          }, { label: '🎨 Kolory sekcji Voucher' }),
        }, { label: '🎀 Sekcja Voucher' }),

        locationSection: fields.object({
          title: fields.text({ label: 'Tytuł', defaultValue: 'Gdzie nas znajdziesz' }),
          address: fields.text({ label: 'Adres', defaultValue: 'ul. Jesionowa 18/1, 61-429 Poznań' }),
          parking: fields.text({ label: 'Info o parkingu', defaultValue: 'Duży parking na terenie studia' }),
          transport: fields.text({ label: 'Komunikacja', multiline: true }),
          // Kolory Location
          colors: fields.object({
            bgColor: colorField({ label: 'Kolor tła sekcji', defaultValue: '#fdfbf7' }),
            titleColor: colorField({ label: 'Kolor tytułu', defaultValue: '#3d3329' }),
            textColor: colorField({ label: 'Kolor tekstu', defaultValue: '#5c5145' }),
            iconColor: colorField({ label: 'Kolor ikon', defaultValue: '#7d8c6e' }),
          }, { label: '🎨 Kolory sekcji Lokalizacja' }),
        }, { label: '📍 Sekcja Lokalizacja' }),

        ctaSection: fields.object({
          title: fields.text({ label: 'Tytuł', defaultValue: 'Gotowa na nowe wyzwanie?' }),
          text: fields.text({ label: 'Opis', defaultValue: 'Dołącz do nas i odkryj pole dance!' }),
          buttonText: fields.text({ label: 'Tekst przycisku', defaultValue: 'Zapisz się teraz' }),
          // Kolory CTA
          colors: fields.object({
            bgColor: colorField({ label: 'Kolor tła sekcji', defaultValue: '#7d8c6e' }),
            titleColor: colorField({ label: 'Kolor tytułu', defaultValue: '#ffffff' }),
            textColor: colorField({ label: 'Kolor tekstu', defaultValue: '#e8e2d9' }),
            buttonBg: colorField({ label: 'Kolor tła przycisku', defaultValue: '#ffffff' }),
            buttonText: colorField({ label: 'Kolor tekstu przycisku', defaultValue: '#7d8c6e' }),
          }, { label: '🎨 Kolory sekcji CTA' }),
        }, { label: '🚀 Sekcja CTA (dół strony)' }),

        // ========== KOLORY KART ZAJĘĆ ==========
        classCardsColors: fields.object({
          cardBg: colorField({ label: 'Kolor tła karty', defaultValue: '#ffffff' }),
          cardBorder: colorField({ label: 'Kolor obramowania karty', defaultValue: '#e8e2d9' }),
          cardHoverBorder: colorField({ label: 'Kolor obramowania przy hover', defaultValue: '#7d8c6e' }),
          iconColor: colorField({ label: 'Kolor ikony', defaultValue: '#7d8c6e' }),
          titleColor: colorField({ label: 'Kolor tytułu', defaultValue: '#3d3329' }),
          descColor: colorField({ label: 'Kolor opisu', defaultValue: '#8a7f72' }),
          linkColor: colorField({ label: 'Kolor linku', defaultValue: '#7d8c6e' }),
        }, { label: '🎨 Kolory kart zajęć (na stronie głównej)' }),

        // ========== KOLORY KARNETÓW ==========
        pricingCardsColors: fields.object({
          cardBg: colorField({ label: 'Kolor tła karty', defaultValue: '#ffffff' }),
          cardBorder: colorField({ label: 'Kolor obramowania', defaultValue: '#e8e2d9' }),
          featuredBg: colorField({ label: 'Kolor tła karty wyróżnionej', defaultValue: '#7d8c6e' }),
          featuredText: colorField({ label: 'Kolor tekstu karty wyróżnionej', defaultValue: '#ffffff' }),
          badgeColor: colorField({ label: 'Kolor badge "Popularny"', defaultValue: '#7d8c6e' }),
          titleColor: colorField({ label: 'Kolor tytułu (ilość wejść)', defaultValue: '#3d3329' }),
          subtitleColor: colorField({ label: 'Kolor podtytułu (okres)', defaultValue: '#8a7f72' }),
          priceColor: colorField({ label: 'Kolor ceny', defaultValue: '#7d8c6e' }),
          featuresColor: colorField({ label: 'Kolor listy cech', defaultValue: '#5c5145' }),
        }, { label: '🎨 Kolory kart cennikowych (karnety)' }),

        // ========== KOLORY OPINII ==========
        testimonialsColors: fields.object({
          cardBg: colorField({ label: 'Kolor tła karty', defaultValue: '#f5f0e8' }),
          starsColor: colorField({ label: 'Kolor gwiazdek', defaultValue: '#7d8c6e' }),
          textColor: colorField({ label: 'Kolor tekstu opinii', defaultValue: '#3d3329' }),
          authorColor: colorField({ label: 'Kolor imienia autora', defaultValue: '#3d3329' }),
          sourceColor: colorField({ label: 'Kolor źródła (Google)', defaultValue: '#8a7f72' }),
        }, { label: '🎨 Kolory sekcji opinii' }),
      },
    }),

    // ========== STRONA ZAJĘCIA ==========
    zajeciaPage: singleton({
      label: '💃 Strona Zajęcia',
      path: 'content/zajecia-page',
      format: { data: 'json' },
      schema: {
        heroTitle: fields.text({ label: 'Tytuł strony', defaultValue: 'Nasza oferta' }),
        heroSubtitle: fields.text({ label: 'Podtytuł', defaultValue: 'Poznaj wszystkie rodzaje zajęć' }),
        groupClassesTitle: fields.text({ label: 'Tytuł sekcji zajęć grupowych', defaultValue: 'Zajęcia grupowe' }),
        additionalTitle: fields.text({ label: 'Tytuł sekcji dodatkowej oferty', defaultValue: 'Pozostała oferta' }),
      },
    }),

    // ========== STRONA CENNIK ==========
    cennikPage: singleton({
      label: '💰 Strona Cennik',
      path: 'content/cennik-page',
      format: { data: 'json' },
      schema: {
        heroTitle: fields.text({ label: 'Tytuł strony', defaultValue: 'Cennik' }),

        heroSubtitle: fields.text({ label: 'Podtytuł', defaultValue: 'Wszystkie karnety ważne są 30 dni od daty pierwszych zajęć' }),
        
        // Kategorie cenowe
        categories: fields.array(
          fields.object({
            name: fields.text({ label: 'Nazwa kategorii (np. Pole Dance / Aerial Hoop)' }),
            items: fields.array(
              fields.object({
                name: fields.text({ label: 'Nazwa usługi' }),
                price: fields.text({ label: 'Cena' }),
              }),
              { label: 'Pozycje cenowe', itemLabel: (props) => props.fields.name.value || 'Nowa pozycja' }
            ),
          }),
          { label: '📋 Kategorie cenowe', itemLabel: (props) => props.fields.name.value || 'Nowa kategoria' }
        ),

        // Dane do przelewu
        bankSection: fields.object({
          bankName: fields.text({ label: 'Nazwa banku', defaultValue: 'Mbank' }),
          accountNumber: fields.text({ label: 'Numer konta', defaultValue: '56 1140 2004 0000 3702 8505 7568' }),
          recipient: fields.text({ label: 'Odbiorca', defaultValue: 'Sway Pole Dance Studio Joanna Olejniczak' }),
          titleInfo: fields.text({ label: 'Info o tytule przelewu', defaultValue: 'Imię i nazwisko + rodzaj karnetu' }),
        }, { label: '🏦 Dane do przelewu' }),

        // Uwagi - WYSIWYG editor
        notes: fields.document({
          label: '⚠️ Uwagi na dole strony',
          formatting: true,
          links: true,
          dividers: true,
          layouts: [[1]],
        }),
      },
    }),

    // ========== STRONA KONTAKT ==========
    kontaktPage: singleton({
      label: '📞 Strona Kontakt',
      path: 'content/kontakt-page',
      format: { data: 'json' },
      schema: {
        heroTitle: fields.text({ label: 'Tytuł strony', defaultValue: 'Kontakt' }),
        heroSubtitle: fields.text({ label: 'Podtytuł', defaultValue: 'Skontaktuj się z nami' }),
        hoursText: fields.text({ 
          label: 'Godziny otwarcia', 
          multiline: true,
          defaultValue: 'Pon-Pt: 16:00-21:00\nSob: 10:00-14:00'
        }),
      },
    }),

    // ========== STRONA FAQ ==========
    faqPage: singleton({
      label: '❓ Strona FAQ',
      path: 'content/faq-page',
      format: { data: 'json' },
      schema: {
        heroTitle: fields.text({ label: 'Tytuł strony', defaultValue: 'Najczęściej zadawane pytania' }),
        heroSubtitle: fields.text({ label: 'Podtytuł', defaultValue: 'Znajdź odpowiedzi na swoje pytania' }),
        ctaText: fields.text({ label: 'Tekst CTA na dole', defaultValue: 'Nie znalazłaś odpowiedzi? Napisz do nas!' }),
      },
    }),

    // ========== STRONA REGULAMIN ==========
    regulaminPage: singleton({
      label: '📜 Strona Regulamin',
      path: 'content/regulamin-page',
      format: { data: 'json' },
      schema: {
        heroTitle: fields.text({ label: 'Tytuł strony', defaultValue: 'Regulamin' }),
        heroSubtitle: fields.text({ label: 'Podtytuł', defaultValue: 'Zasady korzystania z usług studia' }),
        content: fields.document({
          label: 'Treść regulaminu',
          formatting: {
            inlineMarks: {
              bold: true,
              italic: true,
              underline: true,
              strikethrough: true,
            },
            listTypes: {
              ordered: true,
              unordered: true,
            },
            headingLevels: [2, 3, 4],
            blockTypes: {
              blockquote: true,
            },
            softBreaks: true,
          },
          dividers: true,
          links: true,
        }),
      },
    }),

    // ========== USTAWIENIA GLOBALNE ==========
    settings: singleton({
      label: '⚙️ Ustawienia strony',
      path: 'content/settings',
      format: { data: 'json' },
      schema: {
        siteName: fields.text({ label: 'Nazwa studia', defaultValue: 'Sway Pole Dance Studio' }),
        email: fields.text({ label: 'Email', defaultValue: 'studiopoledance.sway@gmail.com' }),
        phone: fields.text({ label: 'Telefon' }),
        address: fields.text({ label: 'Adres', defaultValue: 'ul. Jesionowa 18/1, 61-429 Poznań' }),
        nip: fields.text({ label: 'NIP', defaultValue: '7812027493' }),
        companyName: fields.text({ label: 'Pełna nazwa firmy', defaultValue: 'Sway Pole Dance Studio Joanna Olejniczak' }),
        fitssey: fields.url({ label: 'Link do systemu rezerwacji FITSSEY' }),
        facebook: fields.url({ label: 'Facebook' }),
        instagram: fields.url({ label: 'Instagram' }),
        
        // ========== KOLORY GLOBALNE ==========
        colors: fields.object({
          primary: colorField({ label: 'Kolor główny (akcent)', defaultValue: '#7d8c6e', description: 'Główny kolor motywu - przyciski, linki, akcenty' }),
          primaryLight: colorField({ label: 'Kolor główny jasny', defaultValue: '#9aab8a' }),
          primaryDark: colorField({ label: 'Kolor główny ciemny', defaultValue: '#5f6b52' }),
          secondary: colorField({ label: 'Kolor sekundowy (tło sekcji)', defaultValue: '#f5f0e8' }),
          dark: colorField({ label: 'Kolor ciemny (tekst główny)', defaultValue: '#3d3329' }),
          light: colorField({ label: 'Kolor jasny (tło strony)', defaultValue: '#fdfbf7' }),
          gray: colorField({ label: 'Kolor szary', defaultValue: '#8a7f72' }),
          grayLight: colorField({ label: 'Kolor szary jasny', defaultValue: '#e8e2d9' }),
          grayDark: colorField({ label: 'Kolor szary ciemny', defaultValue: '#5c5145' }),
        }, { label: '🎨 Kolory globalne', description: 'Podstawowe kolory używane na całej stronie' }),
      },
    }),

    // ========== NAWIGACJA ==========
    navigation: singleton({
      label: '🧭 Menu nawigacji',
      path: 'content/navigation',
      format: { data: 'json' },
      schema: {
        menuItems: fields.array(
          fields.object({
            label: fields.text({ label: 'Nazwa' }),
            href: fields.text({ label: 'Link (np. /zajecia)' }),
          }),
          {
            label: 'Pozycje w menu',
            itemLabel: (props) => props.fields.label.value || 'Nowy link',
          }
        ),
        ctaButtonText: fields.text({ label: 'Tekst przycisku "Zapisz się"', defaultValue: 'Zapisz się' }),
      },
    }),

    // ========== STOPKA ==========
    footer: singleton({
      label: '🦶 Stopka',
      path: 'content/footer',
      format: { data: 'json' },
      schema: {
        description: fields.text({ label: 'Krótki opis studia', multiline: true }),
        copyright: fields.text({ label: 'Tekst copyright', defaultValue: '© 2024 Sway Pole Dance Studio' }),
      },
    }),
  },

  collections: {
    // ========== ZAJĘCIA ==========
    zajecia: collection({
      label: '💃 Zajęcia',
      slugField: 'title',
      path: 'content/zajecia/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Nazwa zajęć (np. Pole Dance)' } }),
        shortDesc: fields.text({ label: 'Krótki opis (1-2 zdania)', multiline: true }),
        fullDesc: fields.text({ label: 'Pełny opis', multiline: true }),
        image: fields.image({ 
          label: 'Zdjęcie zajęć', 
          directory: 'public/images/zajecia',
          publicPath: '/images/zajecia/',
        }),
        imageOrientation: fields.select({
          label: 'Orientacja zdjęcia',
          options: [
            { label: 'Poziome (landscape)', value: 'horizontal' },
            { label: 'Pionowe (portrait / Instagram)', value: 'vertical' },
          ],
          defaultValue: 'horizontal',
        }),
        maxPeople: fields.text({ label: 'Max osób (np. "max. 8 osób")', defaultValue: '' }),
        duration: fields.text({ label: 'Czas trwania (np. "60 min")', defaultValue: '60 min' }),
        requirements: fields.text({ label: 'Wymagania (jeśli są)', multiline: true }),
        features: fields.array(
          fields.text({ label: 'Korzyść/cecha' }),
          { label: 'Lista korzyści', itemLabel: (props) => props.value || 'Nowa korzyść' }
        ),
        showOnHome: fields.checkbox({ label: 'Pokaż na stronie głównej', defaultValue: true }),
        order: fields.number({ label: 'Kolejność', defaultValue: 0 }),
      },
    }),

    // ========== KARNETY ==========
    karnety: collection({
      label: '🎫 Karnety',
      slugField: 'name',
      path: 'content/karnety/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Nazwa (np. 8x wejść)' } }),
        entries: fields.text({ label: 'Liczba wejść (np. 8x)', defaultValue: '8x' }),
        price: fields.text({ label: 'Cena (np. 310 zł)', defaultValue: '310 zł' }),
        period: fields.text({ label: 'Okres (np. miesięcznie)', defaultValue: 'miesięcznie' }),
        features: fields.array(
          fields.text({ label: 'Cecha' }),
          { label: 'Co zawiera', itemLabel: (props) => props.value || 'Nowa cecha' }
        ),
        isPopular: fields.checkbox({ label: '⭐ Oznacz jako "Najpopularniejszy"', defaultValue: false }),
        order: fields.number({ label: 'Kolejność', defaultValue: 0 }),
      },
    }),

    // ========== OPINIE ==========
    opinie: collection({
      label: '⭐ Opinie klientek',
      slugField: 'author',
      path: 'content/opinie/*',
      format: { data: 'json' },
      schema: {
        author: fields.slug({ name: { label: 'Imię (np. Anna K.)' } }),
        text: fields.text({ label: 'Treść opinii', multiline: true }),
        rating: fields.number({ label: 'Ocena (1-5)', defaultValue: 5 }),
        source: fields.text({ label: 'Źródło', defaultValue: 'Google' }),
        order: fields.number({ label: 'Kolejność', defaultValue: 0 }),
      },
    }),

    // ========== FAQ ==========
    faq: collection({
      label: '❓ FAQ - Pytania',
      slugField: 'question',
      path: 'content/faq/*',
      format: { data: 'json' },
      schema: {
        question: fields.slug({ name: { label: 'Pytanie' } }),
        answer: fields.document({
          label: 'Odpowiedź',
          formatting: true,
          links: true,
          dividers: true,
        }),
        order: fields.number({ label: 'Kolejność', defaultValue: 0 }),
      },
    }),
  },
});
