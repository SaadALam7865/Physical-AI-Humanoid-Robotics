# ADR-005: Docusaurus Frontend Styling Architecture

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2025-11-29
- **Feature:** docusaurus-styling
- **Context:** The project requires a Docusaurus-based documentation site with specific visual styling for its sidebar, content, footer, and navigation. The existing `CLAUDE.md` specifies Tailwind CSS as the frontend styling framework. The need is to establish a clear architectural approach for implementing these styles, ensuring consistency, maintainability, and alignment with the Docusaurus framework.

## Decision

- **Custom CSS Integration**: Implement global style overrides and custom theming primarily through `frontend/src/css/custom.css`, integrated into the Docusaurus build process via `docusaurus.config.ts`.
- **Styling Framework**: Continue to leverage Tailwind CSS for utility-first styling, responsive design, and efficient application of visual properties.
- **Component-level Styling**: For complex or interactive UI elements (e.g., navigation buttons), integrate styling within existing or newly created React components in `frontend/src/components/`, ensuring adherence to Tailwind CSS principles.

## Consequences

### Positive

- Achieves precise visual fidelity as per design specifications.
- Maintains consistency across the Docusaurus site.
- Leverages the benefits of Tailwind CSS for rapid development and responsive design.
- Provides a centralized custom CSS file for easy management of global styles.

### Negative

- Requires careful management of custom CSS to avoid conflicts with Docusaurus's default styles or future Docusaurus updates.
- Potential for increased CSS bundle size if custom styles are not optimized, though Tailwind's purging helps mitigate this.
- Debugging may require understanding both Docusaurus's internal CSS structure and the custom Tailwind-driven styles.

## Alternatives Considered

- **Exclusive Docusaurus Theming API Usage**: Rely solely on Docusaurus's built-in theming capabilities, potentially limiting granular control over specific design elements and potentially requiring more overrides of Docusaurus's default components, which might be less efficient for extensive custom designs.
- **Pure CSS Modules/Other CSS-in-JS without Tailwind**: While offering component-level encapsulation, this would deviate from the established Tailwind CSS framework in `CLAUDE.md`, introducing a new styling methodology and potentially increasing development overhead for responsive design and utility classes.

## References

- Feature Spec: specs/001-docusaurus-styling/spec.md
- Implementation Plan: specs/001-docusaurus-styling/plan.md
- Related ADRs:
- Evaluator Evidence:
