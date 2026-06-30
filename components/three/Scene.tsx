"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FloatingBlocks } from "./FloatingBlocks";
import { StarField } from "./StarField";
import { BlackBox } from "./BlackBox";

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} />

      <BlackBox />
      <FloatingBlocks />
      <StarField  />

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}