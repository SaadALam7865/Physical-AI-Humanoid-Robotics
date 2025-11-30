# Data Model: RAG Chatbot Backend

**Feature**: 002-rag-chatbot-backend
**Date**: 2025-11-30
**Phase**: 1 (Design & Contracts)

## Overview

This document defines the data structures for the RAG chatbot backend system. All entities are implemented as Pydantic models with strict type validation (FR-017).

## Core Entities

### 1. Chunk

**Purpose**: Represents a semantically coherent piece of textbook content with associated metadata for storage in Qdrant vector database.

**Source**: Spec Key Entities section

**Attributes**:

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `id` | `str` | Yes | SHA-256 hash (64 hex chars) | Unique identifier generated from content hash |
| `embedding` | `list[float]` | Yes | Length = 768 | 768-dimensional vector from text-embedding-004 |
| `text` | `str` | Yes | Max 800 tokens | Original chunk content |
| `chapter` | `str` | Yes | Non-empty string | Chapter identifier (e.g., "Chapter 1: Embodied Intelligence") |
| `section` | `str` | Yes | Non-empty string | Section identifier (e.g., "01-digital-vs-physical-ai") |
| `filename` | `str` | Yes | Valid filename | Source filename (e.g., "01-digital-vs-physical-ai.mdx") |
| `chunk_index` | `int` | Yes | >= 0 | Sequential index within source file (0, 1, 2, ...) |
| `content_hash` | `str` | Yes | SHA-256 hash | Hash for deduplication and idempotency |

**Relationships**:
- Belongs to one source file (MDX document in `frontend/docs/`)
- Multiple chunks can reference the same chapter/section
- Used by SearchResult entity for query responses

**State Transitions**: None (immutable after creation)

**Validation Rules**:
- `embedding` must have exactly 768 elements (float32)
- `chunk_index` must be unique within a source file
- `content_hash` is derived from (chapter + section + chunk_index + text)
- `text` must not be empty
- `id` is deterministic based on content (ensures idempotency)

**Pydantic Model Outline**:
```python
from pydantic import BaseModel, Field, field_validator

class Chunk(BaseModel):
    id: str = Field(..., min_length=64, max_length=64)
    embedding: list[float] = Field(..., min_length=768, max_length=768)
    text: str = Field(..., min_length=1, max_length=10000)
    chapter: str = Field(..., min_length=1)
    section: str = Field(..., min_length=1)
    filename: str = Field(..., min_length=1)
    chunk_index: int = Field(..., ge=0)
    content_hash: str = Field(..., min_length=64, max_length=64)

    @field_validator('embedding')
    def validate_embedding_dimension(cls, v):
        if len(v) != 768:
            raise ValueError('Embedding must have exactly 768 dimensions')
        return v
```

---

### 2. Query

**Purpose**: Represents a user's question or text selection with associated context for RAG retrieval.

**Source**: Spec Key Entities section

**Attributes**:

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `query_text` | `str` | Yes | Max 500 words | The user's question |
| `selected_text` | `str | None` | No | Max 200 words | Highlighted text from the book (optional) |
| `timestamp` | `datetime` | Yes | Valid datetime | When the query was made (UTC) |

**Relationships**:
- Produces one AgentResponse
- References multiple SearchResults (top 5 chunks)

**State Transitions**: None (immutable after creation)

**Validation Rules**:
- `query_text` cannot be empty
- `query_text` word count <= 500 (FR-009)
- `selected_text` word count <= 200 if provided (FR-015)
- `timestamp` defaults to current UTC time

**Pydantic Model Outline**:
```python
from datetime import datetime
from pydantic import BaseModel, Field, field_validator

class Query(BaseModel):
    query_text: str = Field(..., min_length=1)
    selected_text: str | None = Field(default=None)
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    @field_validator('query_text')
    def validate_query_length(cls, v):
        word_count = len(v.split())
        if word_count > 500:
            raise ValueError(f'Query exceeds 500 words (has {word_count})')
        return v

    @field_validator('selected_text')
    def validate_selected_text_length(cls, v):
        if v is not None:
            word_count = len(v.split())
            if word_count > 200:
                raise ValueError(f'Selected text exceeds 200 words (has {word_count})')
        return v
```

