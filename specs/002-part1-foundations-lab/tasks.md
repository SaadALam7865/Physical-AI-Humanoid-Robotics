# Tasks: Book Part 1 - Foundations and Hardware Lab

**Input**: Design documents from `/specs/002-part1-foundations-lab/`
**Prerequisites**: plan.md (completed), spec.md (completed), research.md (completed), data-model.md (completed), contracts/ (completed)

**Tests**: Tests are NOT requested in the feature specification. This is a content-generation feature, not a code feature. Validation tasks focus on Constitution compliance (word count, build success, mobile responsiveness).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each educational chapter.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Docusaurus project**: `frontend/docs/`, `frontend/sidebars.ts` at repository root
- Educational content (MDX): `frontend/docs/01-part-1-foundations-lab/`
- Configuration (TypeScript): `frontend/sidebars.ts`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify Docusaurus environment and directory structure

- [ ] T001 Verify Docusaurus 3.x is installed in frontend/ directory (run `npm list` and check for `@docusaurus/core`)
- [ ] T002 Verify directory `frontend/docs/01-part-1-foundations-lab/` exists (created earlier in session)
- [ ] T003 [P] Load research findings from `specs/002-part1-foundations-lab/research.md` for hardware specifications
- [ ] T004 [P] Load Mermaid diagram template from `specs/002-part1-foundations-lab/contracts/mermaid-diagram-template.md`
- [ ] T005 [P] Load frontmatter schema from `specs/002-part1-foundations-lab/contracts/chapter-frontmatter-schema.yaml`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core structure and configuration that MUST be complete before ANY chapter generation

**⚠️ CRITICAL**: No chapter content generation can begin until this phase is complete

- [ ] T006 Read current `frontend/sidebars.ts` to understand existing structure (already done earlier, document findings)
- [ ] T007 Backup `frontend/sidebars.ts` before modifications (copy to `frontend/sidebars.ts.backup`)
- [ ] T008 Verify `docusaurus-style` skill exists at `.claude/skills/docusaurus-style.md` (Constitution dependency)
- [ ] T009 Verify `book-architect` agent exists at `.claude/agents/book-architect.md` (implementation dependency)
- [ ] T010 Verify `physical-ai-author` agent exists at `.claude/agents/physical-ai-author.md` (implementation dependency)

**Checkpoint**: Foundation ready - chapter content generation can now begin in parallel

---

## Phase 3: User Story 1 - Understanding Embodied Intelligence Foundations (Priority: P1) 🎯 MVP

**Goal**: Generate Chapter 1 MDX file explaining Physical AI vs Digital AI, the Partner Economy, and embodied intelligence using a Mermaid diagram comparison

**Independent Test**: A student can read Chapter 1 and explain the difference between "Brain in a Box" (LLM) and "Brain in a Body" (Robot), and describe one example of the Partner Economy

### Implementation for User Story 1

- [ ] T011 [US1] Create frontmatter for Chapter 1 in `frontend/docs/01-part-1-foundations-lab/01-chapter-1-embodied-ai.mdx` (use frontmatter from data-model.md)
- [ ] T012 [US1] Generate Learning Objectives section for Chapter 1 (3-5 measurable outcomes per Constitution Principle I)
- [ ] T013 [US1] Generate Introduction section for Chapter 1 (100 words, hook with engaging example from research.md RT-001)
- [ ] T014 [US1] Generate Core Concepts section for Chapter 1 (300 words: Define Physical AI, contrast with Digital AI per FR-003)
- [ ] T015 [US1] Generate Partner Economy section for Chapter 1 (200 words: Explain collaboration model per FR-004, use examples from research.md RT-001)
- [ ] T016 [US1] Embed Mermaid diagram in Chapter 1 (use template from `contracts/mermaid-diagram-template.md`, Brain in Box vs Brain in Body per FR-002)
- [ ] T017 [US1] Add fallback text description after Mermaid diagram (accessibility requirement per research.md RT-005)
- [ ] T018 [US1] Generate Exercises section for Chapter 1 (2-3 thought experiments, e.g., "List 5 tasks requiring physical embodiment")
- [ ] T019 [US1] Generate Summary section for Chapter 1 (100 words, recap learning objectives, preview Part II)
- [ ] T020 [US1] Define all acronyms on first use in Chapter 1 (Constitution Principle I requirement per FR-017)

**Validation Tasks for User Story 1**:

