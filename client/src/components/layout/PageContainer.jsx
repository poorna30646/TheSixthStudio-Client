import React from 'react';
import PropTypes from 'prop-types';
import Container from './Container';
import { cn } from '../../utils/cn';

/**
 * Shared top-level wrapper for standard public pages.
 */
export function PageContainer({ eyebrow, title, description, children, className = '' }) {
  return (
    <div className={cn('min-h-[70vh] pb-20 pt-28 sm:pt-32', className)}>
      <Container>
        <header className="max-w-3xl border-b border-slate-800 pb-10 sm:pb-14">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-400">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 text-lg leading-8 text-slate-400">{description}</p>
          ) : null}
        </header>
        <div className="pt-12 sm:pt-16">{children}</div>
      </Container>
    </div>
  );
}

PageContainer.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default PageContainer;
