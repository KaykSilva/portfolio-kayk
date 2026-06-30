"use client";

import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, type Group } from "three";

export function StarField() {
  const group = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;

    const scrollProgress = MathUtils.clamp(
      window.scrollY / Math.max(window.innerHeight, 1),
      0,
      1
    );

    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      scrollProgress * 0.32,
      2.5,
      delta
    );
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      -clock.elapsedTime * 0.015 - scrollProgress * 0.7,
      2.5,
      delta
    );
    group.current.rotation.z = MathUtils.damp(
      group.current.rotation.z,
      scrollProgress * 0.08,
      2.5,
      delta
    );
    group.current.position.y = MathUtils.damp(
      group.current.position.y,
      scrollProgress * -3,
      2.5,
      delta
    );
    group.current.position.z = MathUtils.damp(
      group.current.position.z,
      scrollProgress * 10,
      2.5,
      delta
    );
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
