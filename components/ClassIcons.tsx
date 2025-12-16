import { ReactElement } from 'react';

// Ikony SVG dla różnych typów zajęć
export const classIcons: Record<string, ReactElement> = {
  'pole-dance': (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      {/* Rura */}
      <line x1="32" y1="4" x2="32" y2="60" strokeWidth="3" strokeLinecap="round"/>
      {/* Głowa */}
      <circle cx="40" cy="16" r="5" fill="currentColor"/>
      {/* Ciało - elegancka poza na rurze */}
      <path d="M40 21 C42 25, 38 30, 32 32" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Noga owinięta wokół rury */}
      <path d="M32 32 C28 36, 26 42, 30 48" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Druga noga wyciągnięta */}
      <path d="M32 32 C40 38, 48 40, 52 36" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Ręka trzymająca rurę */}
      <path d="M40 21 C44 18, 36 12, 32 14" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  
  'aerial-hoop': (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      {/* Liny podwieszające */}
      <line x1="22" y1="4" x2="22" y2="14" strokeWidth="2" strokeLinecap="round"/>
      <line x1="42" y1="4" x2="42" y2="14" strokeWidth="2" strokeLinecap="round"/>
      {/* Koło (hoop) - grubsze */}
      <circle cx="32" cy="36" r="18" strokeWidth="3"/>
      {/* Głowa osoby siedzącej na kole */}
      <circle cx="32" cy="22" r="4" fill="currentColor"/>
      {/* Ciało siedzące na kole */}
      <path d="M32 26 L32 36" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Ręce trzymające koło */}
      <path d="M32 30 L20 26" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 30 L44 26" strokeWidth="2" strokeLinecap="round"/>
      {/* Nogi zwisające elegancko */}
      <path d="M32 36 C28 44, 24 50, 20 54" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 36 C36 44, 40 50, 44 54" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  
  'exotic-pole': (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      {/* Rura */}
      <line x1="20" y1="4" x2="20" y2="60" strokeWidth="3" strokeLinecap="round"/>
      {/* Głowa */}
      <circle cx="30" cy="14" r="5" fill="currentColor"/>
      {/* Włosy */}
      <path d="M26 12 C24 8, 30 6, 34 10" strokeWidth="1.5"/>
      {/* Ciało - zmysłowa poza */}
      <path d="M30 19 C32 24, 28 30, 24 34" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Noga przy rurze */}
      <path d="M24 34 C22 40, 20 46, 22 52" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Noga wyciągnięta do tyłu */}
      <path d="M24 34 C32 38, 42 42, 48 38" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Szpilka/obcas - szczegółowy */}
      <path d="M48 38 L52 40 L52 44 L48 42 Z" fill="currentColor" strokeWidth="1"/>
      {/* Ręka na rurze */}
      <path d="M30 19 C26 16, 20 14, 20 18" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  
  'stretching': (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      {/* Głowa */}
      <circle cx="32" cy="12" r="5" fill="currentColor"/>
      {/* Ciało pochylone do przodu */}
      <path d="M32 17 C32 22, 28 28, 22 32" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Ręce sięgające do stopy */}
      <path d="M22 32 C16 34, 10 38, 8 44" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Noga prosta do przodu */}
      <path d="M32 17 C38 24, 20 36, 8 44" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Stopa przednia */}
      <path d="M8 44 L4 46" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Noga tylna w szpagacie */}
      <path d="M32 17 C40 28, 50 38, 58 44" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Stopa tylna */}
      <path d="M58 44 L60 48" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Linia podłogi */}
      <line x1="4" y1="52" x2="60" y2="52" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
    </svg>
  ),
  
  'kalistenika': (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      {/* Drążek do podciągania */}
      <line x1="8" y1="8" x2="56" y2="8" strokeWidth="4" strokeLinecap="round"/>
      {/* Uchwyty drążka */}
      <line x1="8" y1="8" x2="8" y2="16" strokeWidth="3" strokeLinecap="round"/>
      <line x1="56" y1="8" x2="56" y2="16" strokeWidth="3" strokeLinecap="round"/>
      {/* Głowa */}
      <circle cx="32" cy="18" r="5" fill="currentColor"/>
      {/* Ręce trzymające drążek */}
      <path d="M32 18 C28 14, 22 10, 20 8" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 18 C36 14, 42 10, 44 8" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Ciało - podciąganie */}
      <path d="M32 23 L32 38" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Nogi zgięte */}
      <path d="M32 38 C28 42, 24 48, 26 54" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 38 C36 42, 40 48, 38 54" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Mięśnie (akcent) */}
      <path d="M24 12 C22 14, 22 16, 24 18" strokeWidth="1.5" opacity="0.6"/>
      <path d="M40 12 C42 14, 42 16, 40 18" strokeWidth="1.5" opacity="0.6"/>
    </svg>
  ),
  
  'pole-flow': (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      {/* Rura */}
      <line x1="32" y1="4" x2="32" y2="60" strokeWidth="3" strokeLinecap="round"/>
      {/* Głowa */}
      <circle cx="38" cy="20" r="4" fill="currentColor"/>
      {/* Ciało w płynnym ruchu */}
      <path d="M38 24 C40 28, 36 34, 32 38" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Nogi w ruchu - płynne */}
      <path d="M32 38 C28 44, 22 48, 18 52" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 38 C38 42, 44 44, 48 42" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Ręka */}
      <path d="M38 24 C42 22, 36 16, 32 18" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Ślady ruchu/flow - fale */}
      <path d="M12 28 Q18 24 24 28" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
      <path d="M10 36 Q16 32 22 36" strokeWidth="1.5" opacity="0.3" strokeLinecap="round"/>
      <path d="M8 44 Q14 40 20 44" strokeWidth="1.5" opacity="0.2" strokeLinecap="round"/>
      {/* Iskry/gwiazdy - magia flow */}
      <circle cx="14" cy="20" r="1.5" fill="currentColor" opacity="0.5"/>
      <circle cx="50" cy="32" r="1.5" fill="currentColor" opacity="0.5"/>
      <circle cx="48" cy="50" r="1.5" fill="currentColor" opacity="0.5"/>
    </svg>
  ),
};

// Domyślna ikona jeśli nie znaleziono
export const defaultClassIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="32" cy="32" r="24" strokeWidth="2"/>
    <circle cx="32" cy="24" r="6" fill="currentColor"/>
    <path d="M32 30 L32 44" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M32 44 L24 56" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M32 44 L40 56" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export function getClassIcon(slug: string): ReactElement {
  return classIcons[slug] || defaultClassIcon;
}
