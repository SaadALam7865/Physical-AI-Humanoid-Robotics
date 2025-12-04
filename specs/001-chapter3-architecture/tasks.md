---
description: "Task list for Chapter 3: Physical AI Architecture"
---

# Tasks: Physical AI Architecture

**Input**: Design documents from `/specs/001-chapter3-architecture/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/components.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the chapter directory structure and component contracts.

- [x] T001 Create chapter directory structure in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/
- [x] T002 [P] Create empty MDX files as defined in data-model.md in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create the core content that all user stories depend on (Intro, Summary, and shared diagrams).

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T003 Write Introduction with Hardware Mandate in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/00-intro.mdx
- [x] T004 [P] Create Summary with exercises placeholder in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/05-summary.mdx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Conceptual Mastery (Priority: P1) 🎯 MVP

**Goal**: Explain the 3-tier architecture and Sim-to-Real workflow so students understand the mental model.

**Independent Test**: Verify the Mermaid diagrams render correctly and the explanations distinguish Workstation vs. Edge roles.

### Implementation for User Story 1

- [x] T005 [US1] Write 3-Tier Architecture Concept with Mermaid diagram in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/01-three-tier-architecture.mdx
- [x] T006 [US1] Write Sim-to-Real Workflow Concept with Mermaid diagram in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/02-sim-to-real-workflow.mdx
- [x] T007 [US1] Write Data Flow Concept explaining bandwidth constraints in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/03-data-flow.mdx
- [x] T008 [US1] Add "List 3 tasks" exercise to Summary in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/05-summary.mdx

**Checkpoint**: User Story 1 content is complete and conceptually sound.

---

## Phase 4: User Story 2 - Network Verification (Priority: P1)

**Goal**: Guide the student to verify their hardware network setup (Ping test).

**Independent Test**: Verify the "Ping" exercise steps are clear and the commands are accurate.

### Implementation for User Story 2

- [x] T009 [US2] Write Network Setup and Ping Exercise in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/04-lab-setup.mdx

**Checkpoint**: User Story 2 lab content is complete.

---

## Phase 5: User Story 3 - First Cross-Device Code (Priority: P2)

**Goal**: Provide runnable ROS 2 Publisher/Subscriber code for cross-device verification.

**Independent Test**: Verify the Python code snippets follow the constitution (Type hints, class-based) and are separated by Tabs.

### Implementation for User Story 3

- [x] T010 [US3] Add ROS 2 Publisher Code (Workstation) with Type Hints to frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/04-lab-setup.mdx
- [x] T011 [US3] Add ROS 2 Subscriber Code (Jetson) with Type Hints to frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/04-lab-setup.mdx
- [x] T012 [US3] Add instructions for running the cross-device demo to frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/04-lab-setup.mdx

**Checkpoint**: All user stories are complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final review and consistency checks.

- [x] T013 Run Docusaurus build to verify MDX syntax and Mermaid rendering
- [x] T014 Verify all internal links between chapter files work
- [x] T015 [P] Check that all "Hardware Mandate" warnings are present and correctly formatted
- [x] T016 Verify code snippets against Python 3.10+ type hint standards

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup completion.
- **User Story 1 (Phase 3)**: Depends on Foundational phase (specifically T003).
- **User Story 2 (Phase 4)**: Independent of US1, depends on Foundational phase.
- **User Story 3 (Phase 5)**: Depends on US2 (logically follows network setup), but technically can be written independently.
- **Polish (Phase 6)**: Depends on all previous phases.

### Parallel Opportunities

- T002 (Create empty files) can run in parallel with T001.
- T004 (Summary) can run in parallel with T003 (Intro).
- US1 (T005-T008) and US2 (T009) can be developed in parallel by different writers.
- T010 (Publisher code) and T011 (Subscriber code) can be written in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup (Phase 1) and Foundational (Phase 2).
2. Complete User Story 1 (Phase 3).
3. Validate the conceptual flow and diagrams.
4. This delivers the "Mental Model" value immediately.

### Incremental Delivery

1. Deliver MVP (Concepts).
2. Add User Story 2 (Network Lab).
3. Add User Story 3 (Code Lab).
4. Polish and Deploy.
