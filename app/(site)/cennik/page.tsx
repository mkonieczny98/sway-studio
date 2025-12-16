import { AnimatedSection } from '@/components/AnimatedSection';
import { Metadata } from 'next';
import { getCennikPage, getSettings } from '@/lib/keystatic';

// Wyłączenie cache - zawsze pobieraj świeże dane z plików
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Cennik | Sway Pole Dance Studio Poznań',
  description: 'Cennik zajęć Sway Pole Dance Studio Poznań - karnety, wejścia jednorazowe, zajęcia indywidualne.',
};

export default async function CennikPage() {
  const cennikData = await getCennikPage();
  const settings = await getSettings();
  
  const fitssey = settings?.fitssey || 'https://app.fitssey.com/Swaypoledancestudio';

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <AnimatedSection>
            <span className="section-subtitle">Oferta</span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="page-title">{cennikData?.heroTitle || 'Cennik'}</h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="page-desc">
              {cennikData?.heroSubtitle || 'Wszystkie karnety ważne są 30 dni od daty pierwszych zajęć'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section">
        <div className="container">
          {cennikData?.categories?.map((table, tableIndex) => (
            <AnimatedSection key={table.name} delay={tableIndex * 100}>
              <div className="pricing-table">
                <div className="pricing-table-header">
                  <h3>{table.name}</h3>
                </div>
                <div className="pricing-table-body">
                  {table.items?.map((item, itemIndex) => (
                    <div className="pricing-row" key={itemIndex}>
                      <span className="pricing-row-name">{item.name}</span>
                      <span className="pricing-row-price">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}

          {/* Bank Info */}
          <AnimatedSection delay={400}>
            <div className="bank-info">
              <h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                Dane do przelewu
              </h3>
              <div className="bank-details">
                {cennikData?.bankSection?.bankName || 'Mbank'}: {cennikData?.bankSection?.accountNumber || '56 1140 2004 0000 3702 8505 7568'}
              </div>
              <p><strong>Odbiorca:</strong> {cennikData?.bankSection?.recipient || 'Sway Pole Dance Studio Joanna Olejniczak'}</p>
              <p><strong>Tytuł:</strong> {cennikData?.bankSection?.titleInfo || 'Imię i nazwisko + rodzaj karnetu'}</p>
            </div>
          </AnimatedSection>

          {/* Note */}
          <AnimatedSection delay={500}>
            <div className="pricing-note">
              {Array.isArray(cennikData?.notes) ? (
                cennikData.notes.map((block: any, i: number) => {
                  if (block.type === 'paragraph') {
                    return (
                      <p key={i}>
                        {block.children?.map((child: any, j: number) => {
                          let content = child.text || '';
                          if (child.bold) content = <strong key={j}>{content}</strong>;
                          if (child.italic) content = <em key={j}>{content}</em>;
                          return content;
                        })}
                      </p>
                    );
                  }
                  return null;
                })
              ) : (
                <p>Brak uwag</p>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta">
        <div className="container">
          <AnimatedSection>
            <h2 className="cta-title">Gotowa zacząć?</h2>
            <p className="cta-text">Zarezerwuj swoje pierwsze zajęcia już teraz!</p>
            <a
              href={fitssey}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              Zapisz się przez FITSSEY
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
