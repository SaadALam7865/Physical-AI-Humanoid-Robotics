# Mermaid Diagram Template: Brain in a Box vs Brain in a Body

**Feature**: `002-part1-foundations-lab`
**Chapter**: Chapter 1 (01-chapter-1-embodied-ai.mdx)
**Purpose**: Visual comparison of Digital AI (LLMs) vs Physical AI (embodied robots)

## Diagram Code

Use this Mermaid syntax in Chapter 1 MDX file:

\`\`\`mermaid
graph LR
    subgraph Digital["🧠 Brain in a Box (Digital AI)"]
        A1[Text Input]
        A2[LLM Processor<br/>GPT-4, Claude, Gemini]
        A3[Text Output]
        A1 --> A2 --> A3
    end

    subgraph Physical["🤖 Brain in a Body (Physical AI)"]
        B1[Sensors<br/>Cameras, LiDAR, IMU]
        B2[Edge Compute<br/>Jetson Orin Nano]
        B3[Actuators<br/>Motors, Grippers]
        B4[Physical Actions<br/>Navigate, Manipulate, Sense]
        B1 --> B2 --> B3 --> B4
        B4 -.Feedback Loop.-> B1
    end

    style Digital fill:#f0f8ff,stroke:#4682b4,stroke-width:2px
    style Physical fill:#fff8f0,stroke:#ff8c42,stroke-width:2px
\`\`\`

## Rendered Diagram Description

**Left Side (Digital AI)**:
- **Node 1**: Text Input (user provides text prompt)
- **Node 2**: LLM Processor (GPT-4, Claude, Gemini processes text)
- **Node 3**: Text Output (LLM generates text response)
- **Flow**: Linear (input → process → output)
- **Environment**: Closed loop (no interaction with physical world)

**Right Side (Physical AI)**:
- **Node 1**: Sensors (Cameras, LiDAR, IMU perceive physical world)
- **Node 2**: Edge Compute (Jetson Orin Nano processes sensor data)
- **Node 3**: Actuators (Motors, Grippers execute physical actions)
- **Node 4**: Physical Actions (Navigate, Manipulate, Sense in real world)
- **Flow**: Cyclic (sensors → compute → actuators → physical actions → feedback to sensors)
- **Environment**: Open loop (continuous interaction with physical world)

**Key Difference**:
- Digital AI operates in a **closed text-only environment** (no physical presence)
- Physical AI operates in an **open physical environment** (embodied in hardware, interacts with real world)

## Accessibility Fallback Text

Include this text immediately after the Mermaid diagram in Chapter 1:

\`\`\`markdown
*Figure 1: Comparison of Digital AI and Physical AI architectures. Digital AI (left) processes text in a linear flow: text input → LLM processor (GPT-4, Claude, Gemini) → text output. Physical AI (right) operates in a continuous feedback loop: sensors (cameras, LiDAR, IMU) perceive the world → edge compute (Jetson Orin Nano) processes data → actuators (motors, grippers) execute actions → physical actions (navigate, manipulate, sense) affect the world → sensors perceive changes, closing the loop. The key distinction is that Digital AI operates in a closed text-only environment, while Physical AI is embodied in hardware and interacts continuously with the physical world.*
\`\`\`

## Styling Notes

**Color Coding** (optional, enhances visual distinction):
- **Digital AI subgraph**: Light blue background (`#f0f8ff`), blue border (`#4682b4`)
- **Physical AI subgraph**: Light orange background (`#fff8f0`), orange border (`#ff8c42`)

**Rationale**: Color coding helps visually separate the two concepts, especially for learners who are visual thinkers.

**Mobile Compatibility**: The `graph LR` layout automatically switches to vertical stacking on narrow screens (375px viewport). Docusaurus Mermaid plugin handles responsive rendering.

## Validation Checklist

Before committing Chapter 1, verify:

- [ ] Diagram renders correctly in Docusaurus dev server (`npm start`)
- [ ] No syntax errors in Mermaid code
- [ ] Diagram displays side-by-side on desktop (>768px width)
- [ ] Diagram stacks vertically on mobile (375px width)
- [ ] No horizontal overflow on mobile
- [ ] Fallback text description included immediately after diagram
- [ ] Diagram enhances comprehension (can be understood without reading code)

## Alternatives (if `graph LR` doesn't render well)

If the side-by-side layout causes mobile rendering issues, use vertical layout:

\`\`\`mermaid
graph TB
    subgraph Digital["🧠 Brain in a Box (Digital AI)"]
        A1[Text Input]
        A2[LLM Processor]
        A3[Text Output]
        A1 --> A2 --> A3
    end

    subgraph Physical["🤖 Brain in a Body (Physical AI)"]
        B1[Sensors: Cameras, LiDAR, IMU]
        B2[Edge Compute: Jetson Orin Nano]
        B3[Actuators: Motors, Grippers]
        B4[Physical Actions in Real World]
        B1 --> B2 --> B3 --> B4
        B4 -.Feedback.-> B1
    end
\`\`\`

**Note**: `graph TB` (top-to-bottom) may work better on mobile if `graph LR` (left-to-right) causes layout issues. Test both during validation phase.

## References

- Mermaid.js Documentation: https://mermaid.js.org/syntax/flowchart.html
- Docusaurus Mermaid Plugin: https://docusaurus.io/docs/markdown-features/diagrams
- Research Finding: See `research.md` RT-005 (Mermaid Diagram Best Practices)
