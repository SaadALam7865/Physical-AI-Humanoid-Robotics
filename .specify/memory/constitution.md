<!--
Sync Impact Report:
- Version change: 1.0.0 → 1.1.0
- Modified principles: II. Technical Accuracy & Verifiability
- Added sections: N/A
- Removed sections: N/A
- Templates requiring updates:
  ✅ plan-template.md: Reviewed - Constitution Check section will reference these principles
  ✅ spec-template.md: Reviewed - Aligns with educational content and requirements structure
  ✅ tasks-template.md: Reviewed - Aligns with test-driven development and task organization
  ✅ adr-template.md: Exists and aligns with documentation standards
  ✅ phr-template.prompt.md: Exists and aligns with intelligence extraction standards
- Follow-up TODOs: None - all placeholders filled
-->

# Physical AI & Humanoid Robotics Educational Platform Constitution

## Core Principles

### I. Educational Excellence First

**The primary deliverable is educational content that teaches effectively.**

- Learning objectives: 3-5 measurable outcomes stated at chapter start
- Word count: 800-1000 words per chapter (substantive but digestible)
- Structure: Introduction → Core Concepts → Code Examples → Exercises → Summary
- Progressive complexity: Each chapter builds on previous (prerequisites clearly stated)
- Real-world analogies for abstract concepts (e.g., "ROS nodes are like apps on your phone")
- All code examples MUST be complete, runnable, and tested (include all imports, dependencies)
- Step-by-step explanations accompanying each code block with expected output
- Common errors section with troubleshooting tips
- Practical exercises: 1-2 hands-on tasks per chapter with solutions
- Beginner-friendly tone without oversimplification
- No jargon without clear explanation

**Rationale**: The platform exists to educate. Technical excellence in the platform serves educational goals, not vice versa. Content that doesn't teach effectively fails the project's core mission.

### II. Technical Accuracy & Verifiability (NON-NEGOTIABLE)

**All technical content must be accurate, tested, and verifiable.**

- ROS 2 commands, APIs, file paths MUST be exact and tested before publication
- Version-specific info clearly marked (e.g., "ROS 2 Humble Hawksbill")
- Terminology consistent with official ROS 2 documentation
- Acronyms defined on first use (e.g., "URDF - Unified Robot Description Format")
- Links to official docs for deeper dives
- All code examples validated for runnability before commit
- AI-generated content MUST be reviewed for accuracy (no hallucinated ROS commands)
- **Hardware Mandate**: All simulation content must explicitly state the requirement for NVIDIA RTX 4070 Ti (or higher) and Jetson Orin Nano. Standard laptops are NOT supported for Isaac Sim chapters.

**Rationale**: Inaccurate educational content is worse than no content. Students learning incorrect information will struggle in real-world scenarios and lose trust in the platform.

### III. Spec-Driven Development

**No code without specification. No implementation without approved plan.**

- Feature workflow: spec → clarify → plan → tasks → implement → commit
- Constitution committed first before any features
- All architectural decisions documented in ADRs
- ADRs committed alongside relevant features
- Changes to constitution require version update and sync check

**Rationale**: Educational platforms require coherent architecture. Ad-hoc development leads to inconsistent user experience and technical debt that hinders content delivery.

### IV. Type Safety & Async-First Design

**TypeScript strict mode enabled. Python type hints required. All I/O operations async.**

**TypeScript**:
- Strict mode enabled (`"strict": true`)
- No `any` types; use `unknown` if type is truly unknown
- JSDoc comments for all exported functions
- Absolute imports using `@/` alias where configured
- Formatting: Prettier (2 spaces, single quotes, trailing commas)

**Python**:
- Python 11+ required (for enhanced type hints)
- Type hints mandatory for all function signatures
- Async-first design (all I/O operations use `async/await`)
- Docstrings (Google style) for all public functions
- Formatting: Black (line length 88), Ruff for linting
- Error handling: HTTPException with proper status codes

**Rationale**: Type safety catches errors at development time. Async design ensures the platform remains responsive under load. Clear types serve as living documentation.

### V. Security & Privacy by Design

**User safety and data protection are non-negotiable.**

- No API keys in code (environment variables only: `.env.local`, `.env`)
- better-auth sessions with httpOnly cookies, encrypted
- Rate limiting: 30 requests/minute per IP for RAG endpoints
- Input sanitization: User queries limited to 500 characters
- CORS: Whitelist production domains only (never `*`)
- Gemini API key rotation strategy documented
- No sensitive data in logs (sanitize before logging user queries)

**Rationale**: Educational platforms handle user data and queries. Security breaches destroy trust. Privacy violations violate user rights and regulations.

### VI. Testing & Validation

**Test the platform. Test the content. Test the user experience.**

**Platform Testing**:
- Unit tests: RAG chunking logic, embedding generation
- Integration tests: Qdrant queries, ChatKit + FastAPI connection
- E2E tests: Authentication flow, chat interface
- Minimum coverage: 70% for backend business logic

