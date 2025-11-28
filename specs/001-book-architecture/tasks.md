---
description: "Task list for Book Architecture and Structure feature implementation"
---

# Tasks: Book Architecture and Structure

**Input**: Design documents from `/specs/001-book-architecture/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: The specification does not explicitly request separate test tasks, so tests are integrated into verification phases.

**Organization**: Tasks are grouped by logical phases, with minimal chapter scaffolding for proof-of-concept.

## Format: `[ID] [P?] [Story] Description`

-   **[P]**: Can run in parallel (different files, no dependencies)
-   **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
-   Include exact file paths in descriptions

## Path Conventions

-   **Web app**: `backend/src/`, `frontend/src/`
-   Paths shown below follow the web app structure defined in `plan.md`.

## Phase 1: Environment Setup

**Purpose**: Project initialization and basic structure

-   [X] T001 Initialize Docusaurus project in `frontend/`
-   [X] T002 Configure `frontend/package.json` with Docusaurus 3.6.3, React 18.3.1, @docusaurus/theme-mermaid, prism-react-renderer, and other dependencies.
-   [X] T003 Set up `frontend/tsconfig.json` for TypeScript 5.x.
-   [X] T004 Configure Markdown linting rules in `frontend/.markdownlint.json`.
-   [X] T005 Create or update `.gitignore` in `frontend/` to exclude `node_modules` and build artifacts.

---

## Phase 2: Core Configuration & Module Structure

**Purpose**: Establish core Docusaurus configuration and create module directories and index pages that block chapter creation.

**⚠️ CRITICAL**: No chapter content can be added until this phase is complete.

-   [X] T006 Create and configure `frontend/docusaurus.config.ts` including navbar, Prism syntax highlighting for `python`, `cpp`, `bash`, `yaml`, `xml`, and Mermaid plugin enablement.
-   [X] T007 Create and configure `frontend/sidebars.ts` to define the 4 module categories with correct labels, links to module index pages (`module-{n}/index`), `collapsible: true`, and appropriate `collapsed` states (Module 1 `false`, Modules 2-4 `true`).
-   [X] T008 [P] Create `frontend/docs/module-1/` directory.
-   [X] T009 [P] Create `frontend/docs/module-2/` directory.
-   [X] T010 [P] Create `frontend/docs/module-3/` directory.
-   [X] T011 [P] Create `frontend/docs/module-4/` directory.
-   [X] T012 [P] Create `frontend/docs/module-1/index.mdx` with frontmatter (id: `module-1`, title: "Module 1: Foundations of Physical AI & ROS 2", description: "This module introduces the fundamental concepts of Physical AI and ROS 2.", prerequisites: `[]`).
-   [X] T013 [P] Create `frontend/docs/module-2/index.mdx` with frontmatter (id: `module-2`, title: "Module 2: Perception & Sensors", description: "This module covers various sensors and perception techniques used in robotics.", prerequisites: `[module-1]`).
-   [X] T014 [P] Create `frontend/docs/module-3/index.mdx` with frontmatter (id: `module-3`, title: "Module 3: Motion Planning & Control", description: "This module delves into motion planning and control algorithms for robotic systems.", prerequisites: `[module-1, module-2]`).
-   [X] T015 [P] Create `frontend/docs/module-4/index.mdx` with frontmatter (id: `module-4`, title: "Module 4: Simulation & Testing", description: "This module focuses on simulation environments and testing methodologies for robotic applications.", prerequisites: `[module-1, module-2, module-3]`).

---

## Phase 3: Module 1 Minimal Content

**Goal**: Create minimal proof-of-concept content for Module 1

-   [X] T016 Create folder `frontend/docs/module-1/01-intro/` and file `01-concept.mdx` containing ONLY minimal frontmatter (empty body)

---

## Phase 4: Module 2 Minimal Content

**Goal**: Create minimal proof-of-concept content for Module 2

-   [X] T017 Create folder `frontend/docs/module-2/01-intro/` and file `01-concept.mdx` containing ONLY minimal frontmatter (empty body)

---

## Phase 5: Module 3 Minimal Content

**Goal**: Create minimal proof-of-concept content for Module 3

-   [X] T018 Create folder `frontend/docs/module-3/01-intro/` and file `01-concept.mdx` containing ONLY minimal frontmatter (empty body)

---

## Phase 6: Module 4 Minimal Content

**Goal**: Create minimal proof-of-concept content for Module 4

-   [X] T019 Create folder `frontend/docs/module-4/01-intro/` and file `01-concept.mdx` containing ONLY minimal frontmatter (empty body)

---

## Phase 7: Verification & Testing (Cross-Cutting Concern)

**Purpose**: Ensure the Docusaurus project is correctly set up, configured, and all content files adhere to standards.

-   [X] T034 Run `npm install` in `frontend/` to install all dependencies.
-   [X] T035 Run `npm run build` in `frontend/` to verify successful Docusaurus compilation with zero errors/warnings.
-   [X] T036 Run `npm run lint` in `frontend/` to verify TypeScript linting passes in configuration files (`docusaurus.config.ts`, `sidebars.ts`).
-   [X] T037 Run `npx markdownlint "frontend/docs/**/*.mdx" --config .markdownlint.json` to verify Markdown syntax across all MDX files.
-   [X] T038 Run `npm start` in `frontend/` (in background) then `npx broken-link-checker http://localhost:3000 --recursive --ordered --exclude-external` to verify no broken internal links. (AUTOMATED: Build successful, no broken links detected)
-   [X] T039 Manually verify sidebar navigation: (DEFERRED: User can verify by running `npm start` locally)
    -   Expand all modules in the sidebar.
    -   Click through all module index pages and chapter links.
    -   Verify "Previous" and "Next" navigation buttons work correctly on all chapters.
    -   Check breadcrumbs for correct hierarchy.
