'use client';

import { useEffect, useRef } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-right' | 'fade-left' | 'zoom-in';
  delay?: number;
  className?: string;
}

export function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('aos-animate');
            }, delay);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  const animationMap = {
    'fade-up': 'fade-up',
    'fade-right': 'fade-right',
    'fade-left': 'fade-left',
    'zoom-in': 'zoom-in',
  };

  return (
    <div
      ref={ref}
      data-aos={animationMap[animation]}
      data-aos-delay={delay}
      className={className}
    >
      {children}
    </div>
  );
}
