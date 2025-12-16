import { AnimatedSection } from '@/components/AnimatedSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt | Sway Pole Dance Studio Poznań',
  description: 'Kontakt do Sway Pole Dance Studio Poznań - napisz do nas lub odwiedź nas na Jesionowej 18/1.',
};

export default function KontaktPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <AnimatedSection>
            <span className="section-subtitle">Skontaktuj się</span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="page-title">Kontakt</h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="page-desc">Masz pytania? Chętnie na nie odpowiemy!</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <AnimatedSection animation="fade-right">
              <div className="contact-info-card">
                <h2 className="section-title" style={{ marginBottom: 'var(--spacing-lg)' }}>
                  Dane kontaktowe
                </h2>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h4>Adres</h4>
                    <p>ul. Jesionowa 18/1<br />61-429 Poznań</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <a href="mailto:studiopoledance.sway@gmail.com">studiopoledance.sway@gmail.com</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h4>Social media</h4>
                    <p>
                      <a href="https://facebook.com/swaypoledancestudio" target="_blank" rel="noopener noreferrer">Facebook</a> ·{' '}
                      <a href="https://instagram.com/swaypoledancestudio" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection animation="fade-left">
              <div className="contact-form-card">
                <h2 className="section-title" style={{ marginBottom: 'var(--spacing-lg)' }}>
                  Napisz do nas
                </h2>

                <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Imię i nazwisko *</label>
                    <input type="text" id="name" name="name" className="form-input" placeholder="Twoje imię" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input type="email" id="email" name="email" className="form-input" placeholder="twoj@email.pl" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Temat</label>
                    <input type="text" id="subject" name="subject" className="form-input" placeholder="W jakiej sprawie piszesz?" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Wiadomość *</label>
                    <textarea id="message" name="message" className="form-textarea" placeholder="Twoja wiadomość..." required></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    Wyślij wiadomość
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.5!2d16.91!3d52.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47045b4d0c0e0001%3A0x0!2zSmVzaW9ub3dhIDE4!5e0!3m2!1spl!2spl!4v1"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
