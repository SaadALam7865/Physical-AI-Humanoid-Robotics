# Quickstart: Writing Chapter 3

## Prerequisites

1. **Workspace**: Ensure you are in `frontend/`.
2. **Docusaurus**: Run `npm start` to preview changes live.
3. **Assets**: No static images required (using Mermaid); if needed, place in `frontend/static/img/chapter3/`.

## Step-by-Step Guide

1. **Create Directory**:
   ```bash
   mkdir -p frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture
   ```

2. **Create Files**:
   Create the 6 MDX files defined in `data-model.md`.

3. **Drafting Content**:
   - Start with `00-intro.mdx`. **CRITICAL**: Add the `:::danger` Hardware Requirement block immediately.
   - For `01-three-tier-architecture.mdx`, insert the Mermaid diagram first, then write text around it.
   - For `04-lab-setup.mdx`, use `<Tabs>` to separate Workstation commands from Jetson commands.

4. **Verification**:
   - Check the "Sim-to-Real" terminology matches the Constitution.
   - Verify the Python code in `04-lab-setup.mdx` has type hints.

## Common Pitfalls

- **Forgeting the Hardware Warning**: This is a constitution violation.
- **Confusing Tier 1 and Tier 2**: Remember, Isaac Sim runs on Tier 1 (Workstation), *inference* runs on Tier 2 (Jetson).
- **Broken Mermaid**: Docusaurus can be picky. Test diagrams in the live preview.
