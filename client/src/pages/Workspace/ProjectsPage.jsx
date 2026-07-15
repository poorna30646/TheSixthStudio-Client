import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    DeleteProjectModal,
    EmptyProjects,
    ProjectsGrid,
    ProjectsHeader,
    ProjectsList,
    ProjectsToolbar,
  } from '../../components/workspace';
import CreateProjectModal from '../../components/workspace/CreateProjectModal';
import EditProjectModal from '../../components/workspace/EditProjectModal';

import { PROJECT_STATUSES } from '../../data/projects';
import { useProjects } from '../../hooks/useProjects';

/**
 * ProjectsPage (Module 4 - Phase 4.4)
 * Projects Management UI wired to backend CRUD.
 */
export function ProjectsPage() {
  const navigate = useNavigate();

  const {
    projects: rawProjects,
    loading,
    error,
    refresh,
    create,
    update,
    remove,
  } = useProjects();

  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [sortValue, setSortValue] = useState('updated_desc');
  const [viewMode, setViewMode] = useState('grid');

  // kept for UI state, but delete uses selectedProject?.id
  const setPendingDeleteId = () => {};
  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);


  const statusByValue = useMemo(() => {
    const map = new Map(PROJECT_STATUSES.map((s) => [s.value, s]));
    return map;
  }, []);

  const statusLabelLookup = (status) => {
    return statusByValue.get(status)?.label || 'Unknown';
  };

  const filterOptions = useMemo(
    () => [
      { value: 'all', label: 'All statuses' },
      ...PROJECT_STATUSES.map((s) => ({ value: s.value, label: s.label })),
    ],
    []
  );

  const sortOptions = useMemo(
    () => [
      { value: 'updated_desc', label: 'Recently updated' },
      { value: 'updated_asc', label: 'Oldest updated' },
      { value: 'name_asc', label: 'Name (A-Z)' },
      { value: 'name_desc', label: 'Name (Z-A)' },
    ],
    []
  );

  const normalizedProjects = useMemo(() => {
    return (rawProjects || []).map((p) => ({
      ...p,
      id: p.id ?? p._id ?? p.projectId,
      ownerName:
        p.ownerName ??
        p.owner?.name ??
        p.owner?.fullName ??
        p.owner?.username ??
        (typeof p.ownerId === 'string' || typeof p.ownerId === 'number'
          ? String(p.ownerId)
          : undefined) ??
        'You',

      thumbnailColor: p.thumbnailColor ?? p.color ?? 'bg-slate-800',
      videoCount: p.videoCount ?? p.videosCount ?? p.video?.count ?? 0,
      assetCount: p.assetCount ?? p.assetsCount ?? p.asset?.count ?? 0,
      voiceCount: p.voiceCount ?? p.voicesCount ?? p.voice?.count ?? 0,
      name: p.name ?? p.title ?? 'Untitled project',
      description: p.description ?? p.summary ?? '',
      createdAt: p.createdAt ?? p.created_at ?? p.created ?? new Date().toISOString(),
      updatedAt: p.updatedAt ?? p.updated_at ?? p.updated ?? new Date().toISOString(),
      status: p.status ?? 'draft',
    }));
  }, [rawProjects]);

  const visibleProjects = useMemo(() => {
    const q = searchValue.trim().toLowerCase();

    let list = normalizedProjects;

    if (filterValue !== 'all') {
      list = list.filter((p) => p.status === filterValue);
    }

    if (q) {
      list = list.filter((p) => {
        return (
          (p.name || '').toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q) ||
          (p.ownerName || '').toLowerCase().includes(q)
        );
      });
    }

    const sorted = [...list];

    if (sortValue === 'updated_desc') {
      sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } else if (sortValue === 'updated_asc') {
      sorted.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
    } else if (sortValue === 'name_asc') {
      sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sortValue === 'name_desc') {
      sorted.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    }

    return sorted;
  }, [filterValue, normalizedProjects, searchValue, sortValue]);



  const [createOpen, setCreateOpen] = useState(false);

  const handleCreateSubmit = async (payload) => {
    // Backend contract: ONLY { title, description, visibility }
    // Frontend may provide other keys; normalize to backend validator.
    const normalizedPayload = {
      title: payload?.title ?? payload?.name ?? '',
      description: payload?.description ?? '',
      visibility: payload?.visibility ?? 'private',
    };

    const created = await create(normalizedPayload);

    // Close modal + refresh list after successful creation.
    setCreateOpen(false);
    await refresh();

    // Backend may return created project under different shapes.
    const id =
      created?.id ??
      created?.project?.id ??
      created?.data?.id ??
      created?.projectId ??
      created?.data?.projectId;

    if (id) {
      navigate(`/workspace/${id}`);
    }

    return created;
  };


  const handleOpenCreate = () => {
    setCreateOpen(true);
  };

  const handleCreate = handleOpenCreate;



  const handleDeleteRequest = (project) => {
    setSelectedProject(project);
    setPendingDeleteId(project.id);
    setDeleteOpen(true);
  };

  const handleEditRequest = (project) => {
    setSelectedProject(project);
    setEditOpen(true);
  };

  const handleEditSubmit = async (payload) => {
    const projectId = selectedProject?.id;
    if (!projectId) {
      const error = new Error('Project id is required to update a project.');
      console.error(error);
      throw error;
    }

    const normalizedPayload = {
      title: payload?.title ?? payload?.name ?? '',
      description: payload?.description ?? '',
      visibility: payload?.visibility ?? 'private',
    };

    try {
      const updated = await update(projectId, normalizedPayload);
      await refresh();
      setEditOpen(false);
      setSelectedProject(null);
      return updated;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };






  return (
    <div className="mx-auto w-full max-w-7xl">
      <ProjectsHeader
        eyebrow="Production"
        title="Projects"
        description="Organize scripts, scenes, source media, collaborators, and output around each production."
      />

      <ProjectsToolbar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterLabel="Filter"
        filterValue={filterValue}
        onFilterChange={setFilterValue}
        filterOptions={filterOptions}
        sortValue={sortValue}
        onSortChange={setSortValue}
        sortOptions={sortOptions}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onCreate={handleCreate}
        createLabel="Create project"
      />

      <section className="mt-7">
        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 text-sm text-slate-300">
            Loading projects…
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-rose-800 bg-rose-900/10 p-6 text-sm text-rose-200">
            {error?.message || 'Failed to load projects.'}
          </div>
        ) : visibleProjects.length === 0 ? (
          <EmptyProjects onCreate={handleCreate} />
        ) : viewMode === 'grid' ? (
          <ProjectsGrid
            projects={visibleProjects}
            statusLookup={statusLabelLookup}
            onDelete={handleDeleteRequest}
            onEdit={handleEditRequest}
          />
        ) : (
          <ProjectsList
            projects={visibleProjects}
            statusLookup={statusLabelLookup}
            onDelete={handleDeleteRequest}
            onEdit={handleEditRequest}
          />
        )}
      </section>

      <CreateProjectModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateSubmit}
        submitting={loading}
      />

      <DeleteProjectModal
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setPendingDeleteId(null);
          setSelectedProject(null);
        }}
        projectId={selectedProject?.id}
        onConfirm={async (projectId) => {
          try {
            await remove(projectId);
            await refresh();
            setDeleteOpen(false);
            setPendingDeleteId(null);
            setSelectedProject(null);
          } catch (error) {
            console.error(error);
          }
        }}
        projectName={
          selectedProject?.title ??
          selectedProject?.name ??
          'Untitled Project'
        }
      />

      <EditProjectModal
        open={editOpen}
        project={selectedProject}
        onClose={() => {
          setEditOpen(false);
          setSelectedProject(null);
        }}
        onUpdate={handleEditSubmit}
        submitting={loading}
      />



      {/* Wire open to card click without modifying card UI: handled by menu/edit callbacks in the future. */}

    </div>
  );
}

export default ProjectsPage;
