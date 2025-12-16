import { getSettings, getHomepageData } from '@/lib/keystatic';

export async function ThemeStyles() {
  const settings = await getSettings();
  const homepage = await getHomepageData();

  // Kolory globalne
  const colors = settings?.colors;
  
  // Kolory sekcji z homepage
  const heroColors = homepage?.heroSection?.colors;
  const aboutColors = homepage?.aboutSection?.colors;
  const promoColors = homepage?.promoSection?.colors;
  const voucherColors = homepage?.voucherSection?.colors;
  const locationColors = homepage?.locationSection?.colors;
  const ctaColors = homepage?.ctaSection?.colors;
  const classCardsColors = homepage?.classCardsColors;
  const pricingCardsColors = homepage?.pricingCardsColors;
  const testimonialsColors = homepage?.testimonialsColors;

  const cssVariables = `
    :root {
      /* === KOLORY GLOBALNE === */
      --color-primary: ${colors?.primary || '#7d8c6e'};
      --color-primary-light: ${colors?.primaryLight || '#9aab8a'};
      --color-primary-dark: ${colors?.primaryDark || '#5f6b52'};
      --color-secondary: ${colors?.secondary || '#f5f0e8'};
      --color-dark: ${colors?.dark || '#3d3329'};
      --color-light: ${colors?.light || '#fdfbf7'};
      --color-gray: ${colors?.gray || '#8a7f72'};
      --color-gray-light: ${colors?.grayLight || '#e8e2d9'};
      --color-gray-dark: ${colors?.grayDark || '#5c5145'};

      /* === HERO === */
      --hero-title-color: ${heroColors?.titleColor || '#ffffff'};
      --hero-highlight-color: ${heroColors?.highlightColor || colors?.primary || '#7d8c6e'};
      --hero-subtitle-color: ${heroColors?.subtitleColor || colors?.primary || '#7d8c6e'};
      --hero-desc-color: ${heroColors?.descColor || '#e8e2d9'};

      /* === ABOUT === */
      --about-bg-color: ${aboutColors?.bgColor || colors?.light || '#fdfbf7'};
      --about-title-color: ${aboutColors?.titleColor || colors?.dark || '#3d3329'};
      --about-text-color: ${aboutColors?.textColor || colors?.grayDark || '#5c5145'};
      --about-feature-icon-color: ${aboutColors?.featureIconColor || colors?.primary || '#7d8c6e'};
      --about-feature-text-color: ${aboutColors?.featureTextColor || colors?.dark || '#3d3329'};

      /* === PROMO === */
      --promo-bg-color: ${promoColors?.bgColor || colors?.secondary || '#f5f0e8'};
      --promo-label-color: ${promoColors?.labelColor || colors?.primary || '#7d8c6e'};
      --promo-title-color: ${promoColors?.titleColor || colors?.dark || '#3d3329'};
      --promo-price-color: ${promoColors?.priceColor || colors?.primary || '#7d8c6e'};
      --promo-text-color: ${promoColors?.textColor || colors?.grayDark || '#5c5145'};
      --promo-button-bg: ${promoColors?.buttonBg || colors?.primary || '#7d8c6e'};
      --promo-button-text: ${promoColors?.buttonText || '#ffffff'};

      /* === VOUCHER === */
      --voucher-bg-color: ${voucherColors?.bgColor || colors?.secondary || '#f5f0e8'};
      --voucher-title-color: ${voucherColors?.titleColor || colors?.dark || '#3d3329'};
      --voucher-text-color: ${voucherColors?.textColor || colors?.grayDark || '#5c5145'};
      --voucher-button-bg: ${voucherColors?.buttonBg || colors?.primary || '#7d8c6e'};
      --voucher-button-text: ${voucherColors?.buttonText || '#ffffff'};

      /* === LOCATION === */
      --location-bg-color: ${locationColors?.bgColor || colors?.light || '#fdfbf7'};
      --location-title-color: ${locationColors?.titleColor || colors?.dark || '#3d3329'};
      --location-text-color: ${locationColors?.textColor || colors?.grayDark || '#5c5145'};
      --location-icon-color: ${locationColors?.iconColor || colors?.primary || '#7d8c6e'};

      /* === CTA === */
      --cta-bg-color: ${ctaColors?.bgColor || colors?.primary || '#7d8c6e'};
      --cta-title-color: ${ctaColors?.titleColor || '#ffffff'};
      --cta-text-color: ${ctaColors?.textColor || '#e8e2d9'};
      --cta-button-bg: ${ctaColors?.buttonBg || '#ffffff'};
      --cta-button-text: ${ctaColors?.buttonText || colors?.primary || '#7d8c6e'};

      /* === KARTY ZAJĘĆ === */
      --class-card-bg: ${classCardsColors?.cardBg || '#ffffff'};
      --class-card-border: ${classCardsColors?.cardBorder || colors?.grayLight || '#e8e2d9'};
      --class-card-hover-border: ${classCardsColors?.cardHoverBorder || colors?.primary || '#7d8c6e'};
      --class-card-icon-color: ${classCardsColors?.iconColor || colors?.primary || '#7d8c6e'};
      --class-card-title-color: ${classCardsColors?.titleColor || colors?.dark || '#3d3329'};
      --class-card-desc-color: ${classCardsColors?.descColor || colors?.gray || '#8a7f72'};
      --class-card-link-color: ${classCardsColors?.linkColor || colors?.primary || '#7d8c6e'};

      /* === KARTY CENNIKOWE (KARNETY) === */
      --pricing-card-bg: ${pricingCardsColors?.cardBg || '#ffffff'};
      --pricing-card-border: ${pricingCardsColors?.cardBorder || colors?.grayLight || '#e8e2d9'};
      --pricing-card-featured-bg: ${pricingCardsColors?.featuredBg || colors?.primary || '#7d8c6e'};
      --pricing-card-featured-text: ${pricingCardsColors?.featuredText || '#ffffff'};
      --pricing-badge-color: ${pricingCardsColors?.badgeColor || colors?.primary || '#7d8c6e'};
      --pricing-title-color: ${pricingCardsColors?.titleColor || colors?.dark || '#3d3329'};
      --pricing-subtitle-color: ${pricingCardsColors?.subtitleColor || colors?.gray || '#8a7f72'};
      --pricing-price-color: ${pricingCardsColors?.priceColor || colors?.primary || '#7d8c6e'};
      --pricing-features-color: ${pricingCardsColors?.featuresColor || colors?.grayDark || '#5c5145'};

      /* === OPINIE === */
      --testimonial-card-bg: ${testimonialsColors?.cardBg || colors?.secondary || '#f5f0e8'};
      --testimonial-stars-color: ${testimonialsColors?.starsColor || colors?.primary || '#7d8c6e'};
      --testimonial-text-color: ${testimonialsColors?.textColor || colors?.dark || '#3d3329'};
      --testimonial-author-color: ${testimonialsColors?.authorColor || colors?.dark || '#3d3329'};
      --testimonial-source-color: ${testimonialsColors?.sourceColor || colors?.gray || '#8a7f72'};
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: cssVariables }} />;
}
