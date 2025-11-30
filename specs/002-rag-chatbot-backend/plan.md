# Implementation Plan: RAG Chatbot Backend

**Branch**: `002-rag-chatbot-backend` | **Date**: 2025-11-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-rag-chatbot-backend/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a Retrieval-Augmented Generation (RAG) system that converts Physical AI textbook content into embeddings stored in Qdrant vector database, and answers user queries using OpenAI Agents SDK with Gemini API. The system consists of two main components:

1. **CLI Ingestion Script**: Recursively scans `frontend/docs/` for MDX files, chunks content at semantic boundaries (500-800 tokens with 100-token overlap), generates 768-dimensional embeddings using `text-embedding-004`, and stores them in Qdrant with metadata (chapter, section, filename, chunk_index). The script is idempotent and handles multiple chapters without code changes.

2. **FastAPI Query Endpoint**: Accepts user queries (max 500 words) and optional selected text, embeds the query, searches Qdrant for top 5 semantically similar chunks, passes context to OpenAI Agents for answer generation, and returns responses with source citations.

**Technical Approach**: Python 3.11+ async-first design using Gemini API (via OpenAI SDK wrapper), Qdrant Cloud for vector storage, FastAPI for HTTP endpoints, Pydantic for validation, and pytest for testing. Content hashing (SHA-256) ensures idempotent ingestion.

## Technical Context

**Language/Version**: Python 3.11+ (required for enhanced type hints and async improvements)
**Primary Dependencies**:
- `openai-agents` - LLM agent orchestration (NEEDS CLARIFICATION: documentation access required via context7)
- `fastapi` + `uvicorn` - Async HTTP API framework
- `pydantic` - Data validation and settings management
- `qdrant-client` - Vector database client for Qdrant Cloud
- `python-dotenv` - Environment variable management
- `openai` - SDK for Gemini API access (OpenAI-compatible wrapper)
- Development: `ruff`, `black`, `mypy`, `pytest`

**Storage**:
- Qdrant Cloud - Vector database (768-dimensional embeddings, cosine similarity search)
- Local filesystem - Source content in `frontend/docs/` (MDX files)
- No persistent storage for query history (V1 scope limitation)

**Testing**:
- `pytest` - Unit and integration tests
- Test files: `test_embeddings.py`, `test_rag_retrieval.py`, `test_chunking.py`, `test_ingest_cli.py`
- Manual QA: 50 test queries for RAG accuracy validation (target: 90% correct answers)

**Target Platform**:
- Backend: Python server (compatible with Railway, Render, Fly.io free tiers)
- OS: Cross-platform (Windows, Linux, macOS) for development; Linux preferred for deployment

**Project Type**: Web application (backend only - frontend integration separate feature)

**Performance Goals**:
- Query response time: < 3 seconds (p95) from submission to answer display
- Qdrant vector search: < 500ms
- Embedding generation: Batched (not blocking user queries)
- Concurrent queries: Support 10 simultaneous queries without degradation

**Constraints**:
- Gemini API rate limits: 60 requests/minute minimum (free tier assumption)
- Input validation: User queries max 500 words, selected text max 200 words
- Chunk size: 500-800 tokens with 100-token overlap
- Code blocks MUST NOT be split across chunks
- No authentication required for query endpoint (V1)
- Idempotent ingestion: Content hash (SHA-256) prevents duplicates

**Scale/Scope**:
- Content volume: ~28 chapters, 6-7 sections each (~200-300 total sections)
- Expected chunks after ingestion: ~1,500-2,500 chunks
- Qdrant storage: ~7.5 MB vector data (2,500 chunks × 768 dimensions × 4 bytes)
- Query load: Low concurrent users initially (educational use case)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Educational Excellence First ✅ PASS
- Not applicable to backend infrastructure feature
- Backend serves educational content delivery, not primary educational content
- Will be validated through user-facing frontend integration (separate feature)

### Principle II: Technical Accuracy & Verifiability ✅ PASS
- All ROS 2 content ingestion will use official documentation
- Version-specific information extracted from MDX frontmatter
- Code examples in chunks will be preserved intact (FR-003)
- RAG answers will cite source sections for verification
- **Hardware Mandate**: Not applicable (backend infrastructure, no simulation content)

### Principle III: Spec-Driven Development ✅ PASS
- Specification completed: `specs/002-rag-chatbot-backend/spec.md`
- Clarification session recorded: CLI-only ingestion decision
- This plan follows spec → clarify → plan workflow
- ADR not required (no architecturally significant decision beyond CLI approach)

