import React from 'react';
import Section from '../layout/Section';
import { STEPS } from '../../data/marketing';

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      eyebrow="Workflow"
      title="A clear path from prompt to publish"
      description="Each stage has one job, so teams can move quickly without losing production context."
      className="bg-slate-950/50"
    >
      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <li key={step.number} className="relative rounded-2xl border border-slate-800 p-6">
            <span className="text-sm font-semibold text-amber-400">{step.number}</span>
            <h3 className="mt-8 text-lg font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export default HowItWorks;
