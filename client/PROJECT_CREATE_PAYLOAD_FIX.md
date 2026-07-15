# PROJECT_CREATE_PAYLOAD_FIX

## What was wrong
`src/pages/Workspace/ProjectsPage.jsx` sent a payload to `create()` containing UI/backend-incompatible fields like `name` and `status`.

## What was changed
Only the `create()` payload inside `src/pages/Workspace/ProjectsPage.jsx` was updated to match the backend contract:

```js
await create({
  title: 'New project',
  description: '',
  visibility: 'private',
  settings: {},
});
```

## Explicit exclusions
The payload does **not** send UI-only or server-side fields such as:
`name, status, owner, thumbnail, createdAt, updatedAt, assetCount, videoCount, voiceCount, id` (and any other UI-only fields).

## Constraints followed
- No changes to `useProjects.js`, `project.service.js`, API layer, backend, authentication, layouts, or routes.
- Modified only the `create()` payload inside `ProjectsPage.jsx`.

