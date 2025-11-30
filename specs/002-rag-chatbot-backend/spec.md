# Feature Specification: RAG Chatbot Backend

**Feature Branch**: `002-rag-chatbot-backend`
**Created**: 2025-11-29
**Status**: Draft
**Input**: User description: "rag-chatbot-backend - Build a backend system that converts book content into embeddings, stores them in Qdrant vector DB, and answers user queries using a RAG approach with OpenAI Agents"

## Clarifications

### Session 2025-11-29

- Q: How should the `/api/ingest` endpoint be protected in V1? → A: Script-only, no API or API endpoints (ingestion runs as standalone CLI script)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Query Book Content (Priority: P1)

A student reading Chapter 2 of the Physical AI textbook encounters an unfamiliar concept (e.g., "What is the sensorimotor loop?"). They select the text and ask a question. The system searches the book's content, finds relevant sections across multiple chapters, and provides a comprehensive answer with citations.

**Why this priority**: This is the core value proposition - enabling students to get immediate, contextual answers from the textbook content. Without this, the feature provides no value.

**Independent Test**: Can be fully tested by sending a query (e.g., "Explain VSLAM in ROS 2") and verifying the response contains accurate information from the correct book chapters with proper citations.

**Acceptance Scenarios**:

1. **Given** the book content has been ingested into the vector database, **When** a user submits the query "What is embodied intelligence?", **Then** the system returns an answer that includes content from Chapter 1, cites the specific section, and explains the concept in the context of Physical AI.

2. **Given** the user selects text from Chapter 2 ("Jetson Orin Nano"), **When** they ask "Why is this hardware required?", **Then** the system retrieves context from both the selected text and related sections (e.g., Hardware Mandate section) and provides a comprehensive answer.

3. **Given** the user asks a question about a topic spanning multiple chapters (e.g., "How does ROS 2 connect to Isaac Sim?"), **When** the query is processed, **Then** the system returns information from all relevant chapters with citations to each source.

---

### User Story 2 - Automatic Content Ingestion (Priority: P2)

An author adds a new Chapter 3 ("Physical AI Architecture") to the textbook. The system automatically detects the new content, chunks it appropriately (preserving code blocks and section boundaries), generates embeddings, and stores them in Qdrant without manual intervention.

**Why this priority**: Essential for maintainability - the system must handle new content automatically to avoid becoming stale. However, it's P2 because the initial ingestion (P1) must work first.

**Independent Test**: Add a new `.mdx` file to `frontend/docs/`, run the ingestion script, verify the new content appears in Qdrant with correct metadata (chapter, section, filename), and confirm queries can retrieve it.

**Acceptance Scenarios**:

1. **Given** a new chapter file is added to `frontend/docs/01-part-1-foundations-lab/03-chapter-3-architecture/`, **When** the CLI ingestion script is executed (e.g., `python -m app.ingest`), **Then** all sections from the new chapter are chunked, embedded, and stored in Qdrant with metadata: `{chapter: "Chapter 3", section: "01-three-tier-architecture", filename: "01-three-tier-architecture.mdx"}`, and the script outputs "Processing 03-chapter-3-architecture... X chunks created" with exit code 0.

2. **Given** an existing chapter is updated (e.g., new exercises added to Chapter 1), **When** the CLI ingestion script runs in idempotent mode, **Then** only the new/changed content is re-embedded, existing embeddings are not duplicated, queries return the updated content, and the script outputs the count of updated chunks.

3. **Given** the ingestion script encounters a malformed MDX file, **When** it processes the docs directory, **Then** it logs the error to stdout, skips the broken file, continues processing remaining files, reports which files failed in the final output, and exits with non-zero exit code.

---

### User Story 3 - Contextual Text Selection Queries (Priority: P3)

A student is reading Section 2.4 ("Sensor Stack") and highlights the text "Intel RealSense D435i". They ask, "What are the alternatives to this sensor?" The system uses both the selected text as context and searches the broader book content to provide a comparative answer.

**Why this priority**: Enhances user experience by making queries more contextual, but basic query functionality (P1) and content ingestion (P2) must work first.

**Independent Test**: Send a query with `selected_text` parameter (e.g., `{"query": "What are alternatives?", "selected_text": "Intel RealSense D435i"}`), verify the response weighs the selected text more heavily in the search, and includes comparative information from other sections.

