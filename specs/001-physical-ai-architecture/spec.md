# Feature Specification: Physical AI Architecture: From Cloud to Edge

**Feature Branch**: `001-physical-ai-architecture`
**Created**: 2025-11-30
**Status**: Draft
**Input**: User description: "write Part I: Foundations & Lab (Weeks 1-2)

  Chapter 3: Physical AI Architecture

  title: "Physical AI Architecture: From Cloud to Edge"

  learning_objectives:

    - Diagram the 3-tier architecture (Workstation/Cloud, Edge, Robot)

    - Explain sim-to-real transfer workflow

    - Identify data flow from sensors to actuators

  core_concepts:

    - Digital Twin (simulation) vs Physical Twin (hardware)

    - Workstation: Training ground (Isaac Sim, Gazebo)

    - Jetson Orin: Inference engine (deployed models)

    - Sensor fusion (RGB, Depth, IMU)

  code_examples:

    - Simple ROS 2 pub/sub between workstation and Jetson (over Wi-Fi)

  diagrams:

    - Mermaid: 3-tier architecture with data flow

    - Mermaid: Sim-to-real deployment pipeline

  exercises:

    - "Ping your Jetson from your workstation"

    - "List 3 tasks best done in simulation vs. real hardware"

  hardware_integration:

    - Workstation (RTX GPU)

    - Jetson Orin Nano

    - Network setup

  word_count: 900"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand 3-Tier Architecture (Priority: P1)

As a student, I want to understand the three-tier architecture (Workstation/Cloud, Edge, Robot) of Physical AI systems so I can grasp the overall system design.

**Why this priority**: Fundamental understanding of the system's structure is crucial for all subsequent learning.

**Independent Test**: Can be fully tested by examining the diagrams and explanations to identify and describe each tier's role.

**Acceptance Scenarios**:

1.  **Given** I am a student reading Chapter 3, **When** I view the 3-tier architecture diagram, **Then** I can identify the roles of the Workstation, Edge, and Robot tiers.
2.  **Given** I am a student reading Chapter 3, **When** I read the explanation of the 3-tier architecture, **Then** I can describe the purpose of each tier.

---

### User Story 2 - Grasp Sim-to-Real Workflow (Priority: P1)

As a student, I want to understand the sim-to-real transfer workflow so I can comprehend how AI models developed in simulation are deployed to real hardware.

**Why this priority**: Sim-to-real is a core concept in Physical AI, enabling practical application of learned models.

**Independent Test**: Can be fully tested by reviewing the sim-to-real diagram and accompanying text to explain the process.

**Acceptance Scenarios**:

1.  **Given** I am a student reading Chapter 3, **When** I view the sim-to-real deployment pipeline diagram, **Then** I can trace the flow from simulation training to hardware deployment.
2.  **Given** I am a student reading Chapter 3, **When** I read the explanation of sim-to-real, **Then** I can explain the benefits and challenges of this workflow.

---

### User Story 3 - Identify Data Flow (Priority: P2)

As a student, I want to identify the data flow from sensors to actuators in a Physical AI system so I can understand how information is processed and acted upon.

**Why this priority**: Understanding data flow is essential for diagnosing issues and designing robust robot behaviors.

**Independent Test**: Can be fully tested by analyzing the architecture diagrams to pinpoint data ingress and egress points.

**Acceptance Scenarios**:

1.  **Given** I am a student reading Chapter 3, **When** I examine the 3-tier architecture with data flow, **Then** I can identify the points where sensor data is ingested and actuator commands are issued.

---

### User Story 4 - Execute Simple ROS 2 Communication (Priority: P2)

As a student, I want to be able to set up a simple ROS 2 publisher/subscriber between a workstation and a Jetson so I can demonstrate basic network communication in a Physical AI setup.

**Why this priority**: Hands-on experience with ROS 2 networking is crucial for practical Physical AI development.

**Independent Test**: Can be fully tested by successfully running the provided code example and verifying message exchange.

**Acceptance Scenarios**:

1.  **Given** I have a workstation and a Jetson Orin connected to the same network, **When** I follow the provided code example, **Then** I can successfully send and receive messages between the two devices using ROS 2.

---

### User Story 5 - Differentiate Simulation vs. Real Hardware Tasks (Priority: P3)

As a student, I want to identify tasks best suited for simulation versus real hardware so I can make informed decisions in Physical AI development.

**Why this priority**: Strategic decision-making in choosing the right environment for development optimizes learning and project efficiency.

**Independent Test**: Can be fully tested by answering the exercise questions about task suitability.

**Acceptance Scenarios**:

1.  **Given** I have completed the chapter, **When** I consider various robotics tasks, **Then** I can list at least 3 tasks that are more efficiently performed in simulation and 3 that require real hardware.

---

### Edge Cases

- What happens if the workstation and Jetson are not on the same Wi-Fi network for the ROS 2 pub/sub example? The connection should fail, and the chapter should provide troubleshooting steps or prerequisites for network setup.
- How does the system handle noisy or incomplete sensor data during data flow? The chapter should briefly mention general principles of sensor fusion and robust data handling.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The chapter MUST diagram the 3-tier architecture (Workstation/Cloud, Edge, Robot) for Physical AI systems, clearly showing the roles and interconnections.
- **FR-002**: The chapter MUST explain the concepts of Digital Twin (simulation) and Physical Twin (hardware) in the context of Physical AI.
- **FR-003**: The chapter MUST explain the sim-to-real transfer workflow, detailing its stages and importance.
- **FR-004**: The chapter MUST identify the data flow from sensors (RGB, Depth, IMU) to inference on the Edge device, and then to actuators on the Robot within the architecture.
- **FR-005**: The chapter MUST provide a complete, runnable code example demonstrating a simple ROS 2 publisher/subscriber setup between a workstation and a Jetson Orin over Wi-Fi, including necessary network configurations.
- **FR-006**: The chapter MUST include exercises that reinforce understanding of network setup, and the appropriate use cases and trade-offs for tasks done in simulation versus real hardware.

### Key Entities *(include if feature involves data)*

- **Workstation**: A powerful computing device (e.g., PC with RTX GPU) primarily used for training complex AI models, running high-fidelity physics simulations (Isaac Sim, Gazebo), and potentially high-level strategic control.
- **Edge Device**: A compact, power-efficient computing device (e.g., NVIDIA Jetson Orin Nano) dedicated to running AI inference models in real-time, deployed closer to the robot, and processing sensor data.
- **Robot**: The physical hardware system (e.g., Unitree Go2/G1) that interacts directly with the real world, equipped with various sensors for environmental perception and actuators for physical movement and manipulation.
- **Sensors**: Input devices (e.g., RGB camera, Depth camera, Inertial Measurement Unit - IMU) that gather data from the robot's environment and internal state.
- **Actuators**: Output components (e.g., motors, servos, grippers) that enable the robot to perform physical actions based on commands received from the Edge device.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 90% of students can accurately diagram and explain the 3-tier Physical AI architecture, including the roles of each component, after completing the relevant sections of Chapter 3.
- **SC-002**: Students can successfully execute the provided ROS 2 network setup code example on their workstation and Jetson Orin, demonstrating functional communication, with less than 15 minutes of independent troubleshooting.
- **SC-03**: 85% of students can correctly identify at least 3 tasks best suited for simulation and 3 tasks best suited for real hardware, providing justifications based on cost, safety, and iteration speed, as demonstrated in the chapter exercises.
- **SC-004**: The chapter clearly and concisely bridges theoretical AI concepts with practical robotics implementation, preparing students for subsequent modules on ROS 2 and simulation.
