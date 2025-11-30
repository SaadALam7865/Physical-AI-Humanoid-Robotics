---
id: 002
title: Generated Book Architecture Tasks
stage: tasks
date: 2025-11-28
surface: CLI
model: claude-sonnet-4-5-20250929
feature: 001-book-architecture
branch: 001-book-architecture
user: User
command: /sp.tasks
labels: [task-generation, planning]
links:
  spec: specs/001-book-architecture/spec.md
  plan: specs/001-book-architecture/plan.md
  tasks: specs/001-book-architecture/tasks.md
  adr:
    - history/adr/adr-001-book-architecture-and-content-structure.md
    - history/adr/adr-002-frontend-technology-stack.md
    - history/adr/adr-003-content-file-formats-and-conventions.md
    - history/adr/adr-004-frontend-deployment-strategy.md
files:
    - path: D:\physical-ai-and-humanoid-robotics\specs\001-book-architecture\plan.md
    - path: D:\physical-ai-and-humanoid-robotics\specs\001-book-architecture\spec.md
    - path: D:\physical-ai-and-humanoid-robotics\specs\001-book-architecture\data-model.md
    - path: D:\physical-ai-and-humanoid-robotics\specs\001-book-architecture\quickstart.md
    - path: D:\physical-ai-and-humanoid-robotics\specs\001-book-architecture\contracts\chapter-frontmatter.schema.yaml
    - path: D:\physical-ai-and-humanoid-robotics\specs\001-book-architecture\contracts\module-index-frontmatter.schema.yaml
    - path: D:\physical-ai-and-humanoid-robotics\specs\001-book-architecture\contracts\sidebars.interface.ts
    - path: D:\physical-ai-and-humanoid-robotics\specs\001-book-architecture\tasks.md
tests:
  summary: Tasks are generated to cover all verification steps.
---

## Prompt

Generate a comprehensive, dependency-ordered task list for the "Book Architecture and Structure" feature
  (001-book-architecture). The task list should be based on the requirements and technical implementation detailed in the
  feature specification (specs/001-book-architecture/spec.md) and the implementation plan
  (specs/001-book-architecture/plan.md).

  Break down the implementation into actionable, granular steps covering the following categories:

  1.  **Environment Setup**:
      -   Initialize the Docusaurus project.
      -   Configure `package.json` with all required dependencies (Docusaurus, React, Mermaid plugin, Prism).
      -   Set up TypeScript configuration (`tsconfig.json`).
      -   Configure Markdown linting rules (`.markdownlint.json`).
      -   Set up `.gitignore`.

  2.  **Configuration Files**:
      -   Create and configure `docusaurus.config.ts` including navbar, Prism syntax highlighting for specified languages
  (python, cpp, bash, yaml, xml), and Mermaid plugin enablement.
      -   Create and configure `sidebars.ts` to define the 4 module categories with correct labels, links to module index
  pages, `collapsible: true`, and appropriate `collapsed` states (Module 1 `false`, Modules 2-4 `true`).
      -   Configure the GitHub Actions deployment workflow (`.github/workflows/deploy.yml`) for GitHub Pages deployment.

  3.  **Module & Chapter Scaffolding**:
      -   Create 4 module directories (`frontend/docs/module-1` through `frontend/docs/module-4`).
      -   Create 4 `index.mdx` landing pages for each module with correct frontmatter (id, title, description,
  prerequisites).
      -   Create 18 chapter `.mdx` files with placeholder content, including full YAML frontmatter (id, title, description,
   sidebar_position with gaps, keywords) and all required content sections (Learning Objectives, Prerequisites,
  Introduction, Main Content, Practical Exercises, Summary, Further Reading, Troubleshooting). Ensure chapter slugs match
  the `sidebars.ts` entries.

  4.  **Verification & Testing**:
      -   Run `npm install` and `npm run build` to verify successful compilation with zero errors/warnings.
      -   Run `npm run lint` to verify TypeScript linting passes.
      -   Run `npx markdownlint "docs/**/*.mdx"` to verify Markdown syntax.
      -   Run `npx broken-link-checker` to verify no broken internal links.
      -   Manually verify sidebar navigation, prev/next buttons, and breadcrumbs.
      -   Manually verify mobile responsiveness at 375px viewport for sidebar and code blocks.
      -   Manually verify frontmatter completeness and placeholder content in chapter MDX files.

  5.  **Deployment**:
      -   Push changes to a staging branch to trigger GitHub Actions deployment.
      -   Verify successful deployment to GitHub Pages.
      -   Validate production deployment on GitHub Pages for navigation and mobile responsiveness.

