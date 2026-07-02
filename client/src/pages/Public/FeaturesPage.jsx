import React from 'react';
import { CTASection, EditorPreview, FeatureGrid, HowItWorks, VoiceShowcase } from '../../components/marketing';
import PageContainer from '../../components/layout/PageContainer';

export function FeaturesPage() {
  return (
    <>
      <PageContainer
        eyebrow="Features"
        title="A connected production system"
        description="Move from planning to rendered video without losing context between separate creative tools."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ['Plan', 'Briefs, scripts, and repeatable formats'],
            ['Create', 'Scenes, assets, voices, and previews'],
            ['Deliver', 'Reliable renders and durable history'],
          ].map(([title, description]) => (
            <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h2 className="font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
            </article>
          ))}
        </div>
      </PageContainer>
      <FeatureGrid />
      <HowItWorks />
      <VoiceShowcase />
      <EditorPreview />
      <CTASection />
    </>
  );
}

export default FeaturesPage;
