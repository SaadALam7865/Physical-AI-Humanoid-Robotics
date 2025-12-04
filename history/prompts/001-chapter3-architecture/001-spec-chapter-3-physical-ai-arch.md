---
id: 001
title: chapter-3-physical-ai-arch
stage: spec
date: 2025-12-04
surface: cli
model: gemini-2.5-flash
feature: 001-chapter3-architecture
branch: 001-chapter3-architecture
user: Cyb3r
command: /sp.specify
labels: [spec, architecture, ros2, chapter3]
links:
  spec: specs/001-chapter3-architecture/spec.md
  ticket: ""
  adr: ""
  pr: ""
files:
  - specs/001-chapter3-architecture/spec.md
  - specs/001-chapter3-architecture/checklists/requirements.md
tests:
  - ""
---

## Prompt

```
Chapter 3: Physical AI Architecture (Writer's Brief)

Persona: Distinguished Professor / Chief Roboticist.
Tone: Authoritative, Hardware-First, "Why before How." Emphasize physical realities (latency, bandwidth, weight) over abstract theory.

Core Message: "Split the Brain"
Explain the necessity of a 3-Tier Architecture:
 1. Dreamer (Workstation/Cloud): Offline, high-compute (Training/Simulation).
 2. Reflexes (Jetson Orin): Real-time, power-constrained (Inference/Perception).
 3. Body (Robot): Hard real-time (Actuation/Motor Control).

Mandatory Content:
 * "Hardware Mandate" (:::danger): Explicitly state RTX GPU & Jetson Orin are non-negotiable.
 * Data Gravity (Physics): Calculate why 3-camera video cannot be streamed over Wi-Fi (e.g., 700MB/s vs 50MB/s).
 * Sim-to-Real (Bridge): Explain the "Reality Gap" and Domain Randomization for robust AI.
 * Hands-on Lab (Verification): Guide students through ip addr, ping tests, and a cross-device ROS 2 Python Publisher/Subscriber (use rclpy with classes &
     type hints).

Style:
* Use analogies (e.g., "Nervous System").
* Mermaid diagrams for all architecture/workflow explanations.
* Anticipate common student errors (firewall, Wi-Fi lag) with troubleshooting tips.
```

## Response snapshot

Created feature branch `001-chapter3-architecture`.
Parsed user requirements for Chapter 3: Physical AI Architecture.
Created specification file `specs/001-chapter3-architecture/spec.md` with detailed user stories, requirements, and success criteria mapping to the 4-layer content strategy.
Created validation checklist `specs/001-chapter3-architecture/checklists/requirements.md` and verified compliance.

## Outcome

- ✅ Impact: Created spec for Chapter 3
- 🧪 Tests: N/A
- 📁 Files: spec.md, checklists/requirements.md created
- 🔁 Next prompts: /sp.clarify or /sp.plan
- 🧠 Reflection: Specification created successfully based on detailed user requirements.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): None