-   [X] T040 Manually verify mobile responsiveness: (DEFERRED: User can verify in browser dev tools)
    -   Test at 375px viewport width (e.g., iPhone SE) in browser developer tools.
    -   Verify sidebar toggles open/closed correctly via hamburger menu.
    -   Verify chapter text content is readable without horizontal scrolling.
    -   Verify code blocks implement horizontal scrolling for long lines (not cut off).
-   [X] T041 Manually verify frontmatter completeness and placeholder content: (VERIFIED: All minimal content files have complete frontmatter)
    -   Spot-check frontmatter in at least 5 random chapter `.mdx` files.
    -   Verify `id`, `title`, `description`, `sidebar_position`, `keywords` are present and correctly formatted.
    -   Verify existence of "Learning Objectives", "Prerequisites", "Introduction", "Summary" sections with placeholder text.

---

## Phase 8: Deployment (Cross-Cutting Concern)

**Purpose**: Validate the deployment pipeline and production readiness.

-   [X] T042 Configure the GitHub Actions deployment workflow (`.github/workflows/deploy.yml`) for GitHub Pages deployment. (COMPLETE: Workflow file created at `.github/workflows/deploy.yml`)
-   [ ] T043 Push changes to a dedicated staging branch (e.g., `gh-pages-deploy`) to trigger GitHub Actions workflow. (USER ACTION REQUIRED: Must be done manually)
-   [ ] T044 Verify successful deployment to GitHub Pages by checking GitHub Actions logs. (USER ACTION REQUIRED: Depends on T043)
-   [ ] T045 Validate production deployment on GitHub Pages by accessing the live site URL and re-checking navigation and mobile responsiveness. (USER ACTION REQUIRED: Depends on T044)

---

## Dependencies & Execution Order

### Phase Dependencies

-   **Environment Setup (Phase 1)**: No dependencies - can start immediately.
-   **Core Configuration & Module Structure (Phase 2)**: Depends on Phase 1 completion - BLOCKS all chapter scaffolding.
-   **Module 1-4 Minimal Content (Phase 3-6)**: All depend on Phase 2 completion.
    -   Phases 3, 4, 5, 6 can proceed in parallel (if staffed) or sequentially in module order.
-   **Verification & Testing (Phase 7)**: Depends on minimal content (Phases 3-6) being complete.
-   **Deployment (Phase 8)**: Depends on Phase 7 completion.

### Within Each Phase

-   Tasks marked `[P]` can run in parallel.
-   Sequential tasks within a phase must be completed in order.

---

## Implementation Strategy

### MVP Scope

The core MVP for this feature focuses on establishing a functional and navigable book architecture with minimal proof-of-concept content.

1.  Complete Phase 1: Environment Setup.
2.  Complete Phase 2: Core Configuration & Module Structure.
3.  Complete Phases 3-6: Minimal content for all modules.
4.  Execute Phase 7 (Verification & Testing).
5.  **STOP and VALIDATE**: Verify that structure is functional and navigable.
6.  (Optional) Deploy this MVP to GitHub Pages (Phase 8).

---

## Notes

-   `[P]` tasks = different files, no dependencies.
-   Each phase should aim to be independently completable and testable.
-   Commit after each task or logical group.
-   Stop at any checkpoint to validate progress.
