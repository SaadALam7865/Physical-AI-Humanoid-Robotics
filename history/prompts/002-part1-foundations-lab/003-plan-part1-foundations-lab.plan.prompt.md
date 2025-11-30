---
id: 003
title: Part 1 Foundations Lab Implementation Planning
stage: plan
date: 2025-11-29
surface: claude-code
model: claude-sonnet-4-5-20250929
feature: 002-part1-foundations-lab
branch: 002-part1-foundations-lab
user: Cyb3r
command: /sp.plan
labels: [educational-content, docusaurus, research, hardware-specs, mermaid-diagrams]
links:
  spec: specs/002-part1-foundations-lab/spec.md
  ticket: N/A
  adr: N/A
  pr: N/A
files:
  - path: specs/002-part1-foundations-lab/plan.md
    lines_added: 399
    description: Complete implementation plan with technical context, Constitution check, and phase guidance
  - path: specs/002-part1-foundations-lab/research.md
    lines_added: 350
    description: Research findings for 6 tasks (pedagogy, hardware specs, Mermaid patterns)
  - path: specs/002-part1-foundations-lab/data-model.md
    lines_added: 250
    description: MDX chapter schema and sidebar configuration data model
  - path: specs/002-part1-foundations-lab/contracts/chapter-frontmatter-schema.yaml
    lines_added: 60
    description: JSON Schema for MDX frontmatter validation
  - path: specs/002-part1-foundations-lab/contracts/sidebar-category-schema.yaml
    lines_added: 75
    description: TypeScript type for sidebar category structure
  - path: specs/002-part1-foundations-lab/contracts/mermaid-diagram-template.md
    lines_added: 120
    description: Mermaid diagram template with Brain in Box vs Brain in Body example
  - path: specs/002-part1-foundations-lab/quickstart.md
    lines_added: 400
    description: Developer guide for adding new chapters to textbook
tests:
  - type: constitution-check
    status: pass
    description: All Constitution principles satisfied (no violations)
  - type: research-validation
    status: pass
    description: All 6 research tasks completed with verified specifications
---

## Prompt

```text
/sp.plan

## Objective
Implement Part I of the Physical AI textbook by generating two MDX chapters and updating the Docusaurus sidebar according to the approved specification.

## Scope
- Create Chapter 1 and Chapter 2 MDX files.
- Follow Constitution requirements (800–1000 words, frontmatter, acronyms defined, accuracy).
- Add Mermaid diagram (Chapter 1) and danger Hardware Mandate (Chapter 2).
- Update `frontend/sidebars.ts` with a new "Part I: Foundations & Lab" category.

## Tasks
1. **File Creation**
   - Generate `01-chapter-1-embodied-ai.mdx` at `frontend/docs/01-part-1-foundations-lab/`
   - Generate `02-chapter-2-hardware-setup.mdx` at the same path.

2. **Chapter Content Requirements**
   - Chapter 1: Foundations, Partner Economy, Embodied Intelligence, Mermaid diagram.
   - Chapter 2: Hardware Mandate, workstation specs, Jetson Orin, RealSense D435i, verification steps.
   - Both: Clear learning objectives → intro → core content → exercises → summary.

3. **Technical Requirements**
   - 800–1000 words each.
   - Define acronyms on first use.
   - Use Docusaurus MDX formatting, admonitions, and code blocks correctly.
   - Ensure accuracy with ROS 2, Intel RealSense, and NVIDIA docs.

4. **Sidebar Update**
   - Add new category: **Part I: Foundations & Lab**
   - Insert Chapter 1 and Chapter 2 with correct ordering (`sidebar_position`).
   - Ensure sidebar works on mobile.

5. **Validation**
   - Word count check.
   - Mermaid diagram renders.
   - `npm run build` succeeds with zero errors.
   - Both chapters readable on desktop + mobile.

## Deliverables
- Two complete MDX chapter files.
- Updated and valid `sidebars.ts`.
- Fully buildable Docusaurus project with Part I visible and navigable.
```

## Response snapshot

**Summary**: Successfully completed implementation planning for Book Part 1 (Foundations and Hardware Lab). Generated comprehensive plan with technical context, completed 6 research tasks to verify hardware specifications, created data model for MDX chapter structure, defined content contracts (frontmatter schema, sidebar schema, Mermaid template), and produced developer quickstart guide.

**Key Actions Taken**:

1. **Technical Context Filled** (plan.md):
   - Language/Version: TypeScript 4.x (Docusaurus), MDX (content), Mermaid.js (diagrams)
   - Dependencies: Docusaurus 3.x, React 18, book-architect agent, physical-ai-author agent, docusaurus-style skill
   - Storage: Static MDX files in `frontend/docs/01-part-1-foundations-lab/`
   - Performance Goals: Build < 2 minutes, page load < 2 seconds, Mermaid render < 500ms
   - Constraints: 800-1000 words/chapter, mobile-responsive (375px), hardware specs verified, acronyms defined

2. **Constitution Check Pre-Phase 0** (plan.md):
   - ✅ All 10 Constitution principles evaluated
   - ✅ No gate violations requiring justification
   - ⚠️ Identified 2 research needs: Pedagogical patterns (RT-001), Hardware specs verification (RT-002 to RT-006)

3. **Phase 0: Research Execution** (research.md):
   - **RT-001** (Pedagogy): Adopted contrast-based learning with "Brain in a Box" vs "Brain in a Body" metaphor; Partner Economy framing
   - **RT-002** (Isaac Sim GPU): Verified RTX 4070 Ti 12GB minimum; finalized Hardware Mandate admonition text
   - **RT-003** (ROS 2 Humble OS): Confirmed Ubuntu 22.04 LTS as recommended OS for workstation and Jetson
   - **RT-004** (RealSense D435i): Verified specs (0.3-3m range, RGB+Depth+IMU), ROS 2 Humble support confirmed
   - **RT-005** (Mermaid Diagrams): Recommended `graph LR` with two subgraphs; provided template
   - **RT-006** (Jetson Orin Nano): Verified 40 TOPS, 8GB RAM, $199-$249 price, ROS 2 native support

