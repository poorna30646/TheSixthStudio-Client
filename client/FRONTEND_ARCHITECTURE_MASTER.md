# TheSixthStudio Frontend Architecture Master Blueprint

## 1. Product Vision

TheSixthStudio is a modern AI-powered creative studio for generating, managing, and rendering video and audio content at scale. The product combines the ease of Canva, the speed of Runway ML, the editing experience of CapCut Web, the voice quality of ElevenLabs Studio, and the structured collaboration experience of Notion and Linear.

The frontend must be designed as a premium, high-performance SaaS product that serves creators, teams, and enterprises. It must support rapid iteration, robust collaboration, secure authentication, rich media workflows, asynchronous rendering, and future platform expansion.

### Product Objectives
- Deliver a world-class creator experience for video generation and asset management.
- Support both solo creators and collaborative teams.
- Provide high-confidence reliability for long-running render workflows.
- Maintain a premium visual language while remaining accessible and performant.
- Scale cleanly from MVP to millions of users and enterprise-grade usage.

### Product Principles
- Clarity over complexity.
- Speed over clutter.
- Reliability over novelty.
- Accessibility by default.
- Modular architecture with future extensibility.
- Progressive enhancement rather than over-engineering.

### Success Metrics
- Fast initial load under targeted performance budgets.
- Clear and reliable upload and render UX.
- Low error rates in auth and critical workflows.
- High satisfaction for creators completing a project from creation to render.

---

## 2. Information Architecture

The information architecture is organized around the core product domains:

1. Authentication and Account
2. Workspace and Projects
3. Asset Library
4. Templates
5. Voice Library
6. Video Studio
7. Rendering and History
8. Settings and Preferences

### Core Information Groups

#### A. Identity and Access
- Login
- Register
- Forgot Password
- Reset Password
- Verify Email
- Profile
- Security

#### B. Workspace and Creation
- Dashboard
- Projects
- Project Detail
- New Project
- Shared Projects

#### C. Media and Assets
- Assets Browser
- Upload Center
- Asset Detail
- Asset Collections

#### D. Creative Building Blocks
- Templates
- Voice Library
- Custom Voices
- Presets

#### E. Production and Rendering
- Video Studio
- Editor Workspace
- Render Queue
- Render History

#### F. Settings and Administration
- Account Settings
- Notification Settings
- Billing (future)
- Team Management (future)
- Permissions (future)

### IA Principles
- The most frequently used workflows should be one to three clicks away.
- Project-centric navigation should always be available.
- Users should never lose context when moving between asset, template, voice, and render activities.
- Layout should support both focused creator workflows and overview dashboards.

---

## 3. Complete User Journey Maps

### Journey 1: New User Signup to First Project
1. User lands on marketing/home experience.
2. User signs up or logs in.
3. User is guided to dashboard.
4. User creates first project.
5. User uploads or selects assets.
6. User chooses a template.
7. User selects voice.
8. User creates a video draft.
9. User submits render request.
10. User receives completion notification.

### Journey 2: Returning Creator Browsing Assets
1. User logs in.
2. Sees dashboard and recent activity.
3. Opens asset library.
4. Filters assets.
5. Selects relevant media.
6. Adds to an existing project.
7. Continues editing.

### Journey 3: Team Collaboration Flow
1. User opens shared project.
2. Sees collaborators and project activity.
3. Adds or updates assets and scenes.
4. Submits render request.
5. Team receives updates.

### Journey 4: Render Monitoring Flow
1. User submits render job.
2. UI transitions to render monitoring screen.
3. User watches progress and status updates.
4. If failure occurs, user retries or adjusts settings.
5. Result is saved and accessible from project history.

### Journey 5: Template-Based Creation Flow
1. User opens templates page.
2. Filters templates by category or use case.
3. Selects a template.
4. Customizes it.
5. Saves as a draft or submits for render.

### Journey 6: Voice Selection Flow
1. User enters voice studio.
2. Searches voices by style, language, or tone.
3. Previews sample audio.
4. Selects voice for project.
5. Applies to one or more scenes.

---

## 4. UX Flow Diagrams

### Authentication Flow
```text
Landing -> Login/Register -> Verify Email (if required) -> Dashboard
                           \-> Forgot Password -> Reset Password -> Login
```

### Project Creation Flow
```text
Dashboard -> New Project -> Project Setup -> Upload/Select Assets -> Choose Template -> Create Video -> Render -> History
```

### Asset Upload Flow
```text
Assets Page -> Upload Card -> Request Presigned URL -> Direct S3 Upload -> Register Asset -> Asset Library Update -> Project Association
```

### Render Flow
```text
Video Studio -> Configure Scene/Assets/Voice -> Submit Render -> Queue -> Poll Status -> Success/Failure -> Project History
```

### Template Flow
```text
Templates Page -> Preview Template -> Select Template -> Create Project From Template -> Customize -> Render
```

### Settings Flow
```text
Settings -> Profile/Security/Notifications -> Validate -> Save -> Confirm Toast
```

