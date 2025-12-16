import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <span className="logo-text">Sway</span>
            </Link>
            <p className="footer-desc">
              Studio pole dance w Poznaniu. Nauczymy Ciebie latać! Dołącz do nas
              i odkryj świat pole dance oraz aerial hoop.
            </p>
            <div className="footer-social">
              <a
                href="https://facebook.com/swaypoledancestudio"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/swaypoledancestudio"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4 className="footer-title">Menu</h4>
            <ul>
              <li><Link href="/">Start</Link></li>
              <li><Link href="/o-nas">O nas</Link></li>
              <li><Link href="/zajecia">Zajęcia</Link></li>
              <li><Link href="/cennik">Cennik</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-title">Informacje</h4>
            <ul>
              <li><Link href="/regulamin">Regulamin</Link></li>
              <li><Link href="/rodo">Polityka prywatności</Link></li>
              <li><Link href="/dojazd">Dojazd</Link></li>
              <li>
                <a
                  href="https://app.fitssey.com/Swaypoledancestudio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Grafik zajęć
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-title">Kontakt</h4>
            <ul>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                ul. Jesionowa 18/1, 61-429 Poznań
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                studiopoledance.sway@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Sway Pole Dance Studio. Wszystkie prawa
            zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
