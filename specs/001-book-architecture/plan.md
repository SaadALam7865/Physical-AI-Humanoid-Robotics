# Implementation Plan: Book Architecture and Structure

**Branch**: `001-book-architecture` | **Date**: 2025-11-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-book-architecture/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This feature establishes the foundational architecture for the Physical AI & Humanoid Robotics interactive textbook by creating a complete Docusaurus-based documentation structure with 4 modules containing 18 educational chapters. The implementation involves initializing a Docusaurus 3.6.3 project, configuring the sidebar navigation with collapsible module categories, creating 22 MDX files (18 chapters + 4 module index pages) with proper frontmatter schemas, and setting up automated verification workflows including build validation, link checking, and Markdown linting. This architecture serves as the content delivery foundation for the entire educational platform, with future features (RAG chatbot, authentication) building on top of this static content layer.

## Technical Context

**Language/Version**: TypeScript 5.x (Docusaurus configuration), MDX (content files)
**Primary Dependencies**: Docusaurus 3.6.3, React 18.3.1, @docusaurus/theme-mermaid 3.6.3, prism-react-renderer 2.x
**Storage**: File-based (static MDX files in `frontend/docs/`), N/A for databases
**Testing**: npm scripts (build validation, TypeScript linting), markdownlint (MDX syntax), broken-link-checker (navigation validation)
**Target Platform**: Static site generation → GitHub Pages deployment (Node.js 18.x+ for build environment)
**Project Type**: Web (frontend-only for this feature; backend will be added in future RAG feature)
**Performance Goals**:
- Docusaurus build time < 2 minutes (Constitution Principle VIII)
- GitHub Pages deployment < 5 minutes
- Mobile-responsive at 375px viewport width
- Page load time < 3 seconds on 3G connection

**Constraints**:
- All chapter content must be 800-1000 words per Constitution Principle I
- Code examples must be complete and runnable (no placeholders)
- Each chapter requires 2-3 code examples, 2-4 exercises, ≥1 Mermaid diagram
- Sidebar must support future chapter insertion without URL breaking (semantic slugs only)

**Scale/Scope**:
- 4 modules, 18 chapters, 4 module index pages (22 total MDX files)
- ~14,400-18,000 words of educational content (18 chapters × 800-1000 words)
- 36-54 complete ROS 2 code examples (18 chapters × 2-3 examples)
- 36-72 practical exercises with solutions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Educational Excellence First ✅
- **Compliance**: Chapter template enforces 800-1000 word count, Learning Objectives section, Prerequisites, Practical Exercises, and Summary
- **Verification**: SC-014 requires all 18 chapters contain these placeholder sections (72 required sections)
- **Status**: PASS - Template structure aligns with educational standards

### Principle II: Technical Accuracy & Verifiability ✅
- **Compliance**: Specification requires ROS 2 Humble Hawksbill (LTS), Gazebo Harmonic (gz-sim8), all versions explicitly stated
- **Verification**: SC-021 validates technology stack versions in package.json
- **Status**: PASS - Versions locked, no ambiguity

### Principle III: Spec-Driven Development ✅
- **Compliance**: Following spec → clarify → plan → tasks workflow (currently at plan stage)
- **Verification**: Constitution committed first (completed), spec refined with spec-validator
- **Status**: PASS - Workflow adhered to

### Principle IV: Type Safety & Async-First Design ✅
- **Compliance**: TypeScript 5.x with strict mode for config files (docusaurus.config.ts, sidebars.ts)
- **Verification**: SC-011 validates TypeScript linting passes with 0 errors
- **Status**: PASS - Strict mode enforced, no `any` types allowed

### Principle V: Security & Privacy by Design ⚠️
- **Compliance**: No user data collected in this feature (static content only)
- **Verification**: N/A for book architecture (no authentication, no API keys, no user input)
- **Status**: PASS (not applicable) - Security features deferred to RAG/auth features

