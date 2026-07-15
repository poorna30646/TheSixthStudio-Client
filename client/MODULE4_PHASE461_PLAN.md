# MODULE4_PHASE461_PLAN (Phase 4.6.1 - ProjectCard “More” dropdown fix)

## Information Gathered
- `src/components/workspace/ProjectMenu.jsx` renders the “More” button and the dropdown.
- The dropdown is currently controlled purely by Tailwind hover (`group-hover:*`) and the dropdown container uses `pointer-events-none` until hover, causing it to disappear immediately when the cursor leaves the button.
- `src/components/workspace/ProjectCard.jsx` only composes `ProjectMenu` and passes `onEdit` / `onDelete` callbacks.
- `src/pages/Workspace/ProjectsPage.jsx` currently wires `onDelete` to the delete flow, but `onEdit` is passed as a no-op. (This does not block fixing the dropdown interaction.)

## Plan
### Step 1: Replace hover-driven dropdown in `ProjectCard.jsx`
- Modify ONLY `src/components/workspace/ProjectCard.jsx`.
- Implement local state inside `ProjectCard` to control whether the menu is open.
- Render a button labeled “More” and the dropdown list (Edit/Delete) inside `ProjectCard`.
- Attach event handlers:
  - Clicking “More” toggles `menuOpen`.
  - Clicking outside the menu closes it.
  - Clicking “Edit” calls the existing `onEdit` callback and closes the menu.
  - Clicking “Delete” calls the existing `onDelete` callback and closes the menu.
- Keep the existing look by reusing the same Tailwind classes already used in `ProjectMenu.jsx`.

### Step 2: Remove dependency on `ProjectMenu` within `ProjectCard`
- Stop rendering `ProjectMenu` from `ProjectCard` so the hover behavior is eliminated.

### Step 3: Ensure click-outside works correctly
- Use a wrapper `ref` and a document `mousedown` listener (within `useEffect`) that checks whether the click target is inside the menu container.

## Dependent Files to be edited
- `src/components/workspace/ProjectCard.jsx`

## Followup steps
- Manual verification: hover no longer hides menu; click Delete/Edit works; outside click closes.

<ask_followup_question>
Confirm proceeding with the plan to implement a click-to-toggle “More” menu (with click-outside close) directly inside `ProjectCard.jsx`, replacing the current `ProjectMenu` usage.
</ask_followup_question>

