---
id: 001
title: RAG Chatbot Backend Specification
stage: spec
date: 2025-11-29
surface: slash-command
model: sonnet-4.5
feature: 002-rag-chatbot-backend
branch: 002-rag-chatbot-backend
user: uneezaismail
command: /sp.specify
labels: [rag, embeddings, vector-database, fastapi, openai-agents]
links:
  spec: specs/002-rag-chatbot-backend/spec.md
  ticket: N/A
  adr: N/A
  pr: N/A
files:
  - path: specs/002-rag-chatbot-backend/spec.md
    status: created
    lines: 287
  - path: specs/002-rag-chatbot-backend/checklists/requirements.md
    status: created
    lines: 45
tests: []
---

## Prompt

```
/sp.specify rag-chatbot-backend

Target audience: Users of the book who want to ask questions about its content or selected text.

Focus: Build a backend system that converts book content into embeddings, stores them in Qdrant vector DB, and answers user queries using a RAG approach with OpenAI Agents.

Success criteria:
- All book chapters (including future additions) are automatically ingested and converted into embeddings.
- Embeddings are stored in Qdrant with metadata: chapter, section, filename, chunk_index, and text.
- User queries or selected text are converted into embeddings, searched in Qdrant, and returned to the LLM for context.
- The OpenAI Agents SDK (using GEMINI_API_KEY) correctly generates answers from the book content.
- FastAPI handles frontend/backend requests successfully.
- Pydantic models validate all input/output data.
- A 'tests/' folder contains basic tests for embedding creation and RAG retrieval.
- Terminal outputs show agent responses for verification.
- Script is idempotent: running it multiple times does not duplicate or break existing embeddings.

Constraints:
- Python dependencies: openai-agents, fastapi, uvicorn, pydantic, qdrant-client, python-dotenv, ruff, black, mypy, pytest
- api keys must be set in environment variables
- Must handle multiple chapters and future additions without code changes
- Use context7 MCP tools before writing OpenAI Agents and FastAPI code
```

## Response snapshot

**Specification Created**: `specs/002-rag-chatbot-backend/spec.md` (287 lines)

### Key Sections Generated:

**User Stories (3)**:
1. **P1 - Query Book Content**: Core RAG functionality - users ask questions and receive answers with citations from textbook chapters
2. **P2 - Automatic Content Ingestion**: System automatically processes new/updated MDX files, chunks content, generates embeddings, stores in Qdrant
3. **P3 - Contextual Text Selection Queries**: Enhanced UX where selected text is weighted in search results

**Functional Requirements (22)**:
- Content ingestion: Recursive scan of `frontend/docs/`, semantic chunking (500-800 tokens), preserve code blocks
- Embedding generation: `text-embedding-004` (768 dimensions) via Gemini API
- Vector database: Qdrant Cloud collection `physical-ai-textbook-v1`, idempotent ingestion, incremental updates
- Query processing: Top 5 semantic search, OpenAI Agents for answer generation, source citations
- API endpoints: `POST /api/query`, `POST /api/ingest` (FastAPI with Pydantic validation)
- Testing: 3 test files (embeddings, RAG retrieval, chunking)
- Environment variables: `GEMINI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`

**Success Criteria (8)**:
- SC-001: Answers within 3 seconds
- SC-002: 90% accuracy on 50 test queries
- SC-003: 100% of valid `.mdx` files processed
- SC-004: 10 concurrent queries without degradation
- SC-005: Idempotent ingestion (no duplicates)
- SC-006: 95% of answers have citations
- SC-007: New content queryable after ingestion
- SC-008: Zero downtime during updates

**Edge Cases (8)**: Query topics not in book, non-English queries, Qdrant unavailable, long queries, duplicate content, code block chunking, vague follow-ups, concurrent ingestion

**Entities (4)**: Chunk, Query, SearchResult, AgentResponse

**Assumptions (10)**: MDX format, Qdrant availability, API rate limits (60/min), content volume (~1,500-2,500 chunks), English-only, no auth in V1, etc.

**Out of Scope**: User authentication, frontend UI, multi-language, advanced RAG techniques, real-time updates, analytics, content moderation, conversation history

### Validation:

**Requirements Checklist**: ALL items pass ✅
- No implementation details in spec
- All requirements testable and unambiguous
- Success criteria measurable and technology-agnostic
- No [NEEDS CLARIFICATION] markers
- Edge cases identified
- Dependencies and constraints documented

## Outcome

- ✅ Impact: Complete, production-ready specification for RAG chatbot backend with 3 prioritized user stories, 22 functional requirements, and 8 measurable success criteria
- 🧪 Tests: Specification includes test requirements (3 test files: embeddings, RAG retrieval, chunking)
- 📁 Files: 2 files created (spec.md, checklists/requirements.md)
- 🔁 Next prompts: `/sp.plan` to create implementation plan or `/sp.clarify` if user has questions
- 🧠 Reflection: Successfully generated comprehensive spec with no clarification markers needed - all requirements are testable and unambiguous. User-focused success criteria avoid implementation details while maintaining measurability.

## Evaluation notes (flywheel)

- Failure modes observed: None - spec passed all quality checklist items on first iteration
- Graders run and results (PASS/FAIL): Manual validation PASS (all checklist items checked)
- Prompt variant (if applicable): Standard `/sp.specify` workflow
- Next experiment (smallest change to try): None needed - spec is ready for planning phase