**Acceptance Scenarios**:

1. **Given** the user selects "NVIDIA Jetson Orin Nano" in Chapter 2, **When** they ask "What is this used for?", **Then** the system embeds both the query and selected text, searches for semantically similar content, and returns an answer that explains the Jetson's role in the three-tier architecture.

2. **Given** the user selects a code snippet (ROS 2 Python node), **When** they ask "How does this work?", **Then** the system identifies it as code, searches for related explanations in the text, and provides a step-by-step breakdown with references to the correct section.

---

### Edge Cases

- **What happens when** a user queries a topic not covered in the book (e.g., "How do I build a quantum computer?")?
  *System should return a response indicating "This topic is not covered in the Physical AI & Humanoid Robotics textbook" and suggest related topics that ARE covered.*

- **How does the system handle** queries in languages other than English?
  *Assume English-only for V1. Non-English queries should return a message: "Please ask your question in English."*

- **What happens when** Qdrant vector database is unreachable (network error, service down)?
  *System should return a user-friendly error: "The knowledge base is temporarily unavailable. Please try again in a moment." and log the error for monitoring.*

- **How does the system handle** extremely long queries (&gt;1000 words)?
  *System should truncate to the first 500 words and warn the user: "Your query was truncated to 500 words. Please be more concise."*

- **What happens when** the same content exists in multiple formats (e.g., both `index.mdx` and `00-intro.mdx`)?
  *System should deduplicate by content hash to avoid storing identical chunks multiple times.*

- **How does the system handle** code blocks during chunking?
  *Code blocks must never be split across chunks. If a code block exceeds the chunk size (800 tokens), it should be treated as a single chunk with a warning logged.*

- **What happens when** a user asks a follow-up question without context (e.g., "Tell me more")?
  *System should return: "I need more context. Please ask a specific question about the textbook content."*

- **How does the system handle** concurrent ingestion runs (e.g., two processes trying to ingest the same content)?
  *Use file locking or atomic operations to prevent race conditions. The second process should wait or exit gracefully with a message: "Ingestion already in progress."*

## Requirements *(mandatory)*

### Functional Requirements

**Content Ingestion & Embedding Generation**

- **FR-001**: System MUST recursively scan the `frontend/docs/` directory for all `.mdx` and `.md` files and extract text content while preserving metadata (chapter number, section title, filename).

- **FR-002**: System MUST chunk content at semantic boundaries (section headers, paragraph breaks) with a target chunk size of 500-800 tokens and 100-token overlap between consecutive chunks.

- **FR-003**: System MUST NOT split code blocks across chunks - if a code block exceeds the chunk size, it MUST be treated as a single chunk.

- **FR-004**: System MUST generate embeddings for each chunk using the `text-embedding-004` model (768 dimensions) via the Gemini API (accessed through OpenAI SDK).

- **FR-005**: System MUST extract and store metadata for each chunk:
  - `chapter`: Chapter number and title (e.g., "Chapter 1: Embodied Intelligence")
  - `section`: Section identifier (e.g., "01-digital-vs-physical-ai")
  - `filename`: Source filename (e.g., "01-digital-vs-physical-ai.mdx")
  - `chunk_index`: Sequential index within the source file (0, 1, 2, ...)
  - `text`: The actual chunk content

**Vector Database Storage**

- **FR-006**: System MUST store embeddings in Qdrant Cloud with a collection named `physical-ai-textbook-v1` configured for 768-dimensional vectors.

- **FR-007**: System MUST be idempotent - running ingestion multiple times MUST NOT create duplicate embeddings for unchanged content (use content hash for deduplication).

- **FR-008**: System MUST support incremental updates - when a file is modified, only that file's chunks should be re-embedded and updated in Qdrant.

**Query Processing & RAG Retrieval**

- **FR-009**: System MUST accept user queries as text input (max 500 words) and optionally accept `selected_text` parameter for contextual queries.

- **FR-010**: System MUST embed the user query using the same `text-embedding-004` model to ensure semantic compatibility with stored embeddings.

- **FR-011**: System MUST search Qdrant for the top 5 most semantically similar chunks to the query embedding using cosine similarity.

- **FR-012**: System MUST construct a context payload from the retrieved chunks that includes: chunk text, chapter title, section title, and filename for citation.

- **FR-013**: System MUST pass the context payload and user query to an OpenAI Agents agent (using `GEMINI_API_KEY`) to generate a comprehensive answer.

