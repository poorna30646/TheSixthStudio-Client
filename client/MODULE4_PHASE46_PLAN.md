# MODULE4_PHASE46_PLAN

## Information Gathered
- `src/pages/Workspace/ProjectsPage.jsx` controls the list and the Delete modal.
- Current Delete data flow uses:
  - `pendingDeleteId` (set in `handleDeleteRequest`)
  - `pendingProject` derived via `normalizedProjects.find(p => p.id === pendingDeleteId)`
  - `DeleteProjectModal` receives `projectName={pendingProject?.name || '—'}`
- If `pendingProject` resolves to `null`, the modal shows `—`.

## Plan
1. Add a dedicated `selectedProject` state in `ProjectsPage.jsx`.
2. When user clicks Delete (via `handleDeleteRequest(project)`):
   - store the complete selected project (or at minimum `id` + `name`/`title`) in `selectedProject`
   - open modal
3. Pass values to `DeleteProjectModal` from `selectedProject`:
   - `projectId={selectedProject?.id}`
   - `projectName={selectedProject?.title ?? selectedProject?.name ?? 'Untitled Project'}`
4. Preserve existing delete logic (`remove(pendingDeleteId)` / confirm handler) and modal design.

## Dependent Files to be edited
- `src/pages/Workspace/ProjectsPage.jsx`

## Followup steps
- Verify Delete modal displays the correct project name.
- Confirm delete confirm still removes the project and refreshes.