## Response snapshot

# Tasks: Book Architecture and Structure

**Input**: Design documents from `/specs/001-book-architecture/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: The specification does not explicitly request separate test tasks, so tests are integrated into verification phases.

**Organization**: Tasks are grouped by logical phases, with chapter scaffolding supporting all user stories related to content navigation and discoverability.

## Format: `[ID] [P?] [Story] Description`

-   **[P]**: Can run in parallel (different files, no dependencies)
-   **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
-   Include exact file paths in descriptions

## Path Conventions

-   **Web app**: `backend/src/`, `frontend/src/`
-   Paths shown below follow the web app structure defined in `plan.md`.

## Phase 1: Environment Setup

**Purpose**: Project initialization and basic structure

-   [ ] T001 Initialize Docusaurus project in `frontend/`
-   [ ] T002 Configure `frontend/package.json` with Docusaurus 3.6.3, React 18.3.1, @docusaurus/theme-mermaid, prism-react-renderer, and other dependencies.
-   [ ] T003 Set up `frontend/tsconfig.json` for TypeScript 5.x.
-   [ ] T004 Configure Markdown linting rules in `frontend/.markdownlint.json`.
-   [ ] T005 Create or update `.gitignore` in `frontend/` to exclude `node_modules` and build artifacts.

---

## Phase 2: Core Configuration & Module Structure

**Purpose**: Establish core Docusaurus configuration and create module directories and index pages that block chapter creation.

**⚠️ CRITICAL**: No chapter content can be added until this phase is complete.

-   [ ] T006 Create and configure `frontend/docusaurus.config.ts` including navbar, Prism syntax highlighting for `python`, `cpp`, `bash`, `yaml`, `xml`, and Mermaid plugin enablement.
-   [ ] T007 Create and configure `frontend/sidebars.ts` to define the 4 module categories with correct labels, links to module index pages (`module-{n}/index`), `collapsible: true`, and appropriate `collapsed` states (Module 1 `false`, Modules 2-4 `true`).
-   [ ] T008 [P] Create `frontend/docs/module-1/` directory.
-   [ ] T009 [P] Create `frontend/docs/module-2/` directory.
-   [ ] T010 [P] Create `frontend/docs/module-3/` directory.
-   [ ] T011 [P] Create `frontend/docs/module-4/` directory.
-   [ ] T012 [P] Create `frontend/docs/module-1/index.mdx` with frontmatter (id: `module-1`, title: "Module 1: Foundations of Physical AI & ROS 2", description: "This module introduces the fundamental concepts of Physical AI and ROS 2.", prerequisites: `[]`).
-   [ ] T013 [P] Create `frontend/docs/module-2/index.mdx` with frontmatter (id: `module-2`, title: "Module 2: Perception & Sensors", description: "This module covers various sensors and perception techniques used in robotics.", prerequisites: `[module-1]`).
-   [ ] T014 [P] Create `frontend/docs/module-3/index.mdx` with frontmatter (id: `module-3`, title: "Module 3: Motion Planning & Control", description: "This module delves into motion planning and control algorithms for robotic systems.", prerequisites: `[module-1, module-2]`).
-   [ ] T015 [P] Create `frontend/docs/module-4/index.mdx` with frontmatter (id: `module-4`, title: "Module 4: Simulation & Testing", description: "This module focuses on simulation environments and testing methodologies for robotic applications.", prerequisites: `[module-1, module-2, module-3]`).

---

## Phase 3: Module 1 Chapter Scaffolding (Supports US1, US2, US3 - Priority P1)

**Goal**: Create all chapter MDX files with placeholder content and correct frontmatter for Module 1, ensuring a sequential learning path.

**Independent Test**: Verify that all Module 1 chapters appear in the sidebar and are navigable sequentially.

-   [ ] T016 [P] [US1] Create `frontend/docs/module-1/intro-physical-ai.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 1, keywords) and required sections.
-   [ ] T017 [P] [US1] Create `frontend/docs/module-1/ros2-installation.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 2, keywords) and required sections.
-   [ ] T018 [P] [US1] Create `frontend/docs/module-1/ros2-fundamentals.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 3, keywords) and required sections.
-   [ ] T019 [P] [US1] Create `frontend/docs/module-1/nodes-topics.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 5, keywords) and required sections.
-   [ ] T020 [P] [US1] Create `frontend/docs/module-1/services-actions.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 6, keywords) and required sections.
-   [ ] T021 [P] [US1] Create `frontend/docs/module-1/launch-files.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 7, keywords) and required sections.

---

## Phase 4: Module 2 Chapter Scaffolding (Supports US1, US2, US3 - Priority P2)

**Goal**: Create all chapter MDX files with placeholder content and correct frontmatter for Module 2.

**Independent Test**: Verify that all Module 2 chapters appear in the sidebar and are navigable.

-   [ ] T022 [P] [US2] Create `frontend/docs/module-2/sensor-overview.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 1, keywords) and required sections.
-   [ ] T023 [P] [US2] Create `frontend/docs/module-2/camera-integration.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 2, keywords) and required sections.
-   [ ] T024 [P] [US2] Create `frontend/docs/module-2/lidar-processing.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 3, keywords) and required sections.
-   [ ] T025 [P] [US2] Create `frontend/docs/module-2/sensor-fusion.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 5, keywords) and required sections.
-   [ ] T026 [P] [US2] Create `frontend/docs/module-2/perception-pipeline.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 6, keywords) and required sections.

