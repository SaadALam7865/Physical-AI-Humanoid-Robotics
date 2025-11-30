# Implementation Plan: Book Part 1 - Foundations and Hardware Lab

**Branch**: `002-part1-foundations-lab` | **Date**: 2025-11-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-part1-foundations-lab/spec.md`

## Summary

Create two foundational MDX chapters for the Physical AI textbook establishing embodied intelligence concepts (Chapter 1) and hardware laboratory requirements (Chapter 2). This involves generating educational content following Constitution standards (800-1000 words, beginner-friendly, technically accurate), embedding visual diagrams (Mermaid), adding critical safety warnings (Hardware Mandate danger admonition), and configuring Docusaurus sidebar navigation for Part I.

**Technical Approach**: Use specialized agents (`book-architect` for file structure and sidebar configuration, `physical-ai-author` for educational content generation) to produce Constitution-compliant MDX files with proper frontmatter, ensure Mermaid diagram syntax correctness, verify hardware specifications against official vendor documentation, and validate final output with `npm run build`.

## Technical Context

**Language/Version**: TypeScript 4.x (Docusaurus configuration), MDX (educational content), Mermaid.js (diagrams)
**Primary Dependencies**:
- Docusaurus 3.x (static site generator)
- React 18 (Docusaurus frontend framework)
- Mermaid.js (diagram rendering)
- `docusaurus-style` skill (MDX formatting guidelines)
- `book-architect` agent (file structure and sidebar management)
- `physical-ai-author` agent (educational content generation)

**Storage**: Static MDX files in `frontend/docs/01-part-1-foundations-lab/` directory
**Testing**:
- Manual: Word count validation, Mermaid diagram render check, mobile responsiveness testing
- Automated: `npm run build` (Docusaurus build validation), frontmatter schema validation

**Target Platform**: Web (GitHub Pages deployment), mobile-responsive (375px viewport minimum per Constitution)
**Project Type**: Web documentation (Docusaurus-based educational platform)
**Performance Goals**:
- Docusaurus build time < 2 minutes (Constitution Principle VIII)
- Page load time < 2 seconds for static MDX content
- Mermaid diagram render time < 500ms

**Constraints**:
- Educational content: 800-1000 words per chapter (Constitution Principle I)
- Technical accuracy: All hardware specs verified against NVIDIA Isaac Sim 2023.1+, ROS 2 Humble, Intel RealSense D435i official documentation (Constitution Principle II)
- Mobile responsiveness: No horizontal overflow on 375px viewport (Constitution Principle VIII)
- Acronyms defined on first use (Constitution Principle I)
- Hardware Mandate admonition NON-NEGOTIABLE (Constitution Principle II)

**Scale/Scope**:
- 2 MDX chapters (Chapter 1: Embodied AI, Chapter 2: Hardware Setup)
- 1 Mermaid diagram (Brain in Box vs Brain in Body comparison)
- 1 sidebar category update (Part I: Foundations & Lab)
- Total estimated content: 1600-2000 words across both chapters

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Evaluation

**Principle I: Educational Excellence First** ✅
- ✅ Learning objectives: Will be stated at chapter start (3-5 measurable outcomes per spec FR-007, FR-015)
- ✅ Word count: 800-1000 words per chapter enforced (FR-005, FR-013)
- ✅ Structure: Introduction → Core Concepts → Code/Diagrams → Exercises → Summary (FR-007, FR-015)
- ✅ Real-world analogies: Partner Economy examples, embodiment metaphors (FR-004)
- ✅ Beginner-friendly tone: No jargon without explanation (FR-017, FR-018)
- ⚠️ **Research needed**: Best practices for explaining embodied intelligence to AI-literate but robotics-naive audience

**Principle II: Technical Accuracy & Verifiability** ✅
- ✅ Hardware specifications must be verified against official documentation (FR-022)
- ✅ Hardware Mandate admonition NON-NEGOTIABLE (FR-009)
- ✅ Terminology consistent with ROS 2 documentation (FR-016)
- ✅ Acronyms defined on first use (FR-017)
- ⚠️ **Research needed**: Current Isaac Sim 2023.1+ GPU requirements, ROS 2 Humble compatibility matrix, RealSense D435i SDK version

**Principle III: Spec-Driven Development** ✅
- ✅ Specification approved and validated (checklist passed 14/14 items)
- ✅ This planning phase follows approved spec
- ✅ No code changes without spec approval

**Principle IV: Type Safety & Async-First Design** ⚠️
- ⚠️ **Partially Applicable**: This feature generates static MDX content (no runtime code)
- ✅ Sidebar configuration uses TypeScript (`sidebars.ts`)
- ✅ Docusaurus config is TypeScript (`docusaurus.config.ts`)
- N/A: No async operations (static content generation)

**Principle V: Security & Privacy by Design** ✅
- ✅ No API keys in content (static educational material)
- ✅ No user data collection in these chapters
- N/A: No authentication or rate limiting (content-only feature)

**Principle VI: Testing & Validation** ✅
- ✅ Content validation: Word count, acronym definition check (SC-001, SC-007)
- ✅ Build validation: `npm run build` must pass (SC-004, FR-021)
- ✅ Mobile responsiveness: 375px viewport test (SC-009)
- ✅ Diagram validation: Mermaid syntax and render check (SC-006)

**Principle VII: Progressive Enhancement & Graceful Degradation** ✅
- ✅ Static MDX content always accessible (no JavaScript required for reading)
- ✅ Mermaid diagrams enhance but don't block comprehension (text descriptions included)

**Principle VIII: Performance & Scalability** ✅
- ✅ Build time target: < 2 minutes (measurable with `npm run build`)
- ✅ Mobile-responsive: No horizontal overflow (Constitution requirement)

**Principle IX: Observability & Debugging** ✅
- ✅ Docusaurus build errors will surface MDX syntax issues
- ✅ Frontmatter validation automatic in Docusaurus

**Principle X: Simplicity & Pragmatism (YAGNI)** ✅
- ✅ No over-engineering: Generate 2 MDX files, update 1 sidebar config
- ✅ No future-proofing: Implement exactly what spec requires
- ✅ Mermaid diagrams: Use simple graph syntax (avoid complex features)

### Gate Violations Requiring Justification

**None.** All Constitution principles are satisfied or not applicable for this content-generation feature.

## Project Structure

### Documentation (this feature)

```text
specs/002-part1-foundations-lab/
├── plan.md              # This file (/sp.plan command output)
├── spec.md              # Feature specification (completed)
├── research.md          # Phase 0 output (will be generated)
├── data-model.md        # Phase 1 output (will be generated - lightweight for content feature)
├── quickstart.md        # Phase 1 output (will be generated)
├── checklists/
│   └── requirements.md  # Spec quality checklist (completed, all items passing)
└── contracts/           # Phase 1 output (will contain content structure schemas)
```

### Source Code (repository root)

```text
frontend/                      # Docusaurus web application
├── docs/                      # Educational content (MDX chapters)
│   ├── 01-part-1-foundations-lab/            # THIS FEATURE - Part I directory
│   │   ├── 01-chapter-1-embodied-ai.mdx      # THIS FEATURE - Chapter 1 (to be created)
│   │   └── 02-chapter-2-hardware-setup.mdx   # THIS FEATURE - Chapter 2 (to be created)
│   ├── 02-part-2-robotic-nervous-system/     # Future feature (out of scope)
│   ├── 03-part-3-digital-twin/               # Future feature (out of scope)
│   ├── 04-part-4-ai-robot-brain/             # Future feature (out of scope)
│   └── 05-part-5-vla-capstone/               # Future feature (out of scope)
├── src/
│   ├── components/            # React components (no changes this feature)
│   ├── css/                   # Styling (no changes this feature)
│   └── pages/                 # Landing page, about (no changes this feature)
├── static/                    # Images, assets (no changes this feature)
├── sidebars.ts                # THIS FEATURE - Sidebar configuration (to be updated)
├── docusaurus.config.ts       # Docusaurus configuration (no changes this feature)
├── package.json               # npm dependencies (no changes this feature)
└── tsconfig.json              # TypeScript config (no changes this feature)

