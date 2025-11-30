---
name: frontend-development
description: Create production-ready frontend interfaces with modern frameworks and styling. Use when building web components, pages, UI, layouts, or applications. Handles responsive design, accessibility, Tailwind CSS, custom CSS, and Docusaurus styling.
allowed-tools: Write, Read, Bash, Grep, Glob
---

# Frontend Development Skill

Create high-quality, production-ready frontend interfaces with attention to design, accessibility, and user experience.

## Core Responsibilities

1. **Component Development**: Build reusable, well-structured components
2. **Styling**: Implement responsive designs using Tailwind CSS or custom CSS
3. **Accessibility**: Ensure WCAG compliance and semantic HTML
4. **Performance**: Optimize for fast load times and smooth interactions
5. **Responsiveness**: Mobile-first design that works across all devices

## Styling Approach

### Tailwind CSS
- Use utility classes for rapid development
- Create custom components when patterns repeat
- Leverage responsive modifiers (sm:, md:, lg:, xl:)
- Use dark mode variants when appropriate

### Custom CSS
- For Docusaurus projects, write CSS in `src/css/custom.css`
- For Docusaurus projects Home page `frontend\src\pages\index.tsx` use custom css in `index.module.css` or `src/css/custom.css`
- For component-specific styles, use CSS modules (e.g., `index.module.css`)
- For react component, use Tailwind CSS
- Follow BEM naming convention for clarity
- Use CSS variables for theming and consistency


### Design Principles
- **Typography**: Choose readable fonts with appropriate hierarchy
- **Color**: Maintain consistent color palette with good contrast ratios
- **Spacing**: Use consistent spacing scale (4px, 8px, 16px, 24px, 32px)
- **Layout**: Flexible layouts that adapt to content and screen size


## Framework-Specific Guidelines

### React
```tsx
// Functional components with hooks
import { useState, useEffect } from 'react';

function Component({ prop }) {
  const [state, setState] = useState(initial);
  
  return (
    <div className="container">
      {/* TSX content */}
    </div>
  );
}
```

### Vanilla HTML/CSS/JS

* Semantic HTML5 elements
* Progressive enhancement
* Minimal JavaScript for interactivity

## Responsive Grid
```css
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Accessibility Checklist
 Semantic HTML elements (<nav>, <main>, <article>, etc.)
 ARIA labels where needed
 Keyboard navigation support
 Color contrast ratios (4.5:1 minimum)
 Alt text for images
 Focus indicators
 Screen reader friendly


## Best Practices
1. Component Reusability: Extract common patterns into reusable components
2. Props Validation: Use PropTypes or TypeScript for type safety
3. State Management: Keep state close to where it's used
4. Performance: Lazy load components and images when appropriate
5. Testing: Write tests for critical user interactions
6. Documentation: Add comments for complex logic


## When to Use This Skill
1. Building new web pages or components
2. Implementing UI designs or mockups
3. Adding responsive layouts
4. Styling with Tailwind CSS or custom CSS
5. Creating accessible interfaces
6. Optimizing frontend performance
7. Refactoring existing frontend code


## Output Quality

Always deliver:

* Clean, readable code
* Responsive across all screen sizes
* Accessible to all users
* Performant and optimized
* Well-documented and maintainable
* Consistent with project conventions