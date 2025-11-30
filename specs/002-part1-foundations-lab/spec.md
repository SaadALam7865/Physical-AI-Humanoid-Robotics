# Feature Specification: Book Part 1 - Foundations and Hardware Lab

**Feature Branch**: `002-part1-foundations-lab`
**Created**: 2025-11-29
**Status**: Draft
**Input**: User description: "Feature: Book Part 1 - Foundations and Hardware Lab - Create the educational content for Part I: Foundations and The Lab of the Physical AI Textbook. This establishes the theoretical baseline and the critical hardware environment."

## User Scenarios & Testing

### User Story 1 - Understanding Embodied Intelligence Foundations (Priority: P1)

A student or professional new to Physical AI needs to understand the fundamental difference between traditional digital AI (LLMs) and embodied intelligence (robots that interact with the physical world). They want to grasp why robots represent a paradigm shift in AI and how the "Partner Economy" (humans + AI agents + robots) will transform industries.

**Why this priority**: This is the foundational knowledge required before any practical work. Without understanding WHY Physical AI matters and HOW it differs from traditional AI, students cannot appreciate the technical details in subsequent chapters. This chapter sets the philosophical and conceptual groundwork.

**Independent Test**: Can be fully tested by asking a student to explain the difference between "Brain in a Box" (LLM) and "Brain in a Body" (Robot) after reading, and to describe one example of the Partner Economy. Success means they can articulate the embodiment concept without technical jargon.

**Acceptance Scenarios**:

1. **Given** a learner with basic AI knowledge, **When** they read Chapter 1, **Then** they can define Physical AI as AI systems that interact with and manipulate the physical world through embodied hardware
2. **Given** a learner reading the chapter, **When** they encounter the Mermaid diagram comparing "Brain in a Box" vs "Brain in a Body", **Then** they understand the conceptual difference between digital-only AI and embodied AI
3. **Given** a learner completing Chapter 1, **When** asked to describe the Partner Economy, **Then** they can explain how humans, AI agents, and robots collaborate in real-world scenarios
4. **Given** a learner finishing the chapter, **When** they review the learning objectives, **Then** they can self-assess whether they achieved all 3-5 stated outcomes

---

### User Story 2 - Setting Up Physical AI Development Environment (Priority: P1)

A developer or student wants to set up their workstation and edge computing hardware to run Isaac Sim, ROS 2, and interact with physical robot platforms (Unitree Go2). They need to know EXACTLY what hardware is required, what won't work (standard laptops), and how to verify their setup is correct.

**Why this priority**: Without proper hardware, students cannot follow along with subsequent chapters. This is a critical "gate" - if users don't have the right equipment, they need to know immediately (Chapter 2) rather than discovering it later after investing time. The Hardware Mandate warning prevents frustration and wasted effort.

**Independent Test**: Can be fully tested by having a student verify their system meets the requirements checklist (RTX 4070 Ti/3090, Ubuntu 22.04, Jetson Orin Nano available, Intel RealSense D435i sensor). Success means they either confirm they meet requirements or understand they need to acquire specific hardware before proceeding.

**Acceptance Scenarios**:

1. **Given** a student planning their setup, **When** they read Chapter 2, **Then** they immediately see the Hardware Mandate danger admonition stating standard laptops will NOT work
2. **Given** a student reviewing hardware requirements, **When** they check the specifications list, **Then** they see clear minimum requirements: NVIDIA RTX 4070 Ti (12GB VRAM) or RTX 3090 for the workstation
3. **Given** a student with a standard laptop, **When** they read the Hardware Mandate, **Then** they understand they cannot proceed with Isaac Sim chapters without upgrading hardware
4. **Given** a student setting up their lab, **When** they follow the chapter, **Then** they can identify and acquire the required components: Workstation GPU, Jetson Orin Nano, Intel RealSense D435i, IMUs
5. **Given** a student completing the hardware setup, **When** they verify their configuration, **Then** they confirm Ubuntu 22.04 LTS is installed and GPU drivers are functional

---

### User Story 3 - Navigating Educational Platform Structure (Priority: P2)

A learner accessing the Docusaurus-based textbook wants to navigate to Part I chapters, understand how the chapters are organized in the sidebar, and verify they are in the correct section (Part I: Foundations & Lab) before diving into content.