---

## 5. Navigation Architecture

The navigation system should be predictable, hierarchical, and context-aware.

### Primary Navigation
- Dashboard
- Projects
- Assets
- Video Studio
- Voice Studio
- Templates
- Settings

### Secondary Navigation
- Profile
- Notifications
- Search
- Command Palette
- Help Center

### Contextual Navigation
- Project breadcrumb
- Asset breadcrumb
- Render history breadcrumb
- Current selection toolbar

### Navigation Rules
- Global navigation remains persistent in desktop layouts.
- Navigation collapses into a compact drawer on tablet/mobile.
- Recently used content should be accessible from the dashboard and command palette.

---

## 6. Routing Architecture

The routing model must be centralized, declarative, and scalable.

### Route Groups

#### Public Routes
- /login
- /register
- /forgot-password
- /reset-password
- /verify-email
- /welcome
- /pricing (future)

#### Authenticated Routes
- /dashboard
- /projects
- /projects/new
- /projects/:projectId
- /assets
- /assets/:assetId
- /video-studio
- /video-studio/new
- /video-studio/:videoId
- /video-studio/render/:renderId
- /voice-studio
- /voice-studio/:voiceId
- /templates
- /templates/:templateId
- /settings
- /profile
- /notifications

#### Error Routes
- /404
- /error

### Routing Principles
- Route definitions should be centralized.
- Every route should declare its permissions and layout expectation.
- Lazy loading will be used for route-level code splitting.
- Route-level error boundaries should be standard.

---

## 7. Complete Folder Structure

```text
src/
  App.js
  index.js
  index.css
  App.css
  assets/
    fonts/
    icons/
    images/
    videos/
  components/
    common/
      Button/
      Input/
      Textarea/
      Select/
      Checkbox/
      Switch/
      Avatar/
      Badge/
      Tooltip/
      Chip/
      Divider/
      Skeleton/
      Loader/
      ProgressBar/
      EmptyState/
      Modal/
      Drawer/
      Dropdown/
      Breadcrumb/
      Pagination/
      SearchBox/
      FilterBar/
      CommandPalette/
      ToastProvider/
      ErrorBoundary/
    layout/
      Navbar/
      Sidebar/
      AppShell/
      PageHeader/
      ContentPanel/
      Footer/
      MobileNav/
    auth/
      AuthLayout/
      AuthCard/
      SocialProof/
      PasswordStrengthMeter/
    dashboard/
      StatsCard/
      ActivityFeed/
      RecentProjectsCard/
      QuickActionsCard/
    projects/
      ProjectCard/
      ProjectForm/
      ProjectMembersPanel/
      ProjectSettingsPanel/
    assets/
      UploadCard/
      AssetCard/
      AssetGrid/
      AssetFilterBar/
      AssetPreviewModal/
      AssetUploader/
      AssetUploadQueue/
    templates/
      TemplateCard/
      TemplateGrid/
      TemplatePreviewModal/
      TemplateForm/
    voice/
      VoiceCard/
      VoiceList/
      VoicePreviewPlayer/
      VoiceSelector/
    video/
      VideoStudioShell/
      TimelineEditor/
      ScenePanel/
      MediaPanel/
      PreviewPanel/
      RenderPanel/
      RenderStatusCard/
      VideoCard/
    settings/
      SettingsSection/
      ProfileForm/
      SecuritySection/
      NotificationSettings/
  constants/
    api.js
    routes.js
    ui.js
    permissions.js
    enums.js
  context/
    AuthContext.js
    UserContext.js
    UIContext.js
    ProjectContext.js
    AssetContext.js
    TemplateContext.js
    VoiceContext.js
    VideoContext.js
    UploadContext.js
    NotificationContext.js
  hooks/
    useAuth.js
    useProjects.js
    useAssets.js
    useTemplates.js
    useVoices.js
    useVideoStudio.js
    useUploadQueue.js
    useDebounce.js
    useMediaQuery.js
    usePagination.js
    useCommandPalette.js
    useLocalStorage.js
  layouts/
    PublicLayout.js
    AuthLayout.js
    AppLayout.js
    WorkspaceLayout.js
  pages/
    Auth/
      LoginPage.js
      RegisterPage.js
      ForgotPasswordPage.js
      ResetPasswordPage.js
      VerifyEmailPage.js
    Dashboard/
      DashboardPage.js
    Projects/
      ProjectsPage.js
      ProjectDetailPage.js
      CreateProjectPage.js
    Assets/
      AssetsPage.js
      AssetDetailPage.js
    Templates/
      TemplatesPage.js
      TemplateDetailPage.js
    VoiceStudio/
      VoiceStudioPage.js
    VideoStudio/
      VideoStudioPage.js
      CreateVideoPage.js
      RenderDetailPage.js
    Settings/
      SettingsPage.js
      ProfilePage.js
    NotFoundPage.js
  routes/
    AppRoutes.js
    ProtectedRoute.js
    PublicRoute.js
    RouteConfig.js
  services/
    api.js
    authService.js
    projectService.js
    assetService.js
    uploadService.js
    templateService.js
    voiceService.js
    videoService.js
    renderService.js
    notificationService.js
    storageService.js
  store/
    index.js
    persistence.js
  styles/
    themes/
      light.js
      dark.js
    tokens/
      colors.js
      spacing.js
      typography.js
      radius.js
      shadows.js
  utils/
    formatters.js
    validators.js
    helpers.js
    uploadHelpers.js
    queryParams.js
    localStorage.js
    dateUtils.js
```

