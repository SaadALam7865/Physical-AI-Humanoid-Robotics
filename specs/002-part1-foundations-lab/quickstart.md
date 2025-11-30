# Quickstart Guide: Adding New Chapters to the Physical AI Textbook

**Feature**: `002-part1-foundations-lab`
**Date**: 2025-11-29
**Purpose**: Developer guide for creating, validating, and deploying Docusaurus MDX chapters following Constitution standards

## Overview

This guide shows how to add new chapters to the Physical AI & Humanoid Robotics textbook using the patterns established in Part I (Foundations & Lab). Follow these steps to maintain consistency with Constitution principles.

## Prerequisites

- Docusaurus 3.x installed in `frontend/` directory
- Node.js 18+ and npm
- Text editor with MDX syntax highlighting (VS Code recommended)
- Access to `book-architect` and `physical-ai-author` agents (for automated content generation)

## Step 1: Create Chapter Directory Structure

**Manual Approach**:
```bash
# Navigate to docs directory
cd frontend/docs

# Create part directory (if new part)
mkdir -p 01-part-1-foundations-lab

# Verify directory exists
ls -la 01-part-1-foundations-lab
```

**Agent Approach** (recommended):
Use the `book-architect` agent to create directory structure and sidebar configuration automatically.

## Step 2: Generate Chapter MDX File

### File Naming Convention

**Pattern**: `{chapter-number}-chapter-{chapter-id}.mdx`

**Examples**:
- Chapter 1: `01-chapter-1-embodied-ai.mdx`
- Chapter 2: `02-chapter-2-hardware-setup.mdx`
- Chapter 3: `03-chapter-3-ros2-intro.mdx`

### Frontmatter Template

Copy this template and customize for your chapter:

\`\`\`yaml
---
id: {chapter-number}-chapter-{chapter-id}
title: "{Chapter Title in Title Case}"
description: "{100-150 character SEO-friendly summary of chapter content}"
sidebar_position: {integer starting from 1}
keywords: ["{keyword1}", "{keyword2}", "{keyword3}", "{keyword4}", "{keyword5}"]
---
\`\`\`

**Validation**:
- `id` must match filename (without `.mdx` extension)
- `description` must be 100-150 characters (SEO requirement)
- `keywords` array should have 5-10 terms (for search optimization)

### Content Structure Template

Use this structure for all chapters (Constitution Principle I requirement):

\`\`\`markdown
# {Chapter Title}

## Learning Objectives

By the end of this chapter, you will be able to:
- {Action verb} {specific outcome} (e.g., "Define Physical AI and contrast it with Digital AI")
- {Action verb} {specific outcome} (e.g., "Explain the Partner Economy collaboration model")
- {Action verb} {specific outcome} (e.g., "Identify key components of an embodied robot system")

## Introduction

{Hook paragraph: Start with engaging example, question, or scenario to motivate the chapter}
{100 words}

## {Section 1: Core Concept}

{Conceptual explanation with analogies}
{200-300 words}

### {Subsection if needed}

{Detail or example}

## {Section 2: Visual/Diagram/Code}

{Mermaid diagram, image, or code block with explanation}

{Fallback text description for accessibility}

## {Section 3: Application/Examples}

{Real-world scenarios, Partner Economy examples, or hands-on demonstrations}
{200-300 words}

## Exercises

1. {Conceptual question or thought experiment}
2. {Practical exercise or code task}
3. {Analysis or comparison task}

## Summary

{Recap key points, reinforce learning objectives, preview next chapter}
{100 words}
\`\`\`

**Target Word Count**: 800-1000 words (excluding frontmatter, code blocks, diagrams)

## Step 3: Add Mermaid Diagrams (Optional)

### Mermaid Syntax

Use Mermaid for system architecture, workflows, or concept comparisons:

\`\`\`markdown
\`\`\`mermaid
graph LR
    A[Node 1] --> B[Node 2]
    B --> C[Node 3]
\`\`\`
\`\`\`

**Best Practices**:
- Use simple diagram types: `graph LR` (left-to-right), `graph TB` (top-to-bottom)
- Avoid complex features (subgraphs with many nodes, custom themes) for mobile compatibility
- Test diagram at 375px viewport width (mobile responsiveness requirement)
- Always include fallback text description below diagram

**Template**: See `contracts/mermaid-diagram-template.md` for Brain in a Box vs Brain in a Body example

### Mobile Testing

```bash
# Start Docusaurus dev server
cd frontend
npm start

