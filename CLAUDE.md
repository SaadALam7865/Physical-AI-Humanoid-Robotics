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
- **API Framework**: FastAPI (Python 3.12+)
- **Database**: Neon Postgres (user sessions, metadata)
- **Vector Database**: Qdrant Cloud (embeddings storage)
- **Authentication**: better-auth

### AI/ML Stack
- **LLM**: Gemini API (via OpenAI SDK wrapper)
- **Embeddings**: text-embedding-004 (768 dimensions)
- **Agent Framework**: openai-agents SDK
- **Tools**: context7 MCP tools

### Development Tools
- **Language**: TypeScript (frontend), Python 3.12+ (backend)
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
│   │   01-part-1-foundations-lab/                             # Part I metadata
  │   │
  │   ├── 01-chapter-1-embodied-ai/                         # Chapter 1 metadata
  │   │   ├── 00-intro.mdx                             # Learning objectives + hook
  │   │   ├── 01-digital-vs-physical-ai.mdx            # Conceptual comparison
  │   │   ├── 02-brain-in-box-vs-body.mdx              # Mermaid diagram + explanation
  │   │   ├── 03-partner-economy.mdx                   # 3 real-world examples
  │   │   ├── 04-why-it-matters.mdx                    # Applications
  │   │   ├── 05-exercises.mdx                         # Thought experiments
  │   │   └── 06-summary.mdx                           # Recap + preview Chapter 2
  │   │
  │   ├── 02-chapter-2-hardware-setup/
  │   │   ├── 00-intro.mdx
  │   │   ├── 01-hardware-mandate.mdx                  # ⚠️ Danger admonition
  │   │   ├── 02-workstation-specs.mdx                 # RTX GPU, Ubuntu
  │   │   ├── 03-edge-compute.mdx                      # Jetson Orin Nano
  │   │   ├── 04-sensor-stack.mdx                      # RealSense D435i
  │   │   ├── 05-verification.mdx                      # Checklist
  │   │   └── 06-summary.mdx
  │   │
  │   └── 03-chapter-3-physical-ai-architecture/
  │       ├── 00-intro.mdx
  │       ├── 01-three-tier-architecture.mdx           # Workstation/Edge/Robot
  │       ├── 02-sim-to-real-workflow.mdx              # Mermaid diagram
  │       ├── 03-data-flow.mdx                         # Sensors → Compute → Actuators
  │       ├── 04-lab-setup.mdx                         # Code: Network setup
  │       └── 05-summary.mdx
  │
  ├── 02-part-2-robotic-nervous-system/
  │   │
  │   ├── 04-chapter-4-ros2-architecture/
  │   │   ├── 00-intro.mdx
  │   │   ├── 01-dds-middleware.mdx                    # Publish-subscribe pattern
  │   │   ├── 02-ros1-vs-ros2.mdx                      # Why ROS 2 for Physical AI
  │   │   ├── 03-core-components.mdx                   # Nodes, Topics, Services, Actions
  │   │   ├── 04-installation.mdx                      # Code: Install ROS 2 Humble
  │   │   ├── 05-first-demo.mdx                        # Code: Turtlesim
  │   │   └── 06-summary.mdx
  │   │
  │   ├── 05-chapter-5-nodes-topics-services/
  │   │   ├── 00-intro.mdx
  │   │   ├── 01-nodes.mdx                             # What is a node?
  │   │   ├── 02-topics.mdx                            # Pub/Sub pattern
  │   │   ├── 03-services.mdx                          # Request/Reply pattern
  │   │   ├── 04-qos-profiles.mdx                      # Reliability, Durability
  │   │   ├── 05-code-publisher.mdx                    # Code: Publisher node
  │   │   ├── 06-code-subscriber.mdx                   # Code: Subscriber node
  │   │   ├── 07-code-service.mdx                      # Code: Service server
  │   │   ├── 08-exercises.mdx
  │   │   └── 09-summary.mdx
  │   │
  │   ├── 06-chapter-6-python-rclpy/
  │   │   ├── 00-intro.mdx
  │   │   ├── 01-rclpy-basics.mdx                      # Node lifecycle
  │   │   ├── 02-timer-callbacks.mdx                   # 100 Hz control loops
  │   │   ├── 03-parameters.mdx                        # Dynamic reconfiguration
  │   │   ├── 04-complete-node.mdx                     # Code: Full template
  │   │   ├── 05-hardware-integration.mdx              # Code: RealSense IMU node
  │   │   ├── 06-exercises.mdx
  │   │   └── 07-summary.mdx
  │   │
  │   ├── 07-chapter-7-urdf-humanoids/
  │   │   ├── 00-intro.mdx
  │   │   ├── 01-urdf-basics.mdx                       # Links, Joints, Frames
  │   │   ├── 02-humanoid-kinematics.mdx               # Hip, Knee, Ankle joints
  │   │   ├── 03-inertial-properties.mdx               # Mass, CoM, Inertia
  │   │   ├── 04-code-simple-leg.mdx                   # Code: URDF for leg
  │   │   ├── 05-rviz-visualization.mdx                # Code: Load URDF in RViz2
  │   │   ├── 06-exercises.mdx
  │   │   └── 07-summary.mdx
  │   │
  │   ├── 08-chapter-8-launch-parameters/
  │   │   ├── 00-intro.mdx
  │   │   ├── 01-python-launch-files.mdx               # Why Python > XML
  │   │   ├── 02-parameter-yaml.mdx                    # YAML configuration
  │   │   ├── 03-multi-node-launch.mdx                 # Code: Launch Gazebo + RViz2
  │   │   ├── 04-exercises.mdx
  │   │   └── 05-summary.mdx
  │   │
  │   └── 09-chapter-9-first-ros2-package/
  │       ├── 00-intro.mdx
  │       ├── 01-workspace-structure.mdx               # src/, build/, install/
  │       ├── 02-package-xml.mdx                       # Dependencies
  │       ├── 03-setup-py.mdx                          # Entry points
  │       ├── 04-code-example-package.mdx              # Code: Complete package
  │       ├── 05-build-and-run.mdx                     # Code: colcon build
  │       ├── 06-exercises.mdx
  │       └── 07-summary.mdx
  │
  ├── 03-part-3-digital-twin/
  │   │
  │   ├── 10-chapter-10-physics-simulation-intro/
  │   │   ├── 00-intro.mdx
  │   │   ├── 01-physics-engines.mdx                   # ODE, Bullet, PhysX
  │   │   ├── 02-sim-to-real-gap.mdx                   # Reality gap sources
  │   │   ├── 03-tool-comparison.mdx                   # Gazebo vs Unity vs Isaac Sim
  │   │   └── 04-summary.mdx
  │   │
  │   ├── 11-chapter-11-gazebo-setup/
  │   │   ├── 00-intro.mdx
  │   │   ├── 01-installation.mdx                      # Code: Install Gazebo Harmonic
  │   │   ├── 02-world-files.mdx                       # SDF world structure
  │   │   ├── 03-first-world.mdx                       # Code: Simple world
  │   │   ├── 04-ros2-integration.mdx                  # Gazebo-ROS2 bridge
  │   │   ├── 05-exercises.mdx
  │   │   └── 06-summary.mdx
  │   │
  │   ├── 12-chapter-12-urdf-sdf-formats/
  │   ├── 13-chapter-13-sensor-simulation/
  │   ├── 14-chapter-14-unity-visualization/
  │   └── 15-chapter-15-realistic-environments/
  │
  ├── 04-part-4-ai-robot-brain/
  │   │
  │   ├── 16-chapter-16-isaac-overview/
  │   ├── 17-chapter-17-isaac-sim/
  │   ├── 18-chapter-18-isaac-ros-vslam/
  │   ├── 19-chapter-19-nav2-bipedal/
  │   ├── 20-chapter-20-humanoid-kinematics/
  │   ├── 21-chapter-21-bipedal-locomotion/
  │   ├── 22-chapter-22-manipulation-grasping/
  │   └── 23-chapter-23-sim-to-real/
  │
  └── 05-part-5-vla-capstone/
      │
      ├── 24-chapter-24-vla-intro/
      ├── 25-chapter-25-voice-to-action/
      ├── 26-chapter-26-cognitive-planning/
      ├── 27-chapter-27-multimodal-interaction/
      └── 28-chapter-28-capstone-project/
          ├── 00-intro.mdx
          ├── 01-requirements.mdx                      # Capstone specs
          ├── 02-architecture.mdx                      # System design
          ├── 03-week1-simulation.mdx                  # Milestone 1
          ├── 04-week2-hardware.mdx                    # Milestone 2
          ├── 05-week3-presentation.mdx                # Final demo
          └── 06-grading-rubric.mdx
