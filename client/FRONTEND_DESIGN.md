# TheSixthStudio Frontend Design

## 1. Overview

TheSixthStudio is a production-grade AI SaaS platform for creating, managing, and rendering audio/video assets through a modern React frontend. The frontend is designed for scale, maintainability, and high developer velocity while remaining fully aligned with the backend capabilities already implemented.

### Product Goals
- Deliver a polished, fast, and intuitive experience for creators and teams.
- Support secure authentication and resilient token refresh.
- Enable project-based asset management, upload workflows, templated creation, voice selection, and video rendering.
- Be scalable to millions of users with clear separation of concerns and reusable architecture.

### Core Principles
- JavaScript only; no TypeScript.
- React 19 with modern hooks and functional components.
- React Router v7 for client-side routing.
- Tailwind CSS for consistent design and rapid UI development.
- React Hook Form + Zod for form handling and validation.
- Context API for shared app state; no Redux.
- Axios as the API client with centralized error handling and token refresh.
- Framer Motion for UI motion and transitions.
- React Hot Toast for user feedback.

---

## 2. Overall Application Architecture

The application will follow a layered frontend architecture:

1. Presentation Layer
   - Pages
   - Layouts
   - Reusable UI components
   - Feature-specific components

2. State Layer
   - React Context for application-wide state
   - Local component state for form and UI interactions
   - Custom hooks for reusable data fetching and side effects

3. Service Layer
   - API modules for each domain (auth, projects, assets, templates, voices, videos)
   - Shared Axios instance for HTTP communication
   - Upload orchestration utilities

4. Infrastructure Layer
   - Environment-based configuration
   - Error monitoring hooks
   - Logging, analytics, and observability placeholders

### Architecture Diagram (conceptual)

Client App
  -> Routing Layer
  -> Layout Layer
  -> Page Layer
  -> Feature Hooks / Contexts
  -> Service Layer
  -> Backend REST APIs
  -> S3 Presigned Upload Flow

### Architectural Decisions
- Feature-oriented folder organization for scale.
- Thin presentational components and smart container components.
- Shared domain services to avoid duplicated API logic.
- Route-level code splitting for performance.
- Centralized handling of auth, loading, error, and notification states.

---

## 3. Folder Structure

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
      button/
      card/
      loader/
      modal/
      dropdown/
      breadcrumb/
      empty-state/
      pagination/
      search/
      filter/
      toast/
    layout/
      Navbar/
      Sidebar/
      AppShell/
      PageHeader/
      Footer/
    ui/
      Avatar/
      Badge/
      Tooltip/
      ProgressBar/
      Divider/
      Chip/
      Skeleton/
    dashboard/
      StatsCard/
      RecentProjectsCard/
      ActivityFeed/
    auth/
      AuthCard/
      AuthLayout/
      SocialProof/
    projects/
      ProjectCard/
      ProjectForm/
      ProjectMembersPanel/
    assets/
      AssetCard/
      UploadCard/
      AssetFilterPanel/
      AssetPreviewModal/
    video/
      VideoCard/
      TimelinePanel/
      CanvasPreview/
      RenderStatusCard/
    voice/
      VoiceCard/
      VoiceSelector/
    templates/
      TemplateCard/
      TemplatePreviewModal/
    settings/
      SettingsSection/
      ProfileForm/
      SecuritySection/
  constants/
    api.js
    routes.js
    ui.js
    enums.js
  context/
    AuthContext.js
    UserContext.js
    ProjectContext.js
    AssetContext.js
    VideoContext.js
    VoiceContext.js
    TemplateContext.js
    UIContext.js
  hooks/
    useAuth.js
    useProjects.js
    useAssets.js
    useUpload.js
    useDebounce.js
    useMediaQuery.js
    usePagination.js
    useKeyboardShortcuts.js
  layouts/
    PublicLayout.js
    AuthLayout.js
    AppLayout.js
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
    VideoStudio/
      VideoStudioPage.js
      VideoCreatePage.js
      VideoRenderPage.js
    VoiceStudio/
      VoiceStudioPage.js
    Templates/
      TemplatesPage.js
      TemplateDetailPage.js
    Settings/
      SettingsPage.js
      ProfilePage.js
    NotFoundPage.js
  routes/
    AppRoutes.js
    ProtectedRoute.js
    PublicRoute.js
  services/
    api.js
    authService.js
    projectService.js
    assetService.js
    uploadService.js
    templateService.js
    voiceService.js
    videoService.js
    storageService.js
  store/
    index.js
    persistence.js
  styles/
    themes/
      default.js
      dark.js
  utils/
    formatters.js
    validators.js
    helpers.js
    uploadHelpers.js
    queryParams.js
    localStorage.js