# Open browser DevTools (F12)
# Toggle device toolbar (Ctrl+Shift+M)
# Set viewport to 375px width
# Verify diagram renders without horizontal overflow
```

## Step 4: Add Critical Admonitions (If Applicable)

### Danger Admonition (Critical Warnings)

Use for hardware requirements, security warnings, or critical setup steps:

\`\`\`markdown
:::danger Hardware Mandate

**Standard laptops will NOT work.** Isaac Sim requires:
- **GPU**: NVIDIA RTX 4070 Ti (12GB VRAM) or higher
- **OS**: Ubuntu 22.04 LTS

{Explanation of why and consequences of ignoring}
:::
\`\`\`

### Other Admonition Types

- `:::note`: General information or helpful tips
- `:::tip`: Best practices or recommendations
- `:::info`: Additional context or references
- `:::caution`: Mild warnings or things to watch out for

**Reference**: See Chapter 2 (`02-chapter-2-hardware-setup.mdx`) for Hardware Mandate example

## Step 5: Update Sidebar Configuration

### File: `frontend/sidebars.ts`

Add your chapter to the appropriate Part/Section:

\`\`\`typescript
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Part I: Foundations & Lab',
      collapsible: true,
      collapsed: false,  // Expanded by default
      items: [
        '01-part-1-foundations-lab/01-chapter-1-embodied-ai',
        '01-part-1-foundations-lab/02-chapter-2-hardware-setup',
        '01-part-1-foundations-lab/03-chapter-3-your-new-chapter',  // ADD HERE
      ],
    },
    // ... other categories
  ],
};
\`\`\`

**Validation**:
- Doc ID in `items` array must match MDX frontmatter `id` field
- Order in `items` array determines sidebar sequence
- TypeScript will error if `sidebars.ts` has syntax issues

## Step 6: Validate Content

### Word Count Check

```bash
# Use word count tool (Linux/Mac)
cd frontend/docs/01-part-1-foundations-lab
# Exclude frontmatter and code blocks
sed -n '/^---$/,/^---$/!p' 01-chapter-1-embodied-ai.mdx | \
  sed '/^```/,/^```/d' | \
  wc -w

# Target: 800-1000 words
```

**Manual Validation**:
- Copy chapter content (excluding frontmatter and code) to Google Docs
- Use word count feature (Tools → Word count)

### Acronym Definition Check

**Rule**: All uppercase 2+ letter sequences must be defined on first use

**Pattern**: `{ACRONYM} - {Full Name} ({brief explanation})`

**Examples**:
- ✅ "ROS 2 - Robot Operating System 2 (middleware for robotics)"
- ✅ "IMU - Inertial Measurement Unit (gyroscope + accelerometer)"
- ❌ "Use ROS 2 for robot programming" (no definition provided)

**Validation Script** (Linux/Mac):
```bash
# Find potential undefined acronyms
grep -oE '\b[A-Z]{2,}\b' 01-chapter-1-embodied-ai.mdx | sort -u

# Manually verify each acronym is defined on first use
```

### Frontmatter Schema Validation

Use the JSON Schema validator:

```bash
# Install validator (if not already installed)
npm install -g ajv-cli

# Validate frontmatter
# Extract frontmatter from MDX file first
sed -n '1,/^---$/p' frontend/docs/01-part-1-foundations-lab/01-chapter-1-embodied-ai.mdx > /tmp/frontmatter.yaml

# Validate against schema
ajv validate -s specs/002-part1-foundations-lab/contracts/chapter-frontmatter-schema.yaml -d /tmp/frontmatter.yaml
```

**Expected Output**: `frontmatter.yaml valid`

## Step 7: Build and Test Locally

### Run Docusaurus Build

```bash
cd frontend

# Build project
npm run build

# Expected output: "Success! Generated static files in 'build'."
# Any errors will be displayed here
```

**Common Build Errors**:
- **Frontmatter missing fields**: Add required fields (`id`, `title`, `description`, `sidebar_position`, `keywords`)
- **Mermaid syntax error**: Check Mermaid diagram syntax in Mermaid Live Editor (https://mermaid.live/)
- **Broken doc ID in sidebar**: Ensure doc ID in `sidebars.ts` matches MDX frontmatter `id`

### Start Dev Server

```bash
cd frontend
npm start

# Open http://localhost:3000 in browser
# Navigate to your chapter via sidebar
```

**Manual Tests**:
1. **Navigation**: Verify chapter appears in sidebar under correct Part/Section
2. **Frontmatter**: Check title, description display correctly
3. **Mermaid Diagram**: Verify diagram renders (if applicable)
4. **Admonitions**: Check danger/warning boxes display correctly
5. **Mobile**: Test at 375px viewport width (Chrome DevTools)
   - No horizontal overflow
   - Sidebar readable
   - Diagrams scale appropriately
6. **Links**: Click all internal links (to other chapters, external docs)

## Step 8: Commit Changes

### Conventional Commits Format

```bash
# Stage changes
git add frontend/docs/01-part-1-foundations-lab/03-chapter-3-your-new-chapter.mdx
git add frontend/sidebars.ts

# Commit with conventional commit message
git commit -m "docs: add Chapter 3 on ROS 2 introduction

