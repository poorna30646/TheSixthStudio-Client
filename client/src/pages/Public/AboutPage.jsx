import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import Section from '../../components/layout/Section';
import CTASection from '../../components/marketing/CTASection';

const principles = [
  ['Clarity over complexity', 'Creative systems should make the next meaningful action obvious.'],
  ['Structure without rigidity', 'Templates and automation should accelerate judgment, not replace it.'],
  ['Reliability is a feature', 'Long-running production work deserves predictable state and recoverable history.'],
  ['One connected workflow', 'Context should travel with the project from brief through final render.'],
];

export function AboutPage() {
  return (
    <>
      <PageContainer
        eyebrow="About"
        title="A better home for AI video production"
        description="TheSixthStudio is building the connective layer between generative media and the everyday systems creative teams rely on."
      >
        <div className="grid gap-8 text-base leading-8 text-slate-300 lg:grid-cols-2">
          <p>
            Modern video work spans writing, asset management, narration, editing, review, and rendering. The product is designed to make those stages feel like one coherent process.
          </p>
          <p>
            The foundation favors composable modules, explicit state, and accessible interactions so the experience can grow from solo creators to studio-scale teams.
          </p>
        </div>
      </PageContainer>
      <Section eyebrow="Principles" title="How we think about the product">
        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map(([title, description]) => (
            <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
            </article>
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  );
}

export default AboutPage;