### Principle VI: Testing & Validation ✅
- **Compliance**: Automated verification checklist with 5 procedures (build, lint, Markdown validation, link checking, file structure)
- **Verification**: SC-009 to SC-015 define pass criteria for all automated tests
- **Status**: PASS - Comprehensive testing strategy defined

### Principle VII: Progressive Enhancement & Graceful Degradation ✅
- **Compliance**: Static content accessible without JavaScript (Docusaurus SSR), mobile-responsive design
- **Verification**: SC-007 validates 375px viewport rendering
- **Status**: PASS - Core content accessible in all scenarios

### Principle VIII: Performance & Scalability ✅
- **Compliance**: Build time < 2 minutes target, deployment < 5 minutes, mobile-responsive
- **Verification**: SC-009 validates build completes with 0 errors/warnings, manual testing for mobile at 375px
- **Status**: PASS - Performance targets align with Constitution

### Principle IX: Observability & Debugging ✅
- **Compliance**: Docusaurus provides built-in build error reporting, TypeScript type checking
- **Verification**: SC-011 validates linting passes, build errors surface immediately
- **Status**: PASS - Standard Docusaurus observability sufficient for static content

### Principle X: Simplicity & Pragmatism (YAGNI) ✅
- **Compliance**: Using Docusaurus defaults where possible, no custom plugins beyond Mermaid, no over-engineering
- **Verification**: Sidebar configuration uses standard Docusaurus category structure (no custom abstractions)
- **Status**: PASS - Simplest approach chosen for static documentation

**Overall Gate Status**: ✅ **PASS** - All applicable principles satisfied, ready for Phase 0 research

## Project Structure

### Documentation (this feature)