**Content Validation**:
- All code examples tested for runnability (automated validation)
- Manual QA: 10 sample questions for RAG accuracy validation
- Verify ROS 2 commands execute successfully in target environment

**User Experience Validation**:
- Mobile-responsive: All content readable on 375px viewport
- RAG query response: < 3 seconds (p95)
- Qdrant vector search: < 500ms
- Docusaurus build time: < 2 minutes
- GitHub Pages deployment: < 5 minutes

**Rationale**: Untested code breaks. Untested content misleads. Untested UX frustrates. All three failures harm learners.

### VII. Progressive Enhancement & Graceful Degradation

**Core content must always be accessible.**

- Static content works even if chatbot unavailable
- FastAPI errors return HTTPException with appropriate status codes
- TypeScript: React Error Boundaries for components
- User-facing errors show friendly messages (no stack traces exposed)
- Structured logging in JSON format for parsing

**Rationale**: Technical failures in the RAG system should not block access to educational content. The textbook is valuable even without AI assistance.

### VIII. Performance & Scalability

**Fast is a feature. Scale is planned, not hoped for.**

**Performance Targets**:
- Docusaurus build time: < 2 minutes
- RAG query response: < 3 seconds (p95)
- Qdrant vector search: < 500ms
- Embedding generation: Batch process (not blocking)
- GitHub Pages deployment: < 5 minutes
- Mobile-responsive: All content readable on 375px viewport

**Scalability Considerations**:
- Gemini API rate limits: Free tier has limits; batch embed requests
- Qdrant Cloud: Free tier = 1GB storage; monitor usage
- Better-auth: Rate limit authentication endpoints

**Rationale**: Slow platforms frustrate learners. Performance directly impacts educational effectiveness. Unplanned scaling leads to outages during peak usage.

### IX. Observability & Debugging

**When things break, we must know why.**

- Structured logging in JSON format (parseable, searchable)
- Log levels appropriate to severity (DEBUG, INFO, WARNING, ERROR)
- No sensitive data in logs (sanitize user queries before logging)
- API documentation: Auto-generated via FastAPI OpenAPI
- Inline comments: Focus on "why" not "what", especially for complex logic

**Rationale**: Debugging in production requires observability. Without structured logs and documentation, every bug becomes a research project.

### X. Simplicity & Pragmatism (YAGNI)

**Start simple. Add complexity only when needed. Justify all complexity.**

