import React from 'react';
import PropTypes from 'prop-types';
import { FaFolderOpen } from 'react-icons/fa';
import EmptyState from '../common/EmptyState';
import CreateProjectButton from './CreateProjectButton';

/**
 * EmptyProjects
 * Empty state for when no projects match the filters.
 */
export function EmptyProjects({ onCreate }) {
  return (
    <EmptyState
      title="No projects yet"
      description="Create your first project to organize scripts, scenes, source media, collaborators, and output."
      actionLabel="Create project"
      onAction={onCreate}
      icon={FaFolderOpen}
    />
  );
}

EmptyProjects.propTypes = {
  onCreate: PropTypes.func,
};

export default EmptyProjects;