---

## 8. Feature-based Module Architecture

Each major domain will be implemented as a self-contained feature module with its own components, hooks, context, and service integration.

### Module Boundaries
- Auth Module
- Workspace Module
- Project Module
- Asset Module
- Template Module
- Voice Module
- Video Module
- Settings Module
- Shared UI Module

### Module Contract
Each module should expose:
- page entry points
- feature components
- local hooks
- local context or provider if needed
- domain services
- route definitions

### Module Isolation Rules
- Modules must not directly mutate each other’s state.
- Cross-module interactions should happen via shared contexts or explicit services.
- Shared UI should remain framework-agnostic in shape and behavior.

---

## 9. Design System

The design system must be consistent, scalable, and implementation-friendly.

### Design Goals
- Make the UI feel premium and modern.
- Support accessible interactions across keyboard and screen reader usage.
- Maintain a consistent visual rhythm across all pages.
- Scale from MVP components to enterprise surfaces.

### Design System Layers
1. Foundations
   - color
   - typography
   - spacing
   - radius
   - shadows
   - motion
2. Components
   - buttons
   - inputs
   - cards
   - dialogs
   - drawers
   - nav
   - tables
   - lists
3. Patterns
   - empty states
   - loading states
   - authentication cards
   - workspace shells
   - asset browsers
   - video editor panels

---

## 10. Typography Scale

Typography should be purposeful and highly legible.

### Type Scale
- Display: 48/56, 40/48, 32/40
- Heading 1: 28/36
- Heading 2: 24/32
- Heading 3: 20/28
- Heading 4: 16/24
- Body Large: 18/28
- Body Base: 16/24
- Body Small: 14/20
- Caption: 12/16
- Tiny: 11/14

### Font Usage Rules
- Product UI should use a clean sans serif font family.
- Headings should use strong weight and high contrast.
- Body text should prioritize readability over ornamentation.
- Typography should support localization and text expansion.

---

## 11. Color System

The color system must support light and dark themes with semantic meaning.

### Semantic Color Roles
- Primary
- Secondary
- Success
- Warning
- Error
- Info
- Surface
- Border
- Text Primary
- Text Secondary
- Text Muted
- Overlay

### Color Principles
- Use semantic color roles, not arbitrary color values.
- Provide sufficient contrast for accessibility.
- Avoid relying on color alone for state indication.
- Use color to reinforce hierarchy and intent.

---

## 12. Spacing System

Use a tokenized spacing scale to maintain alignment.

### Spacing Scale
- 0px
- 2px
- 4px
- 8px
- 12px
- 16px
- 20px
- 24px
- 32px
- 40px
- 48px
- 64px
- 80px
- 96px

### Usage Rules
- Stack spacing should be consistent by component type.
- Containers should use predictable padding and gap values.
- Mobile tokens should be slightly reduced for density.

---

## 13. Elevation System

Elevation is used to communicate layering and focus.

### Elevation Levels
- Level 0: flat
- Level 1: subtle shadow
- Level 2: standard card elevation
- Level 3: modal/dialog surface
- Level 4: overlays and popovers

### Elevation Rules
- Lower layers should not compete with primary content.
- Overlays should have strong separation from underlying content.
- Shadows should be subtle and consistent.

---

## 14. Animation & Motion Guidelines

Animation should enhance clarity, not distract.

### Motion Principles
- Motion should support hierarchy, state changes, and transitions.
- Keep transitions short and purposeful.
- Avoid excessive easing and bouncing.
- Respect reduced-motion preferences.

### Motion Tokens
- Fast: 120ms
- Standard: 180ms
- Slow: 240ms

### Common Animations
- fade in/out
- slide up/down
- scale transitions
- progress transitions
- staggered list reveal

---

## 15. Responsive Design Strategy

The platform must be first-class on mobile, tablet, desktop, and large displays.

### Breakpoints
- Mobile: 0-639px
- Tablet: 640-1023px
- Desktop: 1024-1439px
- Large Desktop: 1440px+

### Responsive Principles
- Use mobile-first design.
- Sidebar and panels should collapse or reflow gracefully.
- Complex editing surfaces should adapt to available space with contextual panels.
- Touch targets should be a minimum of 44px.

### Responsive Layout Examples
- Mobile: single-column dashboard, bottom sheet navigation, compact editing tools.
- Tablet: split view for preview and tool panels.
- Desktop: full multi-panel studio workspace.

