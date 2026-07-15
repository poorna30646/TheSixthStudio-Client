/**
 * Projects service (Module 4 - Phase 4.4)
 * Uses existing API layer helpers.
 */

import { endpoints } from '../../api';
import { get, post, patch, del } from '../../api/request';

export async function listProjects() {
  const res = await get(endpoints.projects.list);
  return res?.data?.data ?? res?.data ?? res;
}

export async function createProject(payload) {
  const projectPayload = {
    title: payload?.title ?? '',
    description: payload?.description ?? '',
    visibility: payload?.visibility ?? 'private',
  };
  const res = await post(endpoints.projects.create, projectPayload);
  return res?.data?.data ?? res?.data ?? res;
}

export async function updateProject(projectId, payload) {
  const res = await patch(endpoints.projects.update(projectId), payload);
  return res?.data?.data ?? res?.data ?? res;
}

export async function deleteProject(projectId) {
  if (!projectId) {
    throw new Error('Project id is required to delete a project.');
  }

  const res = await del(endpoints.projects.delete(projectId), {
    data: undefined,
    transformRequest: [(data, headers) => {
      if (headers) {
        delete headers['Content-Type'];
        delete headers['content-type'];
      }
      return data;
    }],
  });
  return res?.data?.data ?? res?.data ?? res;
}

export async function getProject(projectId) {
  const res = await get(endpoints.projects.detail(projectId));
  return res?.data?.data ?? res?.data ?? res;
}