- [ ] T021 [US1] Verify Chapter 1 word count is 800-1000 words (excluding frontmatter, code blocks, diagrams per Constitution Principle I)
- [ ] T022 [US1] Verify Mermaid diagram renders correctly in Docusaurus dev server (`npm start`, navigate to Chapter 1)
- [ ] T023 [US1] Verify Chapter 1 is mobile-responsive (no horizontal overflow at 375px viewport per Constitution Principle VIII)
- [ ] T024 [US1] Verify all acronyms in Chapter 1 are defined on first use (grep for uppercase 2+ letter sequences, check definitions)

**Checkpoint**: At this point, Chapter 1 should be fully functional, render correctly, meet Constitution standards, and be independently readable

---

## Phase 4: User Story 2 - Setting Up Physical AI Development Environment (Priority: P1)

**Goal**: Generate Chapter 2 MDX file with Hardware Mandate danger admonition and verified hardware specifications (workstation, Jetson, sensors)

**Independent Test**: A student can verify their system meets the requirements checklist (RTX 4070 Ti/3090, Ubuntu 22.04, Jetson Orin Nano, RealSense D435i) or understand they need to acquire specific hardware

### Implementation for User Story 2

- [ ] T025 [P] [US2] Create frontmatter for Chapter 2 in `frontend/docs/01-part-1-foundations-lab/02-chapter-2-hardware-setup.mdx` (use frontmatter from data-model.md)
- [ ] T026 [US2] Generate Learning Objectives section for Chapter 2 (3-5 measurable outcomes focusing on hardware identification and verification)
- [ ] T027 [US2] Generate Introduction section for Chapter 2 (100 words, motivate importance of correct hardware setup)
- [ ] T028 [US2] Add Hardware Mandate danger admonition in Chapter 2 (use EXACT text from research.md RT-002 decision, Docusaurus `:::danger` syntax per FR-009)
- [ ] T029 [US2] Generate Workstation Specifications section for Chapter 2 (200 words: RTX 4070 Ti/3090, Ubuntu 22.04 LTS per FR-010 and research.md RT-002, RT-003)
- [ ] T030 [US2] Generate Edge Brain section for Chapter 2 (150 words: Jetson Orin Nano specs from research.md RT-006 per FR-011)
- [ ] T031 [US2] Generate Sensors section for Chapter 2 (150 words: RealSense D435i specs from research.md RT-004 per FR-012)
- [ ] T032 [US2] Generate Verification Steps section for Chapter 2 (150 words: How to check GPU VRAM, Ubuntu version, driver installation)
- [ ] T033 [US2] Generate Exercises section for Chapter 2 (2-3 tasks: Verify your system, identify missing components, research alternatives)
- [ ] T034 [US2] Generate Summary section for Chapter 2 (100 words, recap hardware requirements, preview Part II)
- [ ] T035 [US2] Define all acronyms on first use in Chapter 2 (IMU, TOPS, GPIO, VRAM, LTS per research.md and FR-017)

**Validation Tasks for User Story 2**:

- [ ] T036 [US2] Verify Chapter 2 word count is 800-1000 words (excluding frontmatter, admonitions per Constitution Principle I)
- [ ] T037 [US2] Verify Hardware Mandate danger admonition is present in Chapter 2 (search for `:::danger` and "Hardware Mandate" text per FR-009)
- [ ] T038 [US2] Verify hardware specifications match research.md findings (RT-002 Isaac Sim, RT-003 ROS 2, RT-004 RealSense, RT-006 Jetson per Constitution Principle II)
- [ ] T039 [US2] Verify Chapter 2 is mobile-responsive (no horizontal overflow at 375px viewport per Constitution Principle VIII)
- [ ] T040 [US2] Verify all acronyms in Chapter 2 are defined on first use (IMU, TOPS, GPIO, VRAM, LTS, ROS 2)

**Checkpoint**: At this point, Chapter 2 should be fully functional, contain Hardware Mandate admonition, meet Constitution standards, and be independently readable

---

## Phase 5: User Story 3 - Navigating Educational Platform Structure (Priority: P2)

**Goal**: Update Docusaurus sidebar configuration to include Part I category with Chapter 1 and Chapter 2 in correct order

**Independent Test**: A new user can locate Chapter 1 and Chapter 2 in the sidebar under "Part I: Foundations & Lab" within 30 seconds

