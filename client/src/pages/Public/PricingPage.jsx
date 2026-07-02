import React from 'react';
import { CTASection, FAQ, PricingCards } from '../../components/marketing';
import PageContainer from '../../components/layout/PageContainer';

export function PricingPage() {
  return (
    <>
      <PageContainer
        eyebrow="Pricing"
        title="A plan for every production pace"
        description="Begin free, then move to a creator or team plan as your output and collaboration needs grow."
      >
        <div className="inline-flex rounded-full border border-slate-800 bg-slate-900 p-1 text-sm">
          <span className="rounded-full bg-slate-700 px-4 py-2 text-white">Monthly</span>
          <span className="px-4 py-2 text-slate-500">Annual · save 20%</span>
        </div>
      </PageContainer>
      <PricingCards />
      <FAQ />
      <CTASection />
    </>
  );
}

export default PricingPage;