---

## 16. Component Design System

Components must be designed as reusable building blocks with clear props, variants, states, and accessibility semantics.

### Component Design Rules
- Prefer composition over inheritance.
- Components should be stateless where possible.
- Business logic should stay out of presentational components.
- Each component should be documented with usage and behavior expectations.

### Composition Patterns
- Compound components for complex UI surfaces.
- Render props or slots should be used sparingly and intentionally.
- Shared primitives should be built with accessibility-first defaults.

---

## 17. Component Inventory

### Layout Components
- AppShell
- Sidebar
- Navbar
- MobileNav
- PageHeader
- ContentPanel
- Breadcrumb
- Footer

### Form Components
- Button
- Input
- Textarea
- Select
- Checkbox
- RadioGroup
- Switch
- Fieldset
- FormSection

### Feedback Components
- Loader
- Skeleton
- ProgressBar
- Toast
- EmptyState
- Badge
- Tooltip

### Overlay Components
- Modal
- Drawer
- Dropdown
- Popover
- CommandPalette

### Feature Components
- ProjectCard
- AssetCard
- UploadCard
- TemplateCard
- VoiceCard
- VideoCard
- TimelineEditor
- RenderStatusCard
- ScenePanel
- MediaPanel

---

## 18. Component Props & States

Every component must be defined with consistent props and state contracts.

### Button Props
- variant
- size
- disabled
- loading
- iconLeft
- iconRight
- fullWidth

### Input Props
- label
- placeholder
- value
- error
- helperText
- required
- disabled

### Modal Props
- open
- title
- description
- size
- onClose
- actions

### Card Props
- title
- subtitle
- actions
- selected
- loading

### Asset Card Props
- asset
- onSelect
- onPreview
- onDelete
- compact

### Timeline Editor Props
- scenes
- selectedSceneId
- onSelectScene
- onUpdateScene
- onAddScene

### Component State Model
- idle
- loading
- success
- error
- empty
- disabled

---

## 19. Layout Architecture

The layout system will support at least three primary shells:

### Public Layout
- Minimal structure for auth and marketing experiences.

### App Layout
- Sidebar + top navbar + main content for standard product areas.

### Studio Layout
- Full-screen workspace optimized for video editing workflows.

### Layout Responsibilities
- Consistent header and navigation
- Support for contextual panels
- Persistent editing controls
- Mobile adaptation and fallback behavior

---

## 20. Global Providers

The application will use a provider hierarchy to ensure global behaviors are consistent.

### Provider Order
1. ThemeProvider
2. AuthProvider
3. UserProvider
4. UIProvider
5. NotificationProvider
6. ModalProvider
7. DrawerProvider
8. RouteProvider
9. Query/Service Provider layer

### Provider Responsibilities
- Session state
- Theme state
- Notification state
- Modal and drawer orchestration
- Responsive helpers
- Feature context sharing

---

## 21. Context Architecture

Contexts must be intentional, domain-specific, and low-overhead.

### AuthContext
State
- currentUser
- accessToken
- refreshToken state
- authLoading
- authError
- isAuthenticated

Actions
- login
- logout
- register
- refreshSession
- verifyEmail
- resetPassword

Persistence
- session persistence in secure storage if permitted by environment

Consumers
- route guards
- navbar
- settings/profile pages

### UserContext
State
- profile
- preferences
- avatars
- notifications settings

Actions
- updateProfile
- updatePreferences
- changeTheme

Consumers
- settings/profile
- navbar

### UIContext
State
- sidebarOpen
- mobileNavOpen
- commandPaletteOpen
- activeModal
- activeDrawer
- globalLoading
- themeMode

Actions
- toggleSidebar
- openModal
- closeModal
- openDrawer
- closeDrawer
- openCommandPalette

Consumers
- app shell
- global overlays

### ProjectContext
State
- projects
- activeProject
- filters
- pagination
- projectLoading

Actions
- fetchProjects
- createProject
- selectProject
- updateProject
- deleteProject

Consumers
- dashboard
- projects pages
- video studio

### AssetContext
State
- assets
- selectedAssets
- uploadQueue
- filterState
- activeAsset

Actions
- uploadAsset
- registerAsset
- fetchAssets
- selectAsset
- deleteAsset

Consumers
- asset browser
- video studio media panel

### TemplateContext
State
- templates
- featuredTemplates
- selectedTemplate
- templateFilters

Actions
- fetchTemplates
- selectTemplate
- previewTemplate

Consumers
- templates page
- video studio

### VoiceContext
State
- voices
- selectedVoice
- previewVoice
- voiceFilters

Actions
- fetchVoices
- selectVoice
- previewVoiceSample

Consumers
- voice studio
- video studio

### VideoContext
State
- videoDraft
- scenes
- renderJobs
- activeRender
- renderTimeline

Actions
- createVideoDraft
- updateScene
- submitRender
- pollRenderStatus
- retryRender

Consumers
- video studio
- render detail page

