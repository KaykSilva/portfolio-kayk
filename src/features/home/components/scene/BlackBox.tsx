"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { Group, Object3D } from "three";

const MODEL_URL = "/models/blackbox_of_nier_automata.glb";

type BlackBoxProps = {
  onBloomObjectsReady: (objects: Object3D[]) => void;
};

export function BlackBox({ onBloomObjectsReady }: BlackBoxProps) {
  const box = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_URL);
  const bloomObjects = useMemo(() => {
    const meshes: Object3D[] = [];

    scene.traverse((object) => {
      if (object.type === "Mesh") meshes.push(object);
    });

    return meshes;
  }, [scene]);

  useEffect(() => {
    onBloomObjectsReady(bloomObjects);

    return () => onBloomObjectsReady([]);
  }, [bloomObjects, onBloomObjectsReady]);

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