```text
specs/001-book-architecture/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command) - Docusaurus setup best practices
├── data-model.md        # Phase 1 output (/sp.plan command) - Chapter/Module entities
├── quickstart.md        # Phase 1 output (/sp.plan command) - Developer onboarding
├── contracts/           # Phase 1 output (/sp.plan command) - Frontmatter schemas (YAML)
│   ├── chapter-frontmatter.schema.yaml
│   └── module-index-frontmatter.schema.yaml
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)


```text
frontend/                                # Docusaurus application
├── docs/                                # All educational content (MDX files)
│   ├──module-1/                      # Foundations
│   │   ├── index.mdx                  # Module Landing Page
│   │   ├── 01-intro-physical-ai/      # Chapter 1 (Folder)
│   │   │   ├── 01-concept.mdx         # Atomic File: Theory
│   │   │   ├── 02-lab.mdx             # Atomic File: Manual Practice
│   │   │   ├── 03-ai-collab.mdx       # Atomic File: AI Roles
│   │   │   ├── 04-sim-to-real.mdx     # Atomic File: Hardware Bridge 
│   │   └── [Other Chapter Folders...]
│   ├── module-2/                      # Perception
│   │   ├── index.mdx
│   │   └── [Chapter Folders...]
│   ├── module-3/                      # Motion
│   │   ├── index.mdx
│   │   └── [Chapter Folders...]
│   └── module-4/                      # Simulation
│       ├── index.mdx
│       └── [Chapter Folders...]
├── src/                                 # Docusaurus theme customization
│   └── css/
│       └── custom.css                   # Custom styles (minimal, use defaults)
├── static/                              # Static assets
│   └── img/
│       ├── favicon.ico
│       └── logo.svg
├── docusaurus.config.ts                 # Main configuration file
├── sidebars.ts                          # Sidebar navigation structure
├── package.json                         # Dependencies and npm scripts
├── tsconfig.json                        # TypeScript configuration
├── .markdownlint.json                   # Markdown linting rules
├── .gitignore                           # Git ignore rules
└── README.md                            # Frontend setup instructions
```

**Structure Decision**: Web application structure (frontend-only for this feature). This feature creates the static content foundation. Future features will add:
- `backend/` directory for FastAPI RAG system (future feature)
- `frontend/src/components/ChatInterface.tsx` for ChatKit integration (future feature)

Current implementation focuses exclusively on the educational content layer with no dynamic functionality, aligning with Principle VII (Progressive Enhancement) - core content accessible without JavaScript beyond Docusaurus SSR.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No violations detected.** All Constitution principles satisfied by specification.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |

## Phase 0: Research & Outline

### Research Questions

The specification provides comprehensive technical details, leaving minimal unknowns. Research focuses on best practices and optimization strategies:

1. **Docusaurus 3.6.3 Configuration Best Practices**
   - **Question**: What are the recommended performance optimizations for Docusaurus builds with 18+ MDX files?
   - **Context**: Need to ensure build time < 2 minutes (Constitution Principle VIII)
   - **Research Areas**:
     - MDX compilation caching strategies
     - Webpack/bundler optimizations in docusaurus.config.ts
     - Plugin loading order for optimal performance
     - Static file optimization (image compression, lazy loading)

2. **Mermaid Diagram Rendering Performance**
   - **Question**: How to optimize Mermaid diagram rendering to avoid layout shifts and improve page load time?
   - **Context**: Each chapter requires ≥1 Mermaid diagram, need to maintain < 3s page load on 3G
   - **Research Areas**:
     - Server-side rendering vs. client-side rendering for Mermaid
     - Lazy loading strategies for diagrams
     - Fallback images for faster initial render

3. **Mobile Responsiveness for Code Blocks**
   - **Question**: What are best practices for displaying long ROS 2 code examples on mobile devices (375px viewport)?
   - **Context**: SC-007 requires sidebar renders at 375px, code blocks must be readable
   - **Research Areas**:
     - Horizontal scroll vs. code wrapping tradeoffs
     - Syntax highlighting performance on mobile
     - Touch-friendly interaction patterns for code blocks

4. **GitHub Pages Deployment Optimization**
   - **Question**: How to optimize GitHub Actions workflow for < 5 minute deployment time?
   - **Context**: Constitution Principle VIII requires deployment < 5 minutes
   - **Research Areas**:
     - npm dependency caching strategies
     - Parallel build steps in GitHub Actions
     - Incremental builds (only rebuild changed pages)

5. **SEO and Accessibility for Educational Content**
   - **Question**: What meta tags and aria labels are recommended for educational documentation?
   - **Context**: Improve discoverability and accessibility for students
   - **Research Areas**:
     - Schema.org markup for educational content
     - Open Graph tags for social sharing
     - ARIA landmarks for screen readers

### Research Methodology

For each research question:
1. Consult official Docusaurus documentation (https://docusaurus.io/docs)
2. Review GitHub Docusaurus repository for performance discussions and issues
3. Examine high-traffic Docusaurus sites (React docs, Jest docs) for patterns
4. Test proposed optimizations locally with sample MDX files
5. Document findings in `research.md` with "Decision / Rationale / Alternatives Considered" format

### Expected Research Outputs

`research.md` will contain:
- **Docusaurus Configuration Decisions**: Specific webpack/bundler settings, plugin order, caching strategy
- **Mermaid Rendering Strategy**: SSR vs. client-side decision with performance benchmarks
- **Mobile Code Display Pattern**: Chosen approach for code block responsiveness with screenshots
- **GitHub Actions Workflow**: Optimized `.github/workflows/deploy.yml` configuration
- **SEO/Accessibility Tags**: Recommended meta tags for `docusaurus.config.ts` themeConfig

## Phase 1: Design & Contracts

### Data Model

**Entities** (documented in `data-model.md`):

1. **Module** (Represented as Docusaurus sidebar category + index.mdx file)
   - **Attributes**:
     - `id`: string (kebab-case, e.g., "module-1")
     - `label`: string (display name, e.g., "Module 1: Foundations of Physical AI & ROS 2")
     - `description`: string (2-3 sentences summarizing module scope)
     - `prerequisites`: string[] (IDs of prerequisite modules, empty array for Module 1)
     - `estimatedDuration`: string (e.g., "3 weeks")
     - `difficulty`: enum ("Beginner" | "Intermediate")
     - `chapters`: Chapter[] (ordered list of chapter references)
   - **Validation Rules**:
     - Exactly 4 modules in system (SC-001)
     - Module IDs must be sequential: module-1, module-2, module-3, module-4
     - Label must follow format: "Module {N}: {Theme}"
     - Prerequisites must form acyclic dependency graph (no circular dependencies)
   - **File Representation**: `docs/module-{n}/index.mdx` frontmatter + `sidebars.ts` category object

2. **Chapter** (Represented as individual .mdx file)
   - **Attributes**:
     - `id`: string (kebab-case slug, e.g., "intro-physical-ai")
     - `title`: string (display title, max 80 chars for readability)
     - `description`: string (SEO description, max 160 chars)
     - `sidebarLabel`: string (optional, short label for sidebar, defaults to title)
     - `sidebarPosition`: integer (order within module, 1-indexed with gaps for future insertion)
     - `keywords`: string[] (3-7 keywords for search and SEO)
     - `wordCount`: integer (800-1000 words excluding code blocks, enforced by linter)
     - `codeExamples`: integer (2-3 complete examples, validated by pattern matching)
     - `exercises`: integer (2-4 practical exercises, validated by section headings)
     - `diagrams`: integer (≥1 Mermaid diagram, validated by ```mermaid code blocks)
     - `prerequisites`: string[] (IDs of prerequisite chapters, can be empty for first chapter)
   - **Validation Rules**:
     - Chapter ID must be unique across all modules
     - Title must include domain-specific terminology (FR-008)
     - Description must be complete sentence ending with period
     - sidebarPosition values must have gaps (e.g., 1, 2, 3, 5, 7) per FR-020
     - All frontmatter fields mandatory except sidebarLabel (FR-005)
   - **File Representation**: `docs/module-{n}/{chapter-id}.mdx`

