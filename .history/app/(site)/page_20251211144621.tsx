import Link from 'next/link';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Preloader } from '@/components/Preloader';
import { getClassIcon } from '@/components/ClassIcons';
import { 
  getHomepageData, 
  getSettings, 
  getAllKarnety, 
  getZajeciaForHomepage,
  getAllOpinie 
} from '@/lib/keystatic';

// Wyłączenie cache - zawsze pobieraj świeże dane z plików
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Pobieramy dane z Keystatic
  const homepage = await getHomepageData();
  const settings = await getSettings();
  const karnety = await getAllKarnety();
  const zajecia = await getZajeciaForHomepage();
  const opinie = await getAllOpinie();

  // Fallback values
  const fitssey = settings?.fitssey || 'https://app.fitssey.com/Swaypoledancestudio';

  return (
    <>
      <Preloader />

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-content">
          <AnimatedSection animation="fade-up">
            <span className="hero-subtitle">{homepage?.heroSection?.subtitle || 'Pole Dance Studio w Poznaniu'}</span>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={100}>
            <h1 className="hero-title">
              {homepage?.heroSection?.title || 'Naucz się'} <span className="text-accent">{homepage?.heroSection?.highlight || 'latać'}</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={200}>
            <p className="hero-desc">
              {homepage?.heroSection?.description || 'Odkryj pasję do tańca na rurze w przyjaznej atmosferze.'}
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="hero-buttons">
              <Link href="/zajecia" className="btn btn-primary">
                Sprawdź zajęcia
              </Link>
              <a
                href={fitssey}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                {homepage?.heroSection?.buttonText || 'Zapisz się'}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Section */}
      <section className="section about" id="about">
        <div className="container">
          <div className="about-grid">
            <AnimatedSection animation="fade-right" className="about-images">
              <div className="about-img-wrapper">
                <img
                  src="/images/about/pole-dance.jpg"
                  alt="Pole dance w Sway Studio"
                  className="about-img about-img-1"
                />
              </div>
              <div className="about-img-wrapper">
                <img
                  src="/images/about/aerial-hoop.jpg"
                  alt="Aerial hoop w Sway Studio"
                  className="about-img about-img-2"
                />
              </div>
              <div className="about-decoration"></div>
            </AnimatedSection>
            <AnimatedSection animation="fade-left" className="about-content">
              <span className="section-subtitle">O nas</span>
              <h2 className="section-title">{homepage?.aboutSection?.title || 'Witaj w Sway!'}</h2>
              <p className="about-text">
                {homepage?.aboutSection?.text || 'Sway to miejsce, gdzie każda kobieta może odkryć swoją siłę, grację i pewność siebie.'}
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <div className="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <span>{homepage?.aboutSection?.feature1 || 'Profesjonalna kadra'}</span>
                </div>
                <div className="about-feature">
                  <div className="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <span>{homepage?.aboutSection?.feature2 || 'Małe grupy'}</span>
                </div>
                <div className="about-feature">
                  <div className="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <span>{homepage?.aboutSection?.feature3 || 'Przyjazna atmosfera'}</span>
                </div>
              </div>
              <Link href="/o-nas" className="btn btn-primary">
                Dowiedz się więcej o nas
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* First Class Promo */}
      <section className="section promo">
        <div className="container">
          <AnimatedSection animation="zoom-in" className="promo-card">
            <div className="promo-content">
              <span className="promo-label">Oferta specjalna</span>
              <h2 className="promo-title">
                {homepage?.promoSection?.title || 'Pierwsze zajęcia'} tylko <span className="text-accent">{homepage?.promoSection?.price || '35 zł'}</span>
              </h2>
              <p className="promo-text">
                {homepage?.promoSection?.description || 'Spróbuj naszych zajęć w promocyjnej cenie!'}
              </p>
              <a
                href={fitssey}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {homepage?.promoSection?.buttonText || 'Zarezerwuj termin'}
              </a>
            </div>
            <div className="promo-decoration">
              <div className="promo-circle promo-circle-1"></div>
              <div className="promo-circle promo-circle-2"></div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Classes Section - ZAJĘCIA Z KEYSTATIC */}
      <section className="section classes" id="classes">
        <div className="container">
          <div className="section-header">
            <AnimatedSection>
              <span className="section-subtitle">Oferta</span>
              <h2 className="section-title">Nasze zajęcia</h2>
              <p className="section-desc">
                Wybierz coś dla siebie
              </p>
            </AnimatedSection>
          </div>

          <div className="classes-grid">
            {zajecia.map((z, index) => (
              <AnimatedSection key={z.slug} delay={index * 100} className="class-card">
                <div className="class-card-inner">
                  <div className="class-icon">
                    {getClassIcon(z.slug)}
                  </div>
                  <h3 className="class-title">{typeof z.title === 'object' ? (z.title as any)?.name : z.title}</h3>
                  <p className="class-desc">
                    {z.shortDesc || z.fullDesc?.substring(0, 120) + '...'}
                  </p>
                  <Link href={`/zajecia#${z.slug}`} className="class-link">
                    Dowiedz się więcej
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="section-cta">
            <AnimatedSection>
              <Link href="/zajecia" className="btn btn-outline">
                Zobacz wszystkie zajęcia
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pricing Section - KARNETY Z KEYSTATIC */}
      <section className="section pricing" id="pricing">
        <div className="container">
          <div className="section-header">
            <AnimatedSection>
              <span className="section-subtitle">Cennik</span>
              <h2 className="section-title">Karnety</h2>
              <p className="section-desc">Wybierz karnet dopasowany do Twoich potrzeb</p>
            </AnimatedSection>
          </div>

          <div className="pricing-grid">
            {karnety.map((karnet, index) => (
              <AnimatedSection key={karnet.slug} delay={index * 100} className={`pricing-card ${karnet.isPopular ? 'pricing-card-featured' : ''}`}>
                {karnet.isPopular && <div className="pricing-badge">Popularny</div>}
                <div className="pricing-header">
                  <h3 className="pricing-title">{karnet.entries} wejść</h3>
                  <p className="pricing-subtitle">{karnet.period}</p>
                </div>
                <div className="pricing-price">
                  <span className="price-amount">{karnet.price?.replace(' zł', '').replace('zł', '')}</span>
                  <span className="price-currency">zł</span>
                </div>
                <ul className="pricing-features">
                  {karnet.features?.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>

          <div className="section-cta">
            <AnimatedSection>
              <Link href="/cennik" className="btn btn-outline">
                {homepage?.promoSection?.buttonText || 'Zobacz pełny cennik'}
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section - OPINIE Z KEYSTATIC */}
      <section className="section testimonials" id="testimonials">
        <div className="container">
          <div className="section-header">
            <AnimatedSection>
              <span className="section-subtitle">Opinie z Google</span>
              <h2 className="section-title">Co mówią nasze kursantki</h2>
            </AnimatedSection>
          </div>

          <div className="testimonials-grid">
            {opinie.map((opinia, index) => (
              <AnimatedSection key={opinia.slug} delay={index * 100} className="testimonial-card">
                <div className="testimonial-content">
                  <div className="testimonial-stars">{'★'.repeat(opinia.rating || 5)}</div>
                  <p className="testimonial-text">
                    &quot;{opinia.text}&quot;
                  </p>
                </div>
                <div className="testimonial-author">
                  <span className="author-name">{typeof opinia.author === 'object' ? (opinia.author as any)?.name : opinia.author}</span>
                  <span className="author-info">{opinia.source || 'Google'}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Voucher Section */}
      <section className="section voucher" id="voucher">
        <div className="container">
          <AnimatedSection className="voucher-card">
            <div className="voucher-content">
              <span className="section-subtitle">Pomysł na prezent</span>
              <h2 className="section-title">{homepage?.voucherSection?.title || 'Podaruj wyjątkowy prezent'}</h2>
              <p className="voucher-text">
                {homepage?.voucherSection?.text || 'Voucher na zajęcia pole dance to idealny pomysł na prezent!'}
              </p>
              <Link href="/kontakt" className="btn btn-primary">
                {homepage?.voucherSection?.buttonText || 'Kup voucher'}
              </Link>
            </div>
            <div className="voucher-image">
              <img
                src="/images/promo/promo-bg.jpg"
                alt="Voucher Sway"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Location Section */}
      <section className="section location" id="location">
        <div className="container">
          <div className="location-grid">
            <AnimatedSection animation="fade-right" className="location-content">
              <span className="section-subtitle">Lokalizacja</span>
              <h2 className="section-title">{homepage?.locationSection?.title || 'Gdzie nas znajdziesz'}</h2>

              <div className="location-info">
                <div className="location-item">
                  <div className="location-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="location-text">
                    <strong>Adres</strong>
                    <span>{homepage?.locationSection?.address || settings?.address || 'ul. Jesionowa 18/1, 61-429 Poznań'}</span>
                  </div>
                </div>

                <div className="location-item">
                  <div className="location-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <div className="location-text">
                    <strong>Parking</strong>
                    <span>Duży parking na terenie studia</span>
                  </div>
                </div>

                <div className="location-item">
                  <div className="location-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className="location-text">
                    <strong>Komunikacja</strong>
                    <span>Autobusy: 213, 149, 175, 179<br />Tramwaje: 2, 9, 10</span>
                  </div>
                </div>
              </div>

              <Link href="/dojazd" className="btn btn-outline">
                Sprawdź dojazd
              </Link>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" className="location-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.5!2d16.9!3d52.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDI0JzAwLjAiTiAxNsKwNTQnMDAuMCJF!5e0!3m2!1spl!2spl!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '20px' }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta">
        <div className="container">
          <AnimatedSection animation="zoom-in" className="cta-content">
            <h2 className="cta-title">{homepage?.ctaSection?.title || 'Gotowa na nowe wyzwanie?'}</h2>
            <p className="cta-text">{homepage?.ctaSection?.text || 'Dołącz do nas i odkryj pole dance!'}</p>
            <a
              href={fitssey}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              {homepage?.ctaSection?.buttonText || 'Zapisz się teraz'}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Fixed CTA for mobile */}
      <a
        href={fitssey}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed-cta"
      >
        <span>Zapisz się</span>
      </a>
    </>
  );
}
