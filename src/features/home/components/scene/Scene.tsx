"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { FloatingBlocks } from "./FloatingBlocks";
import { BlackBox } from "./BlackBox";

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} />

      <Suspense fallback={null}>
        <BlackBox />
      </Suspense>
      <FloatingBlocks />

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