3. **Prerequisite** (Represented as metadata within Chapter frontmatter + content section)
   - **Attributes**:
     - `sourceChapterId`: string (chapter that has the prerequisite requirement)
     - `targetChapterId`: string (chapter that must be completed first)
     - `reason`: string (brief explanation of why prerequisite is needed, 1 sentence)
     - `type`: enum ("hard" | "recommended") - hard = essential, recommended = helpful but optional
   - **Validation Rules**:
     - No circular dependencies (detected via topological sort)
     - Target chapter must exist and have lower sidebarPosition than source
     - Prerequisites within same module preferred (cross-module prerequisites noted explicitly)
   - **File Representation**: Listed in chapter's "Prerequisites" section as Markdown links

4. **SidebarConfiguration** (Represented in sidebars.ts TypeScript file)
   - **Attributes**:
     - `tutorialSidebar`: SidebarCategory[] (array of module categories)
   - **SidebarCategory**:
     - `type`: "category" (fixed value)
     - `label`: string (module label matching Module entity)
     - `link`: { type: "doc", id: string } (points to module index.mdx)
     - `collapsible`: boolean (always true per FR-010)
     - `collapsed`: boolean (false for Module 1, true for Modules 2-4 per FR-010)
     - `items`: string[] (array of chapter IDs in `module-{n}/{chapter-id}` format)
   - **Validation Rules**:
     - Exactly 1 sidebar named "tutorialSidebar" (FR-009)
     - Exactly 4 categories in array (SC-001)
     - Items array length must match chapter count per module (6, 5, 4, 3 per SC-002)
     - All item IDs must reference existing .mdx files (SC-018 validates via file structure check)
   - **File Representation**: `frontend/sidebars.ts` exported TypeScript object

**Relationships**:
- Module 1:N Chapter (one module contains many chapters)
- Chapter M:N Chapter (many-to-many via prerequisites, but must be acyclic)
- SidebarConfiguration 1:N Module (sidebar contains all modules)
- Module 1:1 SidebarCategory (bijective mapping)

### API Contracts

**Note**: This feature involves NO runtime APIs (static content only). "Contracts" here refer to file format schemas and configuration interfaces.

#### Contract 1: Chapter Frontmatter Schema

