import { AnimatedSection } from '@/components/AnimatedSection';
import { Metadata } from 'next';
import { getRegulaminPage } from '@/lib/keystatic';

// Wyłączenie cache - zawsze pobieraj świeże dane z plików
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Regulamin | Sway Pole Dance Studio Poznań',
  description: 'Regulamin studia Sway Pole Dance Studio - zasady korzystania z usług studia.',
};

// Komponent do renderowania tekstu z formatowaniem
function RenderText({ children }: { children: any[] }) {
  if (!children) return null;
  
  return (
    <>
      {children.map((child: any, j: number) => {
        let content: any = child.text || '';
        if (child.bold) content = <strong key={j}>{content}</strong>;
        if (child.italic) content = <em key={j}>{content}</em>;
        if (child.underline) content = <u key={j}>{content}</u>;
        if (child.strikethrough) content = <s key={j}>{content}</s>;
        return <span key={j}>{content}</span>;
      })}
    </>
  );
}

// Komponent do renderowania bloków dokumentu
function RenderDocument({ content }: { content: any[] }) {
  if (!content || !Array.isArray(content)) {
    return <p>Brak treści regulaminu</p>;
  }

  return (
    <>
      {content.map((block: any, i: number) => {
        // Paragraf
        if (block.type === 'paragraph') {
          const hasContent = block.children?.some((c: any) => c.text?.trim());
          if (!hasContent) return null;
          return (
            <p key={i} className="regulamin-paragraph">
              <RenderText>{block.children}</RenderText>
            </p>
          );
        }

        // Nagłówek
        if (block.type === 'heading') {
          const level = block.level || 2;
          const className = level === 2 ? 'regulamin-heading' : 'regulamin-subheading';
          if (level === 2) {
            return (
              <h2 key={i} className={className}>
                <RenderText>{block.children}</RenderText>
              </h2>
            );
          } else if (level === 3) {
            return (
              <h3 key={i} className={className}>
                <RenderText>{block.children}</RenderText>
              </h3>
            );
          } else {
            return (
              <h4 key={i} className={className}>
                <RenderText>{block.children}</RenderText>
              </h4>
            );
          }
        }

        // Lista nieuporządkowana
        if (block.type === 'unordered-list') {
          return (
            <ul key={i} className="regulamin-list">
              {block.children?.map((item: any, itemIdx: number) => (
                <li key={itemIdx}>
                  {item.children?.map((content: any, contentIdx: number) => {
                    if (content.type === 'list-item-content') {
                      return <RenderText key={contentIdx}>{content.children}</RenderText>;
                    }
                    return null;
                  })}
                </li>
              ))}
            </ul>
          );
        }

        // Lista uporządkowana
        if (block.type === 'ordered-list') {
          return (
            <ol key={i} className="regulamin-list regulamin-list-ordered">
              {block.children?.map((item: any, itemIdx: number) => (
                <li key={itemIdx}>
                  {item.children?.map((content: any, contentIdx: number) => {
                    if (content.type === 'list-item-content') {
                      return <RenderText key={contentIdx}>{content.children}</RenderText>;
                    }
                    return null;
                  })}
                </li>
              ))}
            </ol>
          );
        }

        // Divider
        if (block.type === 'divider') {
          return <hr key={i} className="regulamin-divider" />;
        }

        return null;
      })}
    </>
  );
}

export default async function RegulaminPage() {
  const regulaminData = await getRegulaminPage();

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <AnimatedSection>
            <span className="section-subtitle">Informacje</span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="page-title">{regulaminData?.heroTitle || 'Regulamin'}</h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="page-desc">
              {regulaminData?.heroSubtitle || 'Zasady korzystania z usług studia'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Regulamin Content */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <div className="regulamin-content">
              <div className="regulamin-text">
                <RenderDocument content={regulaminData?.content || []} />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