### UploadContext
State
- uploadItems
- activeUploadId
- uploadStats
- retryState

Actions
- enqueueUpload
- startUpload
- pauseUpload
- retryUpload
- clearCompleted

Consumers
- asset uploader
- upload queue manager

### NotificationContext
State
- toasts
- inbox items
- unread count

Actions
- addToast
- dismissToast
- markAsRead

Consumers
- all pages

---

## 22. State Management Strategy

The state model should be hybrid and intentional:

### Local State
Used for:
- form values
- open/closed UI states
- temporary view states
- hover/focus states

### Context State
Used for:
- auth
- workspace selection
- projects
- assets
- uploads
- video drafts
- global UI state

### Service Layer State
Used for:
- API fetching
- polling
- upload progress
- background job status

### Data Fetching Strategy
- Use hooks to manage loading, caching, and refresh behavior.
- Keep server state close to the feature module that owns it.
- Avoid duplicating server data across contexts where possible.

### Persistence Strategy
- Persist non-sensitive UI preferences and theme mode.
- Avoid persisting sensitive auth state unless the environment requires it and security standards allow it.

---

## 23. API Layer Architecture

All backend communication will pass through a centralized API layer.

### API Layer Responsibilities
- Create standardized request/response contracts.
- Normalize errors.
- Centralize authentication and refresh handling.
- Support pagination, filtering, search, and attachment uploads.
- Enforce consistent naming and domain boundaries.

### Service Modules
- authService
- projectService
- assetService
- uploadService
- templateService
- voiceService
- videoService
- renderService
- notificationService

### Client Data Contracts
Each service should expose:
- list/get/create/update/delete actions
- input validation mapping
- normalized response structure

---

## 24. Axios Architecture

Axios will be the single HTTP client used throughout the app.

### Axios Instance Responsibilities
- base URL configuration
- request interceptor for access token injection
- response interceptor for refresh flow
- unified error handling
- timeout and retry logic
- upload-appropriate headers

### Request Interceptor
- Adds Authorization header.
- Adds request metadata when needed.
- Supports abort tokens for list refreshes.

### Response Interceptor
- Detects 401 unauthorized responses.
- Triggers refresh token flow.
- Retries the failed request once after successful refresh.
- Redirects to login if refresh fails.

### Request/Response Standardization
Request shape:
- JSON payloads for standard API calls
- FormData or signed URL uploads for assets

Response shape:
- success
- data
- message
- error
- statusCode

### Retry Strategy
- Network failures should retry with exponential backoff.
- Idempotent GETs may be retried.
- POST/PUT/DELETE actions should be retried carefully and only when safe.

---

## 25. Authentication Flow

### Flow Overview
1. User enters credentials.
2. Frontend calls login endpoint.
3. Backend returns access token and refresh token.
4. Frontend stores session state.
5. Access token is attached to all authenticated requests.
6. If access token expires, refresh token is used.
7. If refresh fails, user is signed out.

### Authentication States
- unauthenticated
- authenticating
- authenticated
- refreshing
- expired
- signedOut

### Security Requirements
- Sensitive tokens should not be stored in plain local storage where avoidable.
- Use secure cookie or secure storage mechanisms depending on deployment requirements.
- All auth state transitions should be centralized in AuthContext.

---

## 26. Refresh Token Strategy

The refresh strategy must be resilient and avoid race conditions.

### Strategy
- Refresh token is used only for refresh requests.
- A single refresh request should be shared across overlapping 401s.
- The app should prevent repeated refresh storms.
- Auth state should handle multiple pending requests after refresh.

### Refresh Policies
- Refresh once per session window.
- On refresh failure, clear the session and redirect to login.
- Optionally use short-lived access tokens for higher security.

---

## 27. Protected Route Strategy

Protected routes will be guarded by a dedicated route wrapper.

### Guard Behavior
- Authenticated users see the route.
- Unauthenticated users are redirected to login.
- If token refresh is pending, a loading shell appears.
- If auth fails, a full sign-out happens and user is redirected.

### Permission Model
The route layer will support:
- auth required
- role-based restriction (future)
- workspace membership restriction (future)
- project access restriction (future)

---

## 28. Upload Architecture

The upload architecture will integrate tightly with the backend presigned URL workflow.

### Upload Flow
1. User selects files.
2. UI validates file type and size.
3. Frontend requests presigned URL from backend.
4. File is uploaded directly to S3.
5. Backend registers asset metadata.
6. Asset enters the asset library and can be associated with a project.

### Upload Requirements
- Multi-file selection support.
- Drag-and-drop support.
- per-file progress bars.
- retry and cancel support.
- chunked or resumable upload support in later phases if needed.

### Upload States
- queued
- validating
- requesting-url
- uploading
- registering
- completed
- failed
- cancelled

---

## 29. Upload Queue Manager

The upload queue manager will be a dedicated feature component with state management support.

### Responsibilities
- Manage concurrent uploads.
- Display queue state and progress.
- Retry failed uploads.
- Show upload errors and warnings.
- Allow queue cancellation.