- Add 03-chapter-3-ros2-intro.mdx (900 words)
- Update sidebar with Part I Chapter 3 entry
- Include Mermaid diagram of ROS 2 architecture
- Define all acronyms on first use (ROS 2, DDS, QoS)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to feature branch
git push origin {your-branch-name}
```

**Commit Message Format**:
- **Type**: `docs` (for documentation/content changes)
- **Scope**: Chapter number or Part (e.g., `docs(part1): add Chapter 3`)
- **Body**: Bullet points describing changes
- **Footer**: Claude Code attribution (if using agent-generated content)

## Agent-Based Workflow (Recommended)

Instead of manual steps, use specialized agents:

### Using `book-architect` Agent

Handles directory structure and sidebar configuration:

```markdown
Generate Part I Chapter 3 directory structure and update sidebar:
- Chapter ID: 03-chapter-3-ros2-intro
- Sidebar position: 3
- Part: Part I: Foundations & Lab
```

### Using `physical-ai-author` Agent

Generates educational content following Constitution standards:

```markdown
Generate Chapter 3 content:
- Topic: Introduction to ROS 2 (Robot Operating System 2)
- Word count: 800-1000 words
- Learning objectives: Define ROS 2, explain DDS middleware, describe publish-subscribe pattern
- Include: Mermaid diagram of ROS 2 node graph
- Analogies: ROS 2 nodes = apps on a smartphone, topics = chat channels
- Exercises: 2-3 conceptual questions
- Constitution compliance: Beginner-friendly tone, define all acronyms, technically accurate
```

**Advantages**:
- Automated consistency with Constitution principles
- Faster content generation (minutes vs hours)
- Built-in validation (word count, acronyms, structure)

## Constitution Checklist

Before committing, verify your chapter meets all Constitution principles:

### Principle I: Educational Excellence First
- [ ] 800-1000 words (excluding frontmatter, code blocks)
- [ ] 3-5 learning objectives stated at chapter start
- [ ] Structure: Introduction → Core Concepts → Diagrams/Code → Exercises → Summary
- [ ] Beginner-friendly tone (no jargon without explanation)
- [ ] Real-world analogies where appropriate
- [ ] Exercises at end of chapter

### Principle II: Technical Accuracy & Verifiability
- [ ] All hardware specs verified against official documentation
- [ ] Terminology consistent with official ROS 2 / vendor docs
- [ ] Acronyms defined on first use
- [ ] Code examples tested and runnable (if applicable)
- [ ] Links to official documentation provided

### Principle VI: Testing & Validation
- [ ] `npm run build` passes with zero errors
- [ ] Chapter renders correctly in dev server
- [ ] Mobile responsive (no horizontal overflow at 375px)
- [ ] Mermaid diagrams render correctly (if applicable)
- [ ] All internal links resolve correctly

## Troubleshooting

### Build Fails with "Cannot resolve doc ID"

**Cause**: Doc ID in `sidebars.ts` doesn't match MDX frontmatter `id`

**Fix**:
```typescript
// In sidebars.ts
items: [
  '01-part-1-foundations-lab/03-chapter-3-ros2-intro',  // Must match frontmatter id
]
```

```yaml
# In MDX frontmatter
id: 03-chapter-3-ros2-intro  # Must match sidebar entry
```

### Mermaid Diagram Doesn't Render

**Cause**: Syntax error in Mermaid code

**Fix**:
1. Copy Mermaid code to https://mermaid.live/
2. Fix syntax errors identified by live editor
3. Paste corrected code back into MDX file

### Word Count Too Low/High

**Cause**: Content doesn't meet 800-1000 word requirement

**Fix**:
- **Too low (<800)**: Expand Core Concepts section with more examples, add subsections
- **Too high (>1000)**: Remove redundant explanations, tighten prose, move details to footnotes

### Horizontal Overflow on Mobile

**Cause**: Wide Mermaid diagram or code block

**Fix**:
- **Mermaid**: Use vertical layout (`graph TB`) instead of horizontal (`graph LR`)
- **Code**: Add horizontal scroll CSS (Docusaurus handles this automatically for code blocks)

## References

- **Docusaurus Documentation**: https://docusaurus.io/docs/
- **Mermaid.js Documentation**: https://mermaid.js.org/
- **Constitution**: `.specify/memory/constitution.md`
- **Spec Template**: `.specify/templates/spec-template.md`
- **Data Model**: `specs/002-part1-foundations-lab/data-model.md`
- **Contracts**: `specs/002-part1-foundations-lab/contracts/`

## Next Steps

After creating your chapter:

1. **Generate Tasks**: Run `/sp.tasks` to create implementation task list
2. **Implement**: Execute tasks using agents or manual workflow
3. **Validate**: Run all checks in Step 6-7
4. **Commit**: Use conventional commit format (Step 8)
5. **Deploy**: Push to feature branch, create PR, merge to main → GitHub Actions deploys to GitHub Pages

---

**Questions?** Refer to this quickstart or consult the feature specification (`specs/002-part1-foundations-lab/spec.md`) and implementation plan (`specs/002-part1-foundations-lab/plan.md`).
