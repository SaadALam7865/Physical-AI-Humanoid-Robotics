# Tasks: RAG Chatbot Backend

**Input**: Design documents from `/specs/002-rag-chatbot-backend/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Test tasks included per specification requirement (FR-018: 4 test files required)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

**Web app structure** (backend only - per plan.md):
- Backend: `backend/app/`, `backend/tests/`
- Frontend: `frontend/docs/` (existing Docusaurus - read-only for ingestion)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create backend project structure per plan.md: backend/app/, backend/app/rag/, backend/app/api/, backend/app/db/, backend/tests/
- [X] T002 Initialize Python 3.11+ project with pyproject.toml and requirements.txt (dependencies from research.md)
- [X] T003 [P] Configure development tools: ruff, black, mypy, pytest configuration files
- [X] T004 [P] Create .env.example file in backend/ with required environment variables (GEMINI_API_KEY, QDRANT_URL, QDRANT_API_KEY)
- [X] T005 [P] Create backend/README.md with quickstart instructions from quickstart.md
- [X] T006 Create backend/app/__init__.py and backend/app/config.py for environment variable management using python-dotenv

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 Implement Qdrant client connection in backend/app/db/qdrant_client.py (create collection physical-ai-textbook-v1, 768 dimensions, cosine similarity)
- [X] T008 [P] Implement embedding generation using Gemini API in backend/app/rag/embeddings.py (text-embedding-004 model via OpenAI SDK)
- [X] T009 [P] Create Pydantic models for all entities in backend/app/api/models.py (Chunk, Query, SearchResult, AgentResponse, QueryRequest, QueryResponse, IngestResult per data-model.md)
- [X] T010 [P] Implement content hash generation utility in backend/app/rag/chunking.py (SHA-256 for idempotency)
- [X] T011 Implement MDX file parsing in backend/app/rag/chunking.py using python-frontmatter (extract metadata and content)
- [X] T012 Implement semantic chunking logic in backend/app/rag/chunking.py using tiktoken (500-800 tokens, 100-token overlap, code-block preservation)
- [X] T013 Create FastAPI application entry point in backend/app/main.py with CORS configuration and dependency injection setup
- [X] T014 [P] Implement structured logging configuration in backend/app/config.py (JSON format, log levels)
- [X] T015 [P] Implement error handling utilities in backend/app/api/routes.py (HTTPException with user-friendly messages, retry logic with exponential backoff)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Query Book Content (Priority: P1) 🎯 MVP

**Goal**: Enable students to ask questions about textbook content and receive answers with citations

**Independent Test**: Send query "What is embodied intelligence?" to `POST /api/query` and verify response contains accurate answer from Chapter 1 with source citations

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T016 [P] [US1] Create test_rag_retrieval.py in backend/tests/ with test for query "What is embodied intelligence?" (expected: retrieves relevant chunks from Chapter 1)
- [X] T017 [P] [US1] Create test_embeddings.py in backend/tests/ with test to verify embedding generation produces 768-dim vectors

### Implementation for User Story 1

- [X] T018 [US1] Implement Qdrant search function in backend/app/rag/retrieval.py (top 5 semantic search using cosine similarity, return SearchResult objects)
- [X] T019 [US1] Implement context building from search results in backend/app/rag/retrieval.py (construct payload with chunk text, chapter, section, filename)
- [X] T020 [US1] Implement OpenAI Agents integration in backend/app/rag/agents.py using Gemini API via OpenAI SDK (pass context + query, generate answer)
- [X] T021 [US1] Implement `POST /api/query` endpoint in backend/app/api/routes.py (accept QueryRequest, embed query, search Qdrant, call agent, return QueryResponse)
- [X] T022 [US1] Add input validation for query endpoint in backend/app/api/routes.py (max 500 words for query, max 200 words for selected_text)
- [X] T023 [US1] Add error handling for Qdrant unavailable and Gemini API failures in backend/app/api/routes.py (graceful degradation per edge cases)
- [X] T024 [US1] Implement health check endpoint `GET /health` in backend/app/api/routes.py (verify Qdrant and Gemini API connectivity)
- [X] T025 [US1] Add logging for query processing in backend/app/api/routes.py (sanitized query text, response time, error tracking)

**Checkpoint**: At this point, User Story 1 should be fully functional - can query textbook content and receive answers (assuming content is ingested)

---

## Phase 4: User Story 2 - Automatic Content Ingestion (Priority: P2)

**Goal**: System automatically processes new/updated MDX files, chunks content, generates embeddings, and stores in Qdrant

**Independent Test**: Add new `.mdx` file to `frontend/docs/`, run `python -m app.ingest`, verify new content appears in Qdrant with correct metadata and queries can retrieve it

### Tests for User Story 2

- [X] T026 [P] [US2] Create test_chunking.py in backend/tests/ with tests for semantic boundaries, code block preservation, token counting accuracy
- [X] T027 [P] [US2] Create test_ingest_cli.py in backend/tests/ with test for CLI execution (mock file system, verify exit codes, output format per IngestResult model)

### Implementation for User Story 2

- [X] T028 [US2] Implement recursive MDX file scanner in backend/app/ingest.py (scan frontend/docs/, filter .mdx and .md files, extract chapter/section from path)
- [X] T029 [US2] Implement batch embedding generation in backend/app/rag/embeddings.py (process multiple chunks efficiently, handle rate limits)
- [X] T030 [US2] Implement Qdrant upsert logic in backend/app/db/qdrant_client.py (use content hash as point ID for idempotency, store with payload metadata)
- [X] T031 [US2] Implement CLI ingestion script main function in backend/app/ingest.py (orchestrate: scan → parse → chunk → embed → store, handle errors gracefully)
- [X] T032 [US2] Add progress logging to CLI script in backend/app/ingest.py (stdout output showing files processed, chunks created per file)
- [X] T033 [US2] Add error handling for CLI script in backend/app/ingest.py (catch malformed MDX, API failures, DB errors; continue processing; log errors; set non-zero exit code)
- [X] T034 [US2] Implement incremental update detection in backend/app/ingest.py (compare content hashes, only re-embed changed files)
- [X] T035 [US2] Add CLI script execution via `python -m app.ingest` in backend/app/__main__.py

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - can ingest content and query it

---

## Phase 5: User Story 3 - Contextual Text Selection Queries (Priority: P3)

**Goal**: Enhance queries by weighting selected text more heavily in search, providing comparative answers

**Independent Test**: Send query with `selected_text` parameter (e.g., `{"query": "What are alternatives?", "selected_text": "Intel RealSense D435i"}`) and verify response weighs selected text in search results

### Implementation for User Story 3

- [X] T036 [US3] Extend query embedding logic in backend/app/rag/embeddings.py to handle optional selected_text (combine query + selected_text for embedding if provided)
- [X] T037 [US3] Update Qdrant search in backend/app/rag/retrieval.py to use combined embedding when selected_text is present
- [X] T038 [US3] Update `POST /api/query` endpoint handler in backend/app/api/routes.py to pass selected_text to embedding and retrieval functions
- [X] T039 [US3] Add validation for selected_text in backend/app/api/routes.py (max 200 words per FR-015)
- [X] T040 [US3] Update test_rag_retrieval.py in backend/tests/ to include test case for contextual query with selected_text

**Checkpoint**: All user stories should now be independently functional - full RAG system with contextual queries

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T041 [P] Add comprehensive docstrings (Google style) to all public functions in backend/app/ modules
- [ ] T042 [P] Run mypy type checking and fix any type errors in backend/app/
- [ ] T043 [P] Run ruff linting and fix all issues in backend/app/
- [ ] T044 [P] Run black formatting on all Python files in backend/
- [ ] T045 Optimize Qdrant search performance if needed (add payload indexing for chapter/section fields per research.md)
- [ ] T046 Add rate limiting for Gemini API calls in backend/app/rag/embeddings.py (respect 60 req/min limit per assumptions)
- [ ] T047 Validate quickstart.md instructions by following setup steps from scratch
- [ ] T048 Update OpenAPI spec in specs/002-rag-chatbot-backend/contracts/api-openapi.yaml if any endpoint changes occurred during implementation
- [ ] T049 [P] Add unit tests for utility functions (content hash generation, token counting) in backend/tests/test_utils.py
- [ ] T050 Run RAG accuracy validation with 50 test queries (target: 90% correct answers per SC-002)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - No dependencies on US1 (independently testable by adding mock MDX files)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Extends US1 but should be independently testable

**Note**: User Story 2 (ingestion) is required for User Story 1 (query) to have real content, but US1 can be tested with mock/pre-seeded Qdrant data independently.

### Within Each User Story

- Tests MUST be written and FAIL before implementation (T016-T017 before T018-T025)
- Models/utilities before services (Foundational phase provides all models)
- Services before endpoints (retrieval/agents before routes)
- Core implementation before error handling/logging
- Story complete before moving to next priority

### Parallel Opportunities

- **Setup Phase**: T003, T004, T005 can run in parallel
- **Foundational Phase**: T008, T009, T010, T014, T015 can run in parallel
- **Within User Story 1**: T016, T017 (tests) can run in parallel
- **Within User Story 2**: T026, T027 (tests) can run in parallel
- **Polish Phase**: T041, T042, T043, T044, T049 can run in parallel
- **Across User Stories**: Once Foundational completes, US1, US2, US3 can all be worked on in parallel by different developers

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task T016: "Create test_rag_retrieval.py in backend/tests/ with test for query"
Task T017: "Create test_embeddings.py in backend/tests/ with test to verify embedding generation"

# After tests fail, implement core components:
Task T018: "Implement Qdrant search function in backend/app/rag/retrieval.py"
Task T019: "Implement context building from search results in backend/app/rag/retrieval.py"
Task T020: "Implement OpenAI Agents integration in backend/app/rag/agents.py"
# (These three tasks touch different files but T019 may use T018's output - review dependencies)
```

