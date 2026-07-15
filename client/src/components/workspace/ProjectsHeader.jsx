import React from 'react';
import PropTypes from 'prop-types';

/**
 * ProjectsHeader
 * Presentation-only page heading for Projects Management.
 */
export function ProjectsHeader({ eyebrow = 'Production', title = 'Projects', description }) {
  return (
    <header className="flex flex-col justify-between gap-5 border-b border-slate-800 pb-7 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">{title}</h1>
        {description ? <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p> : null}
      </div>
    </header>
  );
}

ProjectsHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default ProjectsHeader;

