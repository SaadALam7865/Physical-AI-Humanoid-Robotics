# Physical AI & Humanoid Robotics Interactive Textbook

## 1. Project Overview
### What It Does
An interactive educational platform combining a Docusaurus-based textbook with a RAG-powered chatbot for learning Physical AI, ROS 2, and humanoid robotics. Users can read chapters, select text, and ask questions to the AI chatbot which retrieves relevant content from the textbook.

### Problem It Solves
- Traditional robotics textbooks lack interactivity and real-time assistance
- Students struggle with complex ROS 2 concepts without immediate help
- No existing platform combines comprehensive content with intelligent Q&A
- Learning robotics requires both theory (textbook) and practical guidance (chatbot)

---

## 2. Technology Stack

### Frontend
- **Framework**: Docusaurus 3.x (TypeScript)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Chat Interface**: ChatKit SDK
- **Deployment**: GitHub Pages

### Backend
- **API Framework**: FastAPI (Python 3.11+)
- **Database**: Neon Postgres (user sessions, metadata)
- **Vector Database**: Qdrant Cloud (embeddings storage)
- **Authentication**: better-auth

### AI/ML Stack
- **LLM**: Gemini API (via OpenAI SDK wrapper)
- **Embeddings**: text-embedding-004 (768 dimensions)
- **Agent Framework**: openai-agents SDK
- **Tools**: context7 MCP tools

### Development Tools
- **Language**: TypeScript (frontend), Python 3.11+ (backend)
- **Package Managers**: npm (frontend), uv (backend)
- **Linting**: ESLint + Prettier (TS), Ruff + Black (Python)
- **Testing**: Jest (frontend), pytest (backend)
- **Version Control**: Git with Conventional Commits

---

## 3. Directory Structure
### Structure
```
physical-ai-textbook/
│
├── frontend/                      # All user-facing code
│   ├── docs/                      # Educational content (MDX chapters)
│   │   ├── module-1/              # Introduction to Physical AI & ROS 2
│   │   ├── module-2/              # Perception & Sensors
│   │   ├── module-3/              # Motion Planning
│   │   └── module-4/              # Simulation
│   ├── src/
│   │   ├── components/            # React components
│   │   │   └── ChatInterface.tsx  # ChatKit SDK integration
│   │   ├── css/                   # Styling (Tailwind + custom)
│   │   └── pages/                 # Landing page, about, etc.
│   ├── static/                    # Images, assets
│   ├── docusaurus.config.ts       # Docusaurus configuration
│   ├── package.json               # npm dependencies
│   ├── tsconfig.json              # TypeScript config
│   └── .env.local.example         # Frontend env vars template
│
├── backend/                       # All server-side code
│   ├── app/
│   │   ├── main.py                # FastAPI application entry
│   │   ├── rag/                   # RAG system
│   │   │   └── (chunking, embeddings, retrieval)
│   │   ├── auth/                  # Authentication routes
│   │   │   └── (better-auth integration)
│   │   ├── db/                    # Database connections
│   │   │   └── (Neon Postgres, Qdrant clients)
│   │   └── models/                # Pydantic models
│   ├── tests/                     # Backend tests (pytest)
│   ├── requirements.txt           # uv dependencies
│   └── .env.example               # Backend env vars template
│
├── .specify/                      # Spec-Kit Plus methodology artifacts
│   ├── memory/                    # Constitution and project context
│   ├── specs/                     # Feature specifications
│   ├── plans/                     # Implementation plans
│   └── tasks/                     # Task breakdowns
│
├── .claude/                       # Reusable intelligence library
│   ├── subagents/                 # Extracted subagents (P+Q+P)
│   └── skills/                    # Extracted skills
│
├── history/                       # Project memory and decisions
│   ├── adr/                       # Architecture Decision Records
│   └── prompts/                   # Prompt History Records (PHRs)
│
├── .gitignore                     # Git ignore rules
├── claude.md                      # This file
└── README.md                      # Project documentation
```

---

## 4. Coding Conventions

### TypeScript (Frontend)
- **Mode**: Strict mode enabled (`"strict": true`)
- **Types**: No `any` types; use `unknown` if type is truly unknown
- **Naming**: 
  - Components: PascalCase (`ChatInterface.tsx`)
  - Functions: camelCase (`fetchRagAnswer()`)
  - Constants: UPPER_SNAKE_CASE (`MAX_QUERY_LENGTH`)
- **Documentation**: JSDoc comments for all exported functions
- **Imports**: Absolute imports using `@/` alias
- **Formatting**: Prettier (2 spaces, single quotes, trailing commas)

### Python (Backend)
- **Version**: Python 3.11+ (for type hints improvements)
- **Async**: Async-first design (all I/O operations use `async/await`)
- **Type Hints**: Required for all function signatures
- **Naming**:
  - Functions: snake_case (`generate_embeddings()`)
  - Classes: PascalCase (`RagQueryService`)
  - Constants: UPPER_SNAKE_CASE (`EMBEDDING_MODEL`)
