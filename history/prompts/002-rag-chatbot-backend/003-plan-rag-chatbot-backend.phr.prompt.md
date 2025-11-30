---
id: 003
title: RAG Chatbot Backend Implementation Plan
stage: plan
date: 2025-11-30
surface: slash-command
model: sonnet-4.5
feature: 002-rag-chatbot-backend
branch: 002-rag-chatbot-backend
user: uneezaismail
command: /sp.plan
labels: [rag, planning, design-artifacts, openapi, pydantic]
links:
  spec: specs/002-rag-chatbot-backend/spec.md
  plan: specs/002-rag-chatbot-backend/plan.md
  previous-phr: history/prompts/002-rag-chatbot-backend/002-clarify-cli-ingestion.phr.prompt.md
  ticket: N/A
  adr: N/A
  pr: N/A
files:
  - path: specs/002-rag-chatbot-backend/plan.md
    status: created
    lines: 319
  - path: specs/002-rag-chatbot-backend/research.md
    status: created
    lines: 234
  - path: specs/002-rag-chatbot-backend/data-model.md
    status: created
    lines: 388
  - path: specs/002-rag-chatbot-backend/contracts/api-openapi.yaml
    status: created
    lines: 233
  - path: specs/002-rag-chatbot-backend/quickstart.md
    status: created
    lines: 322
  - path: CLAUDE.md
    status: updated
    lines: N/A
tests: []
---

## Prompt

```
/sp.plan

Build a Retrieval-Augmented Generation (RAG) system for the book, capable of storing book content in a vector database and answering user queries via an OpenAI Agents-based chatbot.

[User provided detailed workflows for CLI ingestion and API query handling, technical requirements, and best practices]
```

## Response Snapshot

**Planning Workflow Executed**: Completed Phase 0 (Research) and Phase 1 (Design & Contracts) as per `/sp.plan` specification.

### Phase 0: Research

**Output**: `research.md` (234 lines)

**Research Tasks Completed** (7 total):
1. **OpenAI Agents SDK with Gemini API**: Use Gemini API via OpenAI-compatible base URL (`https://generativelanguage.googleapis.com/v1beta/openai/`). Fetch latest documentation via context7 MCP tools during implementation.
2. **MDX Content Parsing**: Use `python-frontmatter` library for YAML metadata extraction + regex for content processing
3. **Semantic Chunking Strategy**: Recursive character splitter with code-aware boundaries using `tiktoken` for token counting (500-800 tokens, 100-token overlap)
4. **Qdrant Collection Configuration**: Single collection with cosine similarity, HNSW index, 768 dimensions
5. **Content Hash for Idempotency**: SHA-256 hash of (chapter + section + chunk_index + content) as Qdrant point ID
6. **FastAPI Async Best Practices**: Async route handlers with dependency injection for Qdrant and embedding clients
7. **Error Handling Strategy**: Structured exception handling with exponential backoff for transient errors (rate limits, timeouts)

**Additional Dependencies Identified**:
- `python-frontmatter` - MDX metadata parsing
- `tiktoken` - Token counting for chunking

### Phase 1: Design & Contracts

**Outputs**:
- **data-model.md** (388 lines): 7 Pydantic models defined
  - Core entities: Chunk, Query, SearchResult, AgentResponse
  - API models: QueryRequest, QueryResponse
  - CLI model: IngestResult
  - All models include field validators, type hints, and validation rules
- **contracts/api-openapi.yaml** (233 lines): OpenAPI 3.1 specification
  - `POST /api/query` endpoint with examples (basic query, contextual query)
  - `GET /health` endpoint for dependency monitoring
  - Comprehensive error responses (400, 422, 429, 500)
  - Request/response schemas with validation constraints
- **quickstart.md** (322 lines): Developer guide
  - Setup instructions (environment variables, dependencies)
  - Usage: CLI ingestion (`python -m app.ingest`), FastAPI server, query examples (cURL, Swagger, Python)
  - Testing commands (pytest)
  - Troubleshooting common issues
  - Next steps and references

**Project Structure Documented**:
```
backend/
├── app/
│   ├── main.py (FastAPI entry)
│   ├── config.py (env vars)
│   ├── ingest.py (CLI script)
│   ├── rag/ (chunking, embeddings, retrieval, agents)
│   ├── api/ (routes, models)
│   └── db/ (qdrant_client)
└── tests/ (4 test files)
```

### Constitution Check

**Pre-Research Gates**: ✅ ALL PASS (10/10 principles)
**Post-Design Re-Evaluation**: ✅ ALL PASS (10/10 principles)

**Key Validations**:
- Principle IV: All 7 Pydantic models defined with strict type validation, field validators for word count limits
- Principle V: OpenAPI spec shows input validation and structured error responses (no internal details exposed)
- Principle VI: 4 test files planned, quickstart.md documents pytest commands
- Principle X: 7 entities total (minimal set), no over-engineering, direct Qdrant client usage

**No complexity violations.** No complexity tracking required.

## Outcome

- ✅ Impact: Complete implementation plan with 5 design artifacts (plan.md, research.md, data-model.md, api-openapi.yaml, quickstart.md) covering Phase 0 (research) and Phase 1 (design/contracts)
- 🧪 Tests: 4 test files planned (test_embeddings.py, test_rag_retrieval.py, test_chunking.py, test_ingest_cli.py)
- 📁 Files: 5 files created, 1 updated (CLAUDE.md agent context)
- 🔁 Next prompts: `/sp.tasks` to generate dependency-ordered task breakdown, then `/sp.implement` for Red-Green-Refactor execution
- 🧠 Reflection: Successfully resolved all NEEDS CLARIFICATION items through research phase. Design artifacts maintain constitution compliance with no complexity creep. OpenAPI contract provides clear API definition for frontend integration (future feature). Ready for implementation.

## Evaluation Notes (Flywheel)

- Failure modes observed: None - all phases completed successfully. One NEEDS CLARIFICATION item (openai-agents documentation) deferred to implementation phase with note to use context7 MCP tools.
- Graders run and results (PASS/FAIL): Constitution Check PASS (pre-research and post-design), all 10 principles validated
- Prompt variant (if applicable): Standard `/sp.plan` workflow with user-provided technical requirements
- Next experiment (smallest change to try): Proceed to `/sp.tasks` to validate that task generation correctly interprets the design artifacts and research decisions
