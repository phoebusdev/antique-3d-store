# Feature Specification: Antique 3D Model E-Commerce Site

**Feature Branch**: `001-mvp-ecommerce-site`
**Created**: 2025-10-27
**Status**: Draft
**Input**: BUILD: Antique 3D Model E-Commerce Site - A presentation-quality web application that sells 3D digital files of historical antique designs sourced from public domain auction imagery. MVP scope: 5 hardcoded objects, Stripe checkout (digital delivery), future-ready for physical products.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse and Preview 3D Models (Priority: P1) 🎯 MVP

A customer visits the site to discover historical antique 3D models, exploring each model's 3D preview before deciding to view details.

**Why this priority**: This is the entry point for all users. Without an engaging gallery that showcases the quality of the models, users won't proceed to purchase. The 3D previews are the primary value proposition.

**Independent Test**: Can be fully tested by loading the homepage, viewing the gallery grid of 5 models with rotating 3D previews, and hovering over cards to see interaction states. Delivers browsing experience without requiring purchase flow.

**Acceptance Scenarios**:

1. **Given** the user navigates to the homepage, **When** the page loads, **Then** they see a grid of 5 antique model cards, each showing a rotating 3D preview, name, era, and price
2. **Given** the user hovers over a model card, **When** the mouse enters the card area, **Then** the preview enlarges, displays a "View Details" overlay, and shows smooth animation
3. **Given** the user is on mobile, **When** they scroll the gallery, **Then** cards stack vertically with touch-friendly sizing and previews remain interactive
4. **Given** a model preview is loading, **When** the 3D file is being fetched, **Then** a loading state appears (wireframe or spinner) until the model renders
5. **Given** the user views the gallery, **When** they assess the aesthetic, **Then** the dark minimal design (#0a0a0a background, #f5f5f5 text) with generous whitespace creates a museum-quality presentation

---

### User Story 2 - Explore Model Details in Full 3D Viewer (Priority: P1) 🎯 MVP

A customer clicks on a model card to view detailed information and interact with a full-screen 3D viewer that allows rotation, zoom, and pan to inspect the model thoroughly.

**Why this priority**: After browsing, users need detailed inspection capability before committing to purchase. The full 3D viewer builds confidence in the product quality.

**Independent Test**: Can be fully tested by clicking any model card from the gallery, landing on the detail page with a full-screen 3D viewer, using orbital controls to manipulate the view, and reading specifications in the sidebar. Delivers complete product examination without requiring checkout.

**Acceptance Scenarios**:

1. **Given** the user clicks a model card, **When** the detail page loads, **Then** they see a full-screen 3D viewer with the model centered and an interactive orbital control interface
2. **Given** the user is on the detail page, **When** they drag on the 3D viewer, **Then** the model rotates smoothly; scroll zooms in/out; shift+drag pans the view
3. **Given** the user views the model, **When** the lighting renders, **Then** HDRI environment mapping creates realistic material appearance with proper highlights and shadows
4. **Given** the user is on desktop, **When** they view the page layout, **Then** a right sidebar displays object name, era, provenance, real dimensions, technical specs (vertices, file size, formats)
5. **Given** the user is on mobile, **When** they view the page layout, **Then** the 3D viewer occupies the top portion, and metadata appears in a scrollable bottom section
6. **Given** the user views metadata, **When** they read technical specifications, **Then** numbers are displayed in JetBrains Mono font for clear readability
7. **Given** the 3D model is loading, **When** the file is being processed, **Then** a wireframe appears first, then transitions to the solid rendered model
8. **Given** the user views the sidebar, **When** they see the CTAs, **Then** two buttons appear: "Download Digital File - $X" (primary cyan) and "Physical Object - Coming Soon" (disabled, amber border with tooltip)

---

### User Story 3 - Purchase and Download Digital Model (Priority: P1) 🎯 MVP

A customer decides to purchase a digital 3D model, completes payment through Stripe, and receives an immediate download link upon successful transaction.

**Why this priority**: This is the core revenue-generating flow. Without a working checkout and delivery mechanism, the site cannot fulfill its primary business purpose.

**Independent Test**: Can be fully tested by clicking "Download Digital File" button, completing the Stripe checkout form with test card (4242 4242 4242 4242), receiving success confirmation, and clicking the download link to receive the .glb file. Delivers complete purchase-to-delivery experience.

**Acceptance Scenarios**:

1. **Given** the user is on a model detail page, **When** they click "Download Digital File - $X", **Then** they are navigated to `/checkout` with an order summary showing the model thumbnail, name, price, and total
2. **Given** the user is on the checkout page, **When** they view the payment form, **Then** Stripe Elements renders a styled form matching the site aesthetic with fields for card number, expiry, CVC, and email
3. **Given** the user enters valid test card details (4242 4242 4242 4242), **When** they click "Complete Purchase", **Then** the payment processes, a loading state appears, and they redirect to `/success` upon completion
4. **Given** the user completes a purchase, **When** they land on the success page, **Then** they see confirmation message, a prominent "Download [ModelName].glb" button, email confirmation text, technical note about file format, and a "Return to gallery" link
5. **Given** the user clicks the download button, **When** the request is made, **Then** a signed URL with 24-hour expiration serves the .glb file from `/api/download/[modelId]?token=[jwt]`
6. **Given** payment processing fails, **When** Stripe returns an error, **Then** the error displays inline on the checkout page without reload, with a clear user-friendly message
7. **Given** the purchase completes successfully, **When** Stripe webhook fires `checkout.session.completed`, **Then** the system sends an email to the provided address with the download link (stubbed for MVP)

---

### User Story 4 - Admin Content Management (Priority: P2)

An administrator logs into the admin panel to upload new 3D models, edit model metadata, manage visibility (published/draft), and preview models before publishing.

**Why this priority**: Essential for content management but not blocking for customer-facing MVP. The UI is complete but backend is stubbed, allowing demo while infrastructure is built later.

**Independent Test**: Can be fully tested by navigating to `/admin`, entering the hardcoded password, uploading a .glb file via drag-and-drop, filling metadata form (name, era, dimensions, provenance, price), previewing the 3D model, clicking "Publish", and seeing the model appear in the management table. Currently writes to localStorage, demonstrating complete UI flow ready for database integration.

**Acceptance Scenarios**:

1. **Given** the user navigates to `/admin`, **When** the page loads, **Then** they see a password input field with clean styling
2. **Given** the user enters the correct password (hardcoded: stored in ADMIN_PASSWORD env var), **When** they submit, **Then** they access the admin interface with upload and management sections
3. **Given** the admin is logged in, **When** they view the upload interface, **Then** they see a drag-and-drop zone for .glb files with a form containing fields: Name, Era, Dimensions, Provenance, Price
4. **Given** the admin drags a .glb file to the upload zone, **When** the file is dropped, **Then** a 3D preview renders below the form showing the uploaded model
5. **Given** the admin fills all required fields, **When** they click "Publish", **Then** the model saves to localStorage (MVP stub), appears in the management table below, and a success message displays
6. **Given** the admin views the management table, **When** they see the list, **Then** all models appear with columns for name, era, price, published status, and action buttons (edit/delete/toggle visibility)
7. **Given** the admin clicks "toggle visibility", **When** the button is pressed, **Then** the model switches between published/draft state with visual indicator
8. **Given** the admin clicks "edit", **When** the form populates, **Then** existing metadata appears, they can modify fields, and save updates to localStorage
9. **Given** the admin clicks "delete", **When** confirming the action, **Then** the model removes from the management table and localStorage

---

### User Story 5 - Accessible Navigation and Keyboard Control (Priority: P2)

A user navigating with keyboard or screen reader can access all interactive elements, receive proper announcements, and complete the full purchase journey without a mouse.

**Why this priority**: Accessibility is a constitutional requirement (WCAG 2.1 AA) and expands market reach, but is validated after core functionality exists. This story ensures all previous stories are accessible.

**Independent Test**: Can be fully tested by navigating the entire site using only keyboard (Tab, Enter, Escape), testing with NVDA or VoiceOver screen reader, verifying focus indicators on all interactive elements, and completing a test purchase without touching the mouse. Delivers inclusive experience.

**Acceptance Scenarios**:

1. **Given** the user navigates with keyboard only, **When** they press Tab, **Then** focus moves sequentially through all interactive elements (model cards, buttons, form fields) with visible cyan outline indicators
2. **Given** the user is on a model card, **When** they press Enter, **Then** the detail page loads (same as clicking)
3. **Given** the user operates a screen reader, **When** the 3D viewer loads, **Then** ARIA labels announce "3D model viewer" and available controls (drag to rotate, scroll to zoom, shift+drag to pan)
4. **Given** the user navigates the checkout form, **When** they use keyboard only, **Then** they can tab through all Stripe Elements fields, fill information, and submit with Enter
5. **Given** the user encounters an error, **When** validation fails, **Then** screen readers announce the error message and focus moves to the first error field
6. **Given** the user views any page, **When** they assess color contrast, **Then** all text meets WCAG ratios (≥4.5:1 for body text, ≥3:1 for large text)
7. **Given** the user presses Escape on the detail page, **When** the key is registered, **Then** they return to the gallery (or modal closes if implemented)

---

### Edge Cases

- **3D Model Loading Failures**: What happens when a .glb file is corrupted or fails to load? Display error boundary with fallback message "Model failed to load. Please refresh or contact support."
- **Stripe Payment Timeout**: How does the system handle payment processing that exceeds timeout limits? Show timeout error with retry button, preserve form data.
- **Large Model Files (>10MB)**: What happens when upload or download takes excessive time? Show progress indicator with percentage, warn admin during upload if file exceeds 5MB recommended limit.
- **Browser WebGL Incompatibility**: How does the system handle browsers without WebGL support? Detect capability on load, show static 2D image fallback with message "3D viewer requires WebGL. Please use a modern browser."
- **Concurrent Admin Edits**: What happens when localStorage becomes out of sync (multiple tabs)? Show warning "Data may be out of sync. Refresh to see latest." (Resolved when database implemented.)
- **Email Delivery Failure**: What happens when webhook sends email but delivery fails? Log error in webhook handler, display download link on success page as backup (email is convenience, not critical path).
- **Expired Download Links**: What happens when a user tries to access a download link after 24-hour expiration? Return 403 error with message "Download link expired. Please contact support for assistance."
- **Mobile Performance on Low-End Devices**: How does the system handle 3D rendering on devices with limited GPU? Reduce polygon count for mobile, implement quality settings toggle (low/medium/high), provide 2D fallback option.
- **Empty Gallery State**: What happens when no models are published? Display message "Coming Soon: New models will be available shortly" with subtle animation.
- **Stripe Test vs Live Mode Mismatch**: What happens when environment variables mix test/live keys? Validate key pairs on startup, throw clear error if mismatch detected, prevent deployment with incorrect configuration.

---

## Requirements *(mandatory)*

### Functional Requirements

**Gallery & Browsing**:
- **FR-001**: System MUST display a grid layout of 5 antique 3D model cards on the homepage, each showing a rotating 3D preview, object name, era, and price
- **FR-002**: System MUST render each model card's 3D preview using Three.js with subtle orbit animation (0.2 RPM)
- **FR-003**: System MUST implement hover states on model cards that enlarge the preview, show "View Details" overlay, and animate smoothly (200ms ease-out)
- **FR-004**: System MUST stack model cards vertically on mobile viewports (<768px) with touch-friendly sizing
- **FR-005**: System MUST implement a Suspense boundary with loading state (wireframe or spinner) during 3D model file fetching

**Model Detail Page**:
- **FR-006**: System MUST render a full-screen 3D viewer using React Three Fiber with OrbitControls for drag-to-rotate, scroll-to-zoom, and shift+drag-to-pan interactions
- **FR-007**: System MUST apply HDRI environment mapping for realistic lighting and material rendering of 3D models
- **FR-008**: System MUST display model metadata in a right sidebar (desktop >1024px) or bottom section (mobile <768px) including: object name, era, provenance, real dimensions, technical specs (vertices, file size, formats)
- **FR-009**: System MUST render a primary CTA button "Download Digital File - $X" styled with cyan color (#00d9ff)
- **FR-010**: System MUST render a disabled secondary button "Physical Object - Coming Soon" styled with amber border (#ffb800) and tooltip
- **FR-011**: System MUST display all numeric data (dimensions, file sizes, vertices) using JetBrains Mono font with tabular figures
- **FR-012**: System MUST implement progressive loading for 3D models: wireframe appears first, then solid rendered model

**Checkout & Payment**:
- **FR-013**: System MUST navigate users to `/checkout` when "Download Digital File" button is clicked, displaying order summary with model thumbnail, name, price, and total
- **FR-014**: System MUST embed Stripe Elements payment form with fields for card number, expiry, CVC, and email, styled to match site aesthetic
- **FR-015**: System MUST create a Stripe Payment Intent via `/api/stripe/route.ts` with metadata: `{ modelId, deliveryType: "digital", format: "glb", dimensions, customerEmail, manufacturingRequired: false }`
- **FR-016**: System MUST handle payment submission, display loading state during processing, and redirect to `/success` upon successful charge
- **FR-017**: System MUST display inline error messages on the checkout page if payment fails, without page reload, using user-friendly language
- **FR-018**: System MUST validate Stripe webhook signature on `/api/webhooks/stripe/route.ts` for `checkout.session.completed` events
- **FR-019**: System MUST generate a signed JWT download token with 24-hour expiration containing: modelId, purchaseId, expiresAt

**Post-Purchase & Download**:
- **FR-020**: System MUST display success page at `/success` with: confirmation message, prominent download button, email confirmation text, technical note about .glb format, and return-to-gallery link
- **FR-021**: System MUST serve download requests via `/api/download/[modelId]?token=[jwt]` by validating token signature and expiration, then serving the .glb file
- **FR-022**: System MUST return 403 error with clear message when download token is expired or invalid
- **FR-023**: System MUST send email with download link to customer email address when webhook processes successful payment (stubbed for MVP - logs to console instead)

**Admin Panel**:
- **FR-024**: System MUST protect `/admin` route with password authentication, comparing input against ADMIN_PASSWORD environment variable
- **FR-025**: System MUST render drag-and-drop .glb file upload interface with visual feedback (border highlight on drag-over)
- **FR-026**: System MUST display metadata form with required fields: Name, Era, Dimensions, Provenance, Price (in cents)
- **FR-027**: System MUST render 3D preview of uploaded .glb file before publishing, using same ModelViewer component as frontend
- **FR-028**: System MUST save model data to localStorage (MVP stub) when "Publish" button is clicked, with format matching AntiqueModel interface
- **FR-029**: System MUST display management table listing all models with columns: name, era, price, published status, action buttons (edit/delete/toggle visibility)
- **FR-030**: System MUST allow toggling model visibility between published/draft states with visual indicator
- **FR-031**: System MUST populate edit form with existing model data when edit button is clicked, allow modifications, and save updates to localStorage

**Performance & Loading**:
- **FR-032**: System MUST achieve Lighthouse scores >90 for Performance, Accessibility, Best Practices, and SEO
- **FR-033**: System MUST deliver First Contentful Paint (FCP) <1.5s on 4G network simulation
- **FR-034**: System MUST deliver Time to Interactive (TTI) <3s on 4G network simulation
- **FR-035**: System MUST load 3D model files <2s per model (requires models <5MB each)
- **FR-036**: System MUST implement code splitting by route using Next.js 14 App Router dynamic imports
- **FR-037**: System MUST serve all images in WebP format with compression

**Accessibility**:
- **FR-038**: System MUST provide keyboard navigation for all interactive elements with visible focus indicators (cyan outline)
- **FR-039**: System MUST apply ARIA labels to 3D viewer controls announcing available interactions
- **FR-040**: System MUST meet WCAG 2.1 AA color contrast ratios (≥4.5:1 body text, ≥3:1 large text)
- **FR-041**: System MUST support screen reader navigation with proper announcements for checkout steps and form validation errors
- **FR-042**: System MUST allow Enter key to activate buttons and links, Escape to close modals or return to previous page

**Responsive Design**:
- **FR-043**: System MUST implement mobile-first responsive design with breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
- **FR-044**: System MUST adapt 3D viewer touch controls for mobile: single-finger drag rotates, pinch zooms, two-finger drag pans

**Error Handling**:
- **FR-045**: System MUST implement React error boundaries around 3D viewer to catch WebGL errors and display fallback message
- **FR-046**: System MUST detect WebGL capability on page load and show 2D image fallback with upgrade message if unsupported
- **FR-047**: System MUST log all Stripe webhook errors to console (MVP) and display admin-facing error messages

**Future-Proofing (Architecture Requirements)**:
- **FR-048**: System MUST structure Stripe Payment Intent metadata to support future `deliveryType: "physical"` and `manufacturingRequired: true` without code changes
- **FR-049**: System MUST implement conditional logic in webhook handler to route physical orders to provider API (stubbed for MVP, logs to console)
- **FR-050**: System MUST use AntiqueModel interface consistently across all components to enable easy migration from hardcoded array to database queries

---

### Key Entities

**AntiqueModel**: Represents a 3D digital file of a historical antique design available for purchase
- Core attributes: `id` (string, unique identifier), `name` (string, display name), `era` (string, historical period), `provenance` (string, source/history)
- Technical attributes: `dimensions` (string, real-world measurements e.g., "38\" H × 22\" W × 20\" D"), `vertices` (number, polygon count), `fileSize` (number, bytes), `fileUrl` (string, path to .glb file in /public/models)
- Commerce attributes: `price` (number, in cents for Stripe), `published` (boolean, visibility toggle)
- Relationships: References Stripe Product via `id` mapping, serves as data source for ModelCard and ModelViewer components

**StripePaymentIntent**: Represents a customer purchase transaction
- Metadata attributes: `modelId` (string, FK to AntiqueModel), `deliveryType` (string, "digital" or "physical"), `format` (string, file format e.g., "glb"), `dimensions` (string, copied from model), `customerEmail` (string), `manufacturingRequired` (boolean, false for digital)
- Purpose: Tracks purchase context for webhook fulfillment routing and download link generation

**DownloadToken**: Represents a signed, time-limited authorization to download a purchased model
- Attributes: `modelId` (string, FK to AntiqueModel), `purchaseId` (string, Stripe Payment Intent ID), `expiresAt` (timestamp, 24 hours from issuance)
- Format: JWT signed with server secret
- Purpose: Secures download endpoint, prevents unauthorized access to .glb files

**AdminSession**: Represents authenticated admin panel access (MVP: simple password check)
- Attributes: `authenticated` (boolean, session state), `passwordHash` (string, hardcoded in ADMIN_PASSWORD env var)
- Purpose: Protects admin routes, will be replaced by NextAuth.js in future

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

**Visual Excellence**:
- **SC-001**: 100% of UI elements MUST match constitutional aesthetic specifications: #0a0a0a background, #f5f5f5 text, JetBrains Mono for data, Inter for body, cyan/amber accents, verified via design QA checklist
- **SC-002**: 3D viewer MUST render with HDRI lighting producing realistic highlights and shadows, verified by side-by-side comparison with reference renders
- **SC-003**: Zero placeholder UI elements MUST exist in any deployed code, verified via manual inspection of all pages

**Functional Completeness**:
- **SC-004**: All 5 pages (Gallery, Model Detail, Checkout, Success, Admin) MUST load successfully and execute their primary functions without errors, verified via end-to-end testing checklist
- **SC-005**: Stripe test mode checkout MUST complete successfully using test card 4242 4242 4242 4242, resulting in successful payment and download link generation, verified by completing 10 consecutive test purchases
- **SC-006**: Download link MUST serve .glb file upon successful payment (even if backend is stubbed), verified by successful file download and validation of file integrity
- **SC-007**: Admin panel UI MUST render all components (upload, form, preview, management table) and persist data to localStorage, verified by uploading test model and seeing it appear in management table

**Production Quality**:
- **SC-008**: TypeScript strict mode MUST produce zero compilation errors, verified by successful `npm run build` with no TypeScript diagnostics
- **SC-009**: Lighthouse score MUST achieve >90 for all four categories (Performance, Accessibility, Best Practices, SEO) on both desktop and mobile, verified via automated Lighthouse CI
- **SC-010**: Site MUST load with Time to Interactive <3 seconds on simulated 4G network (Chrome DevTools throttling), verified via Lighthouse performance audit
- **SC-011**: Mobile responsive design MUST adapt layouts correctly at 320px, 768px, and 1024px breakpoints, verified via manual testing on physical devices or DevTools device emulation
- **SC-012**: Accessibility audit MUST pass with zero critical violations using axe DevTools, verified via automated scan of all pages
- **SC-013**: Keyboard navigation MUST allow completing full purchase journey without mouse, verified via manual keyboard-only testing session

**Future-Proofing**:
- **SC-014**: Replacing hardcoded MODELS array with database query MUST require changes to only 1 file (lib/models.ts), verified via code architecture review
- **SC-015**: Enabling physical product fulfillment MUST require modifying only webhook handler conditional logic (no Stripe integration changes), verified via code inspection of metadata structure
- **SC-016**: Codebase MUST contain zero "TODO" or "FIXME" comments related to MVP scope requirements, verified via grep search

**Performance Benchmarks**:
- **SC-017**: Total JavaScript bundle size MUST be <300KB gzipped, verified via webpack-bundle-analyzer or Next.js build output
- **SC-018**: Individual 3D model files MUST be <5MB each to meet <2s load target on 4G, verified via file size inspection in /public/models
- **SC-019**: Page transitions MUST animate within 400ms, verified via manual timing inspection using Chrome DevTools Performance tab
- **SC-020**: 3D viewer frame rate MUST maintain >60fps during orbital rotation on desktop, verified via Chrome DevTools FPS meter during interaction

**Deployment Readiness**:
- **SC-021**: Vercel deployment MUST succeed without configuration beyond environment variables, verified via successful preview deployment
- **SC-022**: README.md MUST document all required environment variables with example values, verified via manual checklist review
- **SC-023**: .env.example MUST include all 4 required keys (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, ADMIN_PASSWORD), verified via file inspection
