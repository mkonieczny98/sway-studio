import type { Metadata } from 'next';
import '@/styles/style.css';
import '@/styles/pages.css';

// Wyłączenie cache - zawsze pobieraj świeże dane z plików
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sway Pole Dance Studio | Poznań',
  description: 'Sway Pole Dance Studio Poznań - Nauczymy Ciebie latać! Pole dance, aerial hoop, stretching, exotic i więcej.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Allura&family=Cormorant+Garamond:wght@400;600&family=Montserrat:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#7d8c6e" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
