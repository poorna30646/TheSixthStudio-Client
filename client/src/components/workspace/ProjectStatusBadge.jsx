import React from 'react';
import PropTypes from 'prop-types';

const statusStyles = {
  draft: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  in_progress: 'border-sky-400/30 bg-sky-400/10 text-sky-200',
  review: 'border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200',
  published: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
};

/**
 * ProjectStatusBadge
 * Visual status label for a project.
 */
export function ProjectStatusBadge({ status, label }) {
  const style = statusStyles[status] || 'border-slate-600 bg-slate-800/40 text-slate-200';

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${style}`}> 
      {label}
    </span>
  );
}

ProjectStatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default ProjectStatusBadge;

