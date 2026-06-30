"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

const blocks = [
  { position: [-2.4, 1.4, -1.2], scale: 0.35 },
  { position: [2.2, 1.1, -0.8], scale: 0.5 },
  { position: [-1.9, -1.5, -0.5], scale: 0.45 },
  { position: [2.5, -1.3, -1.6], scale: 0.3 },
] as const;

export function FloatingBlocks() {
  const group = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.08;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.12;
  });

  return (
    <group ref={group}>
      {blocks.map(({ position, scale }, index) => (
        <mesh
          key={index}
          position={position}
          rotation={[index * 0.4, index * 0.7, index * 0.25]}
          scale={scale}
        >
          <boxGeometry />
          <meshStandardMaterial
            color="#171713"
            emissive="#9b967f"
            emissiveIntensity={0.12}
            metalness={0.65}
            roughness={0.45}
          />
        </mesh>
      ))}
    </group>
  );
}
