import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { ButtonLink } from '../common/Button';
import Section from '../layout/Section';

export function CTASection() {
  return (
    <Section>
      <div className="overflow-hidden rounded-3xl border border-amber-400/20 bg-[radial-gradient(circle_at_top_right,_rgba(245,185,66,0.18),_transparent_45%),#10151d] px-6 py-12 text-center sm:px-12 sm:py-16">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Your next video can start here.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">
          Build a repeatable creative workflow with one place for projects, assets, templates, voices, and renders.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink to="/register" size="lg">
            Create your workspace <FaArrowRight aria-hidden="true" />
          </ButtonLink>
          <ButtonLink to="/contact" size="lg" variant="secondary">
            Talk to us
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

export default CTASection;