4. **Phase 1: Design & Contracts** (data-model.md, contracts/):
   - **Data Model**: Defined Chapter (MDX File) entity with frontmatter schema, content structure, validation rules
   - **Contract 1**: JSON Schema for frontmatter validation (5 required fields: id, title, description, sidebar_position, keywords)
   - **Contract 2**: TypeScript type for sidebar category structure (Part I configuration)
   - **Contract 3**: Mermaid diagram template with Brain in Box vs Brain in Body example code
   - **Quickstart Guide**: Developer guide for adding new chapters (8 steps, Constitution checklist, troubleshooting)

5. **Constitution Check Post-Phase 1** (plan.md):
   - ✅ No new violations introduced during planning
   - ✅ Final verdict: ALL CONSTITUTION PRINCIPLES SATISFIED
   - ✅ Ready for Phase 2 (/sp.tasks)

**Key Decisions**:

- **Pedagogical Approach**: Use contrast-based learning pattern with Brain in a Box vs Brain in a Body metaphor as primary teaching device; Partner Economy framing for collaborative robotics
- **Hardware Specifications**:
  - Workstation GPU: RTX 4070 Ti (12GB VRAM) minimum verified against NVIDIA Isaac Sim 4.0 docs
  - OS: Ubuntu 22.04 LTS (only Tier 1 support for both ROS 2 Humble and Isaac Sim)
  - Edge Brain: Jetson Orin Nano (40 TOPS, 8GB RAM, native ROS 2 support)
  - Sensor: Intel RealSense D435i (0.3-3m range, RGB+Depth+IMU, ROS 2 wrapper available)
- **Mermaid Diagram Syntax**: `graph LR` with two subgraphs for side-by-side comparison; simple shapes for mobile compatibility
- **Content Structure**: 800-1000 words per chapter with strict structure (Objectives → Intro → Concepts → Diagrams → Exercises → Summary)
- **Agent Delegation**: book-architect handles file structure and sidebar, physical-ai-author generates educational content

**Research Sources Cited**:
- NVIDIA Isaac Sim 4.0 Release Notes, RTX GPU Specifications
- ROS 2 Humble Documentation, REP-2000 Platform Support Matrix
- NVIDIA JetPack 6.0 Release Notes, Jetson Orin Documentation
- Intel RealSense D435i Datasheet, librealsense2 GitHub
- Docusaurus Mermaid Plugin Documentation, Mermaid.js Official Docs
- Robotics education literature (Matarić 2007, Murphy 2019, Stanford CS123)

**Notable Patterns**:
- **Content-Generation Feature Adaptation**: Adapted traditional plan template (API design, database schema) for static content generation; focused on content structure schemas instead
- **Research-Driven Planning**: 6 research tasks resolved all technical uncertainties before Phase 1 design; all hardware specs verified against official vendor documentation (Constitution Principle II)
- **Contract-Based Content Generation**: Created JSON Schema for frontmatter, TypeScript types for sidebar, Mermaid templates → Enables automated validation and consistency
- **Quickstart as Knowledge Transfer**: Comprehensive developer guide captures patterns established in Part I; enables future chapter creation without re-planning

## Outcome

- ✅ Impact: Implementation plan complete with research findings, data model, contracts, and quickstart guide. Ready for task generation (/sp.tasks).
- 🧪 Tests: Constitution Check passed (no violations), Research validation passed (all 6 tasks completed with verified specs)
- 📁 Files:
  - `plan.md` (399 lines)
  - `research.md` (350 lines)
  - `data-model.md` (250 lines)
  - `contracts/chapter-frontmatter-schema.yaml` (60 lines)
  - `contracts/sidebar-category-schema.yaml` (75 lines)
  - `contracts/mermaid-diagram-template.md` (120 lines)
  - `quickstart.md` (400 lines)
- 🔁 Next prompts:
  - `/sp.tasks` to generate actionable implementation task list
  - `/sp.implement` to execute tasks using book-architect and physical-ai-author agents
- 🧠 Reflection: Planning phase successfully balanced educational rigor (pedagogy research, Constitution alignment) with technical accuracy (hardware spec verification). The research phase (RT-001 to RT-006) proved critical for resolving Technical Context uncertainties. Contract-based approach (frontmatter schema, Mermaid template) will enable automated validation during implementation. Quickstart guide captures institutional knowledge for future chapter creation, reducing planning overhead for Parts II-V.

## Evaluation notes (flywheel)

- Failure modes observed: None. Planning completed without clarification needs or gate violations.
- Graders run and results (PASS/FAIL):
  - Constitution Check (Pre-Phase 0): PASS (2 research needs identified, no violations)
  - Research Validation: PASS (6/6 tasks completed with verified specifications)
  - Constitution Check (Post-Phase 1): PASS (no new violations introduced)
  - Data Model Completeness: PASS (Chapter schema, validation rules, relationships defined)
  - Contract Quality: PASS (3 contracts with examples, validation guidance)
- Prompt variant (if applicable): Standard /sp.plan workflow with user-provided implementation guidance
- Next experiment (smallest change to try): Monitor if book-architect and physical-ai-author agents successfully interpret research findings (verified hardware specs, pedagogical patterns) during implementation phase. If agents request clarification on specs already verified in research.md, refine agent context update process to ensure research findings are properly ingested.
