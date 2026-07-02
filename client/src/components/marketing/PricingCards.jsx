import React from 'react';
import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa';
import { ButtonLink } from '../common/Button';
import Section from '../layout/Section';
import { PRICING_PLANS } from '../../data/marketing';
import { cn } from '../../utils/cn';

export function PricingCards({ preview = false }) {
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title="Start simple. Scale when the work does."
      description="Transparent placeholder plans structured for individuals, creators, and growing studios."
    >
      <div className="grid items-stretch gap-5 lg:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <article
            key={plan.name}
            className={cn(
              'relative flex flex-col rounded-2xl border bg-slate-900 p-6',
              plan.featured ? 'border-amber-400/60 shadow-xl shadow-amber-950/20' : 'border-slate-800'
            )}
          >
            {plan.featured ? (
              <span className="absolute right-5 top-5 rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                Most popular
              </span>
            ) : null}
            <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{plan.description}</p>
            <p className="mt-6">
              <span className="text-4xl font-semibold tracking-tight text-white">{plan.price}</span>
              <span className="ml-2 text-sm text-slate-500">{plan.period}</span>
            </p>
            <ul className="my-7 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                  <FaCheck className="text-xs text-amber-400" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <ButtonLink
              to="/register"
              variant={plan.featured ? 'primary' : 'secondary'}
              fullWidth
              className="mt-auto"
            >
              {plan.cta}
            </ButtonLink>
          </article>
        ))}
      </div>
      {preview ? (
        <p className="mt-6 text-center text-sm text-slate-500">
          Plan names and limits are placeholders for the final commercial configuration.
        </p>
      ) : null}
    </Section>
  );
}

PricingCards.propTypes = {
  preview: PropTypes.bool,
};

export default PricingCards;
