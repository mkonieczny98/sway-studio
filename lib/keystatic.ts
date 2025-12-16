// Adapter - mapuje dane z Payload CMS na format oczekiwany przez komponenty
// To pozwala zachować kompatybilność z istniejącymi komponentami

import {
  getHomepage,
  getSettings as getPayloadSettings,
  getNavigation as getPayloadNavigation,
  getFooter as getPayloadFooter,
  getZajeciaPage as getPayloadZajeciaPage,
  getCennikPage as getPayloadCennikPage,
  getKontaktPage as getPayloadKontaktPage,
  getFAQPage as getPayloadFAQPage,
  getRegulaminPage as getPayloadRegulaminPage,
  getZajecia,
  getKarnety,
  getOpinie,
  getFAQ,
  getMediaUrl,
} from './payload'

// ========== SETTINGS ==========
export async function getSettings() {
  try {
    const data = await getPayloadSettings()
    return {
      siteName: data.siteName || 'Sway Pole Dance Studio',
      primaryColor: data.colors?.primary || '#7d8c6e',
      secondaryColor: data.colors?.secondary || '#f5f0e8',
      accentColor: data.colors?.primaryLight || '#9aab8a',
      fitssey: data.fitssey || 'https://app.fitssey.com/Swaypoledancestudio',
      email: data.email,
      phone: data.phone,
      address: data.address,
      facebook: data.facebook,
      instagram: data.instagram,
      colors: data.colors,
    }
  } catch (error) {
    console.error('Error fetching settings:', error)
    return {
      siteName: 'Sway Pole Dance Studio',
      primaryColor: '#7d8c6e',
      secondaryColor: '#f5f0e8',
      accentColor: '#9aab8a',
      fitssey: 'https://app.fitssey.com/Swaypoledancestudio',
    }
  }
}

// ========== HOMEPAGE ==========
export async function getHomepageData() {
  try {
    const data = await getHomepage()
    return {
      heroSection: {
        title: data.heroSection?.title || 'Naucz się',
        highlight: data.heroSection?.highlight || 'latać',
        subtitle: data.heroSection?.subtitle || 'Pole Dance Studio w Poznaniu',
        description: data.heroSection?.description || '',
        buttonText: data.heroSection?.buttonText || 'Zapisz się na zajęcia',
        heroImage: getMediaUrl(data.heroSection?.heroImage) || '/images/hero/hero-bg.jpg',
        colors: data.heroSection?.colors,
      },
      aboutSection: {
        title: data.aboutSection?.title || 'Witaj w Sway!',
        text: data.aboutSection?.text || '',
        feature1: data.aboutSection?.feature1 || 'Profesjonalna kadra',
        feature2: data.aboutSection?.feature2 || 'Małe grupy',
        feature3: data.aboutSection?.feature3 || 'Przyjazna atmosfera',
        image1: getMediaUrl(data.aboutSection?.image1) || '/images/about/pole-dance.jpg',
        image2: getMediaUrl(data.aboutSection?.image2) || '/images/about/aerial-hoop.jpg',
        colors: data.aboutSection?.colors,
      },
      promoSection: {
        title: data.promoSection?.title || 'Pierwsze zajęcia',
        price: data.promoSection?.price || '35 zł',
        description: data.promoSection?.description || '',
        buttonText: data.promoSection?.buttonText || 'Zarezerwuj termin',
        colors: data.promoSection?.colors,
      },
      voucherSection: {
        title: data.voucherSection?.title || 'Podaruj wyjątkowy prezent',
        text: data.voucherSection?.text || '',
        buttonText: data.voucherSection?.buttonText || 'Kup voucher',
        image: getMediaUrl(data.voucherSection?.image),
        colors: data.voucherSection?.colors,
      },
      locationSection: {
        title: data.locationSection?.title || 'Gdzie nas znajdziesz',
        address: data.locationSection?.address || 'ul. Jesionowa 18/1, 61-429 Poznań',
        parking: data.locationSection?.parking || '',
        transport: data.locationSection?.transport || '',
        colors: data.locationSection?.colors,
      },
      ctaSection: data.ctaSection,
      classCardsColors: data.classCardsColors,
      pricingCardsColors: data.pricingCardsColors,
      testimonialsColors: data.testimonialsColors,
    }
  } catch (error) {
    console.error('Error fetching homepage:', error)
    return {
      heroSection: {
        title: 'Naucz się',
        highlight: 'latać',
        subtitle: 'Pole Dance Studio w Poznaniu',
        description: '',
        buttonText: 'Zapisz się na zajęcia',
        heroImage: '/images/hero/hero-bg.jpg',
      },
      aboutSection: null,
      promoSection: null,
      voucherSection: null,
      locationSection: null,
      ctaSection: null,
    }
  }
}

// ========== CENNIK PAGE ==========
export async function getCennikPage() {
  try {
    const data = await getPayloadCennikPage()
    return {
      heroTitle: data.heroTitle || 'Cennik',
      heroSubtitle: data.heroSubtitle || 'Wszystkie karnety ważne są 30 dni od daty pierwszych zajęć',
      categories: data.categories || [],
      bankSection: data.bankSection || {
        bankName: 'Mbank',
        accountNumber: '56 1140 2004 0000 3702 8505 7568',
        recipient: 'Sway Pole Dance Studio Joanna Olejniczak',
        titleInfo: 'Imię i nazwisko + rodzaj karnetu',
      },
      notes: data.notes,
    }
  } catch (error) {
    console.error('Error fetching cennik page:', error)
    return {
      heroTitle: 'Cennik',
      heroSubtitle: 'Wszystkie karnety ważne są 30 dni od daty pierwszych zajęć',
      categories: [],
      bankSection: {},
      notes: null,
    }
  }
}

