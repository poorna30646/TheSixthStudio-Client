import React from 'react';
import PropTypes from 'prop-types';
import ProjectStatusBadge from './ProjectStatusBadge';
import ProjectMenu from './ProjectMenu';

/**
 * ProjectListItem
 * Row presentation for a single project.
 */
export function ProjectListItem({ project, statusLabel, onDelete, onEdit }) {
  const handleEdit = () => {
    onEdit?.(project);
  };

  const handleDelete = () => {
    onDelete?.(project);
  };

  return (
    <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:grid-cols-[1.4fr_0.9fr_0.9fr_0.7fr_0.8fr_0.6fr] sm:items-center">
      <div className="flex items-start gap-3">
        <div className={`mt-1 h-12 w-12 rounded-2xl ${project.thumbnailColor || 'bg-slate-800'}`} aria-hidden="true" />
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white">{project.name}</div>
          <div className="mt-1 line-clamp-1 text-xs text-slate-400">{project.description}</div>
          <div className="mt-2 text-xs text-slate-500">Owner: {project.ownerName}</div>
        </div>
      </div>

      <div className="text-sm text-slate-300">{new Date(project.createdAt).toLocaleDateString()}</div>
      <div className="text-sm text-slate-300">{new Date(project.updatedAt).toLocaleDateString()}</div>
      <div>
        <ProjectStatusBadge status={project.status} label={statusLabel} />
      </div>
      <div className="text-sm text-slate-300">{project.videoCount} vids</div>
      <div className="justify-self-end">
        <ProjectMenu onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}

ProjectListItem.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    status: PropTypes.string.isRequired,
    videoCount: PropTypes.number.isRequired,
    thumbnailColor: PropTypes.string,
    ownerName: PropTypes.string,
  }).isRequired,
  statusLabel: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default ProjectListItem;
