---
id: PHR-001
title: Physical AI Constitution Creation
stage: constitution
date: 2025-11-28
surface: claude-code
model: claude-sonnet-4-5-20250929
feature: N/A
branch: master
user: system
command: /sp.constitution
labels: [constitution, initial-setup, educational-platform]
links:
  spec: N/A
  ticket: N/A
  adr: N/A
  pr: N/A
files:
  - path: .specify/memory/constitution.md
    action: created
    lines: 376
tests: []
---

## Prompt

Create a comprehensive project constitution for a Physical AI & Humanoid Robotics educational platform with the following specifications:

**Project Overview**:
A Docusaurus-based interactive textbook with RAG-powered chatbot assistance for learning Physical AI, ROS 2, and humanoid robotics.

**Technical Stack to Standardize**:
- Frontend: Docusaurus (TypeScript), React 18, Tailwind CSS
- Backend: FastAPI (Python 3.11+), async-first design
- AI/ML: Gemini API (via OpenAI SDK wrapper), openai-agents SDK for orchestration
- Embeddings: text-embedding-004 (768 dimensions, Gemini's latest)
- Vector DB: Qdrant Cloud
- Database: Neon Postgres
- Authentication: better-auth
- Chat Interface: ChatKit SDK
- Tools: context7 MCP tools

**Quality Standards to Define**:

1. Code Quality:
   - TypeScript: strict mode, no `any` types (use `unknown` if needed)
   - Python: type hints required, async-first patterns
   - Documentation: JSDoc for TypeScript, docstrings for Python
   - Linting: ESLint + Prettier (TypeScript), Ruff + Black (Python)
   - Comment philosophy: Explain "why" not "what"

2. Architecture Principles:
   - Spec-driven development (no code without specification)
   - Docusaurus plugins follow official patterns
   - FastAPI follows async-first design with Pydantic validation
   - Separation of concerns (content generation, RAG logic, auth)
   - API design follows REST conventions
   - Database migrations version-controlled

3. Educational Content Standards:
   - Learning objectives: 3-5 measurable outcomes per chapter
   - Word count: 800-1000 words per chapter
   - Structure: Introduction → Core Concepts → Code Examples → Exercises → Summary
   - Progressive complexity with prerequisites clearly stated
   - Real-world analogies for abstract concepts
   - All code examples complete, runnable, and tested
   - Step-by-step explanations with expected output
   - Common errors section with troubleshooting tips
   - Practical exercises: 1-2 hands-on tasks per chapter with solutions
   - ROS 2 commands/APIs must be exact and tested
   - Version-specific info clearly marked
   - Terminology consistent with official ROS 2 documentation

4. Testing Requirements:
   - Unit tests: RAG chunking logic, embedding generation
   - Integration tests: Qdrant queries, ChatKit + FastAPI connection
   - E2E tests: Authentication flow, chat interface
   - Minimum coverage: 70% for backend business logic
   - Manual QA: 10 sample questions for RAG accuracy validation
   - Educational content validation: All code examples tested for runnability

5. Security Standards:
   - No API keys in code (environment variables only)
   - better-auth sessions with httpOnly cookies
   - Rate limiting: 30 requests/minute per IP for RAG endpoints
   - Input sanitization: User queries < 500 characters
   - CORS: Whitelist production domains only
   - Gemini API key rotation strategy

6. Performance Requirements:
   - Docusaurus build time: < 2 minutes
   - RAG query response: < 3 seconds (p95)
   - Qdrant vector search: < 500ms
   - Embedding generation: Batch process, not blocking
   - GitHub Pages deployment: < 5 minutes
   - Mobile-responsive: All content readable on 375px viewport

7. Git Workflow:
   - Conventional Commits format (feat:, fix:, chore:, docs:)
   - Feature branches: feature/<feature-name>
   - Constitution committed first before any features
   - Each feature: spec → clarify → plan → tasks → implement → commit

## Response snapshot

Created comprehensive constitution (v1.0.0) with 10 core principles and complete development standards:

**Core Principles**:
1. Educational Excellence First - Primary deliverable is educational content
2. Technical Accuracy & Verifiability (NON-NEGOTIABLE) - All content must be accurate and tested
3. Spec-Driven Development - No code without specification
4. Type Safety & Async-First Design - TypeScript strict mode, Python type hints, async I/O
5. Security & Privacy by Design - User safety and data protection non-negotiable
6. Testing & Validation - Test platform, content, and user experience
7. Progressive Enhancement & Graceful Degradation - Core content always accessible
8. Performance & Scalability - Fast is a feature, scale is planned
9. Observability & Debugging - Structured logging, documentation
10. Simplicity & Pragmatism (YAGNI) - Start simple, justify complexity

**Development Standards**:
- Code Quality Gates: Pre-commit and pre-deployment validation
- Architecture Standards: Separation of concerns, REST API design, database management
- Git Workflow: Conventional commits, feature branches, deployment standards

**Documentation Standards**:
- Required project, code, and educational content documentation
- Visual learning standards with Mermaid diagrams
- Accessibility requirements

**Intelligence Extraction**:
- Extract subagents/skills AFTER 3+ features
- PHRs auto-captured during implementation
- Quality standards reference constitution

**Governance**:
- Amendment process with semantic versioning
- Compliance verification requirements
- Sync requirements for dependent templates
- Conflict resolution priority order
- Review cadence guidelines

## Outcome

- ✅ Impact: Established foundational governance for entire project. All future features must comply with these principles. Educational quality prioritized above technical complexity.
- 🧪 Tests: N/A (constitution document)
- 📁 Files: Created `.specify/memory/constitution.md` (376 lines) with complete principles, standards, and governance
- 🔁 Next prompts: Begin feature development using `/sp.specify` for first feature (likely Docusaurus setup or RAG pipeline)
- 🧠 Reflection: Constitution emphasizes educational excellence as primary goal, with technical accuracy as non-negotiable. This priority order (learner experience > accuracy > security > technical elegance) will guide all architectural decisions. The 10 principles provide clear, actionable standards without over-constraining implementation choices.

## Evaluation notes (flywheel)

- Failure modes observed: None - Initial constitution creation
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Monitor whether "Educational Excellence First" principle effectively guides feature prioritization decisions in first 3-5 features. May need to add more specific guidance on content-vs-platform trade-offs if ambiguity emerges.