**File**: `contracts/chapter-frontmatter.schema.yaml` (JSON Schema in YAML format)

```yaml
$schema: "http://json-schema.org/draft-07/schema#"
title: "Chapter Frontmatter Schema"
description: "Validation schema for MDX chapter frontmatter (YAML block at file start)"
type: object
required:
  - id
  - title
  - description
  - sidebar_position
  - keywords
properties:
  id:
    type: string
    pattern: "^[a-z0-9]+(-[a-z0-9]+)*$"  # kebab-case
    description: "Unique chapter identifier (kebab-case)"
  title:
    type: string
    minLength: 10
    maxLength: 80
    description: "Display title for the chapter"
  description:
    type: string
    minLength: 50
    maxLength: 160
    pattern: ".*\\.$"  # Must end with period
    description: "SEO meta description (complete sentence)"
  sidebar_label:
    type: string
    maxLength: 40
    description: "Optional short label for sidebar (defaults to title if omitted)"
  sidebar_position:
    type: integer
    minimum: 1
    description: "Order within module (1-indexed, use gaps like 1,2,3,5,7 for future insertion)"
  keywords:
    type: array
    minItems: 3
    maxItems: 7
    items:
      type: string
      minLength: 2
    description: "Keywords for search and SEO"
```

**Usage**: Validate all chapter .mdx frontmatter blocks against this schema using `ajv` or similar JSON Schema validator in pre-commit hook.

#### Contract 2: Module Index Frontmatter Schema

**File**: `contracts/module-index-frontmatter.schema.yaml`

```yaml
$schema: "http://json-schema.org/draft-07/schema#"
title: "Module Index Frontmatter Schema"
description: "Validation schema for module landing page frontmatter"
type: object
required:
  - id
  - title
  - description
properties:
  id:
    type: string
    pattern: "^module-[1-4]$"
    description: "Module identifier (module-1, module-2, module-3, or module-4)"
  title:
    type: string
    pattern: "^Module [1-4]: .+$"
    description: "Module title following format 'Module N: Theme'"
  description:
    type: string
    minLength: 100
    maxLength: 300
    description: "Module overview (2-3 sentences)"
```

**Usage**: Validate all `docs/module-{n}/index.mdx` frontmatter blocks.

#### Contract 3: Sidebars TypeScript Interface

**File**: `contracts/sidebars.interface.ts` (TypeScript type definitions)

```typescript
/**
 * Sidebar configuration type definitions
 * Auto-imported from @docusaurus/plugin-content-docs
 */
import type { SidebarsConfig, SidebarItemCategoryWithLink } from '@docusaurus/plugin-content-docs';

/**
 * Tutorial sidebar structure for Physical AI textbook
 */
export interface TutorialSidebar extends Array<SidebarItemCategoryWithLink> {
  length: 4; // Exactly 4 modules
}

/**
 * Module category configuration
 */
export interface ModuleCategory extends SidebarItemCategoryWithLink {
  type: 'category';
  label: `Module ${1 | 2 | 3 | 4}: ${string}`; // Enforces "Module N: " prefix
  link: {
    type: 'doc';
    id: `module-${1 | 2 | 3 | 4}/index`; // Must point to module index
  };
  collapsible: true; // Always collapsible
  collapsed: boolean; // false for Module 1, true for others
  items: string[]; // Array of chapter IDs (validated separately)
}

/**
 * Main sidebars configuration export
 */
export interface PhysicalAISidebarsConfig extends SidebarsConfig {
  tutorialSidebar: TutorialSidebar;
}
```

**Usage**: Import in `sidebars.ts` to ensure type safety via TypeScript compiler.

### Quickstart Guide

**File**: `quickstart.md`

#### Developer Onboarding (5 Minutes)

**Prerequisites**:
- Node.js 18.x or higher installed
- Git installed
- Text editor (VS Code recommended)

**Setup Steps**:

