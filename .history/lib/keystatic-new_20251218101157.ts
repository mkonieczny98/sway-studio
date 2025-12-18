// Adapter - mapuje dane z plików JSON na format oczekiwany przez komponenty

import * as cms from './json-cms'

// ========== SETTINGS ==========
export async function getSettings() {
  const data = await cms.getSettings()
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
}

// ========== HOMEPAGE ==========
export async function getHomepageData() {
  const data = await cms.getHomepage()
  return {
    heroSection: {
      title: data.heroSection?.title || 'Naucz się',
      highlight: data.heroSection?.highlight || 'latać',
      subtitle: data.heroSection?.subtitle || 'Pole Dance Studio w Poznaniu',
      description: data.heroSection?.description || '',
      buttonText: data.heroSection?.buttonText || 'Zapisz się na zajęcia',
      heroImage: data.heroSection?.heroImage || '/images/hero/hero-bg.jpg',
    },
    aboutSection: data.aboutSection ? {
      title: data.aboutSection.title || 'Witaj w Sway!',
      text: data.aboutSection.text || '',
      feature1: data.aboutSection.feature1 || 'Profesjonalna kadra',
      feature2: data.aboutSection.feature2 || 'Małe grupy',
      feature3: data.aboutSection.feature3 || 'Przyjazna atmosfera',
      image1: data.aboutSection.image1 || '/images/about/pole-dance.jpg',
      image2: data.aboutSection.image2 || '/images/about/aerial-hoop.jpg',
    } : null,
    promoSection: data.promoSection ? {
      title: data.promoSection.title || 'Pierwsze zajęcia',
      price: data.promoSection.price || '35 zł',
      description: data.promoSection.description || '',
      buttonText: data.promoSection.buttonText || 'Zarezerwuj termin',
    } : null,
    voucherSection: data.voucherSection ? {
      title: data.voucherSection.title || 'Podaruj wyjątkowy prezent',
      text: data.voucherSection.text || '',
      buttonText: data.voucherSection.buttonText || 'Kup voucher',
      image: data.voucherSection.image,
    } : null,
    locationSection: data.locationSection ? {
      title: data.locationSection.title || 'Gdzie nas znajdziesz',
      address: data.locationSection.address || 'ul. Jesionowa 18/1, 61-429 Poznań',
      parking: data.locationSection.parking || '',
      transport: data.locationSection.transport || '',
    } : null,
    ctaSection: null,
  }
}

// ========== CENNIK PAGE ==========
export async function getCennikPage() {
  const data = await cms.getCennikPage()
  return {
    heroTitle: data.title || 'Cennik',
    heroSubtitle: data.subtitle || 'Wszystkie karnety ważne są 30 dni od daty pierwszych zajęć',
    categories: [],
    bankSection: {
      bankName: 'Mbank',
      accountNumber: '56 1140 2004 0000 3702 8505 7568',
      recipient: 'Sway Pole Dance Studio Joanna Olejniczak',
      titleInfo: 'Imię i nazwisko + rodzaj karnetu',
    },
    notes: data.notes,
  }
}

// ========== REGULAMIN PAGE ==========
export async function getRegulaminPage() {
  const data = await cms.getRegulaminPage()
  return {
    heroTitle: data.title || 'Regulamin',
    heroSubtitle: 'Zasady korzystania z usług studia',
    content: data.content,
  }
}

// ========== ZAJECIA ==========
export async function getAllZajecia() {
  const data = await cms.getAllZajecia()
  return data.map((item) => ({
    slug: item.slug,
    title: item.title,
    shortDesc: item.shortDesc,
    fullDesc: item.fullDesc,
    image: item.image,
    imageOrientation: item.imageOrientation || 'horizontal',
    maxPeople: item.maxPeople,
    duration: item.duration,
    requirements: item.requirements,
    features: item.features?.map((f) => typeof f === 'string' ? f : f.feature) || [],
    showOnHome: item.showOnHome,
    order: item.order,
  }))
}

export async function getZajeciaForHomepage() {
  const data = await cms.getAllZajecia()
  return data
    .filter((item) => item.showOnHome)
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      shortDesc: item.shortDesc,
      fullDesc: item.fullDesc,
      image: item.image,
    }))
}

export async function getZajeciaPage() {
  const data = await cms.getZajeciaPage()
  return {
    heroTitle: data.title || 'Nasza oferta',
    heroSubtitle: data.subtitle || 'Poznaj wszystkie rodzaje zajęć',
    groupClassesTitle: 'Zajęcia grupowe',
    additionalTitle: 'Pozostała oferta',
  }
}

export async function getZajeciaBySlug(slug: string) {
  const data = await cms.getZajeciaBySlug(slug)
  if (!data) return null
  return {
    slug: data.slug,
    title: data.title,
    shortDesc: data.shortDesc,
    fullDesc: data.fullDesc,
    image: data.image,
    imageOrientation: data.imageOrientation || 'horizontal',
    maxPeople: data.maxPeople,
    duration: data.duration,
    requirements: data.requirements,
    features: data.features?.map((f) => typeof f === 'string' ? f : f.feature) || [],
    showOnHome: data.showOnHome,
    order: data.order,
  }
}

// ========== KARNETY ==========
export async function getAllKarnety() {
  const data = await cms.getAllKarnety()
  return data.map((item) => ({
    slug: item.id,
    name: item.name,
    entries: item.subtitle,
    price: item.price,
    period: item.priceNote,
    features: item.features?.map((f) => typeof f === 'string' ? f : f.feature) || [],
    isPopular: item.isPopular,
    order: item.order,
  }))
}

// ========== FAQ ==========
export async function getAllFaq() {
  const data = await cms.getAllFAQ()
  return data.map((item) => ({
    slug: item.id,
    question: item.question,
    answer: item.answer,
    order: item.order,
  }))
}

export async function getFaqPage() {
  const data = await cms.getFAQPage()
  return {
    heroTitle: data.title || 'Najczęściej zadawane pytania',
    heroSubtitle: data.subtitle || '',
    ctaText: 'Nie znalazłaś odpowiedzi? Napisz do nas!',
  }
}

// ========== OPINIE ==========
export async function getAllOpinie() {
  const data = await cms.getAllOpinie()
  return data.map((item) => ({
    author: item.author,
    text: item.content || item.text,
    rating: item.rating || 5,
    source: 'Google',
    order: 0,
  }))
}

// ========== NAVIGATION ==========
export async function getNavigation() {
  const data = await cms.getNavigation()
  return {
    menuItems: data.items?.map(item => ({
      label: item.label,
      href: item.href,
    })) || [],
    ctaButtonText: 'Zapisz się',
  }
}

// ========== FOOTER ==========
export async function getFooter() {
  const data = await cms.getFooter()
  return {
    description: data.description || '',
    copyright: data.copyright || '© 2024 Sway Pole Dance Studio',
  }
}

// ========== KONTAKT ==========
export async function getKontaktPage() {
  const kontakt = await cms.getKontaktPage()
  const settings = await cms.getSettings()
  return {
    heroTitle: kontakt.title || 'Kontakt',
    heroSubtitle: kontakt.subtitle || 'Skontaktuj się z nami',
    hoursText: 'Pon-Pt: 16:00-21:00\nSob: 10:00-14:00',
    address: settings.address || 'ul. Jesionowa 18/1, 61-429 Poznań',
    phone: settings.phone || '',
    email: settings.email || 'studiopoledance.sway@gmail.com',
  }
}
