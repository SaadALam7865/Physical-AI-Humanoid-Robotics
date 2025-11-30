---
id: 002
title: amend-constitution-add-hardware-mandate
stage: constitution
date: 2025-11-29
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: 001-book-architecture
user: unknown
command: /sp.constitution
labels: ["constitution", "hardware-mandate", "simulation", "education"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - none
---

## Prompt

write a constitution to Update Principle II and Versioning

Instructions:
1. Keep all existing content in the Constitution UNCHANGED, except for Section II.
2. Update **Section II. Technical Accuracy & Verifiability** to include this new critical bullet point:
   - "**Hardware Mandate**: All simulation content must explicitly state the requirement for NVIDIA RTX 4070 Ti (or higher) and Jetson Orin Nano. Standard laptops are NOT supported for Isaac Sim chapters.

## Response snapshot

The project constitution was updated to version 1.1.0, incorporating a new 'Hardware Mandate' under Principle II: Technical Accuracy & Verifiability. This mandate specifies the required hardware for simulation content (NVIDIA RTX 4070 Ti or higher and Jetson Orin Nano) and clarifies that standard laptops are not supported for Isaac Sim chapters.

## Outcome

- ✅ Impact: Successfully updated the project constitution to reflect new hardware requirements for simulation content, ensuring clarity on technical prerequisites for educational modules.
- 🧪 Tests: none
- 📁 Files: 1 file modified: .specify/memory/constitution.md
- 🔁 Next prompts: none
- 🧠 Reflection: Ensured a crucial hardware mandate for simulation content was formally integrated into the project's core principles, enhancing the practical relevance and accuracy of educational materials.

## Evaluation notes (flywheel)

- Failure modes observed: Attempted to use `create-phr.sh` script, but it was not found, requiring manual PHR creation.
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Investigate why `create-phr.sh` script is not executable or present, and ensure agent has correct permissions/path for script execution in future. Potentially use `Bash('find . -name create-phr.sh')` to locate the script.