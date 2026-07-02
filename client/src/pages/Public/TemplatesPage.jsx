import React from 'react';
import { CTASection, TemplateShowcase } from '../../components/marketing';
import PageContainer from '../../components/layout/PageContainer';

export function TemplatesPage() {
  return (
    <>
      <PageContainer
        eyebrow="Templates"
        title="Repeatable formats, ready to adapt"
        description="Begin with a production structure designed for the channel, message, and audience you have in mind."
      >
        <div className="flex flex-wrap gap-2" aria-label="Template categories">
          {['All templates', 'Marketing', 'Social', 'Education', 'Business'].map((category, index) => (
            <span
              key={category}
              className={`rounded-full border px-4 py-2 text-sm ${index === 0 ? 'border-amber-400/40 bg-amber-400/10 text-amber-300' : 'border-slate-800 text-slate-400'}`}
            >
              {category}
            </span>
          ))}
        </div>
      </PageContainer>
      <TemplateShowcase showAll />
      <CTASection />
    </>
  );
}

export default TemplatesPage;