history/                       # Project memory and decisions
└── prompts/
    └── 002-part1-foundations-lab/
        ├── 002-spec-part1-foundations-lab.spec.prompt.md  # Spec PHR (completed)
        └── 003-plan-part1-foundations-lab.plan.prompt.md  # THIS INTERACTION (will be created)

.claude/                       # Reusable intelligence library
├── agents/
│   ├── book-architect.md      # THIS FEATURE - File structure and sidebar agent (dependency)
│   └── physical-ai-author.md  # THIS FEATURE - Educational content generation agent (dependency)
└── skills/
    ├── docusaurus-style.md    # THIS FEATURE - MDX formatting skill (dependency)
    └── ros2-mermaid-patterns.md  # Optional - Diagram syntax patterns
```

**Structure Decision**: This is a **web documentation project** (Docusaurus-based). The feature modifies the `frontend/` directory only, specifically creating two MDX files in `docs/01-part-1-foundations-lab/` and updating `sidebars.ts`. No backend, API, or mobile components involved. The existing Docusaurus installation provides the build system, React framework, and deployment pipeline (GitHub Actions → GitHub Pages).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No violations to justify.** This feature adheres to all Constitution principles without requiring complexity exceptions.

## Phase 0: Research & Resolution

### Research Tasks

**RT-001: Embodied Intelligence Pedagogical Patterns**
- **Question**: What are effective teaching methods for explaining embodied AI to students with LLM knowledge but no robotics background?
- **Why needed**: Chapter 1 must bridge the conceptual gap between "Brain in a Box" (LLMs) and "Brain in a Body" (robots). Need pedagogical best practices to avoid oversimplification while remaining beginner-friendly (Constitution Principle I).
- **Research approach**:
  - Review existing robotics education literature (Springer Robotics Education series, IEEE Robotics & Automation Magazine education sections)
  - Analyze successful Physical AI courses (Stanford CS123, MIT 6.4210, CMU 16-662)
  - Identify effective analogies for sensors (eyes/ears), actuators (muscles), compute (brain)
- **Deliverable**: Recommended pedagogical structure and analogies for Chapter 1 content

**RT-002: Isaac Sim 2023.1+ GPU Requirements Verification**
- **Question**: What are the exact minimum GPU specifications for NVIDIA Isaac Sim 2023.1 or later (as of 2025)?
- **Why needed**: Chapter 2 Hardware Mandate admonition must cite accurate, current GPU requirements. Specification assumes RTX 4070 Ti (12GB VRAM) based on preliminary research, but official NVIDIA documentation must be verified (Constitution Principle II: Technical Accuracy).
- **Research approach**:
  - Access NVIDIA Isaac Sim official documentation (https://docs.omniverse.nvidia.com/isaacsim/latest/index.html)
  - Verify GPU requirements table for Isaac Sim 2023.1+ releases
  - Cross-reference with NVIDIA RTX GPU specifications (VRAM, CUDA cores, Tensor cores)
  - Check for Ubuntu 22.04 LTS compatibility notes
- **Deliverable**: Verified GPU minimum specifications (model, VRAM, OS compatibility) for Hardware Mandate admonition

**RT-003: ROS 2 Humble Hardware Compatibility Matrix**
- **Question**: What are ROS 2 Humble Hawksbill's operating system and hardware requirements (as of 2025)?
- **Why needed**: Chapter 2 lists Ubuntu 22.04 LTS as the required OS. Must verify this is the correct/recommended OS for ROS 2 Humble and compatible with Isaac Sim (Constitution Principle II).
- **Research approach**:
  - Access ROS 2 Humble documentation (https://docs.ros.org/en/humble/)
  - Verify OS support matrix (Ubuntu versions, Debian, RHEL, Windows WSL2)
  - Identify recommended OS for production ROS 2 Humble + Isaac Sim stack
  - Check for ARM compatibility (Jetson Orin Nano support)
- **Deliverable**: Verified OS requirements and recommendations for Chapter 2 workstation setup section

**RT-004: Intel RealSense D435i SDK and Specifications**
- **Question**: What are the current Intel RealSense D435i specifications and SDK compatibility (as of 2025)?
- **Why needed**: Chapter 2 lists RealSense D435i as the reference depth camera. Must verify specifications (resolution, depth range, FPS) and SDK compatibility with ROS 2 Humble + Ubuntu 22.04 (Constitution Principle II).
- **Research approach**:
  - Access Intel RealSense documentation (https://www.intel.com/content/www/us/en/support/articles/000030385/)
  - Verify D435i technical specifications (depth range, resolution, FOV, FPS)
  - Check RealSense SDK 2.x compatibility with ROS 2 Humble
  - Identify any deprecated features or recommended alternatives
- **Deliverable**: Verified RealSense D435i specifications and SDK compatibility notes for Chapter 2 sensor section

**RT-005: Mermaid Diagram Best Practices for Educational Content**
- **Question**: What Mermaid.js syntax patterns work best for educational diagrams in Docusaurus?
- **Why needed**: Chapter 1 requires a Mermaid diagram comparing "Brain in a Box" vs "Brain in a Body". Need simple, accessible syntax that renders reliably in Docusaurus without complex features that risk rendering failures (Constitution Principle X: Simplicity).
- **Research approach**:
  - Review Docusaurus Mermaid plugin documentation (https://docusaurus.io/docs/markdown-features/diagrams)
  - Test simple graph syntax patterns (flowchart LR, graph TB, block diagrams)
  - Verify mobile rendering (375px viewport compatibility)
  - Identify best practices for accessibility (alt text, fallback descriptions)
- **Deliverable**: Recommended Mermaid syntax template for Brain in Box vs Brain in Body comparison diagram

**RT-006: Jetson Orin Nano Specifications and Availability**
- **Question**: What are the NVIDIA Jetson Orin Nano specifications and current availability (as of 2025)?
- **Why needed**: Chapter 2 lists Jetson Orin Nano as the "Edge Brain". Must verify specifications (RAM, CUDA cores, power consumption) and note if supply chain issues affect availability (Constitution Principle II).
- **Research approach**:
  - Access NVIDIA Jetson developer documentation (https://developer.nvidia.com/embedded/jetson-orin)
  - Verify Jetson Orin Nano specifications (compare to Orin NX, Orin AGX)
  - Check ROS 2 Humble ARM64 compatibility
  - Review current supply chain status (if relevant for student acquisition)
- **Deliverable**: Verified Jetson Orin Nano specifications and availability notes for Chapter 2 edge hardware section

### Research Outputs Location

All research findings will be consolidated in:
```
specs/002-part1-foundations-lab/research.md
```

This file will resolve all "NEEDS CLARIFICATION" items from Technical Context and provide verified specifications for hardware requirements.

## Phase 1: Design & Contracts

### Data Model

**Entity: Chapter (MDX File)**
- This is not a traditional database entity but a structured content document
- See `data-model.md` for detailed schema

**Key attributes** (from spec.md Key Entities section):
- `id`: String (unique identifier, matches filename without extension)
- `title`: String (display title for chapter)
- `description`: String (brief summary for SEO and sidebar tooltips)
- `sidebar_position`: Integer (ordering within Part I category, 1 for Chapter 1, 2 for Chapter 2)
- `keywords`: Array<String> (SEO keywords and search terms)
- `content`: MDX (800-1000 words, structured as Objectives → Introduction → Core Concepts → Exercises → Summary)
- `learning_objectives`: Array<String> (3-5 measurable outcomes stated at chapter start)
- `acronyms`: Map<String, String> (first-use definitions, e.g., {"ROS 2": "Robot Operating System 2", "IMU": "Inertial Measurement Unit"})

**Validation rules** (enforced during generation):
- Word count: 800 ≤ content.wordCount ≤ 1000 (Constitution Principle I)
- Frontmatter: All required fields present (`id`, `title`, `description`, `sidebar_position`, `keywords`)
- Acronyms: All uppercase 2+ letter sequences defined on first use (Constitution Principle I)
- Mermaid syntax: Valid Mermaid.js syntax (Chapter 1 only, validated during build)
- Danger admonition: Present in Chapter 2 with exact Hardware Mandate text (Constitution Principle II)

### API Contracts

**This feature does not involve APIs.** It generates static MDX content consumed by Docusaurus build system.

**Content structure contracts** (will be documented in `contracts/` directory):

1. **`contracts/chapter-frontmatter-schema.yaml`**: JSON Schema for MDX frontmatter validation
2. **`contracts/sidebar-category-schema.yaml`**: TypeScript type for sidebar category structure
3. **`contracts/mermaid-diagram-template.md`**: Mermaid syntax template for Brain in Box vs Brain in Body diagram

### Sidebar Configuration Update

**File**: `frontend/sidebars.ts`

**Current structure** (from sidebars.ts read above):
- `tutorialSidebar` array contains 4 categories (Module 1-4)
- Categories use `type: 'category'`, have `label`, `link`, `collapsible`, `collapsed`, and `items` properties

**Required change** (to satisfy FR-019, FR-020):
- Add new category at the **beginning** of `tutorialSidebar` array (before Module 1)
- Category label: `"Part I: Foundations & Lab"`
- Items: `['01-part-1-foundations-lab/01-chapter-1-embodied-ai', '01-part-1-foundations-lab/02-chapter-2-hardware-setup']`
- Default state: `collapsed: false` (expanded by default, as this is foundational content)

**Updated sidebar structure**:
```typescript
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Part I: Foundations & Lab',
      collapsible: true,
      collapsed: false,  // Expanded by default (foundational content)
      items: [
        '01-part-1-foundations-lab/01-chapter-1-embodied-ai',
        '01-part-1-foundations-lab/02-chapter-2-hardware-setup',
      ],
    },
    // Existing Module 1-4 categories follow...
  ],
};
```

### Agent Context Update

**Agent**: `book-architect`
- **Role**: Manages Docusaurus file structure and sidebar configuration
- **Responsibilities for this feature**:
  - Create directory structure: `frontend/docs/01-part-1-foundations-lab/`
  - Update `frontend/sidebars.ts` with Part I category
  - Ensure `sidebar_position` values in MDX frontmatter match sidebar ordering
  - Validate sidebar TypeScript syntax

**Agent**: `physical-ai-author`
- **Role**: Generates high-fidelity educational content for Physical AI textbook
- **Responsibilities for this feature**:
  - Generate Chapter 1 content (800-1000 words) on embodied intelligence and Partner Economy
  - Generate Chapter 2 content (800-1000 words) on hardware requirements and lab setup
  - Embed Mermaid diagram in Chapter 1 (Brain in Box vs Brain in Body)
  - Include Hardware Mandate danger admonition in Chapter 2
  - Follow Constitution standards (beginner-friendly, acronyms defined, accurate specs)
  - Use `docusaurus-style` skill for MDX formatting

**Agent context update process**:
- After research.md and data-model.md are complete, run:
  ```bash
  powershell.exe -File .specify/scripts/powershell/update-agent-context.ps1 -AgentType claude
  ```
- This will update `.claude/agents/book-architect.md` and `.claude/agents/physical-ai-author.md` with:
  - Verified hardware specifications from research.md
  - Content structure schema from data-model.md
  - Mermaid diagram template from contracts/

### Quickstart Guide

**File**: `specs/002-part1-foundations-lab/quickstart.md`

This will provide a developer-friendly guide for:
1. How to generate new chapters following the same pattern
2. How to update sidebar configuration for new parts/chapters
3. How to validate MDX content (word count, acronyms, frontmatter)
4. How to test Mermaid diagrams locally before committing

## Phase 2: Tasks (Generated by /sp.tasks)

**Not created by `/sp.plan`.** This section is a placeholder. After this planning phase completes, run:

```bash
/sp.tasks
```

This will generate `specs/002-part1-foundations-lab/tasks.md` with actionable implementation tasks derived from this plan.

## Constitution Check (Post-Design Re-Evaluation)

### Post-Phase 1 Evaluation

**Changes from Pre-Phase 0 Evaluation**: None. No new Constitution violations introduced during planning. Research tasks identified (RT-001 to RT-006) will resolve Technical Context uncertainties without adding complexity.

**Final Verdict**: ✅ **ALL CONSTITUTION PRINCIPLES SATISFIED**

**Justification for any remaining violations**: N/A (no violations)

## Deployment Validation

**Pre-Deployment Checklist** (from Constitution Principle VI):
1. ✅ Deployment successful to GitHub Pages (build workflow already exists)
2. ✅ Word count validation: 800-1000 words per chapter (automated check in tasks)
3. ✅ Mobile responsive test passed: 375px viewport (manual test in tasks)
4. ✅ Mermaid diagram renders correctly (manual test in tasks)
5. ✅ `npm run build` passes with zero errors (automated check in tasks)

## Next Steps

1. **Complete Phase 0**: Generate `research.md` by executing research tasks RT-001 to RT-006
2. **Complete Phase 1**: Generate `data-model.md`, `contracts/`, and `quickstart.md`
3. **Run agent context update**: Execute `update-agent-context.ps1` to update book-architect and physical-ai-author agents
4. **Generate tasks**: Run `/sp.tasks` to create actionable implementation task list
5. **Implement**: Execute tasks using book-architect and physical-ai-author agents
6. **Validate**: Run `npm run build`, check word counts, test mobile rendering, verify Mermaid diagrams
7. **Commit**: Create PR with conventional commit messages, link to this plan and spec

## Notes

- This is a **content-generation feature**, not a code feature. Most traditional planning elements (API design, database schema, async patterns) are not applicable.
- The **primary technical risk** is ensuring educational content quality (pedagogy, accuracy, tone) rather than system functionality. Research phase (RT-001 pedagogical patterns) addresses this.
- **Hardware specification accuracy** is critical (Constitution Principle II). Research tasks RT-002 to RT-006 verify all hardware claims against official vendor documentation.
- **Mermaid diagram syntax** must be simple and reliable (RT-005). Avoid complex Mermaid features that risk rendering failures on mobile or slow connections.
- **Agent delegation** (book-architect for structure, physical-ai-author for content) separates concerns and ensures architectural consistency while leveraging specialized content generation intelligence.
