'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Start' },
  { href: '/o-nas', label: 'O nas' },
  { href: '/zajecia', label: 'Zajęcia' },
  { href: '/poziomy', label: 'Poziomy' },
  { href: '/cennik', label: 'Cennik' },
  { href: '/grafik', label: 'Grafik' },
  { href: '/faq', label: 'FAQ' },
  { href: '/kontakt', label: 'Kontakt' },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    document.body.classList.toggle('no-scroll');
  };

  const closeNav = () => {
    setIsNavOpen(false);
    document.body.classList.remove('no-scroll');
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} id="header">
      <div className="container">
        <Link href="/" className="logo">
          <span className="logo-text">Sway</span>
        </Link>

        <nav className={`nav ${isNavOpen ? 'active' : ''}`} id="nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                  onClick={closeNav}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="https://app.fitssey.com/Swaypoledancestudio"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary header-cta"
        >
          Zapisz się
        </a>

        <button
          className={`hamburger ${isNavOpen ? 'active' : ''}`}
          id="hamburger"
          aria-label="Menu"
          onClick={toggleNav}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
