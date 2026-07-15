import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';

/**
 * ProjectMenu
 * Minimal UI-only More menu. Items are static presentation.
 */
export function ProjectMenu({ onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-end">
      <div className="group relative">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-9 rounded-lg border border-slate-800 bg-slate-900/30 px-3 text-xs text-slate-300"
          aria-label="Project actions"
        >
          More
        </Button>
        {/* UI-only popover: no animation, always rendered but visually subtle */}
        <div className="pointer-events-none absolute right-0 mt-2 w-44 rounded-xl border border-slate-800 bg-slate-950 p-2 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100">
          <button type="button" className="w-full rounded-lg px-3 py-2 text-left text-xs text-slate-200 hover:bg-slate-900" onClick={onEdit}>
            Edit details
          </button>
          <button type="button" className="w-full rounded-lg px-3 py-2 text-left text-xs text-rose-200 hover:bg-rose-500/10" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

ProjectMenu.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ProjectMenu;

