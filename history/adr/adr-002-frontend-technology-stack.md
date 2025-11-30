# ADR-002: Frontend Technology Stack

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2025-11-28
- **Feature:** 001-book-architecture
- **Context:** Selection of core technologies for the user-facing educational platform to ensure a performant, maintainable, and feature-rich experience.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

Adopt Docusaurus 3.6.3 as the static site generator, with React 18.3.1 for UI components, `@docusaurus/theme-mermaid` for diagram support, and `prism-react-renderer` for code syntax highlighting.
- Static Site Generator: Docusaurus 3.6.3
- UI Framework: React 18.3.1
- Diagrams: `@docusaurus/theme-mermaid`
- Code Highlighting: `prism-react-renderer`

<!-- For technology stacks, list all components:
     - Framework: Next.js 14 (App Router)
     - Styling: Tailwind CSS v3
     - Deployment: Vercel
     - State Management: React Context (start simple)
-->

## Consequences

### Positive

- Docusaurus provides robust out-of-the-box features for documentation sites (sidebar, search, versioning).
- React offers a flexible and powerful component model for custom UI.
- Mermaid integration allows for clear, maintainable architecture diagrams.
- Prism ensures high-quality, configurable code highlighting.
- Strong community support for Docusaurus and React.

<!-- Example: Integrated tooling, excellent DX, fast deploys, strong TypeScript support -->

### Negative

- Learning curve for Docusaurus-specific configurations and MDX.
- Potential for dependency conflicts with many Docusaurus plugins (mitigated by sticking to official plugins).

<!-- Example: Vendor lock-in to Vercel, framework coupling, learning curve -->

## Alternatives Considered

- **Alternative 1**: Next.js with MDX
    - Why rejected: Docusaurus is purpose-built for documentation sites, offering many features (sidebar, routing, content plugins) out-of-the-box that would need to be built or integrated manually in Next.js, increasing development overhead.
- **Alternative 2**: Gatsby with MDX
    - Why rejected: Similar to Next.js, requires more manual setup for documentation-specific features. Gatsby's ecosystem can be complex, and Docusaurus offers a more streamlined experience for this use case.
- **Alternative 3**: Plain HTML/CSS/JavaScript
    - Why rejected: High development effort to achieve required features (navigation, search, styling, content management). Lack of component reusability and structured content handling.

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