---

## Parallel Example: Foundational Phase

```bash
# Launch all independent foundational tasks together:
Task T008: "Implement embedding generation using Gemini API in backend/app/rag/embeddings.py"
Task T009: "Create Pydantic models for all entities in backend/app/api/models.py"
Task T010: "Implement content hash generation utility in backend/app/rag/chunking.py"
Task T014: "Implement structured logging configuration in backend/app/config.py"
Task T015: "Implement error handling utilities in backend/app/api/routes.py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T006)
2. Complete Phase 2: Foundational (T007-T015) **CRITICAL - blocks all stories**
3. Complete Phase 3: User Story 1 (T016-T025)
4. **STOP and VALIDATE**: Test User Story 1 independently with pre-seeded Qdrant data
5. Optionally deploy/demo query endpoint (ingestion can be manual for MVP)

**MVP Definition**: Backend API accepts queries and returns answers with citations from pre-ingested textbook content.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently with mock data → **Deploy/Demo (Query MVP)**
3. Add User Story 2 → Test independently by ingesting real MDX files → **Deploy/Demo (Full Ingestion + Query)**
4. Add User Story 3 → Test independently with selected_text queries → **Deploy/Demo (Contextual Queries)**
5. Add Polish phase → Run accuracy validation → **Deploy (Production-ready)**

Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Query endpoint)
   - Developer B: User Story 2 (Ingestion CLI)
   - Developer C: User Story 3 (Contextual queries) or start on Polish tasks
3. Stories complete and integrate independently
4. Integration testing once all stories complete

---

## Notes

- **[P] tasks**: Different files, no dependencies - can run in parallel
- **[Story] label**: Maps task to specific user story for traceability
- **Each user story should be independently completable and testable**
- **Verify tests fail before implementing** (Red phase in TDD)
- **Commit after each task or logical group** for granular history
- **Stop at any checkpoint to validate story independently** before proceeding
- **Avoid**: Vague tasks, same-file conflicts, cross-story dependencies that break independence
- **Constitution compliance**: Type hints required (Principle IV), async-first (Principle IV), structured logging (Principle IX), no over-engineering (Principle X)
- **Context7 MCP tools**: Use during T020 (OpenAI Agents integration) to fetch latest documentation per research.md decision

---

## Task Count Summary

- **Phase 1 (Setup)**: 6 tasks (T001-T006)
- **Phase 2 (Foundational)**: 9 tasks (T007-T015) **BLOCKING**
- **Phase 3 (User Story 1 - P1)**: 10 tasks (T016-T025) including 2 tests
- **Phase 4 (User Story 2 - P2)**: 10 tasks (T026-T035) including 2 tests
- **Phase 5 (User Story 3 - P3)**: 5 tasks (T036-T040) including 1 test update
- **Phase 6 (Polish)**: 10 tasks (T041-T050)

**Total**: 50 tasks

**Parallel Opportunities**: 15 tasks marked [P] can run concurrently within their phases

**Independent Test Criteria**:
- **US1**: Query "What is embodied intelligence?" returns accurate answer with Chapter 1 citations
- **US2**: Add new MDX file, run CLI script, query retrieves new content
- **US3**: Query with selected_text parameter returns contextually weighted results

**Suggested MVP Scope**: Phase 1 + Phase 2 + Phase 3 (User Story 1 only) = 25 tasks for query endpoint MVP
