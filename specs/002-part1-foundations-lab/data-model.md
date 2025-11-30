# Data Model: Book Part 1 - Foundations and Hardware Lab

**Feature**: `002-part1-foundations-lab`
**Date**: 2025-11-29
**Purpose**: Define structured content schemas for MDX chapters and Docusaurus sidebar configuration

## Overview

This feature generates **static educational content** (MDX files) rather than traditional database entities. The "data model" describes the structure of MDX frontmatter, content organization, and sidebar configuration.

## Entity: Chapter (MDX File)

### Description
A Chapter is an educational content unit represented as an MDX file in the Docusaurus documentation system. Each chapter contains frontmatter metadata (YAML), structured prose content (Markdown), and optional interactive elements (Mermaid diagrams, code blocks, admonitions).

### Schema

**File Format**: MDX (Markdown + JSX)
**Location**: `frontend/docs/01-part-1-foundations-lab/{filename}.mdx`
**Naming Convention**: `{chapter-number}-chapter-{chapter-id}.mdx`

#### Frontmatter (YAML Header)

```yaml
---
id: string                      # Unique identifier (matches filename without extension)
title: string                   # Display title (used in sidebar and page header)
description: string             # Brief summary (SEO meta description, sidebar tooltip)
sidebar_position: integer       # Ordering within parent category (1-based index)
keywords: string[]              # SEO keywords and search terms
---
```

**Field Constraints**:
- `id`: Must match filename pattern (`01-chapter-1-embodied-ai` → id: `01-chapter-1-embodied-ai`)
- `title`: 3-10 words, descriptive (e.g., "The Era of Embodied Intelligence")
- `description`: 100-150 characters, SEO-friendly summary
- `sidebar_position`: Integer, determines order in sidebar (Chapter 1 = 1, Chapter 2 = 2)
- `keywords`: Array of 5-10 terms (e.g., `["Physical AI", "embodied intelligence", "robotics", "Partner Economy"]`)

#### Content Structure (MDX Body)

```markdown
# {Chapter Title}

## Learning Objectives
- {Objective 1: Measurable outcome, action verb (define, explain, identify)}
- {Objective 2: ...}
- {Objective 3: ...}
- {Objective 4: ...}
- {Objective 5: ...}

## Introduction
{Hook paragraph: Engaging example or question to motivate the chapter (100 words)}

## {Section 1: Core Concept}
{Conceptual explanation with analogies (200-300 words)}

### {Subsection if needed}
{Detail or example}

## {Section 2: Visual/Diagram}
{Mermaid diagram or image with caption}

{Fallback text description for accessibility}

## {Section 3: Application/Examples}
{Real-world scenarios or Partner Economy examples (200-300 words)}

## Exercises
1. {Exercise 1: Thought experiment or conceptual question}
2. {Exercise 2: ...}

## Summary
{Recap of learning objectives and preview of next chapter (100 words)}
```

