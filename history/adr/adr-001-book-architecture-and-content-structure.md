# ADR-001: Book Architecture and Content Structure

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2025-11-28
- **Feature:** 001-book-architecture
- **Context:** The project aims to create an interactive educational platform for Physical AI & Humanoid Robotics. A core requirement is a well-structured and navigable textbook. This decision establishes the foundational content organization.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

Implement a Docusaurus-based documentation structure with 4 modules and 18 chapters, utilizing MDX files for educational content. Each module will have a specific theme and a defined number of chapters, organized hierarchically in the Docusaurus sidebar.
- Framework: Docusaurus 3.6.3
- Content Format: MDX files
- Structure: 4 Modules (Module 1: Foundations of Physical AI & ROS 2, Module 2: Perception & Sensors, Module 3: Motion Planning & Control, Module 4: Simulation & Testing)
- Chapters: 18 chapters total (6 in Module 1, 5 in Module 2, 4 in Module 3, 3 in Module 4)
- Navigation: Docusaurus sidebar with collapsible categories and semantic slugs.

<!-- For technology stacks, list all components:
     - Framework: Next.js 14 (App Router)
     - Styling: Tailwind CSS v3
     - Deployment: Vercel
     - State Management: React Context (start simple)
-->

## Consequences

### Positive

- Clear and structured learning path for students.
- Modular content design supports scalability and future additions.
- Leverages Docusaurus's robust features for documentation.
- Consistent navigation and content organization.

<!-- Example: Integrated tooling, excellent DX, fast deploys, strong TypeScript support -->

### Negative

- Initial overhead in setting up Docusaurus and defining content structure.
- Strict adherence to MDX and frontmatter conventions required from content creators.

<!-- Example: Vendor lock-in to Vercel, framework coupling, learning curve -->

## Alternatives Considered

- **Alternative 1**: Custom static site generator (e.g., Jekyll, Hugo)
    - Why rejected: Higher development effort for features readily available in Docusaurus (sidebar generation, search, versioning). Less community support for educational content features.
- **Alternative 2**: Dynamic CMS (e.g., WordPress, Ghost)
    - Why rejected: Overkill for a static educational textbook, introduces backend complexity and maintenance for content that doesn't require dynamic updates. Slower page loads.
- **Alternative 3**: Single large Markdown files per module
    - Why rejected: Poor navigability, difficult to manage content length and structure, hinders progressive learning, and reduces SEO granularity.

<!-- Group alternatives by cluster:
     Alternative Stack A: Remix + styled-components + Cloudflare
     Alternative Stack B: Vite + vanilla CSS + AWS Amplify
     Why rejected: Less integrated, more setup complexity
-->

## References

- Feature Spec: specs/001-book-architecture/spec.md
- Implementation Plan: specs/001-book-architecture/plan.md
- Related ADRs: N/A
- Evaluator Evidence: <!-- link to eval notes/PHR showing graders and outcomes -->
