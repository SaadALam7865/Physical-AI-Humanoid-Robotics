# Research Findings: Chapter 3 Architecture

## Decisions

### 1. 3-Tier Architecture Diagram Structure
**Decision**: Use a standard Mermaid `flowchart TD` (Top-Down) diagram.
**Rationale**: Represents the hierarchy clearly: Cloud/Workstation (Top) -> Edge (Middle) -> Robot/Actuators (Bottom).
**Details**:
- **Tier 1 (Top)**: Workstation (Isaac Sim, Training). High compute.
- **Tier 2 (Middle)**: Jetson Orin (Inference, ROS 2 Nodes). Medium compute, low latency.
- **Tier 3 (Bottom)**: Robot Hardware (Motors, Sensors). Real-time constraints.

### 2. "Ping" Exercise Command
**Decision**: Use standard `ping` first, then `ros2 daemon status` check if possible, but stick to `ping` for the "Network Verification" user story to keep it simple (as per "Simplicity" principle).
**Rationale**: Verifying IP connectivity is the prerequisite for ROS 2 DDS discovery.
**Command**: `ping <jetson-ip> -c 4`

### 3. Sim-to-Real Pipeline Visualization
**Decision**: Use a Mermaid `graph LR` (Left-Right) flow.
**Rationale**: Deployment is a linear process from left (sim) to right (real).
**Steps**:
1. Train/Simulate (Isaac Sim)
2. Export Model (ONNX/Engine)
3. Transfer (SCP/Docker)
4. Inference (Jetson)

### 4. Python Code Structure
**Decision**: Use `rclpy` Node class structure.
**Rationale**: Constitution Mandate IV (Type Safety & Async-First).
**Example Pattern**:
```python
import rclpy
from rclpy.node import Node

class SimpleNode(Node):
    def __init__(self) -> None:
        super().__init__('node_name')
        # ...
```

## Unknowns Resolved

- **Mermaid Syntax**: Confirmed `flowchart` is supported by Docusaurus.
- **Code Location**: Code snippets will be embedded in MDX, but for the "First Cross-Device Code", we will provide two separate blocks (Publisher for Workstation, Subscriber for Jetson) clearly labeled with `<TabItem>`.

## Alternatives Considered

- **Using Graphviz**: Too complex to embed directly. Mermaid is native.
- **Using C++**: Rejected. Course mandate is Python for accessibility.