- **FR-014**: System MUST return the agent's response along with citations (chapter, section, filename) for each source used in the answer.

**API Endpoints (FastAPI)**

Note: Content ingestion is handled by a standalone CLI script, not an API endpoint. Only query functionality is exposed via API.

- **FR-015**: System MUST expose a `POST /api/query` endpoint that accepts:
  - `query` (required, string, max 500 words)
  - `selected_text` (optional, string, max 200 words)

  And returns:
  - `answer` (string)
  - `sources` (array of objects: `{chapter, section, filename, relevance_score}`)

**Content Ingestion (CLI Script)**

- **FR-016**: System MUST provide a standalone CLI script (e.g., `ingest.py` or `python -m app.ingest`) that triggers content ingestion from `frontend/docs/` directory and outputs:
  - Exit code: 0 for success, non-zero for errors
  - Terminal output showing: files processed count, chunks created count, and detailed error messages (if any)
  - Progress logging to stdout during execution (e.g., "Processing chapter-1-embodied-ai.mdx... 15 chunks created")

- **FR-017**: System MUST validate all input/output data using Pydantic models with strict type checking.

**Testing & Verification**

- **FR-018**: System MUST include a `tests/` directory with at least:
  - `test_embeddings.py`: Verify embedding generation produces 768-dim vectors
  - `test_rag_retrieval.py`: Verify query "What is embodied intelligence?" retrieves relevant chunks from Chapter 1
  - `test_chunking.py`: Verify code blocks are not split across chunks
  - `test_ingest_cli.py`: Verify CLI script runs successfully, produces expected output format, and handles errors gracefully

- **FR-019**: System MUST print agent responses to the terminal during query processing for manual verification.

**Operational Requirements**

- **FR-020**: System MUST load API keys (`GEMINI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`) from environment variables, NOT hardcoded in source files.

- **FR-021**: System MUST gracefully handle missing API keys by raising an error at startup with the message: "Required environment variable [VAR_NAME] not set."

- **FR-022**: System MUST log all errors (Qdrant connection failures, embedding API errors, file read errors) with sufficient detail for debugging.

### Key Entities

- **Chunk**: A semantically coherent piece of textbook content (500-800 tokens) with associated metadata. Attributes:
  - `id`: Unique identifier (UUID or sequential)
  - `embedding`: 768-dimensional vector (float32 array)
  - `text`: Original chunk content (string)
  - `chapter`: Chapter identifier (e.g., "Chapter 1: Embodied Intelligence")
  - `section`: Section identifier (e.g., "01-digital-vs-physical-ai")
  - `filename`: Source filename (e.g., "01-digital-vs-physical-ai.mdx")
  - `chunk_index`: Position within source file (integer)
  - `content_hash`: SHA-256 hash for deduplication (string)

- **Query**: User's question or text selection with associated context. Attributes:
  - `query_text`: The user's question (string, max 500 words)
  - `selected_text`: Highlighted text from the book (optional, string, max 200 words)
  - `timestamp`: When the query was made (datetime)

- **SearchResult**: Retrieved chunks with similarity scores. Attributes:
  - `chunk`: Reference to the Chunk entity
  - `score`: Cosine similarity score (float, 0-1)
  - `rank`: Position in search results (integer, 1-5)

- **AgentResponse**: LLM-generated answer with source citations. Attributes:
  - `answer`: Generated text response (string)
  - `sources`: Array of `{chapter, section, filename, score}` objects
  - `model_used`: Model identifier (e.g., "gemini-1.5-pro")
  - `latency`: Time to generate answer (milliseconds)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users receive accurate answers to queries about textbook content within 3 seconds (from query submission to response display).

- **SC-002**: The system correctly answers at least 90% of test queries about topics covered in the ingested chapters (measured by manual review of 50 test queries).

- **SC-003**: All book chapters and sections are successfully ingested without manual intervention - running the CLI ingestion script on the `frontend/docs/` directory processes 100% of valid `.mdx` files and exits with code 0.

- **SC-004**: The system handles 10 concurrent user queries without degradation in response time (all queries complete within 3 seconds).

- **SC-005**: Running the ingestion script multiple times on the same content does NOT create duplicate embeddings - Qdrant collection size remains constant after the first run.

