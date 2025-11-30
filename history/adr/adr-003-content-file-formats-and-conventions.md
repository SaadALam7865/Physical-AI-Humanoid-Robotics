# ADR-003: Content File Formats and Conventions

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2025-11-28
- **Feature:** 001-book-architecture
- **Context:** To ensure consistency, maintainability, and searchability of educational content within the Docusaurus platform.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

Enforce specific content conventions:
- Chapter files must use `.mdx` extension.
- YAML frontmatter is mandatory for each chapter, including `id` (kebab-case slug), `title` (max 80 chars), `description` (max 160 chars, ends with period), `sidebar_position` (integer with gaps), and `keywords` (3-7 strings).
- Each chapter must contain specific sections in order: Learning Objectives, Prerequisites, Introduction, [Main Content Sections], Practical Exercises, Summary, Further Reading, Troubleshooting.
- Chapter IDs in `sidebars.ts` must match file paths without extension (semantic slugs).

<!-- For technology stacks, list all components:
     - Framework: Next.js 14 (App Router)
     - Styling: Tailwind CSS v3
     - Deployment: Vercel
     - State Management: React Context (start simple)
-->

## Consequences

### Positive

- Standardized content structure improves readability and authoring consistency.
- Enforced metadata (frontmatter) enhances SEO and content discoverability.
- Semantic slugs ensure stable URLs and flexible chapter reordering without breaking links.
- Explicit sectioning (e.g., Prerequisites, Exercises) supports pedagogical goals.

<!-- Example: Integrated tooling, excellent DX, fast deploys, strong TypeScript support -->

### Negative

- Requires content creators to adhere strictly to defined formats and schemas.
- Validation tools (e.g., markdownlint, JSON Schema validators) need to be integrated into the workflow.

<!-- Example: Vendor lock-in to Vercel, framework coupling, learning curve -->

## Alternatives Considered

- **Alternative 1**: Plain Markdown files (`.md`)
    - Why rejected: Lacks support for embedded React components, limiting interactivity and rich content possibilities that MDX offers.
- **Alternative 2**: Looser frontmatter schema
    - Why rejected: Leads to inconsistent metadata, poor SEO, and difficulty in automated content processing or validation.
- **Alternative 3**: Numeric chapter IDs
    - Why rejected: Makes reordering chapters complex as it would break URLs and require mass renaming. Semantic slugs provide much greater flexibility (FR-007).

<!-- Group alternatives by cluster:
     Alternative Stack A: Remix + styled-components + Cloudflare
     Alternative Stack B: Vite + vanilla CSS + AWS Amplify
     Why rejected: Less integrated, more setup complexity
-->

## References

- Feature Spec: specs/001-book-architecture/spec.md
- Implementation Plan: specs/001-book-architecture/plan.md
- Data Model: specs/001-book-architecture/data-model.md
- Related ADRs: N/A
- Evaluator Evidence: <!-- link to eval notes/PHR showing graders and outcomes -->
