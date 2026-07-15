import React from 'react';
import PropTypes from 'prop-types';
import ProjectListItem from './ProjectListItem';

/**
 * ProjectsList
 * List layout for projects.
 */
export function ProjectsList({ projects, statusLookup, onDelete, onEdit }) {
  return (
    <div className="space-y-3" aria-label="Projects list">
      {projects.map((project) => (
        <ProjectListItem
          key={project.id}
          project={project}
          statusLabel={statusLookup(project.status)}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

ProjectsList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
  statusLookup: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default ProjectsList;
