# Feature Specification: Physical AI Architecture

**Feature Branch**: `001-chapter3-architecture`  
**Created**: 2025-12-04  
**Status**: Draft  
**Input**: User description: "Write Chapter 3 Physical AI Architecture" (plus detailed requirements)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Conceptual Mastery (Priority: P1)

As a student, I want to clearly understand the 3-tier architecture of Physical AI so that I can distinguish between the roles of the Workstation, Edge Brain, and Robot Body.

**Why this priority**: This is the foundational mental model for the entire course. Without this, students will confuse where to run which code.

**Independent Test**: Can be tested by the student successfully completing the "List 3 tasks best done in simulation vs. real hardware" exercise.

**Acceptance Scenarios**:

1. **Given** the student has read the "Concept" section, **When** asked to define the Digital Twin, **Then** they can describe it as a simulation running on the Workstation.
2. **Given** the student sees the architecture diagram, **When** asked where the "Inference Engine" lives, **Then** they identify the Jetson Orin.

---

### User Story 2 - Network Verification (Priority: P1)

As a student, I want to verify my hardware network setup so that I can ensure my Workstation and Jetson can communicate before writing code.

**Why this priority**: Hardware communication is the most common point of failure. Early verification prevents frustration.

**Independent Test**: The "Ping your Jetson" exercise.

**Acceptance Scenarios**:

1. **Given** a configured Workstation and Jetson on the same Wi-Fi, **When** the student runs the ping command, **Then** they receive a successful response (low latency).

---

### User Story 3 - First Cross-Device Code (Priority: P2)

As a student, I want to run a simple ROS 2 Publisher/Subscriber across devices so that I can prove the middleware is working correctly.

**Why this priority**: This validates the software stack (ROS 2) on top of the hardware stack.

**Independent Test**: Running the provided python scripts on two separate machines.

**Acceptance Scenarios**:

1. **Given** the publisher running on the Workstation, **When** the subscriber is started on the Jetson, **Then** the Jetson prints messages originating from the Workstation.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Content MUST include a specific "Hardware Requirement" warning block stating: "Standard laptops will NOT work. NVIDIA RTX 4070 Ti (12GB VRAM) or higher is required."
- **FR-002**: Content MUST be structured into 4 specific layers: Concept, Lab, AI Collab, and Sim-to-Real.
- **FR-003**: Content MUST include a Mermaid diagram illustrating the 3-tier architecture (Workstation/Cloud, Edge, Robot) and data flow.
- **FR-004**: Content MUST include a Mermaid diagram illustrating the Sim-to-Real deployment pipeline.
- **FR-005**: Code examples MUST use ROS 2 Humble, Python 3.10+, `rclpy`, Class-based structure, async/await, and Type Hints.
- **FR-006**: Content MUST explain the "Why" before the "How" for every command or concept introduced.
- **FR-007**: Content MUST include the exercise "Ping your Jetson from your workstation".
- **FR-008**: Content MUST include the exercise "List 3 tasks best done in simulation vs. real hardware".
- **FR-009**: The "Sim-to-Real" section MUST reference the specific hardware: NVIDIA Jetson Orin Nano, Unitree Go2 Motors, Intel RealSense D435i.
- **FR-010**: The writing voice MUST match the "Distinguished Professor" persona: authoritative but accessible, hardware-grounded, and anticipatory of errors.

### Key Entities

- **Workstation**: High-performance PC for simulation (Digital Twin).
- **Edge Device**: Jetson Orin Nano for deployment (Physical Twin brain).
- **Robot**: Unitree Go2 (Physical Twin body).
- **Digital Twin**: Simulation of the robot and environment.
- **Physical Twin**: The real hardware reality.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The generated chapter content contains at least 2 Mermaid diagrams.
- **SC-002**: All code snippets pass static analysis for Python 3.10+ syntax.
- **SC-003**: The content clearly distinguishes between code to be run on the Workstation vs. the Jetson.
- **SC-004**: The text includes at least one "Anticipatory Guidance" callout (e.g., warning about a common error).