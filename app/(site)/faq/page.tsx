'use client';

import { useState, useEffect } from 'react';
import { AnimatedSection } from '@/components/AnimatedSection';

interface DocumentChild {
  text?: string;
  bold?: boolean;
  italic?: boolean;
}

interface DocumentBlock {
  type: string;
  children?: DocumentChild[];
}

interface FaqItem {
  slug: string;
  question: string;
  answer: DocumentBlock[] | string;
  order?: number;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFaq() {
      try {
        const response = await fetch('/api/faq');
        const data = await response.json();
        setFaqData(data);
      } catch (error) {
        console.error('Error fetching FAQ:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFaq();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <AnimatedSection>
            <span className="section-subtitle">Pomoc</span>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="page-title">FAQ</h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="page-desc">Najczęściej zadawane pytania</p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <div className="faq-list">
            {loading ? (
              <div className="loading">Ładowanie...</div>
            ) : faqData.length === 0 ? (
              <p>Brak pytań FAQ</p>
            ) : (
              faqData.map((item, index) => (
                <AnimatedSection key={item.slug} delay={index * 50}>
                  <div className={`faq-item ${openIndex === index ? 'active' : ''}`}>
                    <button
                      className="faq-question"
                      onClick={() => toggleFAQ(index)}
                    >
                      {item.question}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    <div className="faq-answer">
                      <div className="faq-answer-inner">
                        {Array.isArray(item.answer) ? (
                          item.answer.map((block: DocumentBlock, i: number) => {
                            if (block.type === 'paragraph') {
                              return (
                                <p key={i}>
                                  {block.children?.map((child: DocumentChild, j: number) => {
                                    let content: React.ReactNode = child.text || '';
                                    if (child.bold) content = <strong key={j}>{content}</strong>;
                                    if (child.italic) content = <em key={j}>{content}</em>;
                                    return <span key={j}>{content}</span>;
                                  })}
                                </p>
                              );
                            }
                            return null;
                          })
                        ) : (
                          <p>{item.answer}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))
            )}
          </div>

          {/* Contact CTA */}
          <AnimatedSection delay={300}>
            <div className="faq-cta">
              <p>Nie znalazłaś odpowiedzi na swoje pytanie?</p>
              <a href="/kontakt" className="btn btn-primary">
                Skontaktuj się z nami
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