- **Documentation**: Docstrings (Google style) for all public functions
- **Formatting**: Black (line length 88), Ruff for linting
- **Error Handling**: Use HTTPException with proper status codes

### Docusaurus Content (MDX)
- **Word Count**: 800-1000 words per chapter
- **Code Examples**: Must be complete, runnable, include all imports
- **Structure**: Learning objectives → Concepts → Code → Exercises → Summary
- **Diagrams**: Use Mermaid syntax for architecture diagrams
- **Terminology**: Define acronyms on first use (e.g., "ROS 2 - Robot Operating System 2")

### Git Workflow
- **Commits**: Conventional Commits format (`feat:`, `fix:`, `chore:`, `docs:`)
- **Branches**: `feature/<feature-name>` (e.g., `feature/rag-chunking`)
- **Constitution First**: `.specify/memory/constitution.md` committed before any features
- **Feature Workflow**: spec → clarify → plan → tasks → implement → commit

---


## 5. Key Commands

### Frontend (Docusaurus)
```bash
cd frontend

# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm start

# Build for production
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint

# Deploy to GitHub Pages
npm run deploy
```

### Backend (FastAPI)
```bash
cd backend

# Create virtual environment
uv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
uv add -r requirements.txt

# Run development server (http://localhost:8000)
uvicorn app.main:app --reload

# Run tests
pytest

# Type checking
mypy app/

# Format code
black app/
ruff check app/
```

### Full Stack Development
```bash
# Terminal 1: Frontend
cd frontend && npm start

# Terminal 2: Backend
cd backend && source venv/bin/activate && uvicorn app.main:app --reload

# Terminal 3: Tests
cd backend && pytest --watch
```


### Testing
```bash
# Frontend unit tests
npm test

# Backend unit tests
pytest tests/unit/

# Integration tests
pytest tests/integration/

# E2E tests
npm run test:e2e

# RAG accuracy validation
python backend/tests/validate_rag_accuracy.py
```

---

## 6. Important Notes

### Environment Variables
**CRITICAL**: Never commit API keys! All secrets in `.env.local` (frontend) and `.env` (backend):
```bash
# Backend .env (example)
GEMINI_API_KEY=your_gemini_key_here
QDRANT_URL=https://your-cluster.qdrant.io
QDRANT_API_KEY=your_qdrant_key
NEON_DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=your_secret_key

# Frontend .env.local (example)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### API Rate Limits
- **Gemini API**: Free tier has rate limits; batch embed requests
- **Qdrant Cloud**: Free tier: 1GB storage, monitor usage
- **Better-Auth**: Rate limit authentication endpoints (30 req/min per IP)

### Embeddings Configuration
- **Model**: Use `text-embedding-004` (NOT `gemini-embedding-001`)
- **Dimensions**: 768 (configure Qdrant collection accordingly)
- **Gemini API via OpenAI SDK**:
```python
  client = OpenAI(
      api_key=GEMINI_API_KEY,
      base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
  )
  response = client.embeddings.create(
      model="text-embedding-004",
      input="your text"
  )
```

### RAG Chunking Strategy
- **Preserve code blocks**: Don't split code examples across chunks
- **Semantic boundaries**: Chunk at section headers, not arbitrary character counts
- **Metadata**: Store `{module, chapter, section}` with each chunk for citation
- **Chunk size**: ~500-800 tokens with 100-token overlap

### Mobile Responsiveness
- **Viewport**: Test at 375px width minimum
- **Chat interface**: Must be usable on mobile
- **Code examples**: Horizontal scroll for long code, not overflow hidden

### Security Considerations
- **Input sanitization**: User queries limited to 500 characters
- **CORS**: Whitelist only production domains (not `*`)
- **better-auth sessions**: httpOnly cookies, encrypted
- **No sensitive data in logs**: Sanitize before logging user queries

### Intelligence Extraction
- Extract subagents/skills AFTER implementing 3+ features (patterns emerge from real work)
- **Subagents**: Use Persona+Questions+Principles pattern
- **Skills**: Reference Constitution for quality standards
- Store in `.claude/subagents/` and `.claude/skills/` directories

### Deployment
- **GitHub Pages**: Build happens in GitHub Actions
- **Backend**: Deploy to free tier (Railway, Render, or Fly.io)
- **Environment**: Production `.env` files on hosting platform
- **CORS**: Update `allowed_origins` in FastAPI for production domain

---

## Current Status
**Phase**: Constitution Creation  
**Next Step**: Run `/sp.constitution` to establish project-wide quality standards

## Project Goals
- 3 to 4 complete chapters (Module 1: Physical AI & ROS 2 fundamentals)
- RAG chatbot with text selection feature
- User authentication system
- Production deployment (GitHub Pages + backend hosting)
- Reusable intelligence library (subagents/skills)