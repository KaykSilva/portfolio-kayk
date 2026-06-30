"use client";

import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

export function StarField() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y -= delta * 0.015;
  });

  return (
    <group ref={group}>
      <Stars
        radius={45}
        depth={25}
        count={900}
        factor={2.5}
        saturation={0}
        fade
        speed={0.35}
      />
    </group>
  );
}
