# Data Model: Chapter 3 Structure

## MDX File Structure

The chapter will be composed of 6 MDX files in `frontend/docs/01-part-1-foundations-lab/03-chapter-3-physical-ai-architecture/`.

### 1. `00-intro.mdx`
**Frontmatter**:
- `id`: `physical-ai-architecture`
- `title`: "Physical AI Architecture: From Cloud to Edge"
- `description`: "Understanding the 3-tier hardware architecture of embodied intelligence."
- `sidebar_position`: 3

**Content**:
- Learning Objectives
- Hook ("Why your laptop isn't enough")
- **Mandatory Hardware Warning** (`:::danger`)

### 2. `01-three-tier-architecture.mdx` (Concept)
**Content**:
- The "Brain in a Box" vs. "Brain in a Body" recap.
- **Mermaid Diagram 1**: The 3 Tiers.
- Tier 1: Workstation (The Dreamer / Trainer).
- Tier 2: Edge (The Reflexes / Inference).
- Tier 3: Robot (The Body / Actuation).

### 3. `02-sim-to-real-workflow.mdx` (Concept)
**Content**:
- The concept of the "Digital Twin".
- **Mermaid Diagram 2**: Sim-to-Real Pipeline.
- The "Gap" (why things fail).

### 4. `03-data-flow.mdx` (Concept)
**Content**:
- Bandwidth constraints.
- Why we don't stream raw video to the cloud.
- The "Edge Compute" necessity.

### 5. `04-lab-setup.mdx` (Lab)
**Content**:
- **Exercise 1**: Network Setup (finding IPs).
- **Exercise 2**: The Ping Test.
- **Exercise 3**: Hello World ROS 2 (Cross-Device).
    - Code Block 1: `publisher.py` (Workstation)
    - Code Block 2: `subscriber.py` (Jetson)

### 6. `05-summary.mdx`
**Content**:
- Recap of key concepts.
- **Exercise 4**: "List 3 tasks..." (Conceptual check).
- Preview of Chapter 4 (ROS 2).

## Component Usage Rules

- **Admonitions**:
    - `:::danger` for Hardware Requirements and Safety warnings.
    - `:::tip` for debugging shortcuts.
    - `:::info` for context.
- **Tabs**:
    - Used in `04-lab-setup.mdx` to show "Workstation" vs "Jetson" terminals side-by-side.
- **Mermaid**:
    - Used for all architecture diagrams.
