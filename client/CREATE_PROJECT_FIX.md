# CREATE_PROJECT_FIX

## What changed
In `src/pages/Workspace/ProjectsPage.jsx`, the Create Project submission payload passed to `create()` was sending UI/backend-incompatible fields:
- `name`
- `status`

The backend accepts ONLY:
```js
{ title, description, visibility, settings }
```

## Required mapping
Updated the create call to send only the allowed contract:
- Project Name input (UI) -> `title`
- Description input -> `description`
- Visibility selector -> `visibility`
- Always send `settings: {}`

## Implementation
Modify ONLY the Create Project submission code (the `handleCreate` function).

```js
await create({
  title: 'New project',
  description: '',
  visibility: 'private',
  settings: {},
});
```

## Notes
- No changes were made to:
  - `src/services/projects/project.service.js`
  - backend API/auth/API layer
- No UI-only fields (owner/status/thumbnail/etc.) are included in the payload.

