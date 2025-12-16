import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeStyles } from '@/components/ThemeStyles';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeStyles />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
