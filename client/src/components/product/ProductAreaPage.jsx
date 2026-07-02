import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowRight, FaPlus } from 'react-icons/fa';
import Button from '../common/Button';

/**
 * Module-ready empty state for authenticated product domains.
 */
export function ProductAreaPage({
  eyebrow,
  title,
  description,
  actionLabel,
  emptyTitle,
  emptyDescription,
  children,
}) {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <header className="flex flex-col justify-between gap-5 border-b border-slate-800 pb-7 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">{eyebrow}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
        </div>
        {actionLabel ? (
          <Button className="shrink-0">
            <FaPlus className="text-xs" aria-hidden="true" /> {actionLabel}
          </Button>
        ) : null}
      </header>

      {children ? <div className="mt-7">{children}</div> : null}

      <section className="mt-7 grid min-h-80 place-items-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-8 text-center">
        <div className="max-w-md">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-slate-700 bg-slate-900 text-amber-300">
            <FaArrowRight aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-lg font-semibold text-white">{emptyTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">{emptyDescription}</p>
        </div>
      </section>
    </div>
  );
}

ProductAreaPage.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actionLabel: PropTypes.string,
  emptyTitle: PropTypes.string.isRequired,
  emptyDescription: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default ProductAreaPage;
