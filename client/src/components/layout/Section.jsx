import React from 'react';
import PropTypes from 'prop-types';
import Container from './Container';
import { cn } from '../../utils/cn';

/**
 * Semantic marketing section with shared vertical rhythm.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = '',
  containerClassName = '',
}) {
  return (
    <section id={id} className={cn('scroll-mt-20 py-16 sm:py-20 lg:py-24', className)}>
      <Container className={containerClassName}>
        {eyebrow || title || description ? (
          <header className="mb-10 max-w-3xl sm:mb-12">
            {eyebrow ? (
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-400">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">{description}</p>
            ) : null}
          </header>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

Section.propTypes = {
  id: PropTypes.string,
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default Section;