// ========== REGULAMIN PAGE ==========
export async function getRegulaminPage() {
  try {
    const data = await getPayloadRegulaminPage()
    return {
      heroTitle: data.heroTitle || 'Regulamin',
      heroSubtitle: data.heroSubtitle || 'Zasady korzystania z usług studia',
      content: data.content,
    }
  } catch (error) {
    console.error('Error fetching regulamin page:', error)
    return {
      heroTitle: 'Regulamin',
      heroSubtitle: 'Zasady korzystania z usług studia',
      content: null,
    }
  }
}

// ========== ZAJECIA ==========
export async function getAllZajecia() {
  try {
    const data = await getZajecia()
    return data.map((item: any) => ({
      slug: item.slug,
      title: item.title,
      shortDesc: item.shortDesc,
      fullDesc: item.fullDesc,
      image: getMediaUrl(item.image),
      imageOrientation: item.imageOrientation || 'horizontal',
      maxPeople: item.maxPeople,
      duration: item.duration,
      requirements: item.requirements,
      features: item.features?.map((f: any) => f.feature || f) || [],
      showOnHome: item.showOnHome,
      order: item.order,
    }))
  } catch (error) {
    console.error('Error fetching zajecia:', error)
    return []
  }
}

export async function getZajeciaForHomepage() {
  try {
    const data = await getZajecia()
    return data
      .filter((item: any) => item.showOnHome)
      .map((item: any) => ({
        slug: item.slug,
        title: item.title,
        shortDesc: item.shortDesc,
        fullDesc: item.fullDesc,
        image: getMediaUrl(item.image),
      }))
  } catch (error) {
    console.error('Error fetching zajecia for homepage:', error)
    return []
  }
}

export async function getZajeciaPage() {
  try {
    const data = await getPayloadZajeciaPage()
    return {
      heroTitle: data.heroTitle || 'Nasza oferta',
      heroSubtitle: data.heroSubtitle || 'Poznaj wszystkie rodzaje zajęć',
      groupClassesTitle: data.groupClassesTitle || 'Zajęcia grupowe',
      additionalTitle: data.additionalTitle || 'Pozostała oferta',
    }
  } catch (error) {
    console.error('Error fetching zajecia page:', error)
    return {
      heroTitle: 'Zajęcia',
      heroSubtitle: '',
    }
  }
}

// ========== KARNETY ==========
export async function getAllKarnety() {
  try {
    const data = await getKarnety()
    return data.map((item: any) => ({
      slug: item.slug,
      name: item.name,
      entries: item.entries,
      price: item.price,
      period: item.period,
      features: item.features?.map((f: any) => f.feature || f) || [],
      isPopular: item.isPopular,
      order: item.order,
    }))
  } catch (error) {
    console.error('Error fetching karnety:', error)
    return []
  }
}

// ========== FAQ ==========
export async function getAllFaq() {
  try {
    const data = await getFAQ()
    return data.map((item: any) => ({
      slug: item.slug,
      question: item.question,
      answer: item.answer,
      order: item.order,
    }))
  } catch (error) {
    console.error('Error fetching FAQ:', error)
    return []
  }
}

export async function getFaqPage() {
  try {
    const data = await getPayloadFAQPage()
    return {
      heroTitle: data.heroTitle || 'Najczęściej zadawane pytania',
      heroSubtitle: data.heroSubtitle || '',
      ctaText: data.ctaText || 'Nie znalazłaś odpowiedzi? Napisz do nas!',
    }
  } catch (error) {
    console.error('Error fetching FAQ page:', error)
    return {
      heroTitle: 'FAQ',
      heroSubtitle: '',
    }
  }
}

// ========== OPINIE ==========
export async function getAllOpinie() {
  try {
    const data = await getOpinie()
    return data.map((item: any) => ({
      author: item.author,
      text: item.text,
      rating: item.rating || 5,
      source: item.source || 'Google',
      order: item.order,
    }))
  } catch (error) {
    console.error('Error fetching opinie:', error)
    return []
  }
}

// ========== NAVIGATION ==========
export async function getNavigation() {
  try {
    const data = await getPayloadNavigation()
    return {
      menuItems: data.menuItems || [],
      ctaButtonText: data.ctaButtonText || 'Zapisz się',
    }
  } catch (error) {
    console.error('Error fetching navigation:', error)
    return {
      menuItems: [],
      ctaButtonText: 'Zapisz się',
    }
  }
}

// ========== FOOTER ==========
export async function getFooter() {
  try {
    const data = await getPayloadFooter()
    return {
      description: data.description || '',
      copyright: data.copyright || '© 2024 Sway Pole Dance Studio',
    }
  } catch (error) {
    console.error('Error fetching footer:', error)
    return {
      description: '',
      copyright: '© 2024 Sway Pole Dance Studio',
    }
  }
}

// ========== KONTAKT ==========
export async function getKontaktPage() {
  try {
    const data = await getPayloadKontaktPage()
    const settings = await getPayloadSettings()
    return {
      heroTitle: data.heroTitle || 'Kontakt',
      heroSubtitle: data.heroSubtitle || 'Skontaktuj się z nami',
      hoursText: data.hoursText || 'Pon-Pt: 16:00-21:00\nSob: 10:00-14:00',
      address: settings.address || 'ul. Jesionowa 18/1, 61-429 Poznań',
      phone: settings.phone || '',
      email: settings.email || 'studiopoledance.sway@gmail.com',
    }
  } catch (error) {
    console.error('Error fetching kontakt page:', error)
    return {
      heroTitle: 'Kontakt',
      heroSubtitle: '',
      address: '',
      phone: '',
      email: '',
    }
  }
}