### Queue Design Principles
- Avoid blocking the rest of the UI.
- Expose queue status globally but keep it non-disruptive.
- Support background uploads for long-running transfers.

---

## 30. Asset Browser Architecture

The asset browser is the central media library for the product.

### Asset Browser Features
- Grid and list views.
- Filtering by type, tag, project, and date.
- Search.
- Sorting.
- Bulk selection.
- Preview.
- Drag to editor or project.

### Asset Browser States
- loading
- empty
- filtered-empty
- error
- ready

### Asset Browser UX
- Must feel as fast and lightweight as a modern creative library.
- Should support keyboard navigation and drag interactions.

---

## 31. Project Management Flow

Projects are the primary organizational unit for creative work.

### Project Lifecycle
1. Create project.
2. Configure project metadata.
3. Attach assets and templates.
4. Create or edit videos.
5. Submit render jobs.
6. Review output and archive or delete.

### Project States
- draft
- active
- archived
- deleted

### Project UX Rules
- The project must remain visible in the header and sidebar context.
- The active project should be globally accessible.
- Project switching must be low-friction.

---

## 32. Template Management Flow

Templates are predefined starting points for creators.

### Template Lifecycle
1. Browse templates.
2. Preview a template.
3. Choose a template.
4. Create a project from it.
5. Customize or render.

### Template UX Requirements
- High-quality preview cards.
- Easy filtering and sorting.
- Clear preview states and metadata.
- Templates should be usable even without prior content.

---

## 33. Voice Studio Architecture

Voice Studio allows users to discover, preview, and assign voices.

### Voice Studio Areas
- Voice catalog
- Voice preview player
- Voice selection controls
- Voice assignment area

### Voice States
- available
- previewing
- selected
- disabled

### Voice UX Rules
- Voice selection should be fast and low-friction.
- Preview should be instant and easy to stop.
- Voice filters should support style, language, and use case.

---

## 34. Video Studio Architecture

The Video Studio is the flagship experience of the product.

### Core Functional Areas
- Media panel
- Scene panel
- Timeline editor
- Preview panel
- Properties panel
- Render panel

### Studio Layout Modes
- Desktop: multi-panel workspace with persistent left/right panels.
- Tablet: collapsible panels and condensed tools.
- Mobile: simplified editing view with onboarding and limited controls.

### Studio UX Principles
- Keep the primary content preview visible and central.
- Controls should be contextual and reduce visual noise.
- Users should be able to create a simple video quickly without first understanding every advanced feature.

---

## 35. Timeline Editor Architecture

The timeline editor will be one of the most important UI surfaces.

### Timeline Responsibilities
- Show scenes and timing.
- Support arrangement and ordering of media.
- Allow trimming and editing of assets.
- Display audio and captions layers.
- Support selection and drag operations.

### Timeline States
- empty
- loading
- editing
- previewing
- rendering

### Timeline UX Rules
- Use clear visual hierarchy for tracks and clips.
- Keep dragging interactions smooth and predictable.
- Support keyboard shortcuts for editing operations.

---

## 36. Render Queue Architecture

The render queue architecture must support asynchronous jobs and clear user feedback.

### Render Flow
1. User submits render request.
2. Job is queued.
3. Job status is polled or streamed.
4. UI updates progress and status.
5. Completion or failure is communicated through notifications and history.

### Render States
- queued
- processing
- completed
- failed
- cancelled

### Render UX Requirements
- Clear progress and ETA if available.
- Retry support.
- Minimal disruption for background work.

---

## 37. Notification System

The notification system should support both user feedback and product awareness.

### Notification Types
- success
- error
- info
- warning

### Notification Channels
- toast
- inline banner
- activity feed item
- email (future)

### Notification Rules
- Important actions should use toasts.
- Persistent system issues should use banners.
- Long-running jobs should use status views and queue updates.

---

## 38. Modal Management System

Modal orchestration must be centralized and predictable.

### Modal Responsibilities
- confirmations
- forms
- asset previews
- template previews
- project creation
- destructive actions

### Modal Rules
- Only one major modal should be open at a time.
- Modals should be keyboard accessible.
- Focus should be trapped while open.

---

## 39. Drawer Management System

Drawers are used for contextual tools and workflows.

### Drawer Use Cases
- project settings
- asset filters
- side panels in video studio
- mobile navigation

### Drawer Rules
- Drawers should be dismissible with escape and backdrop click.
- They should support overlay layering and focus management.

---

## 40. Command Palette Architecture (Ctrl+K)

The command palette should allow rapid navigation and actions.

### Command Palette Features
- Go to page
- Open project
- Create project
- Search assets
- Search templates
- Search voices
- Open settings

### UX Rules
- Must be keyboard accessible.
- Results should be grouped and searchable.
- Should work across authenticated areas.

---

## 41. Search Architecture

Search should be consistent across major domains.

### Search Domains
- projects
- assets
- templates
- voices
- videos
- commands

