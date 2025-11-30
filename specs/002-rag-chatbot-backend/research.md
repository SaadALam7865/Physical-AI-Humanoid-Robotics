# Research: RAG Chatbot Backend

**Feature**: 002-rag-chatbot-backend
**Date**: 2025-11-30
**Phase**: 0 (Outline & Research)

## Purpose

Resolve all "NEEDS CLARIFICATION" items from Technical Context and research best practices for key technology choices before Phase 1 design.

## Research Tasks

### 1. OpenAI Agents SDK with Gemini API

**Question**: How to use `openai-agents` SDK with Gemini API for RAG answer generation?

**Decision**: Use `openai-agents` SDK with Gemini API via OpenAI-compatible base URL

**Rationale**:
- Gemini API provides OpenAI-compatible endpoint: `https://generativelanguage.googleapis.com/v1beta/openai/`
- The `openai-agents` SDK can use any OpenAI-compatible API by configuring `base_url`
- This approach allows using Gemini models (e.g., `gemini-1.5-pro`) with the agents SDK
- Constitution requirement: Must use context7 MCP tools to fetch latest documentation before implementation

**Implementation Pattern**:
```python
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# For embeddings
response = client.embeddings.create(
    model="text-embedding-004",
    input="text to embed"
)

# For chat completions (agents)
response = client.chat.completions.create(
    model="gemini-1.5-pro",
    messages=[{"role": "user", "content": "prompt with RAG context"}]
)
```

**Alternatives Considered**:
- Direct Gemini SDK: Rejected because `openai-agents` is specified in constraints
- LangChain: Rejected because spec explicitly requires `openai-agents` SDK
- Custom agent implementation: Rejected due to YAGNI principle and spec requirement

**Action Items**:
- Use context7 MCP tools during implementation to fetch latest `openai-agents` documentation
- Verify Gemini API compatibility with agents SDK during Red phase

---

### 2. MDX Content Parsing Best Practices

**Question**: How to parse MDX files while preserving metadata and structure?

**Decision**: Use Python `frontmatter` library + regex for MDX-specific components

**Rationale**:
- MDX files = Markdown + YAML frontmatter + JSX components
- `python-frontmatter` library handles YAML metadata extraction cleanly
- Content after frontmatter is standard Markdown (code blocks, headers, paragraphs)
- No need to parse JSX components - they're React-specific and can be stripped or ignored during chunking
- Preserves chapter/section metadata for citations (FR-005)

**Implementation Pattern**:
```python
import frontmatter
from pathlib import Path

def parse_mdx_file(file_path: Path) -> dict:
    with open(file_path, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)

    return {
        "metadata": post.metadata,  # YAML frontmatter as dict
        "content": post.content,    # Raw markdown content
        "filename": file_path.name
    }
```

**Alternatives Considered**:
- Full MDX parser (mdx-js): Rejected because Python implementation needed, overkill for content extraction
- BeautifulSoup HTML parsing: Rejected because MDX is not HTML
- Regular expressions only: Rejected because frontmatter parsing is complex

**Dependencies**:
- `python-frontmatter`: Add to requirements.txt

---

### 3. Semantic Chunking Strategy

**Question**: How to chunk at semantic boundaries while respecting code blocks and token limits?

**Decision**: Recursive character splitter with code-aware boundaries

