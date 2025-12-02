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

### Frontend (`/frontend`)
- **Framework**: Docusaurus 3.x (TypeScript)
- **UI Library**: React 18
- **Styling**: Tailwind CSS, Custom CSS Modules
- **Authentication**: Better Auth Client (React)
- **Deployment**: Vercel

### Backend (`/backend`)
- **API Framework**: FastAPI (Python 3.12+)
- **Vector Database**: Qdrant Cloud (embeddings storage)
- **AI Agents**: openai-agents SDK + Gemini 1.5 Flash
- **Deployment**: Railway

### Auth Service (`/auth-service`)
- **Framework**: Node.js + Express
- **Library**: Better Auth
- **Database**: Neon Serverless PostgreSQL (User data + Profiles)
- **Deployment**: Railway

### AI/ML Stack
- **LLM**: Gemini 1.5 Flash (via OpenAI SDK wrapper)
- **Embeddings**: text-embedding-004 (768 dimensions)
- **Tools**: context7 MCP tools

---

## 3. Directory Structure
```
physical-ai-textbook/
│
├── frontend/                      # Docusaurus User Interface
│   ├── docs/                      # Educational content (MDX)
│   ├── src/
│   │   ├── components/Auth/       # Authentication Components (Modal, Forms)
│   │   ├── lib/                   # API clients (auth-client.ts)
│   │   └── theme/                 # Docusaurus theme customization
│   └── docusaurus.config.ts       # Config
│
├── backend/                       # Python RAG API
│   ├── app/
│   │   ├── agent.py               # AI Agent Logic
│   │   ├── api/                   # FastAPI Routes
│   │   └── services/              # Qdrant/Gemini Services
│   └── scripts/                   # Ingestion scripts
│
├── auth-service/                  # Node.js Authentication Microservice
│   ├── src/
│   │   ├── auth.ts                # Better Auth Config
│   │   ├── db-setup.sql           # Database Schema
│   │   └── index.ts               # Express Server
│   ├── better-auth_migrations/    # SQL Migrations
│   └── package.json
│
├── specs/                         # Project Specifications
└── history/                       # Project History (Prompts/ADRs)
```

---

## 4. Key Commands

### Frontend (Docusaurus)
```bash
cd frontend
npm install
npm start          # Runs on http://localhost:3000
npm run build      # Production build
```

### Auth Service (Node.js)
```bash
cd auth-service
npm install
npm run migrate    # Apply DB schema changes
npm run dev        # Runs on http://localhost:3002
```

### Backend (FastAPI)
```bash
cd backend
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload  # Runs on http://localhost:8000
```

### Full Stack Development (Local)
You need 3 terminals running:
1. `cd auth-service && npm run dev`
2. `cd backend && uvicorn app.main:app --reload`
3. `cd frontend && npm start`

---

## 5. Environment Variables

**CRITICAL**: Never commit `.env` files.

### Auth Service (`auth-service/.env`)
```env
DATABASE_URL=postgresql://neondb_owner:pass@ep-royal-resonance...neon.tech/neondb?sslmode=require
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:3002  # Or https://auth-service.up.railway.app
FRONTEND_URL=http://localhost:3000     # Or https://your-project.vercel.app
PORT=3002
```

### Frontend (`frontend/.env.local`)
```env
REACT_APP_AUTH_URL=http://localhost:3002
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### Backend (`backend/.env`)
```env
GEMINI_API_KEY=...
QDRANT_URL=...
QDRANT_API_KEY=...
AUTH_SERVICE_URL=http://localhost:3002
```

---

## 6. Coding Conventions

### TypeScript (Frontend/Auth)
- **Mode**: Strict mode enabled
- **Styling**: Use CSS Modules (`styles.module.css`) for components to avoid conflicts
- **Imports**: Absolute imports using `@/` alias (configured in `tsconfig.json`)

### Python (Backend)
- **Async**: Async-first design (all I/O operations use `async/await`)
- **Type Hints**: Required for all function signatures
- **Formatting**: Black + Ruff

---

## 7. Deployment Status

| Service | Platform | Status |
|---------|----------|--------|
| **Frontend** | Vercel | 🟢 Active |
| **Backend** | Railway | 🟢 Active |
| **Auth Service** | Railway | 🟢 Active |
| **Database** | Neon | 🟢 Active |
| **Vector DB** | Qdrant | 🟢 Active |

---

## 8. Current Roadmap
- [x] Core Textbook Content (Chapter 1-2)
- [x] RAG Chatbot Backend
- [x] User Authentication (Login/Signup/Profile)
- [ ] Sim-to-Real Workflow Integration
- [ ] Advanced Voice Interaction