- **SC-006**: The system provides relevant source citations for at least 95% of answers - users can trace the answer back to the specific textbook section.

- **SC-007**: When new content is added (e.g., Chapter 3), users can query it immediately after running the CLI ingestion script (no manual database updates required).

- **SC-008**: Zero downtime during content updates - users can continue querying existing content while new content is being ingested.

## Assumptions

1. **Content Format**: All textbook content is in MDX format (Markdown + JSX) stored in `frontend/docs/` directory with consistent frontmatter structure.

2. **Qdrant Availability**: Qdrant Cloud service is accessible and reliable. Network connectivity between the backend and Qdrant is stable.

3. **API Rate Limits**: Gemini API (via OpenAI SDK) has sufficient rate limits for embedding generation and query processing during development and testing (assumed: 60 requests/minute minimum).

4. **Content Volume**: The textbook will contain approximately 28 chapters with 6-7 sections each (~200-300 total sections), resulting in ~1,500-2,500 chunks after ingestion.

5. **Query Language**: All queries are in English. No multi-language support required for V1.

6. **User Authentication**: No authentication/authorization required for V1 - all users can query the content. Content ingestion is triggered via CLI script (no API endpoint exposure).

7. **Embedding Model**: `text-embedding-004` (768 dimensions) is the correct model for this use case and will not change during development.

8. **Chunking Strategy**: Semantic chunking at section boundaries with 500-800 token chunks and 100-token overlap is sufficient for preserving context.

9. **Storage**: Qdrant Cloud free tier (or paid tier) provides sufficient storage for ~2,500 chunks × 768 dimensions × 4 bytes = ~7.5 MB of vector data.

10. **Environment**: The backend runs on a machine with Python 3.11+ and has internet access for API calls to Gemini and Qdrant Cloud.

## Constraints

- **Python Version**: Must use Python 3.11+ for modern type hints and performance improvements.

- **Dependencies**: Must use the specified packages:
  - `openai-agents` (for LLM agent orchestration)
  - `fastapi` + `uvicorn` (API framework)
  - `pydantic` (data validation)
  - `qdrant-client` (vector database client)
  - `python-dotenv` (environment variable management)
  - Development tools: `ruff`, `black`, `mypy`, `pytest`

- **Environment Variables**: All API keys (`GEMINI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`) MUST be loaded from `.env` file or system environment - no hardcoding.

- **Idempotency**: The ingestion script MUST be idempotent - running it multiple times must not duplicate or corrupt existing embeddings.

- **Future-Proofing**: The system must handle future chapters (e.g., Chapter 29, Chapter 30) without code changes - only configuration updates (if any).

- **Code Quality**: All code must pass `ruff` linting, `black` formatting, and `mypy` type checking before deployment.

- **Testing**: The `tests/` directory must contain at least 3 test files covering embedding generation, RAG retrieval, and chunking logic.

## Dependencies

- **Frontend Textbook Content**: The backend depends on the Docusaurus-based textbook content in `frontend/docs/` being available and properly formatted.

- **Qdrant Cloud Service**: The system depends on Qdrant Cloud being operational and accessible. If Qdrant is down, the entire RAG system is unavailable.

- **Gemini API**: The system depends on Gemini API (accessed via OpenAI SDK) for embedding generation and LLM responses. API outages or rate limit issues will block queries.

- **OpenAI Agents SDK**: The system depends on the `openai-agents` library for agent orchestration. Documentation from context7 MCP tools should be consulted before implementation.

- **FastAPI Framework**: The API layer depends on FastAPI and Uvicorn for serving HTTP endpoints.

## Out of Scope

- **User Authentication**: No user login, session management, or personalized query history in V1.

- **Frontend UI**: This spec covers only the backend. The frontend ChatKit SDK integration is a separate feature.

- **Multi-Language Support**: Only English queries and content are supported in V1.

- **Advanced RAG Techniques**: No hybrid search (keyword + semantic), re-ranking, or query expansion in V1 - simple semantic search only.

- **Real-Time Updates**: Content ingestion is triggered manually via CLI script - no automatic file watching or real-time sync.

- **Analytics/Monitoring**: No query analytics, usage tracking, or performance monitoring dashboards in V1.

- **Content Moderation**: No filtering of inappropriate queries or responses - assumes educational use case.

- **Conversation History**: Each query is independent - no multi-turn conversations or context retention across queries in V1.
