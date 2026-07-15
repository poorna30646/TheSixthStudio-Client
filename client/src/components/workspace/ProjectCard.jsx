import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ProjectStatusBadge from './ProjectStatusBadge';


/**
 * ProjectCard
 * Card layout presentation for a single project.
 */
export function ProjectCard({ project, statusLabel, onDelete, onEdit }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;

    const onDocumentMouseDown = (e) => {
      const el = menuRef.current;
      if (!el) return;
      if (el.contains(e.target)) return;
      closeMenu();
    };

    document.addEventListener('mousedown', onDocumentMouseDown);
    return () => document.removeEventListener('mousedown', onDocumentMouseDown);
  }, [menuOpen]);

  const handleEdit = () => {
    onEdit?.(project);
    closeMenu();
  };

  const handleDelete = () => {
    onDelete?.(project);
    closeMenu();
  };

  const actionButtonLabel = useMemo(() => 'More', []);

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5" aria-label={`Project ${project.name}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className={`h-14 w-14 rounded-2xl ${project.thumbnailColor || 'bg-slate-800'}`} aria-hidden="true" />
          <h3 className="mt-3 truncate text-base font-semibold text-white">{project.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-400">{project.description}</p>
        </div>
        <div className="shrink-0">
          <div ref={menuRef} className="relative">
            <button
              type="button"
              className="h-9 rounded-lg border border-slate-800 bg-slate-900/30 px-3 text-xs text-slate-300"
              aria-label="Project actions"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {actionButtonLabel}
            </button>

            {menuOpen ? (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-800 bg-slate-950 p-2 opacity-100">
                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2 text-left text-xs text-slate-200 hover:bg-slate-900"
                  onClick={handleEdit}
                >
                  Edit details
                </button>
                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2 text-left text-xs text-rose-200 hover:bg-rose-500/10"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>


      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Created</p>
          <p className="mt-1 text-xs text-slate-300">{new Date(project.createdAt).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Updated</p>
          <p className="mt-1 text-xs text-slate-300">{new Date(project.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <ProjectStatusBadge status={project.status} label={statusLabel} />
        <span className="text-xs text-slate-400">·</span>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300">
          <span>{project.videoCount} videos</span>
          <span>{project.assetCount} assets</span>
          <span>{project.voiceCount} voices</span>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">Owner: {project.ownerName}</p>
    </article>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    status: PropTypes.string.isRequired,
    videoCount: PropTypes.number.isRequired,
    assetCount: PropTypes.number.isRequired,
    voiceCount: PropTypes.number.isRequired,
    ownerName: PropTypes.string,
    thumbnailColor: PropTypes.string,
  }).isRequired,
  statusLabel: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default ProjectCard;