│   ├── src/
│   │   ├── components/            # React components
│   │   │   └── ChatWidget.tsx  # ChatKit SDK integration
│   │   ├── css/                   # Styling (Tailwind + custom)
│   │   └── pages/                 # Landing page, about, etc.
│   ├── static/                    # Images, assets
│   ├── docusaurus.config.ts       # Docusaurus configuration
│   ├── package.json               # npm dependencies
│   ├── tsconfig.json              # TypeScript config
│   └── .env.local.example         # Frontend env vars template
│
backend/
├── app/                    
│   ├── api/   
|   |   ├──__init__.py
|   |   ├──health.py
│   │   ├── chat.py              
│   │   └── utils.py 
│   ├── middleware/   
|   |   ├──__init__.py
|   |   ├──cors.py
│   │   ├── error_handler.py              
│   │   └── rate_limit.py 
│   ├── models/    
│   │   ├──__init__.py
│   ├── services/                       
│   │   ├── __init__.py            
│   │   ├── embeddings.py           
│   │   ├── generations.py            
│   │   └── qdrant_client.py         
│   │   └──query_process.py
│   ├── main.py
│   ├── config.py

├── tests/
│   ├── unit/
│   ├── integration/
│   └── rag_tests/
├── requirements.txt
├── .env.example
└── scripts/                        # Optional: CLI scripts (e.g., ingest book)

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