---

### 3. SearchResult

**Purpose**: Represents retrieved chunks with similarity scores from Qdrant vector search.

**Source**: Spec Key Entities section

**Attributes**:

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `chunk` | `Chunk` | Yes | Valid Chunk entity | Reference to the retrieved Chunk |
| `score` | `float` | Yes | 0.0 <= score <= 1.0 | Cosine similarity score |
| `rank` | `int` | Yes | 1 <= rank <= 5 | Position in search results |

**Relationships**:
- References one Chunk entity
- Multiple SearchResults produced per Query (top 5)
- Consumed by AgentResponse for context building

**State Transitions**: None (immutable after retrieval)

**Validation Rules**:
- `score` must be between 0.0 and 1.0 (cosine similarity range)
- `rank` must be between 1 and 5 (top 5 results as per FR-011)
- `chunk` must be a valid Chunk entity with all required fields

**Pydantic Model Outline**:
```python
from pydantic import BaseModel, Field

class SearchResult(BaseModel):
    chunk: Chunk
    score: float = Field(..., ge=0.0, le=1.0)
    rank: int = Field(..., ge=1, le=5)
```

---

### 4. AgentResponse

**Purpose**: LLM-generated answer with source citations produced by OpenAI Agents.

**Source**: Spec Key Entities section

**Attributes**:

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `answer` | `str` | Yes | Non-empty string | Generated text response |
| `sources` | `list[Source]` | Yes | 1-5 elements | Array of source citations |
| `model_used` | `str` | Yes | Non-empty string | Model identifier (e.g., "gemini-1.5-pro") |
| `latency` | `int` | Yes | >= 0 | Time to generate answer (milliseconds) |

**Nested Entity: Source**

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `chapter` | `str` | Yes | Non-empty | Chapter title |
| `section` | `str` | Yes | Non-empty | Section identifier |
| `filename` | `str` | Yes | Non-empty | Source file name |
| `score` | `float` | Yes | 0.0 <= score <= 1.0 | Relevance score from search |

**Relationships**:
- Produced by one Query
- References multiple SearchResults via sources array

**State Transitions**: None (immutable after generation)

**Validation Rules**:
- `answer` cannot be empty
- `sources` must have 1-5 elements (top 5 chunks as per FR-011, but can be fewer if less relevant)
- `latency` measured in milliseconds
- `model_used` should match Gemini model name

**Pydantic Model Outline**:
```python
from pydantic import BaseModel, Field

class Source(BaseModel):
    chapter: str = Field(..., min_length=1)
    section: str = Field(..., min_length=1)
    filename: str = Field(..., min_length=1)
    score: float = Field(..., ge=0.0, le=1.0)

class AgentResponse(BaseModel):
    answer: str = Field(..., min_length=1)
    sources: list[Source] = Field(..., min_length=1, max_length=5)
    model_used: str = Field(..., min_length=1)
    latency: int = Field(..., ge=0)
```

---

## API Request/Response Models

### QueryRequest (API Input)

**Purpose**: Request payload for `POST /api/query` endpoint.

**Source**: FR-015

**Attributes**:

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `query` | `str` | Yes | Max 500 words | User's question |
| `selected_text` | `str | None` | No | Max 200 words | Optional highlighted text |

**Pydantic Model Outline**:
```python
class QueryRequest(BaseModel):
    query: str = Field(..., min_length=1)
    selected_text: str | None = Field(default=None)

    @field_validator('query')
    def validate_query_length(cls, v):
        word_count = len(v.split())
        if word_count > 500:
            raise ValueError(f'Query exceeds 500 words (has {word_count})')
        return v

    @field_validator('selected_text')
    def validate_selected_text_length(cls, v):
        if v is not None:
            word_count = len(v.split())
            if word_count > 200:
                raise ValueError(f'Selected text exceeds 200 words (has {word_count})')
        return v
```

---

### QueryResponse (API Output)

**Purpose**: Response payload for `POST /api/query` endpoint.

**Source**: FR-015

