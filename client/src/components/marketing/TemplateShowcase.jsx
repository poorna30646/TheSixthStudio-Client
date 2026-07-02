import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Section from '../layout/Section';
import { TEMPLATES } from '../../data/marketing';

export function TemplateShowcase({ showAll = false }) {
  const templates = showAll ? TEMPLATES : TEMPLATES.slice(0, 3);

  return (
    <Section
      id="templates"
      eyebrow="Templates"
      title="Start with a proven structure"
      description="Reusable formats give every project a strong starting point without flattening the creative idea."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <article key={template.title} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <div className={`aspect-video bg-gradient-to-br ${template.tone} to-slate-950 p-5`}>
              <div className="flex h-full items-end rounded-xl border border-white/10 bg-black/10 p-4">
                <span className="rounded-md bg-black/30 px-2 py-1 text-xs text-white/80">{template.ratio}</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">{template.category}</p>
                <h3 className="mt-1 font-semibold text-white">{template.title}</h3>
              </div>
              <span className="text-slate-500" aria-hidden="true"><FaArrowRight /></span>
            </div>
          </article>
        ))}
      </div>
      {!showAll ? (
        <Link className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300" to="/templates">
          Browse template library <FaArrowRight aria-hidden="true" />
        </Link>
      ) : null}
    </Section>
  );
}

TemplateShowcase.propTypes = {
  showAll: PropTypes.bool,
};

export default TemplateShowcase;