**Rationale**:
- Constitution requirement: Code blocks MUST NOT be split (FR-003)
- Semantic boundaries: Section headers (`##`, `###`), paragraph breaks
- Token counting required: Use `tiktoken` library (OpenAI's tokenizer)
- Overlap ensures context preservation across chunks (100 tokens as specified)

**Implementation Pattern**:
```python
import tiktoken
import re

def chunk_mdx_content(content: str, max_tokens: int = 800, overlap_tokens: int = 100) -> list[str]:
    # 1. Extract code blocks first (preserve them)
    code_blocks = extract_code_blocks(content)  # Store separately
    content_without_code = remove_code_blocks(content)

    # 2. Split by semantic boundaries (headers, paragraphs)
    sections = re.split(r'\n(?=##)', content_without_code)  # Split on headers

    # 3. Combine sections into chunks respecting token limit
    chunks = []
    current_chunk = []
    current_tokens = 0

    encoder = tiktoken.encoding_for_model("gpt-4")  # Compatible with text-embedding-004

    for section in sections:
        section_tokens = len(encoder.encode(section))

        if current_tokens + section_tokens > max_tokens:
            # Finalize current chunk
            chunks.append("\n".join(current_chunk))
            # Start new chunk with overlap
            current_chunk = [section]
            current_tokens = section_tokens
        else:
            current_chunk.append(section)
            current_tokens += section_tokens

    # 4. Re-insert code blocks into appropriate chunks
    # (implementation detail: match by context)

    return chunks
```

**Alternatives Considered**:
- Fixed character count: Rejected because tokens != characters (multilingual content)
- LangChain text splitters: Rejected to minimize dependencies (YAGNI)
- Sentence-based splitting: Rejected because loses semantic structure (headers)

**Dependencies**:
- `tiktoken`: Add to requirements.txt for token counting

---

### 4. Qdrant Collection Configuration

**Question**: What's the optimal Qdrant collection configuration for 768-dim embeddings?

**Decision**: Single collection with cosine similarity and HNSW index

**Rationale**:
- Vector dimension: 768 (text-embedding-004 output)
- Distance metric: Cosine similarity (standard for embeddings)
- Index type: HNSW (Hierarchical Navigable Small World) - Qdrant default, good balance of speed/accuracy
- Payload indexing: Index `chapter`, `section`, `filename` for filtered searches (future enhancement)

**Implementation Pattern**:
```python
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

client = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY")
)

# Create collection if not exists
collection_name = "physical-ai-textbook-v1"

client.recreate_collection(
    collection_name=collection_name,
    vectors_config=VectorParams(
        size=768,
        distance=Distance.COSINE
    )
)
```

**Alternatives Considered**:
- Euclidean distance: Rejected because cosine is standard for embeddings
- Multiple collections per chapter: Rejected due to YAGNI (single collection sufficient)
- Manual indexing: Rejected because HNSW is Qdrant default and proven

**Dependencies**:
- `qdrant-client`: Already in requirements.txt

---

### 5. Content Hash for Idempotency

**Question**: How to ensure ingestion script is idempotent?

**Decision**: SHA-256 hash of chunk content + metadata as unique ID

**Rationale**:
- Qdrant allows custom point IDs
- SHA-256 hash of (chapter + section + chunk_index + content) creates deterministic ID
- Re-running ingestion with unchanged content results in same ID → Qdrant upserts (no duplicates)
- Changed content generates new hash → automatic update

**Implementation Pattern**:
```python
import hashlib
import json

def generate_chunk_id(chapter: str, section: str, chunk_index: int, content: str) -> str:
    # Create deterministic ID from metadata + content
    data = {
        "chapter": chapter,
        "section": section,
        "chunk_index": chunk_index,
        "content": content
    }
    # Sort keys for deterministic JSON serialization
    json_str = json.dumps(data, sort_keys=True)
    return hashlib.sha256(json_str.encode()).hexdigest()
```

**Alternatives Considered**:
- UUIDs: Rejected because non-deterministic (creates duplicates on re-run)
- Sequential IDs: Rejected because doesn't detect content changes
- Filename + line numbers: Rejected because fragile (line numbers change with edits)

**Dependencies**:
- Standard library (`hashlib`, `json`): No additional dependencies

---

### 6. FastAPI Async Best Practices

**Question**: How to structure FastAPI routes with async Qdrant and Gemini API calls?

**Decision**: Async route handlers with dependency injection for clients

**Rationale**:
- Constitution requirement: Async-first design (Principle IV)
- Dependency injection allows easy testing (mock clients)
- Connection pooling handled by `qdrant-client` and `openai` SDKs
- FastAPI natively supports async def routes

**Implementation Pattern**:
```python
from fastapi import FastAPI, Depends
from app.db.qdrant_client import get_qdrant_client
from app.rag.embeddings import get_embedding_client

app = FastAPI()

@app.post("/api/query")
async def query_rag(
    request: QueryRequest,
    qdrant=Depends(get_qdrant_client),
    embedding_client=Depends(get_embedding_client)
):
    # All I/O operations are async
    query_embedding = await embedding_client.embed(request.query)
    search_results = await qdrant.search(query_embedding)
    answer = await generate_answer(search_results, request.query)

    return QueryResponse(answer=answer, sources=search_results)
```

**Alternatives Considered**:
- Synchronous routes: Rejected due to constitution requirement (async-first)
- Thread pools for blocking calls: Rejected because modern libs support async
- Manual connection management: Rejected because SDKs handle pooling

**Dependencies**:
- `fastapi`, `uvicorn`: Already in requirements.txt

---

### 7. Error Handling Strategy

**Question**: How to handle API failures (Gemini, Qdrant) gracefully?

**Decision**: Structured exception handling with retries for transient errors

**Rationale**:
- Gemini API: Rate limits, timeouts → retry with exponential backoff
- Qdrant: Network errors → retry, persistent errors → fail fast with HTTPException
- Constitution requirement: Graceful degradation (Principle VII)
- Structured logging (JSON) for debugging (Principle IX)

**Implementation Pattern**:
```python
import asyncio
from fastapi import HTTPException
import logging

logger = logging.getLogger(__name__)

async def embed_with_retry(text: str, max_retries: int = 3) -> list[float]:
    for attempt in range(max_retries):
        try:
            response = await embedding_client.embeddings.create(
                model="text-embedding-004",
                input=text
            )
            return response.data[0].embedding
        except RateLimitError:
            if attempt < max_retries - 1:
                wait_time = 2 ** attempt  # Exponential backoff
                logger.warning(f"Rate limit hit, retrying in {wait_time}s")
                await asyncio.sleep(wait_time)
            else:
                raise HTTPException(status_code=429, detail="Rate limit exceeded")
        except APIError as e:
            logger.error(f"Embedding API error: {e}")
            raise HTTPException(status_code=500, detail="Embedding service unavailable")
```

**Alternatives Considered**:
- No retries: Rejected because transient errors are common
- Infinite retries: Rejected because can cause request timeouts
- Circuit breaker pattern: Rejected as over-engineering for V1 (YAGNI)

**Dependencies**:
- Standard library (`asyncio`, `logging`): No additional dependencies

---

## Summary

All NEEDS CLARIFICATION items resolved. Key decisions made:

1. **OpenAI Agents SDK**: Use Gemini API via OpenAI-compatible base URL; fetch docs via context7 during implementation
2. **MDX Parsing**: `python-frontmatter` + basic regex for content extraction
3. **Chunking**: Recursive semantic splitter with `tiktoken`, code-block-aware
4. **Qdrant**: Single collection, cosine similarity, HNSW index, 768 dimensions
5. **Idempotency**: SHA-256 content hash as Qdrant point ID
6. **FastAPI**: Async route handlers with dependency injection
7. **Error Handling**: Retry with exponential backoff for transient errors

**Additional Dependencies Identified**:
- `python-frontmatter` - MDX metadata parsing
- `tiktoken` - Token counting for chunking

**Ready to proceed to Phase 1 (Design & Contracts).**