### Implementation for User Story 3

- [ ] T041 [US3] Update `frontend/sidebars.ts` to add Part I category at beginning of tutorialSidebar array (use structure from plan.md Phase 1: Sidebar Configuration Update)
- [ ] T042 [US3] Set Part I category label to "Part I: Foundations & Lab" in `frontend/sidebars.ts`
- [ ] T043 [US3] Set Part I category `collapsed: false` in `frontend/sidebars.ts` (expanded by default per plan.md decision)
- [ ] T044 [US3] Add Chapter 1 doc ID to Part I items array: `01-part-1-foundations-lab/01-chapter-1-embodied-ai` in `frontend/sidebars.ts`
- [ ] T045 [US3] Add Chapter 2 doc ID to Part I items array: `01-part-1-foundations-lab/02-chapter-2-hardware-setup` in `frontend/sidebars.ts`
- [ ] T046 [US3] Verify sidebar_position values in Chapter 1 and Chapter 2 frontmatter match sidebar order (Chapter 1 = 1, Chapter 2 = 2 per FR-020)

**Validation Tasks for User Story 3**:

- [ ] T047 [US3] Verify `frontend/sidebars.ts` TypeScript syntax is valid (run `npm run typecheck` from frontend/ directory)
- [ ] T048 [US3] Verify Part I category appears in sidebar before existing Module 1-4 categories (visual inspection in dev server)
- [ ] T049 [US3] Verify Chapter 1 appears before Chapter 2 in sidebar (doc ID order in items array)
- [ ] T050 [US3] Verify Part I category is expanded by default when loading page (`collapsed: false`)
- [ ] T051 [US3] Verify sidebar is navigable on mobile (375px viewport, sidebar readable and clickable)

**Checkpoint**: At this point, the sidebar should display Part I with both chapters in correct order, be mobile-friendly, and allow seamless navigation

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and Constitution compliance verification across all chapters

- [ ] T052 [P] Run `npm run build` from `frontend/` directory and verify zero errors (Constitution Principle VI requirement per FR-021)
- [ ] T053 [P] Verify both chapters render correctly in production build (`npm run build && npm run serve`, navigate to both chapters)
- [ ] T054 [P] Verify Chapter 1 Mermaid diagram renders in production build (not just dev server)
- [ ] T055 [P] Verify Chapter 2 Hardware Mandate admonition displays correctly in production build
- [ ] T056 Test desktop rendering for both chapters (1920px viewport, verify layout, fonts, spacing)
- [ ] T057 Test tablet rendering for both chapters (768px viewport, verify responsive behavior)
- [ ] T058 Test mobile rendering for both chapters (375px viewport, verify no horizontal scroll per SC-009)
- [ ] T059 Verify navigation flow: Home → Part I → Chapter 1 → Chapter 2 (click through all links)
- [ ] T060 Verify next/previous chapter navigation links work (bottom of each chapter)
- [ ] T061 [P] Run word count validation for Chapter 1 (should be 800-1000 words per SC-001)
- [ ] T062 [P] Run word count validation for Chapter 2 (should be 800-1000 words per SC-001)
- [ ] T063 [P] Create ADR documenting Part I structure decision (if architecturally significant per Constitution Principle III)
- [ ] T064 Update quickstart.md with any lessons learned from Chapter 1 and Chapter 2 generation (if needed)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3, 4, 5)**: All depend on Foundational phase completion
  - User Story 1 (Chapter 1) can proceed independently after Phase 2
  - User Story 2 (Chapter 2) can proceed independently after Phase 2
  - User Story 3 (Sidebar) SHOULD wait until Chapter 1 and Chapter 2 MDX files exist (for doc ID validation)
- **Polish (Phase 6)**: Depends on all three user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories - Independent MVP
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories - Independent content
- **User Story 3 (P2)**: Can start after Foundational (Phase 2), but RECOMMENDED to wait until US1 and US2 MDX files exist to avoid sidebar doc ID resolution errors

### Within Each User Story

**User Story 1 (Chapter 1)**:
- Frontmatter → Learning Objectives → Introduction → Core Concepts → Partner Economy → Mermaid Diagram → Fallback Text → Exercises → Summary → Acronym Definitions
- Validation tasks run after all content generation is complete

**User Story 2 (Chapter 2)**:
- Frontmatter → Learning Objectives → Introduction → Hardware Mandate Admonition → Workstation Specs → Edge Brain → Sensors → Verification Steps → Exercises → Summary → Acronym Definitions
- Validation tasks run after all content generation is complete

