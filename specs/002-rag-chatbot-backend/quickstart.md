# Quickstart: RAG Chatbot Backend

**Feature**: 002-rag-chatbot-backend
**Audience**: Developers implementing or testing the RAG chatbot backend
**Last Updated**: 2025-11-30

## Prerequisites

- Python 3.11+ installed
- `uv` package manager installed (`pip install uv`)
- Git repository cloned
- Environment variables configured (see Setup section)

## Setup

### 1. Environment Configuration

Create `.env` file in the `backend/` directory:

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your API keys:

```bash
# Gemini API (for embeddings and LLM)
GEMINI_API_KEY=your_gemini_api_key_here

# Qdrant Cloud (vector database)
QDRANT_URL=https://your-cluster.qdrant.io
QDRANT_API_KEY=your_qdrant_api_key_here
```

**How to get API keys**:
- **Gemini API**: Visit https://makersuite.google.com/app/apikey
- **Qdrant Cloud**: Sign up at https://cloud.qdrant.io/ and create a free cluster

### 2. Install Dependencies

```bash
cd backend

# Create virtual environment
uv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
uv pip install -r requirements.txt
```

Expected dependencies:
- `openai-agents` - LLM agent orchestration
- `fastapi` + `uvicorn` - API framework
- `pydantic` - Data validation
- `qdrant-client` - Vector database client
- `python-dotenv` - Environment variables
- `python-frontmatter` - MDX parsing
- `tiktoken` - Token counting
- Development: `ruff`, `black`, `mypy`, `pytest`

## Usage

### Step 1: Ingest Textbook Content (CLI)

Run the ingestion script to process MDX files and store embeddings in Qdrant:

```bash
# From backend/ directory
python -m app.ingest
```

**Expected Output**:
```
Processing frontend/docs/01-part-1-foundations-lab/01-chapter-1-embodied-ai/...
  01-digital-vs-physical-ai.mdx: 12 chunks created
  02-sensorimotor-loop.mdx: 8 chunks created
  03-hardware-mandate.mdx: 6 chunks created
...
Total files processed: 14
Total chunks created: 247
Errors: []
Exit code: 0
```

**Idempotency**: Re-running this script with unchanged content will NOT create duplicates. Only new or modified files will be re-processed.

**Error Handling**: If errors occur (e.g., malformed MDX, API failures), they will be logged and the script will continue processing remaining files. Exit code will be non-zero.

### Step 2: Start FastAPI Server

Launch the development server:

```bash
# From backend/ directory
uvicorn app.main:app --reload
```

**Expected Output**:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [12345] using StatReload
INFO:     Started server process [12346]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

**API Documentation**: Visit http://localhost:8000/docs for interactive Swagger UI

### Step 3: Query the Chatbot

#### Option A: Using cURL

```bash
# Basic query
curl -X POST http://localhost:8000/api/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is embodied intelligence?"
  }'

# Contextual query with selected text
curl -X POST http://localhost:8000/api/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "How does this hardware work?",
    "selected_text": "NVIDIA Jetson Orin Nano"
  }'
```

#### Option B: Using FastAPI Swagger UI

1. Navigate to http://localhost:8000/docs
2. Expand the `POST /api/query` endpoint
3. Click "Try it out"
4. Enter query in the request body:
   ```json
   {
     "query": "What is the difference between ROS 1 and ROS 2?",
     "selected_text": null
   }
   ```
5. Click "Execute"
6. View response with answer and source citations

#### Option C: Using Python

```python
import requests

response = requests.post(
    "http://localhost:8000/api/query",
    json={
        "query": "Explain VSLAM in ROS 2",
        "selected_text": None
    }
)

result = response.json()
print("Answer:", result["answer"])
print("\nSources:")
for source in result["sources"]:
    print(f"  - {source['chapter']} / {source['section']} (score: {source['score']:.2f})")
```

