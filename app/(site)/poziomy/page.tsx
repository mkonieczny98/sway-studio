import { AnimatedSection } from '@/components/AnimatedSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Poziomy | Sway Pole Dance Studio Poznań',
  description: 'Poziomy zaawansowania w Sway Pole Dance Studio - INTRO, BASIC, INTERMEDIATE, ADVANCED, MASTER.',
};

const levels = [
  {
    name: 'INTRO',
    badge: 'intro',
    description: 'Poziom dla osób, które nigdy nie miały styczności z pole dance. Nauczysz się podstawowych chwytów, obrotów i prostych figur. Nie wymagamy żadnego przygotowania – po to są te zajęcia!',
  },
  {
    name: 'BASIC',
    badge: 'beginner',
    description: 'Dla osób, które opanowały podstawy. Rozwijamy siłę, koordynację i uczymy się bardziej złożonych figur. Zaczynamy łączyć elementy w kombinacje.',
  },
  {
    name: 'INTERMEDIATE',
    badge: 'intermediate',
    description: 'Poziom średniozaawansowany. Pracujemy nad inwersami (pozycje do góry nogami), bardziej wymagającymi chwytami i płynnością ruchów.',
  },
  {
    name: 'ADVANCED',
    badge: 'advanced',
    description: 'Poziom zaawansowany dla osób z doświadczeniem. Skomplikowane figury, dynamiczne przejścia i praca nad własnym stylem.',
  },
  {
    name: 'MASTER',
    badge: 'advanced',
    description: 'Najwyższy poziom dla najbardziej doświadczonych. Najtrudniejsze figury, choreografie i przygotowanie do pokazów/zawodów.',
  },
];

export default function PoziomyPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <AnimatedSection>
            <span className="section-subtitle">Grupy zaawansowania</span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="page-title">Poziomy</h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="page-desc">
              Zajęcia dopasowane do Twojego poziomu umiejętności
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Levels Section */}
      <section className="section">
        <div className="container">
          <div className="levels-grid">
            {levels.map((level, index) => (
              <AnimatedSection key={level.name} delay={index * 100}>
                <div className="level-card">
                  <span className={`level-badge ${level.badge}`}>{level.name}</span>
                  <h3>{level.name}</h3>
                  <p>{level.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={500}>
            <div className="pricing-note" style={{ marginTop: 'var(--spacing-xl)' }}>
              <p><strong>Nie wiesz, który poziom wybrać?</strong></p>
              <p>Skontaktuj się z nami przed pierwszymi zajęciami – pomożemy Ci dobrać odpowiednią grupę!</p>
              <p>Przed pierwszymi zajęciami zawsze rekomendujemy poziom INTRO, nawet jeśli ćwiczysz w innych studiach.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta">
        <div className="container">
          <AnimatedSection>
            <h2 className="cta-title">Gotowa zacząć?</h2>
            <p className="cta-text">Zapisz się na swoje pierwsze zajęcia INTRO!</p>
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
