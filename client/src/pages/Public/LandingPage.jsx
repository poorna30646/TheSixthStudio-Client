import React from 'react';
import {
  CTASection,
  EditorPreview,
  FAQ,
  FeatureGrid,
  HeroSection,
  HowItWorks,
  PricingCards,
  TemplateShowcase,
  Testimonials,
  TrustedCompanies,
  VoiceShowcase,
} from '../../components/marketing';

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <TrustedCompanies />
      <FeatureGrid />
      <HowItWorks />
      <TemplateShowcase />
      <VoiceShowcase />
      <EditorPreview />
      <Testimonials />
      <PricingCards preview />
      <FAQ limit={4} />
      <CTASection />
    </>
  );
}

export default LandingPage;