**User Story 3 (Sidebar)**:
- All sidebar update tasks can run sequentially (same file)
- Validation tasks run after sidebar configuration is complete

### Parallel Opportunities

- **Phase 1 (Setup)**: T003, T004, T005 can run in parallel (different files)
- **Phase 2 (Foundational)**: T008, T009, T010 can run in parallel (verification tasks, different files)
- **User Story 1 and User Story 2**: Can be worked on in parallel by different agents/developers (Chapter 1 and Chapter 2 are independent)
- **Phase 6 (Polish)**: T052, T053, T054, T055, T061, T062, T063 can run in parallel (different validation checks)

---

## Parallel Example: User Story 1 (Chapter 1) and User Story 2 (Chapter 2)

Since Chapter 1 and Chapter 2 are independent content files, they can be generated in parallel:

```bash
# Agent 1 (physical-ai-author): Generate Chapter 1
Task: "Generate frontmatter, learning objectives, introduction, core concepts, Partner Economy section, Mermaid diagram, exercises, summary for Chapter 1 in frontend/docs/01-part-1-foundations-lab/01-chapter-1-embodied-ai.mdx"

# Agent 2 (physical-ai-author): Generate Chapter 2 (in parallel)
Task: "Generate frontmatter, learning objectives, introduction, Hardware Mandate admonition, workstation specs, edge brain section, sensors section, verification steps, exercises, summary for Chapter 2 in frontend/docs/01-part-1-foundations-lab/02-chapter-2-hardware-setup.mdx"

# After both complete, single agent (book-architect): Update sidebar
Task: "Update frontend/sidebars.ts to include Part I category with both chapters"
```

**Benefit**: Parallel generation reduces total time from ~2 hours to ~1 hour if both agents work simultaneously.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (verify environment)
2. Complete Phase 2: Foundational (verify agents and skills exist)
3. Complete Phase 3: User Story 1 (Chapter 1 only)
4. **STOP and VALIDATE**: Test Chapter 1 independently (word count, Mermaid diagram, mobile rendering)
5. Manually add Chapter 1 to sidebar for demo purposes (temporary)
6. Deploy/demo Chapter 1 if ready

**MVP Scope**: Just Chapter 1 (embodied intelligence foundations) provides value as a standalone educational resource.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Chapter 1) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (Chapter 2) → Test independently → Deploy/Demo
4. Add User Story 3 (Sidebar) → Test navigation → Deploy/Demo
5. Each chapter adds value without breaking previous content

### Parallel Team/Agent Strategy

With multiple developers or agents:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Agent A (physical-ai-author): User Story 1 (Chapter 1)
   - Agent B (physical-ai-author): User Story 2 (Chapter 2)
3. After both complete:
   - Agent C (book-architect): User Story 3 (Sidebar update)
4. All agents converge for Polish phase validation

---

## Notes

- **[P] tasks**: Different files, no dependencies (can run in parallel)
- **[Story] label**: Maps task to specific user story for traceability (US1 = Chapter 1, US2 = Chapter 2, US3 = Sidebar)
- **No traditional tests**: This is a content-generation feature; validation focuses on Constitution compliance (word count, build success, mobile responsiveness) rather than unit/integration tests
- **Agent delegation**: `book-architect` handles sidebar configuration (Phase 5), `physical-ai-author` handles educational content generation (Phases 3-4)
- **Constitution compliance**: All validation tasks (T021-T024, T036-T040, T047-T051, T052-T062) verify Constitution Principle I (word count), II (technical accuracy), VI (build success), VIII (mobile responsiveness)
- **Research findings**: Hardware specifications from research.md (RT-002 to RT-006) MUST be used in Chapter 2 content generation (T028-T031)
- **Mermaid template**: Use exact template from `contracts/mermaid-diagram-template.md` for Chapter 1 diagram (T016)
- **Hardware Mandate**: Use exact admonition text from research.md RT-002 decision for Chapter 2 (T028)
- **Commit strategy**: Commit after each phase completion (Phase 3 = Chapter 1, Phase 4 = Chapter 2, Phase 5 = Sidebar, Phase 6 = Validation)
- **Stop at any checkpoint**: Each user story (phase) is independently completable and testable; can deploy after any phase for incremental delivery
