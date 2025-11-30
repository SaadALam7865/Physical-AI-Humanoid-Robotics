# Tasks: Physical AI Architecture: From Cloud to Edge

**Input**: Design documents from `/specs/001-physical-ai-architecture/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Not explicitly requested in spec. Manual verification will be performed.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- Paths shown below assume Docusaurus frontend structure.

## Phase 1: User Story 1 - Understand 3-Tier Architecture (Priority: P1) 🎯 MVP

**Goal**: Students understand the three-tier architecture (Workstation/Cloud, Edge, Robot) of Physical AI systems.

**Independent Test**: Students can identify the roles of Workstation, Edge, and Robot tiers from diagrams and explanations.

### Implementation for User Story 1

- [ ] T001 [P] [US1] Create 00-intro.mdx for chapter introduction in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/
- [ ] T002 [P] [US1] Create 01-three-tier-architecture.mdx for 3-tier architecture explanation and diagram in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/

---

## Phase 2: User Story 2 - Grasp Sim-to-Real Workflow (Priority: P1)

**Goal**: Students understand the sim-to-real transfer workflow.

**Independent Test**: Students can trace and explain the sim-to-real deployment pipeline.

### Implementation for User Story 2

- [ ] T003 [P] [US2] Create 02-sim-to-real-workflow.mdx for sim-to-real explanation and diagram in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/

---

## Phase 3: User Story 3 - Identify Data Flow (Priority: P2)

**Goal**: Students identify data flow from sensors to actuators.

**Independent Test**: Students can identify data ingress and egress points in architecture diagrams.

### Implementation for User Story 3

- [ ] T004 [P] [US3] Create 03-data-flow.mdx for data flow explanation and diagram in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/

---

## Phase 4: User Story 4 - Execute Simple ROS 2 Communication (Priority: P2)

**Goal**: Students can set up a simple ROS 2 publisher/subscriber between a workstation and a Jetson.

**Independent Test**: Students can successfully send and receive ROS 2 messages between devices.

### Implementation for User Story 4

- [ ] T005 [P] [US4] Create 04-lab-setup.mdx for ROS 2 pub/sub code example and network configuration in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/

---

## Phase 5: User Story 5 - Differentiate Simulation vs. Real Hardware Tasks (Priority: P3)

**Goal**: Students can identify tasks best suited for simulation versus real hardware.

**Independent Test**: Students can list 3 tasks for simulation and 3 for real hardware with justifications.

### Implementation for User Story 5

- [ ] T006 [P] [US5] Create 05-exercises.mdx for exercises on simulation vs. real hardware tasks in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/
- [ ] T007 [P] [US5] Create 06-summary.mdx for chapter summary and next chapter preview in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T008 Review all MDX files for adherence to Docusaurus content conventions (word count, terminology, formatting).
- [ ] T009 Run `npm run build` in `frontend/` to check for build errors and ensure content rendering.

---

## Dependencies & Execution Order

### Phase Dependencies

- **User Stories (Phase 1-5)**: All user story phases can largely be worked on in parallel, or sequentially by priority.
- **Polish (Final Phase)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies on other stories.
- **User Story 2 (P1)**: No dependencies on other stories.
- **User Story 3 (P2)**: No dependencies on other stories.
- **User Story 4 (P2)**: No dependencies on other stories.
- **User Story 5 (P3)**: No dependencies on other stories.

### Within Each User Story

- Content creation tasks within a user story can be done in parallel for different files.

### Parallel Opportunities

- All tasks marked [P] can run in parallel.
- Different user stories can be worked on in parallel by different team members.

---

## Parallel Example: User Story 1 & 2

```bash
# Launch creation of intro and three-tier architecture files concurrently
Task: "Create 00-intro.mdx for chapter introduction in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/"
Task: "Create 01-three-tier-architecture.mdx for 3-tier architecture explanation and diagram in frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/"

# Or, work on different user stories in parallel:
Task: "Work on User Story 1 tasks"
Task: "Work on User Story 2 tasks"
```

---

## Implementation Strategy

### MVP First (User Story 1 & 2 Only)

1. Complete Phase 1: User Story 1 (Understand 3-Tier Architecture)
2. Complete Phase 2: User Story 2 (Grasp Sim-to-Real Workflow)
3. **STOP and VALIDATE**: Ensure these core concepts are well-explained and diagrams are clear.
4. Deploy/demo if ready.

### Incremental Delivery

1. Complete US1 & US2 → Core architecture understanding ready.
2. Add US3 → Data flow understanding enhanced.
3. Add US4 → Practical ROS 2 communication demonstrated.
4. Add US5 → Exercises for differentiating simulation vs. real hardware added.
5. Each story adds value without breaking previous content.

### Parallel Team Strategy

With multiple developers:

1. Developer A: User Story 1 & 3
2. Developer B: User Story 2 & 4
3. Developer C: User Story 5
4. Stories complete and integrate independently.

---

## Notes

- [P] tasks = different files, no dependencies.
- [Story] label maps task to specific user story for traceability.
- Each user story should be independently completable and testable.
- Commit after each task or logical group.
- Stop at any checkpoint to validate story independently.
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence.
