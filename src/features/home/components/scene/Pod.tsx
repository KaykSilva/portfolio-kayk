"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

const POD_MODEL_URL = "/models/nier_automata_pod_042.glb";

export function Pod() {
  const pod = useRef<Group>(null);
  const { scene } = useGLTF(POD_MODEL_URL);

  useFrame(({ clock }) => {
    if (!pod.current) return;

    pod.current.rotation.x = Math.sin(clock.elapsedTime * 0.45) * 0.025;
    pod.current.rotation.y = Math.sin(clock.elapsedTime * 0.22) * 0.90;
    pod.current.rotation.z = Math.sin(clock.elapsedTime * 0.32) * 0.02;
  });

  return (
    <group ref={pod} scale={0.7}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

useGLTF.preload(POD_MODEL_URL);
