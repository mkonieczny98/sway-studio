import { AnimatedSection } from '@/components/AnimatedSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O nas | Sway Pole Dance Studio Poznań',
  description: 'Poznaj Sway Pole Dance Studio - nasze studio, zespół i pasję do pole dance i aerial hoop.',
};

export default function ONasPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <AnimatedSection>
            <span className="section-subtitle">Poznaj nas</span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="page-title">O nas</h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="page-desc">
              Studio Sway powstało z pasji do pole dance i aerial hoop
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* About Content */}
      <section className="section about-full">
        <div className="container">
          <AnimatedSection>
            <div className="about-text-content">
              <p>
                <strong>Studio Sway</strong> powstało by móc dzielić się pasją do pole dance oraz aerial hoop. 
                Znajdziesz nas w Poznaniu przy ul. Jesionowej 18!
              </p>
              <p>
                Zajęcia są dla każdego – nie musisz mieć silnych rąk, nóg, czy brzucha – dokładnie po to 
                przychodzi się na zajęcia. Co więcej, to przede wszystkim świetna zabawa oraz przełamywanie 
                własnych barier.
              </p>
              <p>
                Posiadamy <strong>dwie w pełni wyposażone sale treningowe</strong>. Sala do pole dance wyposażona 
                jest w profesjonalne rurki o wysokości 4,4 metra. Sala do aerial hoop posiada koła zawieszone 
                na różnych wysokościach.
              </p>
              <p>
                Nasze grupy są kameralne – maksymalnie <strong>8 osób na pole dance</strong> i 
                <strong> 9 osób na aerial hoop</strong>. Dzięki temu każda osoba otrzymuje odpowiednią uwagę 
                i wsparcie od instruktorki.
              </p>
              <p>
                Zapraszamy na zajęcia zarówno osoby początkujące, jak i zaawansowane. Mamy poziomy od INTRO 
                po MASTER, więc każdy znajdzie coś dla siebie!
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="section" style={{ background: 'var(--color-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <AnimatedSection>
              <span className="section-subtitle">Dlaczego my</span>
              <h2 className="section-title">Co nas wyróżnia</h2>
            </AnimatedSection>
          </div>

          <div className="about-features" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <AnimatedSection delay={100}>
              <div className="about-feature">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span>Profesjonalny sprzęt (rurki 4,4m)</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <div className="about-feature">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span>Małe, kameralne grupy</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <div className="about-feature">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span>Doświadczone instruktorki</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={250}>
              <div className="about-feature">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span>Przyjazna atmosfera</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={300}>
              <div className="about-feature">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span>Poziomy dla każdego</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={350}>
              <div className="about-feature">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span>Wygodna lokalizacja</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta">
        <div className="container">
          <AnimatedSection>
            <h2 className="cta-title">Dołącz do nas!</h2>
            <p className="cta-text">Zarezerwuj swoje pierwsze zajęcia już teraz.</p>
            <a
              href="https://app.fitssey.com/Swaypoledancestudio"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              Zapisz się
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
