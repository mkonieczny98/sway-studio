import { AnimatedSection } from '@/components/AnimatedSection';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllZajecia, getZajeciaPage, getSettings } from '@/lib/keystatic';

// Wyłączenie cache - zawsze pobieraj świeże dane z plików
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Zajęcia | Sway Pole Dance Studio Poznań',
  description: 'Oferta zajęć Sway Pole Dance Studio - Pole dance, Aerial Hoop, Stretching, Exotic, Kalistenika i więcej!',
};

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default async function ZajeciaPage() {
  const zajecia = await getAllZajecia();
  const zajeciaPageData = await getZajeciaPage();
  const settings = await getSettings();
  
  const fitssey = settings?.fitssey || 'https://app.fitssey.com/Swaypoledancestudio';

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <AnimatedSection>
            <span className="section-subtitle">Nasza oferta</span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="page-title">{zajeciaPageData?.heroTitle || 'Zajęcia'}</h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="page-desc">
              {zajeciaPageData?.heroSubtitle || 'W naszym grafiku znajdziesz różnorodne zajęcia na każdym poziomie zaawansowania'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Dynamic classes from Keystatic */}
      {zajecia.map((zajecieSingle, index) => (
        <section 
          key={zajecieSingle.slug} 
          className={`section offer-section ${index % 2 === 1 ? 'offer-section-alt' : ''}`} 
          id={zajecieSingle.slug}
        >
          <div className="container">
            <div className={`offer-grid ${index % 2 === 1 ? 'offer-grid-reverse' : ''}`}>
              <AnimatedSection animation={index % 2 === 0 ? 'fade-right' : 'fade-left'} className="offer-content">
                <span className="section-subtitle">Zajęcia grupowe</span>
                <h2 className="section-title">{typeof zajecieSingle.title === 'object' ? (zajecieSingle.title as any)?.name : zajecieSingle.title}</h2>
                <p>{zajecieSingle.fullDesc}</p>
                
                {/* Info badges */}
                {(zajecieSingle.maxPeople || zajecieSingle.duration) && (
                  <div className="offer-badges">
                    {zajecieSingle.maxPeople && (
                      <span className="offer-badge">{zajecieSingle.maxPeople}</span>
                    )}
                    {zajecieSingle.duration && (
                      <span className="offer-badge">{zajecieSingle.duration}</span>
                    )}
                  </div>
                )}

                {/* Requirements notice */}
                {zajecieSingle.requirements && (
                  <div className="offer-notice">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <span>{zajecieSingle.requirements}</span>
                  </div>
                )}

                {/* Features list */}
                {zajecieSingle.features && zajecieSingle.features.length > 0 && (
                  <ul className="offer-features">
                    {zajecieSingle.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <CheckIcon />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <a href={fitssey} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Zapisz się na zajęcia
                </a>
              </AnimatedSection>
              <AnimatedSection 
                animation={index % 2 === 0 ? 'fade-left' : 'fade-right'} 
                className={`offer-image ${zajecieSingle.imageOrientation === 'vertical' ? 'offer-image-vertical' : ''}`}
              >
                <img
                  src={zajecieSingle.image || 'https://swaypoledancestudio.pl/wp-content/uploads/elementor/thumbs/3B0A9050-facebook-pgn10apm3vfpkfxcw8set7eua95vejud6mjyiukck0.jpg'}
                  alt={typeof zajecieSingle.title === 'object' ? (zajecieSingle.title as any)?.name : zajecieSingle.title || 'Zajęcia'}
                />
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* Additional offers grid - Pozostała oferta */}
      <section className="section other-offers">
        <div className="container">
          <div className="section-header">
            <AnimatedSection>
              <span className="section-subtitle">Dodatkowo</span>
              <h2 className="section-title">{zajeciaPageData?.additionalTitle || 'Pozostała oferta'}</h2>
            </AnimatedSection>
          </div>

          <div className="other-offers-grid">
            {/* Zajęcia indywidualne */}
            <AnimatedSection delay={0}>
              <div className="other-offer-card">
                <div className="other-offer-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3>Zajęcia indywidualne</h3>
                <p>Podszkolenie umiejętności pod czujnym okiem instruktora. 60 minut, termin do ustalenia.</p>
                <a href={fitssey} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  Umów się
                </a>
              </div>
            </AnimatedSection>

            {/* Open */}
            <AnimatedSection delay={100}>
              <div className="other-offer-card">
                <div className="other-offer-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <h3>Open</h3>
                <p>90 minut samodzielnego treningu. Przećwicz figury lub zrób zdjęcia z innymi kursantami.</p>
                <a href={fitssey} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  Sprawdź terminy
                </a>
              </div>
            </AnimatedSection>

            {/* Wynajem sali */}
            <AnimatedSection delay={200}>
              <div className="other-offer-card">
                <div className="other-offer-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </div>
                <h3>Wynajem sali</h3>
                <p>Wynajmij salę na sesję zdjęciową lub własny trening. Piękne światło i profesjonalny sprzęt.</p>
                <Link href="/kontakt" className="btn btn-outline btn-sm">
                  Zapytaj o termin
                </Link>
              </div>
            </AnimatedSection>

            {/* Wieczory panieńskie */}
            <AnimatedSection delay={300}>
              <div className="other-offer-card">
                <div className="other-offer-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <h3>Wieczory panieńskie</h3>
                <p>2h imprezy: nauka figur, choreografia, występ instruktora, wystrój, szampan i przekąski!</p>
                <Link href="/kontakt" className="btn btn-outline btn-sm">
                  Zarezerwuj
                </Link>
              </div>
            </AnimatedSection>

            {/* Zajęcia online */}
            <AnimatedSection delay={400}>
              <div className="other-offer-card">
                <div className="other-offer-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3>Zajęcia online</h3>
                <p>Chcesz ćwiczyć z nami ale nie możesz przyjechać? Możesz ćwiczyć zdalnie!</p>
                <Link href="/kontakt" className="btn btn-outline btn-sm">
                  Dowiedz się więcej
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta">
        <div className="container">
          <AnimatedSection animation="zoom-in" className="cta-content">
            <h2 className="cta-title">Gotowa na wyzwanie?</h2>
            <p className="cta-text">Pierwsze zajęcia tylko 35 zł!</p>
            <a
              href={fitssey}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              Zapisz się teraz
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