### Search UX Rules
- Support debounced input.
- Show recent searches or shortcuts.
- Display empty states when no results are found.

---

## 42. Global Error Handling

Global error handling should be standardized and user-friendly.

### Error Categories
- network
- auth
- validation
- not-found
- permission
- server
- unknown

### Error UI Pattern
- inline messages for form issues
- full-page state for critical failures
- toast for non-blocking errors
- fallback UI for broken feature areas

---

## 43. Empty States

Empty states must be designed as first-class UX elements.

### Empty State Use Cases
- no projects
- no assets
- no templates
- no voices
- no render history
- no search results

### Empty State Requirements
- Explain why the section is empty.
- Provide a recovery action.
- Use friendly illustration or iconography.
- Avoid generic “No data” language.

---

## 44. Loading States

Loading states must be deliberate and mutually understandable.

### Loading States
- initial-loading
- refreshing
- submitting
- uploading
- rendering
- skeleton-loading

### Loading UX Pattern
- Use skeletons for list and page content.
- Use spinners for short actions.
- Use progress bars for long-running tasks.

---

## 45. Skeleton Loading Strategy

Skeleton loading is essential for perceived performance.

### Skeleton Guidance
- Use skeletons for cards, list rows, and dashboard panels.
- Avoid skeletons for tiny interactive elements unless necessary.
- Match content shape closely to reduce layout shift.

### Skeleton Rules
- Use placeholders for image areas, text blocks, and form sections.
- Keep visual rhythm consistent across pages.

---

## 46. Dashboard Architecture

The dashboard is the home experience for authenticated users.

### Dashboard Modules
- welcome summary
- recent projects
- quick actions
- recent assets
- render activity
- usage overview

### Dashboard UX Rules
- It should feel lightweight and actionable.
- It should give users a clear next step.
- It should surface the most relevant activity without clutter.

---

## 47. Settings Architecture

Settings should cover account, appearance, notifications, and future workspace controls.

### Settings Sections
- Profile
- Security
- Notifications
- Preferences
- Workspace (future)
- Billing (future)

### Settings UX Rules
- Keep settings organized by concern.
- Group related controls into cards or sections.
- Avoid overloading a single page with too many controls.

---

## 48. Theme Architecture

The app should support light and dark themes with semantic tokens.

### Theme Layers
- base color tokens
- semantic role tokens
- component tokens
- layout tokens

### Theme Persistence
- Restore theme from user preference or system preference.
- Support a quick toggle from the user menu.

---

## 49. Future Enterprise Features (Teams, Billing, RBAC)

The architecture should support enterprise expansion without rework.

### Future Extensions
- Teams and workspaces
- Role-based access control
- Billing and plan management
- Audit logs
- Advanced permissions
- Shared templates and branded assets

### Architectural Implications
- Route permissions should be data-driven.
- UI should support organization/workspace switching.
- Shared components should be reusable across admin and creator surfaces.

---

## 50. Performance Strategy

Performance must be treated as a first-class product quality.

### Performance Goals
- Initial route load should be fast.
- Long lists should be virtualized or paginated.
- Media-heavy interfaces should lazy-load assets.
- Interaction latency should remain low across panels.

### Performance Patterns
- Route-level lazy loading.
- Image optimization and lazy loading.
- Memoization where beneficial.
- Debounced search and filtering.
- Skeleton loading to preserve perceived performance.

---

## 51. Security Best Practices

Security must be designed into the frontend architecture.

### Frontend Security Rules
- Never trust client-side validation alone.
- Avoid exposing sensitive logic in client code.
- Handle tokens safely and consistently.
- Validate file types and sizes before upload.
- Prevent unsafe content injection in dynamically rendered UI.

### Additional Practices
- Use secure defaults for third-party scripts.
- Sanitize user-generated content if rendered as rich content.
- Keep dependency versions updated.

---

## 52. Accessibility (WCAG)

The product must meet strong accessibility expectations.

### Accessibility Requirements
- Semantic HTML and landmarks.
- Keyboard navigability for all interactive elements.
- Visible focus states.
- Sufficient color contrast.
- Screen reader labels and announcements.
- Support for reduced motion.

### Accessibility Priority Areas
- auth forms
- navigation
- modal and drawer flows
- editors and timeline interactions
- command palette
- upload interactions

---

## 53. Testing Strategy

Testing must cover both user behavior and architectural correctness.

### Testing Layers
- Unit tests for utilities and domain logic.
- Component tests for UI behavior.
- Integration tests for flows such as auth, upload, project creation, and rendering.
- End-to-end tests for critical journeys.

### Critical Test Areas
- authentication flow
- protected routes
- upload workflow
- asset browser
- project creation
- render submission
- settings update

---

## 54. Coding Standards

The team should follow consistent coding standards to keep the codebase maintainable.

### Standards
- Functional components only.
- Hooks for logic reuse.
- Clear separation of presentational and container code.
- No inline business logic in presentational components.
- Keep components small and composable.
- Prefer descriptive names over abbreviations.