**Why this priority**: Good navigation is essential for usability, but it's secondary to the actual educational content (P1 stories). Users can still learn from excellent content even with mediocre navigation, but excellent navigation with poor content is worthless.

**Independent Test**: Can be tested by asking a new user to locate Chapter 1 and Chapter 2 in the sidebar under "Part I: Foundations & Lab" within 30 seconds. Success means the sidebar structure is intuitive and matches user expectations.

**Acceptance Scenarios**:

1. **Given** a user visiting the Docusaurus site, **When** they open the sidebar, **Then** they see "Part I: Foundations & Lab" as a clearly labeled section
2. **Given** a user in the sidebar, **When** they expand Part I, **Then** they see Chapter 1 (Embodied Intelligence) and Chapter 2 (Hardware Setup) in sequential order
3. **Given** a user reading Chapter 1, **When** they finish and want to proceed, **Then** they can easily navigate to Chapter 2 via sidebar or next-page link
4. **Given** a user accessing the site on mobile (375px viewport), **When** they open the sidebar, **Then** the Part I section is readable and navigable

---

### Edge Cases

- What happens when a student attempts to run Isaac Sim on hardware below minimum specs (e.g., RTX 3060 with 8GB VRAM)? **Answer**: Chapter 2 must explicitly warn that Isaac Sim will fail or run at unusable frame rates, preventing wasted setup time.
- How does the system handle students who skip Chapter 2 and jump directly to later simulation chapters? **Answer**: Each subsequent chapter should reference hardware requirements with a link back to Chapter 2.
- What happens when a student on Windows (not Ubuntu 22.04) reads Chapter 2? **Answer**: Chapter should clarify that Ubuntu 22.04 LTS is required for ROS 2 Humble and Isaac Sim compatibility, with WSL2 as a possible workaround (but not recommended for GPU-intensive work).
- How does the content address students who already have Jetson Orin hardware but different sensors (not RealSense D435i)? **Answer**: Chapter should note that RealSense D435i is the reference sensor for book examples, but other depth cameras can work with code adaptations (not covered in book).

## Requirements

### Functional Requirements

- **FR-001**: System MUST create Chapter 1 MDX file at path `docs/01-part-1-foundations-lab/01-chapter-1-embodied-ai.mdx` with complete educational content
- **FR-002**: Chapter 1 MUST include a Mermaid diagram visually comparing "Brain in a Box" (LLM) to "Brain in a Body" (Robot) to illustrate embodied intelligence
- **FR-003**: Chapter 1 MUST define Physical AI as AI systems that interact with and manipulate the physical world through embodied hardware (sensors, actuators, compute)
- **FR-004**: Chapter 1 MUST explain the "Partner Economy" concept where humans, AI agents, and robots collaborate to accomplish tasks
- **FR-005**: Chapter 1 MUST contain 800-1000 words of substantive educational content (per Constitution Principle I)
- **FR-006**: Chapter 1 MUST include frontmatter with fields: `id`, `title`, `description`, `sidebar_position`, `keywords`
- **FR-007**: Chapter 1 MUST follow the structure: Learning Objectives → Introduction → Core Concepts → Mermaid Diagram → Exercises → Summary
- **FR-008**: System MUST create Chapter 2 MDX file at path `docs/01-part-1-foundations-lab/02-chapter-2-hardware-setup.mdx` with complete hardware specifications
- **FR-009**: Chapter 2 MUST include a Docusaurus `:::danger` admonition block explicitly stating the Constitution Hardware Mandate: "Standard laptops will NOT work. NVIDIA RTX 4070 Ti (12GB VRAM) or higher is required for Isaac Sim."
- **FR-010**: Chapter 2 MUST list workstation specifications: NVIDIA RTX 4070 Ti or RTX 3090 GPU, Ubuntu 22.04 LTS operating system
- **FR-011**: Chapter 2 MUST list edge computing specifications: NVIDIA Jetson Orin Nano as the "Edge Brain"
- **FR-012**: Chapter 2 MUST list required sensor hardware: Intel RealSense D435i depth camera, IMUs (Inertial Measurement Units)
- **FR-013**: Chapter 2 MUST contain 800-1000 words of substantive educational content (per Constitution Principle I)
- **FR-014**: Chapter 2 MUST include frontmatter with fields: `id`, `title`, `description`, `sidebar_position`, `keywords`
- **FR-015**: Chapter 2 MUST follow the structure: Learning Objectives → Introduction → Hardware Requirements → Workstation Setup → Edge Hardware → Verification Steps → Summary
- **FR-016**: Both chapters MUST use terminology consistent with official ROS 2 documentation (per Constitution Principle II)
- **FR-017**: Both chapters MUST define all acronyms on first use (e.g., "IMU - Inertial Measurement Unit", "ROS 2 - Robot Operating System 2")
- **FR-018**: Both chapters MUST be written in a beginner-friendly tone without oversimplification (per Constitution Principle I)
- **FR-019**: System MUST update `frontend/sidebars.ts` to include both chapters under a "Part I: Foundations & Lab" section
- **FR-020**: The sidebar configuration MUST set `sidebar_position` values to ensure Chapter 1 appears before Chapter 2
- **FR-021**: Both chapters MUST render correctly when `npm run build` is executed from the `frontend/` directory
- **FR-022**: All content MUST be accurate and verifiable against official NVIDIA, ROS 2, and Intel RealSense documentation (per Constitution Principle II)

