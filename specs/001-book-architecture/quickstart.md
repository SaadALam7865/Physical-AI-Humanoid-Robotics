# Quickstart Guide

#### Developer Onboarding (5 Minutes)

**Prerequisites**:
- Node.js 18.x or higher installed
- Git installed
- Text editor (VS Code recommended)

**Setup Steps**:

1.  **Clone Repository**:
    ```bash
    git clone https://github.com/uneezaismail/Physical-AI-Humanoid-Robotics.git
    cd Physical-AI-Humanoid-Robotics
    git checkout 001-book-architecture  # Feature branch
    ```

2.  **Install Dependencies**:
    ```bash
    cd frontend
    npm install
    ```
    Expected output: `added 1847 packages` (Docusaurus + dependencies)

3.  **Start Development Server**:
    ```bash
    npm start
    ```
    Expected output:
    ```
    [SUCCESS] Docusaurus website is running at http://localhost:3000/
    ```

4.  **Verify Setup**:
    -   Open http://localhost:3000 in browser
    -   Verify sidebar shows 4 modules
    -   Click Module 1 → Verify 6 chapters listed
    -   Click first chapter → Verify page renders

5.  **Run Tests**:
    ```bash
    npm run build          # Verify build completes (< 2 minutes)
    npm run lint           # Verify TypeScript linting passes
    npx markdownlint "docs/**/*.mdx"  # Verify Markdown syntax
    ```

#### Creating a New Chapter (10 Minutes)

1.  **Create MDX File**:
    ```bash
    touch docs/module-1/new-chapter.mdx
    ```

2.  **Add Frontmatter** (copy from `contracts/chapter-frontmatter.schema.yaml` example):
    ```yaml
    ---
    id: new-chapter
    title: "New Chapter Title"
    description: "Brief summary of chapter content (complete sentence)."
    sidebar_position: 8  # Use gap numbering
    keywords:
      - "ROS 2"
      - "Physical AI"
      - "specific-topic"
    ---
    ```

3.  **Add Required Sections**:
    -   Learning Objectives
    -   Prerequisites
    -   Introduction
    -   Main Content (with code examples)
    -   Practical Exercises
    -   Summary
    -   Further Reading
    -   Troubleshooting

4.  **Update Sidebar**:
    Edit `sidebars.ts` → Add `'module-1/new-chapter'` to Module 1 items array

5.  **Verify**:
    ```bash
    npm start  # Check chapter appears in sidebar
    ```

#### Troubleshooting Common Issues

**Issue**: `npm install` fails with EACCES error
**Solution**: Run `sudo chown -R $(whoami) ~/.npm` to fix npm permissions

**Issue**: Port 3000 already in use
**Solution**: Run `npm start -- --port 3001` to use different port

**Issue**: TypeScript errors in sidebars.ts
**Solution**: Ensure all chapter IDs in `items` array match actual .mdx files (case-sensitive)

**Issue**: Mermaid diagrams not rendering
**Solution**: Verify `themes: ['@docusaurus/theme-mermaid']` in docusaurus.config.ts
