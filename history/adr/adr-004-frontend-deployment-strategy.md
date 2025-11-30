# ADR-004: Frontend Deployment Strategy

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2025-11-28
- **Feature:** 001-book-architecture
- **Context:** The educational platform's frontend is a static Docusaurus site requiring reliable and efficient deployment.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

Deploy the Docusaurus frontend to GitHub Pages using GitHub Actions for Continuous Integration and Continuous Deployment (CI/CD).
- Platform: GitHub Pages
- Automation: GitHub Actions

<!-- For technology stacks, list all components:
     - Framework: Next.js 14 (App Router)
     - Styling: Tailwind CSS v3
     - Deployment: Vercel
     - State Management: React Context (start simple)
-->

## Consequences

### Positive

- Simplified hosting for static content (GitHub Pages is free and integrated with GitHub repositories).
- Automated deployments via GitHub Actions ensure consistency and reduce manual effort.
- Version control integration with the codebase.
- Easy setup and maintenance.

<!-- Example: Integrated tooling, excellent DX, fast deploys, strong TypeScript support -->

### Negative

- GitHub Pages has limitations for very large sites or dynamic server-side functionality (not an issue for this static frontend).
- Build and deployment times can be slow if not optimized (addressed by Phase 0 research).

<!-- Example: Vendor lock-in to Vercel, framework coupling, learning curve -->

## Alternatives Considered

- **Alternative 1**: Netlify
    - Why rejected: While excellent for static sites, GitHub Pages provides deeper integration with the GitHub ecosystem (issues, pull requests, code hosting) that the project already leverages. Introducing another platform adds minor overhead for a similar outcome.
- **Alternative 2**: Vercel
    - Why rejected: Similar reasons as Netlify. Vercel is highly optimized for Next.js, but for Docusaurus, GitHub Pages offers sufficient features and tighter integration with the project's existing GitHub workflow.
- **Alternative 3**: Self-hosting on a custom server (e.g., Nginx, Apache)
    - Why rejected: Introduces infrastructure management overhead (server provisioning, maintenance, security) that is unnecessary for a static site. Increases operational costs and complexity without significant benefits for this use case.

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
