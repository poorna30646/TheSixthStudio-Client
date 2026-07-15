/**
 * useProjects (Module 4 - Phase 4.4)
 * Responsibilities: Fetch, Create, Update, Delete, Refresh.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createProject,
  deleteProject,
  listProjects,
  updateProject,
} from '../services/projects/project.service';

function normalizeProjectError(error, fallbackMessage = 'Project request failed.') {
  if (error instanceof Error) {
    return error;
  }

  const normalized = new Error(
    error?.response?.data?.message ||
      error?.raw?.response?.data?.message ||
      error?.message ||
      fallbackMessage
  );

  normalized.status = error?.status ?? error?.response?.status ?? error?.raw?.response?.status;
  normalized.errors = error?.errors ?? error?.response?.data?.errors ?? null;
  normalized.raw = error;

  return normalized;
}

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await listProjects();
      // Accept common shapes: { data: [...] } or [...]
      const normalized =
        Array.isArray(result)
          ? result
          : Array.isArray(result?.projects)
            ? result.projects
            : Array.isArray(result?.data)
              ? result.data
              : [];
      setProjects(normalized);
    } catch (e) {
      setError(normalizeProjectError(e, 'Failed to load projects.'));
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const refresh = useCallback(async () => {
    await load();
  }, [load]);

  const create = useCallback(
    async (payload) => {
      setError(null);
      setLoading(true);
      try {
        const created = await createProject(payload);
        await load();
        return created;
      } catch (e) {
        const error = normalizeProjectError(e, 'Failed to create project.');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [load]
  );

  const update = useCallback(
    async (projectId, payload) => {
      setError(null);
      setLoading(true);
      try {
        await updateProject(projectId, payload);
        await load();
      } catch (e) {
        const error = normalizeProjectError(e, 'Failed to update project.');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [load]
  );

  const remove = useCallback(
    async (projectId) => {
      setError(null);
      setLoading(true);
      try {
        await deleteProject(projectId);
        await load();
      } catch (e) {
        const error = normalizeProjectError(e, 'Failed to delete project.');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [load]
  );

  const api = useMemo(
    () => ({ projects, loading, error, refresh, create, update, remove }),
    [projects, loading, error, refresh, create, update, remove]
  );

  return api;
}

export default useProjects;
