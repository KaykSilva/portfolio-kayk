"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

const MODEL_URL = "/models/blackbox_of_nier_automata.glb";

export function BlackBox() {
  const box = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_URL);

  useFrame((_, delta) => {
    if (!box.current) return;
    box.current.rotation.x += delta * 0.25;
    box.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={box} scale={0.6}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

useGLTF.preload(MODEL_URL);