### Key Entities

- **Chapter (MDX File)**: Educational content unit representing a single topic. Key attributes: title, description, sidebar_position, keywords, word count (800-1000), frontmatter metadata, educational structure (objectives → content → exercises → summary).
- **Part/Section**: Organizational grouping of related chapters. For this feature: "Part I: Foundations & Lab" containing Chapter 1 (Embodied AI) and Chapter 2 (Hardware Setup).
- **Hardware Specification**: Technical requirement description for student lab setup. Attributes: component name (GPU, SBC, sensor), minimum spec (RTX 4070 Ti, Jetson Orin Nano, RealSense D435i), operating system requirement (Ubuntu 22.04 LTS), criticality level (mandatory vs recommended).
- **Mermaid Diagram**: Visual learning aid embedded in MDX using Mermaid.js syntax. Attributes: diagram type (graph, flowchart), nodes (concepts being compared), edges (relationships), labels (descriptive text).
- **Sidebar Entry**: Navigation element in Docusaurus. Attributes: type (category, doc), label (display name), link (doc ID), position (ordering), items (nested entries for categories).

## Success Criteria

### Measurable Outcomes

- **SC-001**: Both MDX files exist at specified paths and contain 800-1000 words each (verifiable via word count tool)
- **SC-002**: Chapter 2 includes the Hardware Mandate danger admonition visible to readers (verifiable by searching file for `:::danger` syntax and Hardware Mandate text)
- **SC-003**: `frontend/sidebars.ts` contains a "Part I: Foundations & Lab" section with both chapters listed in correct order (verifiable by inspecting sidebars.ts structure)
- **SC-004**: Running `npm run build` from `frontend/` directory completes successfully with zero errors (verifiable by build exit code)
- **SC-005**: Both chapters render correctly in Docusaurus with frontmatter metadata displayed (verifiable by viewing localhost:3000 during development)
- **SC-006**: Chapter 1 Mermaid diagram renders visually comparing LLM (Brain in Box) vs Robot (Brain in Body) (verifiable by inspecting rendered page)
- **SC-007**: All acronyms in both chapters are defined on first use (verifiable by manual review or regex search for uppercase acronyms)
- **SC-008**: Hardware specifications match official NVIDIA, ROS 2, and Intel documentation (verifiable by cross-referencing vendor docs)
- **SC-009**: Both chapters are readable on mobile viewport (375px width minimum) with no horizontal overflow (verifiable by browser dev tools responsive mode)
- **SC-010**: A learner can navigate from Chapter 1 to Chapter 2 using sidebar or next-page navigation in under 10 seconds (verifiable by user testing or automated E2E test)

## Assumptions