**Content Constraints** (Constitution Principle I):
- **Word Count**: 800-1000 words (excluding frontmatter, code blocks, and Mermaid diagrams)
- **Learning Objectives**: 3-5 measurable outcomes using action verbs (Bloom's Taxonomy: define, explain, analyze, compare)
- **Structure**: Must follow Introduction → Core Concepts → Diagrams/Examples → Exercises → Summary
- **Tone**: Beginner-friendly, no jargon without definition, real-world analogies
- **Acronyms**: All 2+ letter uppercase terms defined on first use (Constitution Principle I)

### Chapter 1 Specific Requirements

**File**: `frontend/docs/01-part-1-foundations-lab/01-chapter-1-embodied-ai.mdx`

**Frontmatter**:
```yaml
---
id: 01-chapter-1-embodied-ai
title: "The Era of Embodied Intelligence"
description: "Explore the fundamental difference between digital AI (LLMs) and Physical AI (embodied robots) and discover the Partner Economy where humans, AI agents, and robots collaborate."
sidebar_position: 1
keywords: ["Physical AI", "embodied intelligence", "robotics", "Partner Economy", "LLM", "sensors", "actuators"]
---
```

**Mermaid Diagram Requirement** (FR-002):
- Must include diagram comparing "Brain in a Box" (LLM) vs "Brain in a Body" (Robot)
- Use `graph LR` with two `subgraph` blocks
- Template available in `contracts/mermaid-diagram-template.md`

**Content Topics** (from spec FR-003, FR-004):
- Define Physical AI: AI systems that interact with and manipulate physical world through embodied hardware (sensors, actuators, compute)
- Contrast with Digital AI: LLMs process text/tokens; robots process sensory data and execute physical actions
- Partner Economy: Humans (strategic thinking) + AI Agents (pattern recognition) + Robots (physical execution)
- Real-world examples: Warehouse AMRs, surgical robots, autonomous vehicles

### Chapter 2 Specific Requirements

**File**: `frontend/docs/01-part-1-foundations-lab/02-chapter-2-hardware-setup.mdx`

**Frontmatter**:
```yaml
---
id: 02-chapter-2-hardware-setup
title: "Building the Lab: Hardware Setup"
description: "Learn the exact hardware requirements for Physical AI development: NVIDIA RTX workstations, Jetson Orin Nano edge compute, Intel RealSense sensors, and the critical Hardware Mandate for Isaac Sim."
sidebar_position: 2
keywords: ["NVIDIA RTX", "Jetson Orin Nano", "Intel RealSense D435i", "Isaac Sim", "hardware requirements", "Ubuntu 22.04", "ROS 2 Humble"]
---
```

**Hardware Mandate Admonition Requirement** (FR-009, CRITICAL):
- Must include Docusaurus `:::danger` admonition block
- Exact text from research.md RT-002 decision
- Positioned early in chapter (before detailed hardware listings)

**Content Topics** (from spec FR-010, FR-011, FR-012):
- **Workstation Specs**: NVIDIA RTX 4070 Ti (12GB VRAM) or RTX 3090 (24GB VRAM), Ubuntu 22.04 LTS
- **Edge Brain**: NVIDIA Jetson Orin Nano (40 TOPS, 8GB RAM, JetPack 6.0)
- **Sensors**: Intel RealSense D435i (depth camera + RGB + IMU), specifications from research.md RT-004
- **Verification Steps**: How to check GPU VRAM, Ubuntu version, ROS 2 installation

## Entity: Part/Section (Sidebar Category)

### Description
A Part is an organizational grouping of related chapters in the Docusaurus sidebar. Part I contains Chapters 1 and 2.

### Schema (TypeScript)

**File**: `frontend/sidebars.ts`

```typescript
interface SidebarCategory {
  type: 'category';
  label: string;               // Display name in sidebar
  collapsible: boolean;        // Whether category can be collapsed
  collapsed: boolean;          // Default state (true = collapsed, false = expanded)
  items: string[];             // Array of doc IDs or nested categories
  link?: {                     // Optional category link
    type: 'doc';
    id: string;
  };
}
```

**Part I Category Configuration**:
```typescript
{
  type: 'category',
  label: 'Part I: Foundations & Lab',
  collapsible: true,
  collapsed: false,  // Expanded by default (foundational content)
  items: [
    '01-part-1-foundations-lab/01-chapter-1-embodied-ai',
    '01-part-1-foundations-lab/02-chapter-2-hardware-setup',
  ],
}
```

**Constraints**:
- Category label must clearly indicate content scope ("Part I: Foundations & Lab")
- `collapsed: false` for Part I (foundational content should be visible by default)
- `items` array order determines chapter sequence in sidebar
- Doc IDs in `items` must match `id` field in corresponding MDX frontmatter

## Validation Rules

### MDX Frontmatter Validation

**Required Fields**:
- All 5 frontmatter fields (`id`, `title`, `description`, `sidebar_position`, `keywords`) must be present
- Validation: Docusaurus build will error if required fields missing

**Field Format Validation**:
- `id`: Alphanumeric + hyphens only, matches filename
- `sidebar_position`: Positive integer
- `keywords`: Non-empty array of strings

### Content Validation

**Word Count** (Constitution Principle I):
- **Target**: 800-1000 words per chapter (excluding frontmatter, code blocks, diagrams)
- **Validation**: Manual count using word count tool during review
- **Enforcement**: Content generation agent (`physical-ai-author`) instructed to target 900 words

**Acronym Definition** (Constitution Principle I):
- **Rule**: All uppercase 2+ letter sequences must be defined on first use
- **Format**: "ACRONYM - Full Name (brief explanation)"
- **Examples**:
  - "ROS 2 - Robot Operating System 2"
  - "IMU - Inertial Measurement Unit (gyroscope + accelerometer for motion sensing)"
  - "TOPS - Tera Operations Per Second (AI inference performance metric)"
- **Validation**: Manual review or regex search for undefined acronyms

**Mermaid Diagram Syntax** (Chapter 1 only):
- **Validation**: Docusaurus build will error if Mermaid syntax invalid
- **Mobile Test**: Render diagram at 375px viewport width, verify no horizontal overflow
- **Template**: See `contracts/mermaid-diagram-template.md`

**Hardware Mandate Admonition** (Chapter 2 only, NON-NEGOTIABLE per Constitution Principle II):
- **Validation**: Search file for `:::danger` and "Hardware Mandate" text
- **Exact Text Required**: See `research.md` RT-002 decision section
- **Enforcement**: Automated check in tasks (grep for `:::danger` in Chapter 2 MDX file)

### Sidebar Configuration Validation

**TypeScript Type Check**:
- **Validation**: `npm run typecheck` (TypeScript compiler validates `sidebars.ts` against `SidebarsConfig` type)
- **Error Handling**: Build fails if sidebar config has type errors

**Doc ID Resolution**:
- **Validation**: Docusaurus build resolves doc IDs to actual MDX files
- **Error Handling**: Build warns if doc ID in sidebar has no corresponding MDX file

## Relationships

**Part I (Sidebar Category)**
- HAS MANY: Chapters (1:N relationship)
- Chapter 1: `01-part-1-foundations-lab/01-chapter-1-embodied-ai`
- Chapter 2: `01-part-1-foundations-lab/02-chapter-2-hardware-setup`

**Chapter (MDX File)**
- BELONGS TO: One Part/Section
- CONTAINS: Frontmatter (metadata), Content (prose + diagrams), Learning Objectives, Exercises, Summary

**Mermaid Diagram (embedded in Chapter 1)**
- PART OF: Chapter 1 content
- RENDERS AS: SVG (via Mermaid.js plugin)
- HAS: Fallback text description (accessibility)

## State Transitions

**MDX files are static content** (no runtime state). However, content generation workflow has states:

1. **Draft**: Content generated by `physical-ai-author` agent, not yet validated
2. **Review**: Word count checked, acronyms validated, Mermaid diagram tested
3. **Validated**: All validation rules passed, ready for commit
4. **Published**: Committed to git, deployed to GitHub Pages via GitHub Actions

## Indexes/Lookups

**Sidebar Lookup**:
- **Key**: Doc ID (e.g., `01-part-1-foundations-lab/01-chapter-1-embodied-ai`)
- **Value**: MDX file path (`frontend/docs/01-part-1-foundations-lab/01-chapter-1-embodied-ai.mdx`)
- **Mechanism**: Docusaurus content plugin resolves IDs to file paths during build

**Keyword Search** (Docusaurus search plugin):
- **Key**: Keywords from frontmatter (`keywords` array)
- **Value**: Chapter MDX file
- **Mechanism**: Docusaurus Algolia search indexes frontmatter keywords

## Notes

- **No Traditional Database**: This "data model" describes file structure, not database schema
- **Validation at Build Time**: Docusaurus validates frontmatter, resolves doc IDs, and renders Mermaid diagrams during `npm run build`
- **Static Site Generation**: MDX files compiled to static HTML at build time; no runtime database queries
- **Version Control**: MDX files tracked in git; changes trigger GitHub Actions deployment workflow
