# Module 4 Projects Final Report

## Modified Files

- `src/pages/Workspace/ProjectsPage.jsx`
- `src/hooks/useProjects.js`
- `src/services/projects/project.service.js`
- `src/components/workspace/DeleteProjectModal.jsx`
- `MODULE4_PROJECTS_FINAL_REPORT.md`

## Delete Flow Trace

1. Delete button passes the selected project object into `ProjectsPage`.
2. `ProjectsPage` now normalizes Mongo `_id` into `project.id`.
3. `DeleteProjectModal` receives `projectId={selectedProject?.id}`.
4. `DeleteProjectModal` calls and awaits `onConfirm(projectId)`.
5. `ProjectsPage` confirmation handler calls `await remove(projectId)`.
6. `useProjects.remove()` calls `await deleteProject(projectId)` and then `await load()`.
7. `project.service.deleteProject()` calls `del(endpoints.projects.delete(projectId))`.
8. `endpoints.projects.delete(projectId)` resolves to `/projects/:projectId`.
9. `del()` sends an HTTP `DELETE` request.
10. After success, `ProjectsPage` calls `await refresh()`, closes the modal, and clears the selected project.

## Root Cause

Delete failed because the frontend delete flow depended on `project.id`, but backend project documents can arrive with the MongoDB id in `_id`. The UI displayed project names correctly because it normalized display fields, but it did not normalize `_id` into `id`, so the modal could receive an undefined project id and the DELETE request could not be made for the actual project.

There was also an async flow issue: `DeleteProjectModal` called `onConfirm(projectId)` without awaiting it, and `useProjects.remove()` caught delete errors without rethrowing them. That could hide backend DELETE failures from the page-level confirmation flow.

## Fix

- Added `id: p.id ?? p._id ?? p.projectId` during project normalization in `ProjectsPage`.
- Updated `DeleteProjectModal` to `await onConfirm?.(projectId)`.
- Updated the `ProjectsPage` delete confirmation order to:
  - `await remove(projectId)`
  - `await refresh()`
  - close the modal
  - clear the selected project
- Updated `useProjects.remove()` to keep `await deleteProject(projectId); await load();` and rethrow caught errors after storing them in state.
- Added a guard in `deleteProject(projectId)` so missing ids fail with a meaningful error.
- Verified the service uses `DELETE /projects/:projectId` via `endpoints.projects.delete(projectId)`.
- Constrained `createProject()` to send only `{ title, description, visibility }`.

## Verification Notes

- No browser reload was added.
- No backend, auth, routing, layout, style, theme, context, navigation, or unrelated modules were changed.
- No build, test, lint, formatter, or dev server command was run.