**Expected Response**:
```json
{
  "answer": "Embodied intelligence refers to AI systems that interact with the physical world through sensors and actuators...",
  "sources": [
    {
      "chapter": "Chapter 1: Embodied Intelligence",
      "section": "01-digital-vs-physical-ai",
      "filename": "01-digital-vs-physical-ai.mdx",
      "score": 0.92
    },
    {
      "chapter": "Chapter 1: Embodied Intelligence",
      "section": "02-sensorimotor-loop",
      "filename": "02-sensorimotor-loop.mdx",
      "score": 0.87
    }
  ]
}
```

## Running Tests

### Unit Tests

```bash
# From backend/ directory
pytest tests/test_embeddings.py -v
pytest tests/test_chunking.py -v
```

### Integration Tests

```bash
pytest tests/test_rag_retrieval.py -v
pytest tests/test_ingest_cli.py -v
```

### All Tests

```bash
pytest tests/ -v
```

**Expected Output**:
```
tests/test_embeddings.py::test_embedding_generation PASSED
tests/test_embeddings.py::test_embedding_dimension PASSED
tests/test_chunking.py::test_code_block_preservation PASSED
tests/test_chunking.py::test_semantic_boundaries PASSED
tests/test_rag_retrieval.py::test_query_embodied_intelligence PASSED
tests/test_ingest_cli.py::test_cli_execution PASSED

======================== 6 passed in 12.34s ========================
```

## Code Quality Checks

### Type Checking

```bash
mypy app/
```

### Linting

```bash
ruff check app/
```

### Formatting

```bash
black app/
```

## Troubleshooting

### Issue: "GEMINI_API_KEY not set"

**Solution**: Ensure `.env` file exists in `backend/` directory and contains valid API key.

```bash
# Verify .env file
cat backend/.env | grep GEMINI_API_KEY
```

### Issue: "Qdrant connection failed"

**Solution**:
1. Verify Qdrant Cloud cluster is running
2. Check `QDRANT_URL` and `QDRANT_API_KEY` in `.env`
3. Test connection:
   ```python
   from qdrant_client import QdrantClient
   import os

   client = QdrantClient(
       url=os.getenv("QDRANT_URL"),
       api_key=os.getenv("QDRANT_API_KEY")
   )
   print(client.get_collections())
   ```

### Issue: "Rate limit exceeded"

**Solution**: Gemini API free tier has rate limits (60 req/min). Wait a moment and retry.

### Issue: "Query response too slow (>3 seconds)"

**Possible Causes**:
1. Qdrant cluster is in a different region (high latency)
2. Gemini API is slow (check https://status.cloud.google.com/)
3. Query embedding generation is blocking other requests

**Solution**: Monitor logs for bottlenecks. Consider upgrading Qdrant cluster or Gemini API tier.

### Issue: "No chunks found for query"

**Possible Causes**:
1. Ingestion script not run (Qdrant collection empty)
2. Query is semantically unrelated to textbook content
3. Embedding model mismatch

**Solution**:
1. Verify Qdrant collection has data:
   ```python
   from qdrant_client import QdrantClient
   client = QdrantClient(url=..., api_key=...)
   print(client.get_collection("physical-ai-textbook-v1"))
   ```
2. Try a query directly related to textbook content (e.g., "What is ROS 2?")

## Next Steps

1. **Run RAG Accuracy Validation**: Use 50 test queries to verify 90% accuracy (SC-002)
2. **Implement Frontend Integration**: Connect ChatKit SDK to `POST /api/query` endpoint (separate feature)
3. **Deploy to Production**: Deploy FastAPI backend to Railway/Render/Fly.io
4. **Monitor Performance**: Track query response times and Qdrant storage usage

## Reference

- **Spec**: [spec.md](./spec.md)
- **Plan**: [plan.md](./plan.md)
- **Data Model**: [data-model.md](./data-model.md)
- **API Contract**: [contracts/api-openapi.yaml](./contracts/api-openapi.yaml)
- **Research**: [research.md](./research.md)