```

---

## 4. Component Hierarchy

### Top-Level Composition

```text
<App>
  <AppProviders>
    <Router>
      <AppShell>
        <Routes>
          <PublicRoute />
          <ProtectedRoute />
          <NotFoundRoute />
        </Routes>
      </AppShell>
    </Router>
  </AppProviders>
</App>
```

### Feature Hierarchy Example

```text
DashboardPage
  -> DashboardLayout
    -> Navbar
    -> Sidebar
    -> PageHeader
    -> StatsCard[]
    -> RecentProjectsCard
    -> ActivityFeed
```

```text
VideoStudioPage
  -> VideoStudioLayout
    -> ProjectSelector
    -> TemplateSelector
    -> VoiceSelector
    -> TimelinePanel
    -> CanvasPreview
    -> RenderStatusPanel
```

---

## 5. Routing Architecture

### Route Strategy
Routes will be defined centrally and grouped by access control:
- Public routes: auth, password recovery, email verification
- Protected routes: dashboard, projects, assets, video, voice, templates, settings
- Catch-all route: 404

### Route Map

| Path | Layout | Access | Page |
|---|---|---|---|
| /login | Public | Public | LoginPage |
| /register | Public | Public | RegisterPage |
| /forgot-password | Public | Public | ForgotPasswordPage |
| /reset-password | Public | Public | ResetPasswordPage |
| /verify-email | Public | Public | VerifyEmailPage |
| /dashboard | App | Protected | DashboardPage |
| /projects | App | Protected | ProjectsPage |
| /projects/new | App | Protected | CreateProjectPage |
| /projects/:projectId | App | Protected | ProjectDetailPage |
| /assets | App | Protected | AssetsPage |
| /assets/:assetId | App | Protected | AssetDetailPage |
| /video-studio | App | Protected | VideoStudioPage |
| /video-studio/new | App | Protected | VideoCreatePage |
| /video-studio/render/:videoId | App | Protected | VideoRenderPage |
| /voice-studio | App | Protected | VoiceStudioPage |
| /templates | App | Protected | TemplatesPage |
| /templates/:templateId | App | Protected | TemplateDetailPage |
| /settings | App | Protected | SettingsPage |
| /profile | App | Protected | ProfilePage |
| /* | App | Public fallback | NotFoundPage |

### Route Loading Strategy
- Route-level lazy loading for all major pages.
- Skeleton placeholders during lazy import resolution.
- Prefetching for common routes after authentication.

---

## 6. Layout Architecture

### Public Layout
Used for authentication-related experience.
- Minimal header
- Full-width centered card
- Background branding or illustration
- Compact responsive design

### App Layout
Used for all authenticated experience.
- Navbar at the top
- Sidebar for primary navigation
- Main content area with page header and dynamic content
- Global modal/toast layers
- Breadcrumb support for nested flows

### Layout Responsibilities
- Navigation composition
- Session-aware UI shell
- Responsive behavior across desktop/tablet/mobile
- Page transitions and loading states

---

## 7. Authentication Flow

### Authentication Strategy
Authentication will be implemented using JWT access tokens and refresh tokens.

### Flow
1. User logs in using email/password.
2. Backend returns access token and refresh token.
3. Frontend stores tokens securely in memory and optionally in secure storage if required by deployment constraints.
4. Axios interceptors attach access token to every authenticated request.
5. If a request returns 401, the app attempts refresh using the refresh token.
6. If refresh succeeds, the original request is retried automatically.
7. If refresh fails, user is logged out and redirected to login.

### Auth States
- unauthenticated
- authenticating
- authenticated
- refreshing
- session-expired

### Auth Context Responsibilities
- User session state
- Login/register/logout actions
- Token refresh orchestration
- Redirect handling after authentication
- Session persistence lifecycle

---

## 8. Protected Routes

Protected routes will be guarded by a route component that checks auth context.

### ProtectedRoute Behavior
- If authenticated: render target route
- If not authenticated: redirect to login
- If session refresh is pending: show loading shell
- If auth is invalid: clear session and redirect

### Route Guards
- Auth guard for private pages
- Role-based guard placeholder for future enterprise expansion
- Ownership guard for project-specific pages later

---

## 9. API Layer Architecture

The API layer will be domain-driven and split into services for each backend resource.

### Service Responsibilities
- authService: login, register, logout, refresh, password reset, verify email
- projectService: create/list/get/update/delete projects
- assetService: list assets, register asset, get asset metadata, delete asset
- uploadService: request presigned URLs, complete upload lifecycle
- templateService: list templates, get template, create custom templates
- voiceService: list voices, preview voice, manage voice settings
- videoService: create render job, track status, manage video resources

### Folder Structure for API Layer
- services/api.js: shared Axios instance
- services/authService.js
- services/projectService.js
- services/assetService.js
- services/uploadService.js
- services/templateService.js
- services/voiceService.js
- services/videoService.js

### API Layer Design Principles
- No direct Axios usage in pages or components
- Centralized base URL config
- Shared request/response normalization
- Domain-level error mapping
- Consistent pagination and filtering support

---

## 10. Axios Configuration

Axios will be configured in a shared module with:
- base URL from environment variables
- timeout configuration
- request interceptor to attach access token
- response interceptor to handle 401 and refresh logic
- standardized error parsing
- request cancellation support for list views if needed

### Axios Features
- Automatic token injection
- Refresh-token retry queue
- Error normalization to application-level error shape
- Consistent headers for JSON and multipart uploads
- Optional support for abort controllers

### Recommended Request/Response Shape
- Request: JSON payloads or FormData for uploads
- Response: normalized object with data, message, status, success

---

## 11. Context Architecture

The app will use Context API for shared state. No Redux.

### Context Map
- AuthContext: authentication, session, profile, auth actions
- UserContext: profile preferences and account settings
- ProjectContext: selected project, project list, project mutations
- AssetContext: asset library, upload progress, asset selection
- VideoContext: video draft state, render status, render queue state
- VoiceContext: voices, selected voice, voice preview state
- TemplateContext: templates, favorites, template selection
- UIContext: modals, sidebar state, theme mode, global loading, responsive helpers

### Context Design Rules
- Context should own domain state that is shared across multiple screens.
- Local component state should be used for isolated UI concerns.
- Avoid overloading contexts; keep them focused and composable.

---

## 12. Upload Flow

The upload flow will integrate with backend presigned upload URLs.

### Upload Flow Steps
1. User selects file from drag-and-drop component.
2. Frontend validates file type, size, and metadata.
3. Frontend requests a presigned URL from backend.
4. Frontend uploads file directly to S3 using the signed URL.
5. Backend asset registration endpoint is called to register the uploaded asset.
6. Asset is added to local context and displayed in the asset library.

### Upload UX Requirements
- Drag-and-drop support
- Progress bar for each upload
- Pause/resume model later if needed
- Retry support for failed uploads
- Clear error states for rejected files

### Upload States
- idle
- validating
- requesting-url
- uploading
- registering
- success
- failed

---

## 13. Project Flow

Projects are the core organizational boundary for assets, templates, and video generation.

### Project Lifecycle
1. Create project
2. Select project
3. Add assets to project
4. Create or configure video
5. Render video
6. Archive or delete project

### Project States
- draft
- active
- archived
- deleted

### Project Context Responsibilities
- selected project
- list of projects
- loading state
- pagination and filtering
- optimistic updates for create/edit/delete

---

## 14. Asset Flow

Assets include images, audio, video clips, and other media managed by the user.

### Asset Lifecycle
1. Upload asset
2. Register asset metadata
3. Browse/filter assets
4. Associate asset with a project
5. Use asset in video creation
6. Delete or replace asset

### Asset States
- uploaded
- processing
- ready
- failed
- deleted

### Asset UX Requirements
- Search and filter by type, project, and date
- Preview modal for supported media types
- Bulk actions in later phases

---

## 15. Video Creation Flow

Video creation is a key product experience and should be clearly separated into creation and rendering stages.

### Create Flow
1. User selects project
2. User selects template or blank canvas
3. User selects voice and media assets
4. User arranges narrative blocks or scenes
5. User previews output
6. User submits render job

### Editing States
- draft
- previewing
- queueing
- rendering
- completed
- failed

### Required UI Areas
- Media panel
- Template panel
- Voice selector
- Timeline/editor panel
- Preview player
- Render controls

---

## 16. Video Rendering Flow

Rendering is asynchronous and handled through the backend queue system.

### Render Flow
1. User submits video creation request.
2. Frontend creates render job via API.
3. Frontend polls or subscribes to status updates.
4. UI displays progress and render state.
5. User can view result when completed.

### Render Status States
- pending
- queued
- processing
- completed
- failed
- cancelled

### UX Requirements
- Progress bar and estimated time indicator
- Retry option on failure
- Clear error explanation
- History view for completed renders

---

## 17. Voice Management Flow

Voice management will support voice selection and configuration for generated content.

### Voice Flow
1. List available voices
2. Filter by language, style, or gender
3. Preview voice sample
4. Assign voice to a video project or scene
5. Save and reuse in future projects

### Voice States
- available
- previewing
- selected
- disabled

---

## 18. Template Management Flow

Templates provide reusable project starting points.

### Template Flow
1. Browse templates
2. Preview template details
3. Select template for a new project
4. Customize layout or content
5. Save custom template if allowed

### Template States
- draft
- published
- archived

---

## 19. Dashboard Architecture

The dashboard will act as the landing experience for authenticated users.

### Dashboard Sections
- Welcome summary
- Recent projects
- Quick actions
- Recent assets
- Render activity
- Usage or quota overview

### Dashboard Data Strategy
- Lightweight summary widgets
- Cached recent data for snappy loading
- Revalidate on focus or refresh

---

## 20. State Management Strategy

The app will rely on a hybrid state strategy:

### Local Component State
Use for:
- form inputs
- modals
- toggle states
- temporary UI flags

### Context State
Use for:
- auth/session
- current project selection
- shared asset library data
- video generation state
- global UI settings

### Query/Fetch Strategy
Use custom hooks to encapsulate data fetching and caching behavior.

### Important Rule
Do not introduce Redux unless it becomes absolutely necessary in later enterprise phases.

---

## 21. Error Handling Strategy

All errors will follow a consistent handling model.

### Error Handling Principles
- API failures should be normalized into a friendly shape.
- Network, auth, validation, and server errors are handled distinctly.
- User-facing errors use toast notifications and inline alerts.
- Fallback and empty states should be explicit.

### Error Categories
- network_error
- auth_error
- validation_error
- not_found_error
- server_error
- unknown_error

### Error UI Patterns
- Inline error block in forms
- Full-page error fallback for critical route failures
- Toast for non-blocking issues

---

## 22. Loading Strategy

Loading will be handled through a combination of route-level and feature-level states.

### Loading UX Rules
- Use skeleton loading for content areas.
- Use page-level loading for first page load.
- Use inline spinners for buttons and short actions.
- Use progress bars for uploads and rendering.

### Common Loading States
- initial-loading
- refreshing
- submitting
- uploading
- rendering

---

## 23. Toast Notification Strategy

React Hot Toast will be the standard notification system.

### Toast Categories
- success
- error
- info
- warning

### Standard Usage
- Success for completed actions
- Error for failed requests or uploads
- Info for non-blocking guidance
- Warning for destructive actions or invalid states

---

## 24. Form Validation Strategy

React Hook Form and Zod will be the core validation stack.

### Validation Rules
- Client-side validation for speed and UX
- Server-side validation remains authoritative
- Zod schemas shared with service logic when possible
- Inline field errors and helper text

### Forms Covered
- Login
- Register
- Forgot Password
- Reset Password
- Profile settings
- Project creation
- Asset metadata forms
- Video creation form

---

## 25. Folder Naming Conventions

- Use lowercase folders and kebab-case where appropriate.
- Group by feature and domain.
- Keep shared infrastructure under common or shared directories.

### Examples
- auth/
- video-studio/
- dashboard/
- project-detail/

---

## 26. Component Naming Conventions

- Use PascalCase for component files and component names.
- Use descriptive, domain-specific names.
- Keep components focused and composable.

### Examples
- Navbar
- AssetCard
- UploadCard
- VideoRenderStatusCard
- AuthLayout

---

## 27. API Naming Conventions

- Use RESTful naming for resource endpoints.
- Use consistent action verbs in service methods.
- Keep service methods domain-oriented.

### Examples
- authService.login()
- projectService.createProject()
- assetService.registerAsset()
- videoService.createRenderJob()

---

## 28. Styling Conventions

Tailwind CSS will be the primary styling system.

### Styling Rules
- Use utility-first classes with small reusable component wrappers.
- Define semantic design tokens for spacing, color, typography, and radius.
- Avoid ad-hoc custom CSS where Tailwind utilities are sufficient.
- Keep style concerns isolated from business logic.

### Theme Tokens
- colors
- spacing
- typography
- radius
- shadows
- transitions

---

## 29. Responsive Design Strategy

The UI must work seamlessly across mobile, tablet, and desktop.

### Breakpoints
- mobile: < 640px
- tablet: 640px - 1023px
- desktop: >= 1024px

### Responsive Approach
- Mobile-first layout approach
- Sidebar collapses to drawer or toggled panel on smaller screens
- Tables become stacked card views on mobile
- Touch-friendly controls for mobile interactions

---

## 30. Dark Theme Architecture

The app should support a consistent dark mode experience.

### Dark Mode Approach
- Theme context to toggle between light and dark modes
- Shared semantic color tokens
- Component-level design tokens that adapt by theme
- Persistence of theme preference

### Theme States
- light
- dark
- system (optional in later phase)

---

## 31. Future Scalability Plan

The architecture is designed to support future growth.

### Future Enhancements
- Feature flags
- Multi-tenant support
- Team collaboration and role-based permissions
- Advanced analytics and dashboards
- Better offline support
- Server-side rendering or partial hydration if necessary
- Design system extraction into a shared package

### Scalability Principles
- Keep modules isolated
- Prepare for route-level lazy loading
- Use domain boundaries and shared service contracts
- Instrument with observability early

---

## 32. Page Design Specifications

Each page will follow a consistent contract:
- Purpose
- Components used
- API calls
- React Context used
- Hooks used
- State
- Loading states
- Error states
- Empty states
- Responsive behavior

### 32.1 Login Page

Purpose
- Authenticate a user and start a session.

Components used
- AuthLayout
- AuthCard
- Form fields
- Button
- Password visibility toggle
- Link component

API calls
- authService.login()

React Context used
- AuthContext

Hooks used
- useAuth()
- useForm()

State
- email, password, isSubmitting, rememberMe

Loading states
- submit spinner, disabled button

Error states
- invalid credentials, network failure

Empty states
- none

Responsive behavior
- centered card on desktop, stacked mobile layout

### 32.2 Register Page

Purpose
- Create a new account.

Components used
- AuthLayout
- AuthCard
- Registration form
- Password strength indicator

API calls
- authService.register()

React Context used
- AuthContext

Hooks used
- useAuth()
- useForm()

State
- form values, validation errors, submit state

Loading states
- form submission skeleton

Error states
- duplicate account, weak password, network issue

Empty states
- none

Responsive behavior
- mobile-first stacked inputs

### 32.3 Forgot Password Page

Purpose
- Request a password reset email.

Components used
- AuthCard
- Form
- Info message

API calls
- authService.forgotPassword()

React Context used
- AuthContext

Hooks used
- useAuth()

State
- email input, request state

Loading states
- disabled submit state

Error states
- account not found, rate limit

Empty states
- success state with no email entry

Responsive behavior
- single column layout

### 32.4 Reset Password Page

Purpose
- Allow user to set a new password using a token.

Components used
- AuthCard
- Password field
- Confirm password field

API calls
- authService.resetPassword()

React Context used
- AuthContext

Hooks used
- useAuth()

State
- token, password, confirmPassword, submit state

Loading states
- button spinner

Error states
- invalid or expired token

Empty states
- none

Responsive behavior
- centered card layout

### 32.5 Verify Email Page

Purpose
- Confirm user email address.

Components used
- AuthCard
- Status banner

API calls
- authService.verifyEmail()

React Context used
- AuthContext

Hooks used
- useAuth()

State
- verification status

Loading states
- pending verification state

Error states
- invalid or expired verification link

Empty states
- none

Responsive behavior
- simple centered confirmation view

### 32.6 Dashboard Page

Purpose
- Provide a high-level overview of the user’s work.

Components used
- Navbar
- Sidebar
- PageHeader
- StatsCard
- RecentProjectsCard
- ActivityFeed

API calls
- projectService.listProjects()
- assetService.listAssets()
- videoService.listRecentVideos()

React Context used
- ProjectContext
- AssetContext
- VideoContext

Hooks used
- useProjects()
- useAssets()
- useMediaQuery()

State
- summary metrics, recent items, loading state

Loading states
- skeleton cards

Error states
- failed summary fetch

Empty states
- welcome CTA for first-time users

Responsive behavior
- dashboard grid collapses on smaller screens

### 32.7 Projects Page

Purpose
- List, search, filter, and manage projects.

Components used
- PageHeader
- Search
- Filter
- ProjectCard
- EmptyState
- Pagination

API calls
- projectService.listProjects()
- projectService.createProject()
- projectService.deleteProject()

React Context used
- ProjectContext

Hooks used
- useProjects()
- useDebounce()

State
- project list, filters, pagination, modal state

Loading states
- table/list skeleton

Error states
- failed fetch or delete

Empty states
- “No projects yet” CTA

Responsive behavior
- cards on mobile, grid/table on desktop

### 32.8 Project Detail Page

Purpose
- Show project details and allow management actions.

Components used
- Breadcrumb
- ProjectHeader
- AssetList
- VideoList
- ActivityPanel

API calls
- projectService.getProjectById()
- assetService.listAssetsByProject()
- videoService.listVideosByProject()

React Context used
- ProjectContext
- AssetContext

Hooks used
- useProjects()

State
- selected project, related assets, associated videos

Loading states
- detail skeleton

Error states
- project not found or access denied

Empty states
- empty related sections

Responsive behavior
- split layout on desktop, stacked on mobile

### 32.9 Create Project Page

Purpose
- Create a new project with metadata.

Components used
- ProjectForm
- Modal/Drawer
- Input fields

API calls
- projectService.createProject()

React Context used
- ProjectContext

Hooks used
- useForm()

State
- form values, submit state, validation errors

Loading states
- submission spinner

Error states
- validation or API errors

Empty states
- none

Responsive behavior
- single-column centered form

### 32.10 Assets Page

Purpose
- Browse and manage uploaded assets.

Components used
- UploadCard
- AssetCard
- Search
- Filter
- EmptyState
- Pagination

API calls
- assetService.listAssets()
- assetService.deleteAsset()

React Context used
- AssetContext

Hooks used
- useAssets()
- useUpload()

State
- asset list, selected filters, upload queue

Loading states
- asset grid skeleton

Error states
- upload failure, fetch failure

Empty states
- empty asset library CTA

Responsive behavior
- card grid on mobile and desktop

### 32.11 Asset Detail Page

Purpose
- View asset metadata and related actions.

Components used
- AssetPreviewModal
- Metadata panel
- Action buttons

API calls
- assetService.getAssetById()

React Context used
- AssetContext

Hooks used
- useAssets()

State
- asset metadata, preview state

Loading states
- content skeleton

Error states
- invalid asset or permission issue

Empty states
- missing preview content state

Responsive behavior
- stacked panels on smaller screens

### 32.12 Video Studio Page

Purpose
- Provide the main video creation environment.

Components used
- Navbar
- Sidebar
- TemplateSelector
- VoiceSelector
- TimelinePanel
- CanvasPreview
- RenderStatusCard

API calls
- templateService.listTemplates()
- voiceService.listVoices()
- assetService.listAssets()

React Context used
- VideoContext
- TemplateContext
- VoiceContext
- AssetContext

Hooks used
- useVideoEditor()

State
- selected template, assets, voice, timeline, preview state

Loading states
- loading panels and preview skeleton

Error states
- failed template/voice fetch

Empty states
- empty editor state with starter CTA

Responsive behavior
- split workspace with collapsible side panels

### 32.13 Video Create Page

Purpose
- Create a new video request and submit a render job.

Components used
- Form sections
- Template summary
- Voice selection
- Asset picker
- Submit button

API calls
- videoService.createRenderJob()

React Context used
- VideoContext

Hooks used
- useForm()

State
- video request payload, validation, submit state

Loading states
- form submission pending

Error states
- invalid configuration or API error

Empty states
- none

Responsive behavior
- multi-section form with stacked layout on mobile

### 32.14 Video Render Page

Purpose
- Track render progress and completion.

Components used
- ProgressBar
- RenderStatusCard
- Video preview player
- Retry button

API calls
- videoService.getRenderStatus()

React Context used
- VideoContext

Hooks used
- usePolling()

State
- render status, progress percent, timestamps

Loading states
- progress placeholder and pending state

Error states
- render failure

Empty states
- no render data yet

Responsive behavior
- status-first layout on mobile, split view on desktop

### 32.15 Voice Studio Page

Purpose
- Manage and preview available voices.

Components used
- VoiceCard
- Search
- Filter
- Preview controls

API calls
- voiceService.listVoices()

React Context used
- VoiceContext

Hooks used
- useVoices()

State
- voices list, selected voice, preview state

Loading states
- skeleton cards

Error states
- fetch issue

Empty states
- no voices available state

Responsive behavior
- responsive card grid

### 32.16 Templates Page

Purpose
- Browse and select templates.

Components used
- TemplateCard
- Search
- Filter
- EmptyState

API calls
- templateService.listTemplates()

React Context used
- TemplateContext

Hooks used
- useTemplates()

State
- templates list, selected category, filters

Loading states
- skeleton grid

Error states
- failed fetch

Empty states
- no templates found

Responsive behavior
- card-driven responsive layout

### 32.17 Template Detail Page

Purpose
- View template information in detail.

Components used
- TemplatePreviewModal
- Metadata section
- CTA button

API calls
- templateService.getTemplateById()

React Context used
- TemplateContext

Hooks used
- useTemplates()

State
- selected template data

Loading states
- detail loading state

Error states
- template not found

Empty states
- no preview available

Responsive behavior
- content stacking on mobile

### 32.18 Settings Page

Purpose
- Manage user preferences and account settings.

Components used
- SettingsSection
- ProfileForm
- SecuritySection
- Toggle controls

API calls
- authService.updateProfile()
- authService.changePassword()

React Context used
- UserContext
- AuthContext

Hooks used
- useAuth()

State
- settings form, save state, validation

Loading states
- saving indicator

Error states
- save failure or validation errors

Empty states
- none

Responsive behavior
- stacked sections on mobile

### 32.19 Profile Page

Purpose
- Display and edit profile information.

Components used
- ProfileForm
- Avatar editor
- Section cards

API calls
- authService.getProfile()
- authService.updateProfile()

React Context used
- UserContext

Hooks used
- useAuth()

State
- profile data, edit mode, save state

Loading states
- profile skeleton

Error states
- fetch or update failure

Empty states
- none

Responsive behavior
- card-based layout

### 32.20 404 Page

Purpose
- Gracefully handle unknown routes.

Components used
- EmptyState
- Link button

API calls
- none

React Context used
- none

Hooks used
- none

State
- none

Loading states
- none

Error states
- none

Empty states
- 404 illustration and message

Responsive behavior
- centered layout with clear actions

---

## 33. Reusable Component Design

### Navbar
Purpose
- Global navigation and user actions.

Props
- title
- actions
- showSidebarToggle

State
- mobile menu open state

### Sidebar
Purpose
- Primary app navigation.

Props
- collapsed
- navigationItems

State
- active route, collapsed state

### Breadcrumb
Purpose
- Show navigation path in nested flows.

Props
- items

State
- none

### Upload Card
Purpose
- File selection and upload initiation.

Props
- onUpload
- acceptedTypes
- maxSize

State
- drag state, upload queue

### Asset Card
Purpose
- Display asset summary and actions.

Props
- asset
- onPreview
- onDelete

State
- hover state, selected state

### Project Card
Purpose
- Summarize a project and its primary actions.

Props
- project
- onSelect
- onEdit
- onDelete

State
- hover state

### Video Card
Purpose
- Show video metadata and status.

Props
- video
- onOpen

State
- status badge state

### Voice Card
Purpose
- Display voice metadata and preview action.

Props
- voice
- onSelect
- onPreview

State
- selected state

### Template Card
Purpose
- Summarize a template with preview action.

Props
- template
- onSelect

State
- hover state

### Progress Bar
Purpose
- Visualize upload or render progress.

Props
- percent
- label

State
- none

### Loader
Purpose
- Global or inline loading feedback.

Props
- size
- fullScreen

State
- none

### Modal
Purpose
- Dialog container for forms and confirmations.

Props
- open
- title
- onClose

State
- open/close control

### Dialog
Purpose
- Confirmation or destructive action prompt.

Props
- open
- message
- confirmLabel
- cancelLabel

State
- none

### Dropdown
Purpose
- Compact select list or action menu.

Props
- items
- trigger

State
- open state

### Toast
Purpose
- User feedback for actions.

Props
- type
- message
- duration

State
- lifecycle managed by library

### Pagination
Purpose
- Page navigation for lists and table views.

Props
- currentPage
- totalPages
- onPageChange

State
- none

### Search
Purpose
- Filter lists by keyword.

Props
- value
- onChange
- placeholder

State
- input value

### Filter
Purpose
- Control selection filters across views.

Props
- options
- activeValue
- onChange

State
- selected value

### Empty State
Purpose
- Provide friendly empty or no-result states.

Props
- title
- description
- action

State
- none

---

## 34. Development Roadmap

### Phase 1 — Foundation and Architecture
Goals
- Establish project structure, routing, layout shell, and shared styling foundation.

Files
- App.js
- index.js
- routes/AppRoutes.js
- layouts/PublicLayout.js
- layouts/AppLayout.js
- constants/routes.js
- services/api.js
- context/AuthContext.js

Components
- Navbar
- Sidebar
- AppShell
- Loader
- EmptyState

Pages
- LoginPage
- RegisterPage
- ForgotPasswordPage
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
- public auth routes
- protected route guard

Testing
- unit tests for auth helpers and route guards

Expected Output
- A stable shell for authentication and app navigation

### Phase 2 — Core Product Experience
Goals
- Implement dashboard, projects, and asset management flows.

Files
- pages/Dashboard/DashboardPage.js
- pages/Projects/ProjectsPage.js
- pages/Assets/AssetsPage.js
- context/ProjectContext.js
- context/AssetContext.js
- services/projectService.js
- services/assetService.js
- services/uploadService.js

Components
- ProjectCard
- AssetCard
- UploadCard
- Search
- Filter
- Pagination

Pages
- DashboardPage
- ProjectsPage
- ProjectDetailPage
- AssetsPage

Hooks
- useProjects
- useAssets
- useUpload

Contexts
- ProjectContext
- AssetContext

Services
- projectService
- assetService
- uploadService

Routes
- dashboard, projects, asset routes

Testing
- integration tests for project and asset list flows

Expected Output
- A working content management experience for projects and assets

### Phase 3 — Media and Voice Workflow
Goals
- Deliver voice studio and template browsing experiences.

Files
- pages/VoiceStudio/VoiceStudioPage.js
- pages/Templates/TemplatesPage.js
- context/VoiceContext.js
- context/TemplateContext.js
- services/voiceService.js
- services/templateService.js

Components
- VoiceCard
- VoiceSelector
- TemplateCard
- TemplatePreviewModal

Pages
- VoiceStudioPage
- TemplatesPage
- TemplateDetailPage

Hooks
- useVoices
- useTemplates

Contexts
- VoiceContext
- TemplateContext

Services
- voiceService
- templateService

Routes
- voice and template routes

Testing
- tests for voice and template selection flows

Expected Output
- A usable media and voice selection experience

### Phase 4 — Video Creation and Rendering
Goals
- Implement the core video studio editor, creation flow, and render tracking.

Files
- pages/VideoStudio/VideoStudioPage.js
- pages/VideoStudio/VideoCreatePage.js
- pages/VideoStudio/VideoRenderPage.js
- context/VideoContext.js
- services/videoService.js

Components
- TimelinePanel
- CanvasPreview
- RenderStatusCard
- ProgressBar
- VideoCard

Pages
- VideoStudioPage
- VideoCreatePage
- VideoRenderPage

Hooks
- useVideoEditor
- usePolling

Contexts
- VideoContext

Services
- videoService

Routes
- video studio routes

Testing
- integration tests for video creation and render state handling

Expected Output
- A strong end-to-end video creation and rendering workflow

### Phase 5 — Settings, Profile, and Polish
Goals
- Deliver settings, account profile management, and UI polish.

Files
- pages/Settings/SettingsPage.js
- pages/Settings/ProfilePage.js
- context/UserContext.js

Components
- SettingsSection
- ProfileForm
- SecuritySection
- Modal
- Dialog

Pages
- SettingsPage
- ProfilePage

Hooks
- useSettings

Contexts
- UserContext

Services
- authService profile/update methods

Routes
- settings/profile routes

Testing
- form validation and settings update test coverage

Expected Output
- A polished authenticated experience with full account management

### Phase 6 — Optimization, Observability, and Scale Readiness
Goals
- Improve performance, resilience, and maintainability.

Files
- utils/analytics.js
- utils/errorBoundary.js
- hooks/usePerformanceMetrics.js
- styles/themes/dark.js

Components
- ErrorBoundary wrapper
- Performance-aware skeletons
- Theme toggler

Pages
- all pages performance-optimized

Hooks
- useErrorBoundary

Contexts
- UIContext theme expansion

Services
- centralized telemetry and error reporting hooks

Routes
- route-level performance improvements

Testing
- load testing assumptions and UX regression tests

Expected Output
- A scalable, production-ready frontend foundation

---

## 35. Implementation Notes for the Engineering Team

### Recommended Development Order
1. Build app shell, routing, and auth flow.
2. Build dashboard and data-driven list pages.
3. Implement upload and asset management.
4. Build template and voice experiences.
5. Implement video studio and rendering workflow.
6. Polish settings, theming, and responsiveness.

### Development Guidelines
- Keep components small and focused.
- Prefer hooks over duplicate logic.
- Avoid prop drilling by using context where appropriate.
- Keep API orchestration in services, not in pages.
- Treat loading, error, and empty states as first-class UX requirements.

---

## 36. Final Delivery Standard

This frontend architecture is intended to be implemented by a senior-level engineer without ambiguity. The implementation should:
- be modular and scalable,
- follow production SaaS patterns,
- avoid unnecessary complexity,
- support secure auth and async media workflows,
- and remain maintainable as the product grows.