**Attributes**:

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `answer` | `str` | Yes | Non-empty | Generated answer text |
| `sources` | `list[Source]` | Yes | 1-5 elements | Source citations |

**Pydantic Model Outline**:
```python
class QueryResponse(BaseModel):
    answer: str = Field(..., min_length=1)
    sources: list[Source] = Field(..., min_length=1, max_length=5)
```

---

## CLI Output Models

### IngestResult (CLI Output)

**Purpose**: Terminal output structure for ingestion script execution.

**Source**: FR-016 (CLI script requirements)

**Attributes**:

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `files_processed` | `int` | Yes | >= 0 | Count of MDX files processed |
| `chunks_created` | `int` | Yes | >= 0 | Count of chunks generated and stored |
| `errors` | `list[str]` | Yes | Empty or non-empty | Error messages (if any) |
| `exit_code` | `int` | Yes | 0 or non-zero | Script exit code (0 = success) |

**Validation Rules**:
- `exit_code` = 0 if `errors` is empty
- `exit_code` != 0 if `errors` is non-empty
- `files_processed` >= `chunks_created` (sanity check)

**Pydantic Model Outline**:
```python
class IngestResult(BaseModel):
    files_processed: int = Field(..., ge=0)
    chunks_created: int = Field(..., ge=0)
    errors: list[str] = Field(default_factory=list)
    exit_code: int

    @field_validator('exit_code')
    def validate_exit_code(cls, v, values):
        errors = values.get('errors', [])
        if len(errors) > 0 and v == 0:
            raise ValueError('Exit code must be non-zero when errors exist')
        if len(errors) == 0 and v != 0:
            raise ValueError('Exit code must be 0 when no errors exist')
        return v
```

---

## Database Schema (Qdrant)

### Collection: `physical-ai-textbook-v1`

**Configuration**:
- Vector dimension: 768
- Distance metric: Cosine similarity
- Index type: HNSW (default)

**Point Structure**:
```json
{
  "id": "<sha256_hash>",
  "vector": [0.1, 0.2, ..., 0.768],  // 768 floats
  "payload": {
    "text": "Chunk content...",
    "chapter": "Chapter 1: Embodied Intelligence",
    "section": "01-digital-vs-physical-ai",
    "filename": "01-digital-vs-physical-ai.mdx",
    "chunk_index": 0,
    "content_hash": "<sha256_hash>"
  }
}
```

**Indexes**:
- Payload fields `chapter`, `section`, `filename` are indexed for filtered search (future enhancement)
- Vector index is HNSW by default

---

## Entity Relationships Diagram

```text
┌─────────────────┐
│  MDX File       │
│  (frontend/docs)│
└────────┬────────┘
         │
         │ parsed by CLI script
         │
         ▼
┌─────────────────┐       stored in      ┌──────────────┐
│  Chunk          │──────────────────────>│  Qdrant DB   │
│  (Pydantic)     │                       │  Collection  │
└────────┬────────┘                       └──────────────┘
         │
         │ retrieved by
         │
         ▼
┌─────────────────┐       produces       ┌──────────────────┐
│  SearchResult   │<─────────────────────│  Query           │
│  (Pydantic)     │                      │  (API Request)   │
└────────┬────────┘                       └──────────────────┘
         │
         │ passed to OpenAI Agents
         │
         ▼
┌─────────────────┐       returns        ┌──────────────────┐
│  AgentResponse  │──────────────────────>│  QueryResponse   │
│  (Pydantic)     │                       │  (API Output)    │
└─────────────────┘                       └──────────────────┘
```

---

## Summary

**Entities Defined**: 4 core (Chunk, Query, SearchResult, AgentResponse) + 2 API models (QueryRequest, QueryResponse) + 1 CLI model (IngestResult)

**All entities use Pydantic models** for strict type validation (Constitution Principle IV, FR-017).

**Key Design Decisions**:
1. Content hash (SHA-256) as Qdrant point ID ensures idempotency
2. Cosine similarity for vector search (standard for embeddings)
3. Word count validation enforced at Pydantic level
4. Immutable entities (no state transitions) simplifies reasoning
5. Nested Source entity for clean API response structure

**Ready for Phase 1 Contract Generation.**
