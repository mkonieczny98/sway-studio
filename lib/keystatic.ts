// Tymczasowy plik - dane będą pobierane z Payload CMS
// TODO: Przepisać na Payload

export async function getSettings() {
  return {
    siteName: 'Sway Studio',
    primaryColor: '#c9a227',
    secondaryColor: '#1a1a1a',
    accentColor: '#ffffff',
  };
}

export async function getHomepageData() {
  return {
    hero: {
      title: 'Sway Studio',
      subtitle: '',
      backgroundImage: '',
    },
    about: null,
    offerSection: null,
    testimonials: null,
    ctaSection: null,
  };
}

export async function getCennikPage() {
  return {
    title: 'Cennik',
    karnety: [],
    ofertaDodatkowa: [],
    notes: null,
  };
}

export async function getRegulaminPage() {
  return {
    title: 'Regulamin',
    content: null,
  };
}

export async function getAllZajecia() {
  return [];
}

export async function getZajeciaPage() {
  return {
    title: 'Zajęcia',
    subtitle: '',
  };
}

export async function getAllFaq() {
  return [];
}

export async function getNavigation() {
  return {
    links: [],
  };
}

export async function getFooter() {
  return {
    copyright: '© Sway Studio',
    socialLinks: [],
  };
}

export async function getFaqPage() {
  return {
    title: 'FAQ',
    subtitle: '',
  };
}

export async function getKontaktPage() {
  return {
    title: 'Kontakt',
    address: '',
    phone: '',
    email: '',
  };
}

export async function getAllOpinie() {
  return [];
}
