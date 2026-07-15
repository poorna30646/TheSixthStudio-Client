import React from 'react';
import PropTypes from 'prop-types';
import ProjectCard from './ProjectCard';

/**
 * ProjectsGrid
 * Card grid layout for projects.
 */
export function ProjectsGrid({ projects, statusLookup, onDelete, onEdit }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Projects grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          statusLabel={statusLookup(project.status)}
          onDelete={() => onDelete(project)}
          onEdit={() => onEdit(project)}
        />
      ))}
    </div>
  );
}

ProjectsGrid.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
  statusLookup: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default ProjectsGrid;

