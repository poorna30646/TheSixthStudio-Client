import React from 'react';
import PropTypes from 'prop-types';
import ProjectSearch from './ProjectSearch';
import ProjectFilter from './ProjectFilter';
import ProjectSort from './ProjectSort';
import CreateProjectButton from './CreateProjectButton';

/**
 * ProjectsToolbar
 * Presentation-only toolbar: search, filter, sort, view toggle, create.
 */
export function ProjectsToolbar({
  searchValue,
  onSearchChange,
  filterLabel,
  filterValue,
  onFilterChange,
  filterOptions,
  sortValue,
  onSortChange,
  sortOptions,
  viewMode,
  onViewModeChange,
  onCreate,
  createLabel = 'Create project',
}) {
  return (
    <section className="mt-7" aria-label="Projects toolbar">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex-1">
          <ProjectSearch value={searchValue} onChange={onSearchChange} />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end md:flex-row md:justify-end">
          <ProjectFilter
            label={filterLabel}
            value={filterValue}
            onChange={onFilterChange}
            options={filterOptions}
          />
          <ProjectSort label="Sort" value={sortValue} onChange={onSortChange} options={sortOptions} />

          <div className="flex items-center gap-2">
            <button
              type="button"
              className={`rounded-xl border px-3 py-2 text-xs font-semibold ${viewMode === 'grid' ? 'border-slate-600 bg-slate-900 text-white' : 'border-slate-800 bg-slate-900/30 text-slate-300'}`}
              onClick={() => onViewModeChange('grid')}
            >
              Grid
            </button>
            <button
              type="button"
              className={`rounded-xl border px-3 py-2 text-xs font-semibold ${viewMode === 'list' ? 'border-slate-600 bg-slate-900 text-white' : 'border-slate-800 bg-slate-900/30 text-slate-300'}`}
              onClick={() => onViewModeChange('list')}
            >
              List
            </button>
          </div>

          <CreateProjectButton onClick={onCreate} label={createLabel} />
        </div>
      </div>
    </section>
  );
}

ProjectsToolbar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  filterLabel: PropTypes.string,
  filterValue: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filterOptions: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired, label: PropTypes.string.isRequired })).isRequired,
  sortValue: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  sortOptions: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired, label: PropTypes.string.isRequired })).isRequired,
  viewMode: PropTypes.oneOf(['grid', 'list']).isRequired,
  onViewModeChange: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  createLabel: PropTypes.string,
};

export default ProjectsToolbar;

