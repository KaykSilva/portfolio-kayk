"use client";

import { StarField } from "./StarField";
import { Canvas } from "@react-three/fiber";

export function StarFieldBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <StarField />
    </Canvas>
  );
}