---

## Phase 5: Module 3 Chapter Scaffolding (Supports US1, US2, US3 - Priority P3)

**Goal**: Create all chapter MDX files with placeholder content and correct frontmatter for Module 3.

**Independent Test**: Verify that all Module 3 chapters appear in the sidebar and are navigable.

-   [ ] T027 [P] [US3] Create `frontend/docs/module-3/kinematics-basics.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 1, keywords) and required sections.
-   [ ] T028 [P] [US3] Create `frontend/docs/module-3/path-planning.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 2, keywords) and required sections.
-   [ ] T029 [P] [US3] Create `frontend/docs/module-3/navigation-stack.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 3, keywords) and required sections.
-   [ ] T030 [P] [US3] Create `frontend/docs/module-3/control-theory.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 5, keywords) and required sections.

---

## Phase 6: Module 4 Chapter Scaffolding (Supports US1, US2, US3 - Priority P3)

**Goal**: Create all chapter MDX files with placeholder content and correct frontmatter for Module 4.

**Independent Test**: Verify that all Module 4 chapters appear in the sidebar and are navigable.

-   [ ] T031 [P] [US3] Create `frontend/docs/module-4/gazebo-basics.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 1, keywords) and required sections.
-   [ ] T032 [P] [US3] Create `frontend/docs/module-4/urdf-modeling.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 2, keywords) and required sections.
-   [ ] T033 [P] [US3] Create `frontend/docs/module-4/integration-testing.mdx` with placeholder content, frontmatter (id, title, description, sidebar_position: 3, keywords) and required sections.

---

## Phase 7: Verification & Testing (Cross-Cutting Concern)

**Purpose**: Ensure the Docusaurus project is correctly set up, configured, and all content files adhere to standards.

-   [ ] T034 Run `npm install` in `frontend/` to install all dependencies.
-   [ ] T035 Run `npm run build` in `frontend/` to verify successful Docusaurus compilation with zero errors/warnings.
-   [ ] T036 Run `npm run lint` in `frontend/` to verify TypeScript linting passes in configuration files (`docusaurus.config.ts`, `sidebars.ts`).
-   [ ] T037 Run `npx markdownlint "frontend/docs/**/*.mdx" --config .markdownlint.json` to verify Markdown syntax across all MDX files.
-   [ ] T038 Run `npm start` in `frontend/` (in background) then `npx broken-link-checker http://localhost:3000 --recursive --ordered --exclude-external` to verify no broken internal links.
-   [ ] T039 Manually verify sidebar navigation:
    -   Expand all modules in the sidebar.
    -   Click through all module index pages and chapter links.
    -   Verify "Previous" and "Next" navigation buttons work correctly on all chapters.
    -   Check breadcrumbs for correct hierarchy.
-   [ ] T040 Manually verify mobile responsiveness:
    -   Test at 375px viewport width (e.g., iPhone SE) in browser developer tools.
    -   Verify sidebar toggles open/closed correctly via hamburger menu.
    -   Verify chapter text content is readable without horizontal scrolling.
    -   Verify code blocks implement horizontal scrolling for long lines (not cut off).