- Implement features as specified; avoid over-engineering
- No "future-proofing" without documented requirement
- Abstractions justified by concrete need, not hypothetical scenarios
- RAG chunking strategy: ~500-800 tokens with 100-token overlap (not micro-optimization)
- Preserve code blocks during chunking (don't split examples across chunks)
- Chunk at semantic boundaries (section headers), not arbitrary character counts

**Rationale**: Complexity is a tax paid in maintenance, bugs, and onboarding time. Educational platforms need stability and clarity, not clever abstractions.

## Development Standards

### Code Quality Gates

**Pre-Commit Validation**:
- TypeScript builds without errors (`npm run build`)
- Python type checking passes (`mypy app/`)
- Linting passes (ESLint + Prettier for TS, Ruff + Black for Python)
- All tests pass locally

**Pre-Deployment Validation**:
- Deployment successful to GitHub Pages
- RAG accuracy: 8/10 sample questions answered correctly
- Mobile responsive test passed
- All code examples in chapters tested and runnable

**Naming Conventions**:

*TypeScript*:
- Components: PascalCase (`ChatInterface.tsx`)
- Functions: camelCase (`fetchRagAnswer()`)
- Constants: UPPER_SNAKE_CASE (`MAX_QUERY_LENGTH`)

*Python*:
- Functions: snake_case (`generate_embeddings()`)
- Classes: PascalCase (`RagQueryService`)
- Constants: UPPER_SNAKE_CASE (`EMBEDDING_MODEL`)

*MDX Content*:
- Files: kebab-case (`chapter-01-intro.mdx`)
- Word count: 800-1000 words per chapter
- Code examples: Complete, runnable, include all imports
- Diagrams: Mermaid syntax for architecture diagrams

### Architecture Standards

**Separation of Concerns**:
- Frontend: Docusaurus (content) + ChatInterface (ChatKit SDK)
- Backend: FastAPI (RAG logic, auth) + Qdrant (vectors) + Neon (metadata)
- Content generation, RAG logic, and auth are independent modules

**API Design**:
- REST conventions followed
- FastAPI async-first with Pydantic validation
- OpenAPI auto-generated documentation
- Rate limiting on public endpoints

**Database Management**:
- Neon Postgres for user sessions and metadata
- Qdrant Cloud for embeddings (768 dimensions, text-embedding-004)
- Database migrations version-controlled
- Metadata stored with chunks: `{module, chapter, section}` for citation

**Embeddings Configuration** (CRITICAL):
- Model: `text-embedding-004` (NOT `gemini-embedding-001`)
- Dimensions: 768 (configure Qdrant collection accordingly)
- Gemini API via OpenAI SDK wrapper:
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

### Git Workflow

**Commit Standards**:
- Conventional Commits format: `feat:`, `fix:`, `chore:`, `docs:`
- Feature branches: `feature/<feature-name>` (e.g., `feature/rag-chunking`)
- Constitution committed first before any features
- Each feature follows: spec → clarify → plan → tasks → implement → commit

**Deployment**:
- GitHub Pages for frontend (build via GitHub Actions)
- Backend: Deploy to free tier (Railway, Render, or Fly.io)
- Environment variables configured on hosting platform
- CORS: Update `allowed_origins` in FastAPI for production domain

## Documentation Standards

### Required Documentation

**Project Documentation**:
- `README.md`: Setup instructions, architecture diagram, deployment guide
- `CLAUDE.md`: Project context, tech stack, coding conventions (this file drives development)
- ADRs for major decisions (embedding model choice, chunking strategy, educational approach)

**Code Documentation**:
- TypeScript: JSDoc comments for all exported functions
- Python: Docstrings (Google style) for all public functions
- Inline comments: Explain "why" not "what", focus on complex logic and edge cases

**Educational Content Documentation**:
- Each chapter includes: learning objectives, prerequisites, expected outcomes
- Code examples include expected output for verification
- Glossary section for technical terms
- Common errors and troubleshooting sections

### Visual Learning Standards

**Architecture Diagrams**:
- Use Mermaid syntax in MDX for system architecture
- Code flow diagrams where helpful for understanding complex interactions
- Tables for comparing parameters, options, ROS 2 message types

**Accessibility**:
- No jargon without clear explanation
- Acronyms defined on first use
- Beginner-friendly tone without oversimplification
- Links to official ROS 2 documentation for deeper exploration

## Intelligence Extraction

### When to Extract Intelligence

**Timing**:
- Extract subagents/skills AFTER implementing 3+ features (patterns emerge from real work)
- Do NOT extract prematurely (before patterns are clear)
- Intelligence extracted from real implementation experience, not speculation

**What to Extract**:
- **Subagents**: Reusable agents using Persona+Questions+Principles pattern
- **Skills**: Reusable skills for common tasks (RAG validation, content generation patterns)
- **PHRs**: Prompt History Records auto-captured during implementation for learning and traceability

**Storage**:
- Subagents: `.claude/subagents/`
- Skills: `.claude/skills/`
- PHRs: `history/prompts/` (organized by stage: constitution, spec, plan, tasks, etc.)

**Quality Standards**:
- Skills reference Constitution for quality standards
- Document reusable patterns for educational content generation
- Extract RAG quality validation patterns into skills

### Prompt History Records (PHRs)

**Capture Process**:
- Auto-captured during implementation
- Organized by stage: constitution, spec, plan, tasks, red, green, refactor, explainer, misc, general
- Include full prompt text (verbatim) and concise response text
- Metadata: stage, title, date, feature (if applicable)

**Rationale**: PHRs enable learning from past decisions, improve prompt engineering, and provide traceability for architectural choices.

## Governance

### Amendment Process

**Constitution Changes**:
- Amendments require documentation in this file with version increment
- Version follows semantic versioning:
  - **MAJOR**: Backward incompatible governance/principle removals or redefinitions
  - **MINOR**: New principle/section added or materially expanded guidance
  - **PATCH**: Clarifications, wording, typo fixes, non-semantic refinements
- All dependent templates (plan, spec, tasks) must be reviewed and updated
- Changes committed with sync impact report (as HTML comment at top of file)

**Compliance Verification**:
- All PRs/reviews must verify compliance with constitution
- Complexity must be justified (see Plan Template's "Complexity Tracking" section)
- Constitution supersedes all other practices
- Quality gates (defined in Principle VI) enforced before merge

**Sync Requirements**:
- When constitution changes, review `.specify/templates/` for alignment
- Update `plan-template.md` "Constitution Check" section if principles change
- Update `spec-template.md` if requirements structure changes
- Update `tasks-template.md` if task organization or testing standards change
- Update `CLAUDE.md` to reflect any new standards or workflow changes

### Conflict Resolution

**Priority Order**:
1. Educational excellence (Principle I)
2. Technical accuracy (Principle II)
3. User security and privacy (Principle V)
4. All other principles equally weighted

**Rationale**: When principles conflict, we prioritize the learner's experience, accuracy of information, and their safety. Technical elegance never trumps these priorities.

### Review Cadence

**Constitution Review**:
- Review after every 3-5 features implemented
- Review when quality gates consistently fail
- Review when team identifies recurring pain points
- Ad-hoc review when major architectural decision required

**Rationale**: Living documents evolve with the project. Regular review ensures constitution remains relevant and valuable.

---

**Version**: 1.1.0 | **Ratified**: 2025-11-28 | **Last Amended**: 2025-11-29
