import React from 'react';
import Section from '../layout/Section';
import { TESTIMONIALS } from '../../data/marketing';

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      eyebrow="Creators"
      title="Built around how creative work actually moves"
      description="Placeholder feedback illustrating the teams and workflows the platform is designed to support."
      className="bg-slate-950/50"
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <figure key={testimonial.name} className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <blockquote className="flex-1 text-base leading-7 text-slate-200">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-7 border-t border-slate-800 pt-5">
              <p className="text-sm font-semibold text-white">{testimonial.name}</p>
              <p className="mt-1 text-xs text-slate-500">{testimonial.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

export default Testimonials;
