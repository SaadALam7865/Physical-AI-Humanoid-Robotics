# Data Model: Book Architecture and Structure

This document defines the key entities and their relationships for the Physical AI & Humanoid Robotics interactive textbook.

## Entities

1.  **Module** (Represented as Docusaurus sidebar category + index.mdx file)
    -   **Attributes**:
        -   `id`: string (kebab-case, e.g., "module-1")
        -   `label`: string (display name, e.g., "Module 1: Foundations of Physical AI & ROS 2")
        -   `description`: string (2-3 sentences summarizing module scope)
        -   `prerequisites`: string[] (IDs of prerequisite modules, empty array for Module 1)
        -   `estimatedDuration`: string (e.g., "3 weeks")
        -   `difficulty`: enum ("Beginner" | "Intermediate")
        -   `chapters`: Chapter[] (ordered list of chapter references)
    -   **Validation Rules**:
        -   Exactly 4 modules in system (SC-001)
        -   Module IDs must be sequential: module-1, module-2, module-3, module-4
        -   Label must follow format: "Module {N}: {Theme}"
        -   Prerequisites must form acyclic dependency graph (no circular dependencies)
    -   **File Representation**: `docs/module-{n}/index.mdx` frontmatter + `sidebars.ts` category object

2.  **Chapter** (Represented as individual .mdx file)
    -   **Attributes**:
        -   `id`: string (kebab-case slug, e.g., "intro-physical-ai")
        -   `title`: string (display title, max 80 chars for readability)
        -   `description`: string (SEO description, max 160 chars)
        -   `sidebarLabel`: string (optional, short label for sidebar, defaults to title)
        -   `sidebarPosition`: integer (order within module, 1-indexed with gaps for future insertion)
        -   `keywords`: string[] (3-7 keywords for search and SEO)
        -   `wordCount`: integer (800-1000 words excluding code blocks, enforced by linter)
        -   `codeExamples`: integer (2-3 complete examples, validated by pattern matching)
        -   `exercises`: integer (2-4 practical exercises, validated by section headings)
        -   `diagrams`: integer (≥1 Mermaid diagram, validated by \`\`\`mermaid code blocks)
        -   `prerequisites`: string[] (IDs of prerequisite chapters, can be empty for first chapter)
    -   **Validation Rules**:
        -   Chapter ID must be unique across all modules
        -   Title must include domain-specific terminology (FR-008)
        -   Description must be complete sentence ending with period
        -   sidebarPosition values must have gaps (e.g., 1, 2, 3, 5, 7) per FR-020
        -   All frontmatter fields mandatory except sidebarLabel (FR-005)
    -   **File Representation**: `docs/module-{n}/{chapter-id}.mdx`

3.  **Prerequisite** (Represented as metadata within Chapter frontmatter + content section)
    -   **Attributes**:
        -   `sourceChapterId`: string (chapter that has the prerequisite requirement)
        -   `targetChapterId`: string (chapter that must be completed first)
        -   `reason`: string (brief explanation of why prerequisite is needed, 1 sentence)
        -   `type`: enum ("hard" | "recommended") - hard = essential, recommended = helpful but optional
    -   **Validation Rules**:
        -   No circular dependencies (detected via topological sort)
        -   Target chapter must exist and have lower sidebarPosition than source
        -   Prerequisites within same module preferred (cross-module prerequisites noted explicitly)
    -   **File Representation**: Listed in chapter's "Prerequisites" section as Markdown links

4.  **SidebarConfiguration** (Represented in sidebars.ts TypeScript file)
    -   **Attributes**:
        -   `tutorialSidebar`: SidebarCategory[] (array of module categories)
    -   **SidebarCategory**:
        -   `type`: "category" (fixed value)
        -   `label`: string (module label matching Module entity)
        -   `link`: { type: "doc", id: string } (points to module index.mdx)
        -   `collapsible`: boolean (always true per FR-010)
        -   `collapsed`: boolean (false for Module 1, true for Modules 2-4 per FR-010)
        -   `items`: string[] (array of chapter IDs in `module-{n}/{chapter-id}` format)
    -   **Validation Rules**:
        -   Exactly 1 sidebar named "tutorialSidebar" (FR-009)
        -   Exactly 4 categories in array (SC-001)
        -   Items array length must match chapter count per module (6, 5, 4, 3 per SC-002)
        -   All item IDs must reference existing .mdx files (SC-018 validates via file structure check)
    -   **File Representation**: `frontend/sidebars.ts` exported TypeScript object

## Relationships

-   Module 1:N Chapter (one module contains many chapters)
-   Chapter M:N Chapter (many-to-many via prerequisites, but must be acyclic)
-   SidebarConfiguration 1:N Module (sidebar contains all modules)
-   Module 1:1 SidebarCategory (bijective mapping)