1. **Clone Repository**:
   ```bash
   git clone https://github.com/uneezaismail/Physical-AI-Humanoid-Robotics.git
   cd Physical-AI-Humanoid-Robotics
   git checkout 001-book-architecture  # Feature branch
   ```

2. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```
   Expected output: `added 1847 packages` (Docusaurus + dependencies)

3. **Start Development Server**:
   ```bash
   npm start
   ```
   Expected output:
   ```
   [SUCCESS] Docusaurus website is running at http://localhost:3000/
   ```

4. **Verify Setup**:
   - Open http://localhost:3000 in browser
   - Verify sidebar shows 4 modules
   - Click Module 1 → Verify 6 chapters listed
   - Click first chapter → Verify page renders

5. **Run Tests**:
   ```bash
   npm run build          # Verify build completes (< 2 minutes)
   npm run lint           # Verify TypeScript linting passes
   npx markdownlint "docs/**/*.mdx"  # Verify Markdown syntax
   ```

#### Creating a New Chapter (10 Minutes)

1. **Create MDX File**:
   ```bash
   touch docs/module-1/new-chapter.mdx
   ```

2. **Add Frontmatter** (copy from `contracts/chapter-frontmatter.schema.yaml` example):
   ```yaml
   ---
   id: new-chapter
   title: "New Chapter Title"
   description: "Brief summary of chapter content (complete sentence)."
   sidebar_position: 8  # Use gap numbering
   keywords:
     - "ROS 2"
     - "Physical AI"
     - "specific-topic"
   ---
   ```

3. **Add Required Sections**:
   - Learning Objectives
   - Prerequisites
   - Introduction
   - Main Content (with code examples)
   - Practical Exercises
   - Summary
   - Further Reading
   - Troubleshooting

4. **Update Sidebar**:
   Edit `sidebars.ts` → Add `'module-1/new-chapter'` to Module 1 items array

5. **Verify**:
   ```bash
   npm start  # Check chapter appears in sidebar
   ```

#### Troubleshooting Common Issues

**Issue**: `npm install` fails with EACCES error
**Solution**: Run `sudo chown -R $(whoami) ~/.npm` to fix npm permissions

**Issue**: Port 3000 already in use
**Solution**: Run `npm start -- --port 3001` to use different port

**Issue**: TypeScript errors in sidebars.ts
**Solution**: Ensure all chapter IDs in `items` array match actual .mdx files (case-sensitive)

**Issue**: Mermaid diagrams not rendering
**Solution**: Verify `themes: ['@docusaurus/theme-mermaid']` in docusaurus.config.ts

## Phase 2: Task Breakdown (Deferred to /sp.tasks)

**Note**: Task generation happens in `/sp.tasks` command, NOT in `/sp.plan`. This section provides high-level task categories for reference only.

**Task Categories** (detailed breakdown in `tasks.md`):
1. **Environment Setup** (Est: 30 minutes)
   - Initialize Docusaurus project
   - Configure package.json with required dependencies
   - Set up TypeScript configuration
   - Configure Markdown linting rules

2. **Configuration Files** (Est: 1 hour)
   - Create docusaurus.config.ts with navbar, Prism, Mermaid settings
   - Create sidebars.ts with 4 module categories
   - Configure GitHub Actions deployment workflow
   - Set up .gitignore and .markdownlint.json

3. **Module & Chapter Scaffolding** (Est: 3 hours)
   - Create 4 module directories (module-1 through module-4)
   - Create 4 module index.mdx files with frontmatter
   - Create 18 chapter .mdx files with frontmatter and placeholder sections
   - Validate all frontmatter against JSON schemas

4. **Verification & Testing** (Est: 1.5 hours)
   - Run automated verification checklist (5 procedures)
   - Execute manual verification checklist (5 categories, 28 minutes)
   - Fix any validation errors
   - Document passing criteria screenshots

5. **Deployment** (Est: 30 minutes)
   - Push to staging branch
   - Verify GitHub Actions workflow runs successfully
   - Test production deployment on GitHub Pages
   - Validate mobile responsiveness in production

**Total Estimated Time**: 6.5 hours for complete implementation

## Implementation Notes

### Critical Path

1. **Docusaurus Project Initialization** (blocking: all other tasks depend on this)
2. **Configuration Files** (blocking: cannot create content without sidebar structure)
3. **Module Directories** (blocking: chapters depend on module structure)
4. **Chapter Scaffolding** (parallelizable: all 18 chapters can be created simultaneously)
5. **Verification** (blocking: must pass before deployment)
6. **Deployment** (final step)

### Risk Mitigation

**Risk**: Docusaurus build time exceeds 2 minutes with 18 MDX files
**Mitigation**: Research Phase 0 will identify webpack optimizations; use MDX compilation caching

**Risk**: Mermaid diagrams cause layout shift and slow page load
**Mitigation**: Research Phase 0 will determine SSR vs. client-side rendering strategy

**Risk**: Mobile code blocks unreadable at 375px viewport
**Mitigation**: Research Phase 0 will test horizontal scroll vs. wrapping; implement chosen pattern

**Risk**: GitHub Pages deployment exceeds 5 minutes
**Mitigation**: Optimize GitHub Actions with dependency caching and parallel build steps (Phase 0 research)

**Risk**: Frontmatter validation manual and error-prone
**Mitigation**: Create JSON schemas in Phase 1 and integrate validation into pre-commit hooks

### Dependencies

**External Dependencies**:
- Node.js 18.x+ (runtime for Docusaurus build)
- npm (package manager)
- Git (version control)
- GitHub Actions (deployment automation)
- GitHub Pages (hosting)

**Internal Dependencies**:
- Constitution principles (already defined)
- Specification (completed and refined)
- Research findings (Phase 0 output, blocking Phase 1)

### Future Considerations

**Not in Scope for This Feature** (deferred to future features):
- RAG chatbot integration (requires backend FastAPI setup)
- User authentication (requires better-auth and Neon database)
- Interactive code execution (requires sandboxed environment)
- Progress tracking (requires database and user sessions)
- Search functionality (Docusaurus built-in search sufficient for now)

**Extensibility Points**:
- Module structure supports adding Module 5+ (update sidebars.ts only)
- Chapter insertion supported via sidebar_position gaps (no URL breaking)
- Custom React components can be added to MDX files in future
- Docusaurus plugins can be added for analytics, feedback forms, etc.

## Success Criteria Validation

**Automated Verification** (must pass before deployment):
- ✅ SC-009: `npm run build` completes with 0 errors, 0 warnings
- ✅ SC-010: `npx broken-link-checker` reports 0 broken internal links
- ✅ SC-011: `npm run lint` passes with 0 TypeScript errors
- ✅ SC-015: `npx markdownlint` reports 0 Markdown syntax errors

**Manual Verification** (advisory, 28 minutes total):
- ✅ SC-005: All 18 chapters accessible via sidebar (5 min navigation test)
- ✅ SC-006: 100% prev/next navigation works (5 min click-through)
- ✅ SC-007: Sidebar renders at 375px viewport (3 min mobile test)
- ✅ SC-013: All frontmatter complete (10 min spot-check 3 files)
- ✅ SC-019: Sidebars.ts matches spec structure (5 min configuration review)

**Deployment Verification**:
- ✅ SC-012: Production build deploys to GitHub Pages successfully
- ✅ Build time < 2 minutes (Constitution Principle VIII)
- ✅ Deployment time < 5 minutes (Constitution Principle VIII)

## Conclusion

This implementation plan provides a comprehensive roadmap for creating the foundational architecture of the Physical AI & Humanoid Robotics textbook. The phased approach (Research → Design → Tasks → Implementation) ensures alignment with Constitution principles while maintaining focus on educational quality. The next step is executing Phase 0 research to resolve optimization strategies, followed by Phase 1 design to create data models and contracts, and finally Phase 2 task generation via `/sp.tasks` command.

**Recommended Next Command**: Begin research phase by investigating Docusaurus performance optimizations and best practices.