- **Assumption 1**: Docusaurus 3.x is already installed and configured in the `frontend/` directory (based on CLAUDE.md tech stack)
- **Assumption 2**: The `frontend/docs/01-part-1-foundations-lab/` directory exists and is the correct location for these chapters (created earlier in this session)
- **Assumption 3**: The `book-architect` agent is available to handle Docusaurus file structure creation and `sidebars.ts` updates
- **Assumption 4**: The `physical-ai-author` agent is available to generate high-fidelity educational content following the Constitution and `docusaurus-style` skill
- **Assumption 5**: The `docusaurus-style` skill exists and provides guidelines for MDX frontmatter, Mermaid diagram syntax, and admonition blocks
- **Assumption 6**: Students reading this content have basic familiarity with AI concepts (e.g., what an LLM is) but no prior robotics experience
- **Assumption 7**: Hardware recommendations are based on NVIDIA Isaac Sim 2023.1+ requirements and ROS 2 Humble Hawksbill compatibility
- **Assumption 8**: The project follows the Constitution principle that "Standard laptops are NOT supported" for Isaac Sim chapters, requiring explicit warnings

## Dependencies

- **Dependency 1**: Docusaurus 3.x installation in `frontend/` directory with TypeScript support
- **Dependency 2**: `book-architect` agent for creating directory structure and managing `sidebars.ts` configuration
- **Dependency 3**: `physical-ai-author` agent for generating educational content that adheres to Constitution standards
- **Dependency 4**: `docusaurus-style` skill for MDX formatting conventions, frontmatter requirements, and Docusaurus component usage
- **Dependency 5**: `ros2-mermaid-patterns` skill (optional but helpful) for standardized Mermaid diagram syntax if applicable to this content
- **Dependency 6**: Access to official documentation for verification: NVIDIA Isaac Sim docs, ROS 2 Humble docs, Intel RealSense D435i specs
- **Dependency 7**: Constitution (`.specify/memory/constitution.md`) version 1.1.0+ with Hardware Mandate principle included

## Out of Scope

- **Out of Scope 1**: Writing content for Parts II-V (Robotic Nervous System, Digital Twin, AI Robot Brain, VLA Capstone) - those are separate features
- **Out of Scope 2**: Creating interactive code examples or embedded terminals within chapters - static code blocks with syntax highlighting are sufficient
- **Out of Scope 3**: Implementing a hardware compatibility checker tool that validates user GPU specs - the danger admonition is sufficient warning
- **Out of Scope 4**: Providing purchase links or affiliate links to hardware vendors - students source their own equipment
- **Out of Scope 5**: Including installation instructions for Ubuntu 22.04, NVIDIA drivers, or ROS 2 Humble - Chapter 2 lists requirements but detailed setup is a future feature
- **Out of Scope 6**: Creating a glossary page for acronyms - each chapter defines terms inline
- **Out of Scope 7**: Adding RAG chatbot integration or ChatKit interface - this feature focuses solely on static educational content
- **Out of Scope 8**: Writing backend code, FastAPI endpoints, or database schemas - this is purely frontend content generation
- **Out of Scope 9**: Creating tests for the educational content (RAG accuracy validation, quiz questions) - validation is a future feature
- **Out of Scope 10**: Translating content into languages other than English

## Notes

- **Note 1**: This specification follows the Spec-Kit Plus methodology and Constitution principles. All implementation must be verifiable against Constitution Principle II (Technical Accuracy).
- **Note 2**: The Hardware Mandate danger admonition in Chapter 2 is NON-NEGOTIABLE per Constitution Principle II. This prevents students from wasting time on incompatible hardware.
- **Note 3**: Mermaid diagrams must use simple, accessible syntax that renders correctly in Docusaurus. Complex diagrams risk rendering failures.
- **Note 4**: Word count (800-1000 words) is a Constitution requirement (Principle I). Content should be substantive but digestible, not padded.
- **Note 5**: The `book-architect` agent handles file structure; `physical-ai-author` generates content. This separation ensures architectural consistency while leveraging specialized content generation intelligence.
- **Note 6**: Sidebar configuration in `sidebars.ts` should use Docusaurus best practices: categories for parts, doc links for chapters, explicit `sidebar_position` for ordering.
- **Note 7**: All hardware specifications must be current as of 2025. NVIDIA RTX 4070 Ti is the recommended minimum (not RTX 3060) due to VRAM requirements for Isaac Sim.
- **Note 8**: The "Partner Economy" concept should be explained with concrete examples (e.g., warehouse robots working alongside human pickers, not abstract theory).
- **Note 9**: Testing success criteria (SC-004: npm run build passes) assumes Docusaurus is properly configured. If build fails due to config issues, those must be fixed separately.
- **Note 10**: This feature establishes the foundation for the entire textbook. Quality here sets expectations for all subsequent chapters.
