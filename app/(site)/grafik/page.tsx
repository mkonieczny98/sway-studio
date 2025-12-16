import { AnimatedSection } from '@/components/AnimatedSection';
import { FitsseySchedule } from '@/components/FitsseySchedule';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grafik | Sway Pole Dance Studio Poznań',
  description: 'Grafik zajęć Sway Pole Dance Studio - sprawdź dostępne terminy i zapisz się przez FITSSEY.',
};

export default function GrafikPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <AnimatedSection>
            <span className="section-subtitle">Rezerwacje</span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="page-title">Grafik</h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="page-desc">
              Sprawdź dostępne terminy i zarezerwuj miejsce
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            {/* Fitssey Schedule Widget */}
            <FitsseySchedule />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta">
        <div className="container">
          <AnimatedSection>
            <h2 className="cta-title">Pierwsze zajęcia?</h2>
            <p className="cta-text">Skontaktuj się z nami przed pierwszą wizytą – pomożemy dobrać odpowiedni poziom!</p>
            <a href="/kontakt" className="btn btn-primary btn-lg">
              Kontakt
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