### Principle IV: Type Safety & Async-First Design ✅ PASS
- Python 3.11+ with type hints for all function signatures (FR-017)
- Async-first design: All I/O operations (Qdrant, Gemini API, file reads) use `async/await`
- Pydantic models for all input/output validation (FR-017)
- Docstrings (Google style) for all public functions
- Black formatting (line length 88) + Ruff linting enforced

### Principle V: Security & Privacy by Design ✅ PASS
- API keys in environment variables only: `GEMINI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY` (FR-020, FR-021)
- Rate limiting: Will be added in frontend integration (not backend scope)
- Input sanitization: User queries limited to 500 words, selected text to 200 words (FR-009, FR-015)
- CORS: Will be configured in FastAPI for production domains
- No sensitive data in logs: Query text sanitized before logging (FR-022)
- No authentication for V1 query endpoint (assumption #6)

### Principle VI: Testing & Validation ✅ PASS
- Unit tests required: `test_embeddings.py`, `test_rag_retrieval.py`, `test_chunking.py`, `test_ingest_cli.py` (FR-018)
- Integration tests: Qdrant queries, embedding generation
- RAG accuracy validation: 50 test queries, target 90% correct (SC-002)
- Manual QA checklist defined in spec

### Principle VII: Progressive Enhancement & Graceful Degradation ✅ PASS
- FastAPI errors use HTTPException with appropriate status codes
- Structured error logging (FR-022)
- Qdrant connection failures handled gracefully (edge case documented)
- Embedding API failures handled with retries and error logging

### Principle VIII: Performance & Scalability ✅ PASS
- Query response: < 3 seconds p95 (SC-001)
- Qdrant search: < 500ms (constitution standard)
- Embedding generation: Batched, not blocking queries
- Gemini API rate limits documented (60 req/min minimum assumption)
- Qdrant Cloud storage monitored (free tier: 1GB limit)

### Principle IX: Observability & Debugging ✅ PASS
- Structured logging in JSON format (FR-022)
- Log levels: DEBUG, INFO, WARNING, ERROR
- No sensitive data in logs (query text sanitized)
- FastAPI auto-generates OpenAPI documentation
- Terminal output shows agent responses during query processing (FR-019)

### Principle X: Simplicity & Pragmatism (YAGNI) ✅ PASS
- No over-engineering: Implements spec requirements only
- RAG chunking: Simple semantic boundaries (500-800 tokens, 100-token overlap)
- No abstractions without concrete need
- CLI script approach simpler than API endpoint for ingestion
- Content hash (SHA-256) for idempotency - standard approach, not micro-optimization

**Overall Gate Status: ✅ ALL GATES PASS**

No constitution violations identified. Feature aligns with all principles. Ready to proceed to Phase 0 research.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI application entry point
│   ├── config.py                  # Environment variables and settings
│   ├── ingest.py                  # CLI ingestion script (python -m app.ingest)
│   ├── rag/
│   │   ├── __init__.py
│   │   ├── chunking.py            # MDX content chunking logic
│   │   ├── embeddings.py          # Gemini API embedding generation
│   │   ├── retrieval.py           # Qdrant search and context building
│   │   └── agents.py              # OpenAI Agents integration
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes.py              # FastAPI route definitions
│   │   └── models.py              # Pydantic request/response models
│   └── db/
│       ├── __init__.py
│       └── qdrant_client.py       # Qdrant connection and operations
├── tests/
│   ├── __init__.py
│   ├── test_embeddings.py         # Unit tests for embedding generation
│   ├── test_rag_retrieval.py      # Integration tests for RAG pipeline
│   ├── test_chunking.py           # Unit tests for content chunking
│   └── test_ingest_cli.py         # CLI script execution tests
├── requirements.txt               # Python dependencies (uv managed)
├── pyproject.toml                 # Python project configuration
├── .env.example                   # Environment variable template
└── README.md                      # Backend setup and usage instructions

frontend/                          # Existing Docusaurus textbook (not modified in this feature)
├── docs/                          # MDX content source for ingestion
└── [existing structure]
```

**Structure Decision**: Web application architecture with separate `backend/` directory. Frontend already exists as Docusaurus site. This feature implements only the backend RAG system. Frontend integration (ChatKit SDK) will be a separate future feature.

**Rationale**:
- Separation of concerns: Backend logic isolated from frontend
- `app/` package structure enables `python -m app.ingest` CLI execution
- Modular design: `rag/`, `api/`, `db/` directories clearly separate responsibilities
- Testing structure mirrors source code for easy navigation
- Constitution compliance: No over-engineering, standard Python project layout

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No violations recorded.** Constitution Check passed all gates. No complexity justifications required.

---

## Phase 0: Research (Complete)

**Output**: [research.md](./research.md)

**Key Decisions Documented**:
1. OpenAI Agents SDK with Gemini API via OpenAI-compatible base URL
2. MDX parsing using `python-frontmatter` library
3. Semantic chunking with `tiktoken` for token counting
4. Qdrant configuration: Cosine similarity, HNSW index, 768 dimensions
5. SHA-256 content hash for idempotency
6. FastAPI async route handlers with dependency injection
7. Error handling with exponential backoff for transient failures

**Additional Dependencies Added**:
- `python-frontmatter` - MDX metadata parsing
- `tiktoken` - Token counting for chunking

**Status**: ✅ All NEEDS CLARIFICATION items resolved

---

## Phase 1: Design & Contracts (Complete)

**Outputs**:
- [data-model.md](./data-model.md) - 7 Pydantic models defined (Chunk, Query, SearchResult, AgentResponse, QueryRequest, QueryResponse, IngestResult)
- [contracts/api-openapi.yaml](./contracts/api-openapi.yaml) - OpenAPI 3.1 specification with examples
- [quickstart.md](./quickstart.md) - Developer setup and usage guide

**Entity Relationship Summary**:
```
MDX File → Chunk → (stored in) Qdrant DB
Query → SearchResult → AgentResponse → QueryResponse
```

**API Endpoints Defined**:
- `POST /api/query` - Submit query and receive answer with citations
- `GET /health` - Health check for service dependencies

**CLI Commands Defined**:
- `python -m app.ingest` - Run ingestion script to process MDX files

**Status**: ✅ Design artifacts complete

---

## Constitution Check (Post-Design Re-Evaluation)

*Re-evaluated after Phase 1 design artifacts created.*

### Principle I: Educational Excellence First ✅ PASS
- Backend infrastructure supports educational content delivery
- No changes from initial check

### Principle II: Technical Accuracy & Verifiability ✅ PASS
- Data model preserves source metadata (chapter, section, filename) for citation
- No changes from initial check

### Principle III: Spec-Driven Development ✅ PASS
- Research phase resolved all unknowns before design
- Design artifacts directly trace to spec requirements
- No changes from initial check

### Principle IV: Type Safety & Async-First Design ✅ PASS
- All 7 Pydantic models defined with strict validation
- Field validators enforce word count limits (500/200 words)
- OpenAPI contract specifies all types
- **Validation**: data-model.md shows comprehensive type hints and validators

### Principle V: Security & Privacy by Design ✅ PASS
- API contract shows input validation (query length, selected text length)
- Error responses don't expose internals (HTTPException with user-friendly messages)
- **Validation**: OpenAPI spec shows 400/422/429/500 error handling

### Principle VI: Testing & Validation ✅ PASS
- 4 test files planned: test_embeddings.py, test_rag_retrieval.py, test_chunking.py, test_ingest_cli.py
- Quickstart.md documents test execution
- **Validation**: Quickstart shows pytest commands and expected output

### Principle VII: Progressive Enhancement & Graceful Degradation ✅ PASS
- OpenAPI spec shows graceful error handling (429, 500 responses)
- Health endpoint allows dependency monitoring
- **Validation**: API contract shows structured error responses

### Principle VIII: Performance & Scalability ✅ PASS
- Query response target: < 3 seconds (documented in spec)
- Async design throughout (FastAPI async routes)
- **Validation**: Research.md documents async patterns

### Principle IX: Observability & Debugging ✅ PASS
- Quickstart.md shows CLI output examples with structured logging
- OpenAPI auto-documentation available at /docs
- **Validation**: IngestResult model includes error logging

### Principle X: Simplicity & Pragmatism (YAGNI) ✅ PASS
- 7 entities total - minimal set to meet requirements
- No over-engineered abstractions
- Direct Qdrant client usage (no unnecessary repository pattern)
- **Validation**: Data model shows simple, focused entities

**Overall Post-Design Gate Status: ✅ ALL GATES PASS**

Design artifacts maintain constitution compliance. No complexity creep detected. Ready to proceed to Phase 2 (tasks.md generation via `/sp.tasks` command).

---

## Next Steps

1. **Run `/sp.tasks`** to generate dependency-ordered task breakdown from this plan
2. **Run `/sp.implement`** to execute tasks in Red-Green-Refactor workflow
3. **Create ADR** if significant architectural decisions emerge during implementation (none anticipated based on current design)
