import React from 'react';
import PropTypes from 'prop-types';
import Section from '../layout/Section';
import { FEATURES } from '../../data/marketing';

export function FeatureGrid({ compact = false }) {
  const items = compact ? FEATURES.slice(0, 3) : FEATURES;

  return (
    <Section
      id="features"
      eyebrow="Platform"
      title="Everything your video workflow needs"
      description="A modular foundation that keeps creative decisions connected from brief through render."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((feature) => (
          <article key={feature.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400/10 text-lg text-amber-300" aria-hidden="true">
              {feature.icon}
            </span>
            <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{feature.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

FeatureGrid.propTypes = {
  compact: PropTypes.bool,
};

export default FeatureGrid;
