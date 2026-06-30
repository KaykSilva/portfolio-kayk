"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export function BlackBox() {
  const box = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!box.current) return;
    box.current.rotation.x += delta * 0.25;
    box.current.rotation.y += delta * 0.35;
  });

  return (
    <mesh ref={box}>
      <boxGeometry args={[1.6, 1.6, 1.6]} />
      <meshStandardMaterial
        color="#050505"
        emissive="#e9e3c7"
        emissiveIntensity={0.25}
        roughness={0.35}
        metalness={0.8}
      />
    </mesh>
  );
}