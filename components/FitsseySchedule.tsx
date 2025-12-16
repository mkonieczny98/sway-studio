'use client';

import { useEffect, useRef } from 'react';

export function FitsseySchedule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    // Opóźnione ładowanie - po załadowaniu strony
    const loadFitssey = () => {
      // Fitssey base code - inicjalizacja
      (window as any).FitsseyWidget = 'lb';
      (window as any).lb = (window as any).lb || function() {
        ((window as any).lb.q = (window as any).lb.q || []).push(arguments);
      };
      (window as any).lb.l = 1 * (new Date() as any);
      (window as any).lb('init', 'Swaypoledancestudio');

      // Sprawdź czy skrypt już jest załadowany
      const existingScript = document.querySelector('script[src*="lb.widget.prod.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://app.fitssey.com/assets/js/lb.widget.prod.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }

      // Dodaj widget do kontenera
      if (containerRef.current && !containerRef.current.querySelector('lb-schedule-widget')) {
        const widget = document.createElement('lb-schedule-widget');
        containerRef.current.appendChild(widget);
      }
    };

    // Załaduj po idle lub po 2 sekundach (co nastąpi pierwsze)
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadFitssey, { timeout: 2000 });
    } else {
      setTimeout(loadFitssey, 1000);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fitssey-widget-container"
      style={{ minHeight: '600px', width: '100%' }}
    />
  );
}