-   [ ] T041 Manually verify frontmatter completeness and placeholder content:
    -   Spot-check frontmatter in at least 5 random chapter `.mdx` files.
    -   Verify `id`, `title`, `description`, `sidebar_position`, `keywords` are present and correctly formatted.
    -   Verify existence of "Learning Objectives", "Prerequisites", "Introduction", "Summary" sections with placeholder text.

---

## Phase 8: Deployment (Cross-Cutting Concern)

**Purpose**: Validate the deployment pipeline and production readiness.

-   [ ] T042 Configure the GitHub Actions deployment workflow (`.github/workflows/deploy.yml`) for GitHub Pages deployment.
-   [ ] T043 Push changes to a dedicated staging branch (e.g., `gh-pages-deploy`) to trigger GitHub Actions workflow.
-   [ ] T044 Verify successful deployment to GitHub Pages by checking GitHub Actions logs.
-   [ ] T045 Validate production deployment on GitHub Pages by accessing the live site URL and re-checking navigation and mobile responsiveness.

---

## Dependencies & Execution Order

### Phase Dependencies

-   **Environment Setup (Phase 1)**: No dependencies - can start immediately.
-   **Core Configuration & Module Structure (Phase 2)**: Depends on Phase 1 completion - BLOCKS all chapter scaffolding.
-   **Module 1-4 Chapter Scaffolding (Phase 3-6)**: All depend on Phase 2 completion.
    -   Phases 3, 4, 5, 6 can then proceed in parallel (if staffed) or sequentially in module order.
-   **Verification & Testing (Phase 7)**: Depends on all chapter scaffolding (Phases 3-6) being complete.
-   **Deployment (Phase 8)**: Depends on Phase 7 completion.

### User Story Dependencies

-   All user stories (US1, US2, US3) are fundamentally supported by the existence and navigability of the content structure created across Phases 3-6. They are not strictly sequential with each other but are supported by the collective content.

### Within Each Phase

-   Tasks marked `[P]` can run in parallel.
-   Sequential tasks within a phase must be completed in order.

---

## Parallel Opportunities

-   **Phase 1**: Initial Docusaurus setup tasks (T001-T005) can be made parallel.
-   **Phase 2**: Creating module directories (T008-T011) and module index pages (T012-T015) can run in parallel.
-   **Phases 3-6**: Chapter scaffolding within each module can be heavily parallelized (T016-T033). If a team of multiple developers is working on this, each module's chapters, or even individual chapters, could be assigned in parallel.
-   **Phase 7**: Running `npm install`, `npm build`, `npm lint`, `markdownlint` (T034-T037) can potentially be parallelized or chained in a CI/CD environment.

---

## Implementation Strategy

### MVP Scope

The core MVP for this feature focuses on establishing a functional and navigable book architecture with Module 1 content as a demonstration.

1.  Complete Phase 1: Environment Setup.
2.  Complete Phase 2: Core Configuration & Module Structure.
3.  Complete Phase 3: Module 1 Chapter Scaffolding.
4.  Execute relevant tasks from Phase 7 (Verification & Testing) for Module 1.
5.  **STOP and VALIDATE**: Verify that Module 1 content is fully functional and navigable.
6.  (Optional) Deploy this MVP to GitHub Pages.

### Incremental Delivery

After the MVP:

1.  Add Phase 4: Module 2 Chapter Scaffolding.
2.  Execute relevant Phase 7 tasks for Module 2.
3.  Deploy/demo.
4.  Repeat for Phase 5 (Module 3) and Phase 6 (Module 4).
5.  Finally, complete all remaining tasks in Phase 7 and Phase 8 (Deployment).

### Parallel Team Strategy

With multiple developers:

1.  Team completes Phase 1 (Environment Setup) and Phase 2 (Core Configuration & Module Structure) collaboratively.
2.  Once foundational work is done:
    -   Developer A: Phase 3 (Module 1 Chapter Scaffolding)
    -   Developer B: Phase 4 (Module 2 Chapter Scaffolding)
    -   Developer C: Phase 5 (Module 3 Chapter Scaffolding)
    -   Developer D: Phase 6 (Module 4 Chapter Scaffolding)
3.  Once all scaffolding is complete, the team collaborates on Phase 7 (Verification & Testing) and Phase 8 (Deployment).

---

## Notes

-   `[P]` tasks = different files, no dependencies.
-   `[Story]` label maps task to specific user story for traceability.
-   Each phase should aim to be independently completable and testable.
-   Commit after each task or logical group.
-   Stop at any checkpoint to validate progress.
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence.
