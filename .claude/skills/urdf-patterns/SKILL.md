---
name: urdf-patterns
description: Best practices for writing URDF and SDF robot descriptions for humanoid robots.
---

## URDF Structure for Humanoids

### Link Hierarchy Template
```xml
base_link (pelvis) → torso → head + shoulders → arms → hands
                   → hips → legs → feet
```

### Joint Types and Limits
- **Hip**: 3-DOF (yaw, roll, pitch) - revolute joints
  - Yaw: -45° to 45° (rotation around vertical axis)
  - Roll: -30° to 30° (side tilt)
  - Pitch: -90° to 90° (forward/backward swing)
- **Knee**: 1-DOF (pitch) - revolute, limit: 0° to 150°
- **Ankle**: 2-DOF (pitch, roll) - revolute
  - Pitch: -45° to 45° (toe up/down)
  - Roll: -20° to 20° (side tilt)

### Inertial Properties (Realistic Values)
```xml
<inertial>
  <mass value="8.0"/>  <!-- Pelvis: 8-12 kg -->
  <origin xyz="0 0 -0.05"/>  <!-- CoM slightly below pelvis center -->
  <inertia ixx="0.05" ixy="0.0" ixz="0.0" iyy="0.05" iyz="0.0" izz="0.02"/>
</inertial>
```

### Collision Geometry (Simpler than Visual)
```xml
<collision>
  <geometry>
    <box size="0.3 0.2 0.1"/>  <!-- Use primitives for speed -->
  </geometry>
</collision>

<visual>
  <geometry>
    <mesh filename="package://my_robot/meshes/torso.stl"/>  <!-- High-fidelity mesh -->
  </geometry>
</visual>
```

### Gazebo-Specific Plugins
```xml
<!-- Joint State Publisher -->
<gazebo>
  <plugin name="joint_state_publisher" filename="libgazebo_ros_joint_state_publisher.so">
    <update_rate>100</update_rate>
  </plugin>
</gazebo>

<!-- Depth Camera -->
<gazebo reference="camera_link">
  <sensor name="depth_camera" type="depth">
    <update_rate>30</update_rate>
    <camera>
      <horizontal_fov>1.047</horizontal_fov>
      <image><width>640</width><height>480</height></image>
      <clip><near>0.3</near><far>10.0</far></clip>
    </camera>
    <plugin name="depth_camera_controller" filename="libgazebo_ros_camera.so">
      <frame_name>camera_link_optical</frame_name>
    </plugin>
  </sensor>
</gazebo>
```

## Common Pitfalls
1. **Missing Origin Tags**: Always define `<origin xyz="..." rpy="..."/>` for joints
2. **Unrealistic Masses**: Zero-mass links cause Gazebo crashes
3. **Incorrect Parent-Child**: Joint connects parent link to child link (order matters)
4. **Missing Collision**: Robot will fall through ground if no collision geometry
5. **Wrong Joint Axis**: `<axis xyz="0 1 0"/>` for pitch (rotation around Y-axis)