---

## 55. Naming Conventions

### Files
- Components: PascalCase
- Pages: PascalCase with Page suffix where appropriate
- Hooks: camelCase starting with use
- Contexts: PascalCase with Context suffix
- Services: camelCase with Service suffix

### Code Style
- camelCase for variables and functions.
- PascalCase for component and context names.
- Constants in uppercase snake case where appropriate.

---

## 56. Development Phases

### Phase 1 — Foundation and Shell
Goals
- Establish base architecture, routing, shell, auth, and design system primitives.

Files
- App.js
- routes/AppRoutes.js
- layouts/AppLayout.js
- layouts/PublicLayout.js
- context/AuthContext.js
- context/UIContext.js
- services/api.js
- services/authService.js

Components
- AppShell
- Navbar
- Sidebar
- Loader
- EmptyState
- Modal
- Drawer

Pages
- LoginPage
- RegisterPage
- ForgotPasswordPage
- DashboardPage
- NotFoundPage

Hooks
- useAuth
- useMediaQuery

Contexts
- AuthContext
- UIContext

Services
- authService
- api

Routes
- auth and dashboard routes

Testing
- auth and route guard tests

Expected Output
- A stable shell for the product with authentication and navigation.

### Phase 2 — Core Product Modules
Goals
- Implement projects, assets, and upload workflows.

Files
- context/ProjectContext.js
- context/AssetContext.js
- context/UploadContext.js
- services/projectService.js
- services/assetService.js
- services/uploadService.js

Components
- ProjectCard
- AssetCard
- UploadCard
- AssetUploader
- AssetUploadQueue
- SearchBox
- FilterBar

Pages
- ProjectsPage
- ProjectDetailPage
- AssetsPage
- AssetDetailPage

Hooks
- useProjects
- useAssets
- useUploadQueue

Contexts
- ProjectContext
- AssetContext
- UploadContext

Services
- projectService
- assetService
- uploadService

Routes
- projects and assets routes

Testing
- project create/list/upload flow tests

Expected Output
- A working project and asset management layer.

### Phase 3 — Templates and Voice Experience
Goals
- Implement template browsing and voice selection flows.

Files
- context/TemplateContext.js
- context/VoiceContext.js
- services/templateService.js
- services/voiceService.js

Components
- TemplateCard
- TemplateGrid
- VoiceCard
- VoiceSelector
- VoicePreviewPlayer

Pages
- TemplatesPage
- TemplateDetailPage
- VoiceStudioPage

Hooks
- useTemplates
- useVoices

Contexts
- TemplateContext
- VoiceContext

Services
- templateService
- voiceService

Routes
- templates and voice routes

Testing
- template selection and voice preview tests

Expected Output
- A polished content discovery and selection experience.

### Phase 4 — Video Studio and Rendering
Goals
- Deliver the flagship creation workflow and render management experience.

Files
- context/VideoContext.js
- services/videoService.js
- services/renderService.js

Components
- VideoStudioShell
- TimelineEditor
- MediaPanel
- ScenePanel
- PreviewPanel
- RenderPanel
- RenderStatusCard

Pages
- VideoStudioPage
- CreateVideoPage
- RenderDetailPage

Hooks
- useVideoStudio
- usePolling

Contexts
- VideoContext

Services
- videoService
- renderService

Routes
- video studio and render routes

Testing
- render submission and status updates

Expected Output
- A complete video creation and rendering workflow.

### Phase 5 — Settings, Polish, and Enterprise Preparation
Goals
- Implement settings, accessibility refinements, observability, and scalable feature support.

Files
- context/UserContext.js
- context/NotificationContext.js
- services/notificationService.js

Components
- SettingsSection
- ProfileForm
- NotificationSettings
- CommandPalette
- ErrorBoundary

Pages
- SettingsPage
- ProfilePage

Hooks
- useCommandPalette
- useLocalStorage

Contexts
- UserContext
- NotificationContext

Services
- notificationService

Routes
- settings and profile routes

Testing
- settings and notification tests

Expected Output
- A polished, accessible, production-ready web app foundation.

---

## 57. Implementation Roadmap

### Immediate Next Steps
1. Finalize design tokens and theme primitives.
2. Implement shared layout shell and route configuration.
3. Build auth foundation and protected route system.
4. Implement project and asset modules.
5. Add upload infrastructure and queue management.
6. Build template, voice, and video studio routes.
7. Introduce testing, analytics, and observability hooks.

### Delivery Milestones
- Milestone 1: Authenticated shell with core navigation.
- Milestone 2: Project and asset management.
- Milestone 3: Asset upload and media library.
- Milestone 4: Template and voice selection.
- Milestone 5: Video editor and render pipeline.
- Milestone 6: Settings, polish, performance optimization, and enterprise readiness.

### Engineering Team Expectations
The implementation team should treat this as the authoritative blueprint for the frontend. No architectural decisions should be made independently without updating this document or a related design spec.
