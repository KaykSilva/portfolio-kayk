"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  SelectiveBloom,
} from "@react-three/postprocessing";
import { Suspense, useMemo, useState } from "react";
import type { AmbientLight, DirectionalLight, Object3D } from "three";
import { FloatingBlocks } from "./FloatingBlocks";
import { BlackBox } from "./BlackBox";

export function Scene() {
  const [ambientLight, setAmbientLight] = useState<AmbientLight | null>(null);
  const [directionalLight, setDirectionalLight] =
    useState<DirectionalLight | null>(null);
  const [bloomObjects, setBloomObjects] = useState<Object3D[]>([]);
  const bloomLights = useMemo(
    () =>
      [ambientLight, directionalLight].filter(
        (light): light is AmbientLight | DirectionalLight => light !== null,
      ),
    [ambientLight, directionalLight],
  );

  return (
    <Canvas
      camera={{ position: [0, 1.5, 5], fov: 45 }}
      gl={{ alpha: true }}
      onCreated={({ gl }) => gl.setClearColor("#000000", 0)}
    >
      <ambientLight ref={setAmbientLight} intensity={0.4} />
      <directionalLight
        ref={setDirectionalLight}
        position={[3, 4, 5]}
        intensity={1.5}
      />

      <Suspense fallback={null}>
        <BlackBox onBloomObjectsReady={setBloomObjects} />
      </Suspense>
      <FloatingBlocks />

      <OrbitControls enableZoom={false} />
      <EffectComposer multisampling={0}>
        <SelectiveBloom
          lights={bloomLights}
          selection={bloomObjects}
          intensity={0.10}
          luminanceThreshold={1}
          luminanceSmoothing={0.15}
          ignoreBackground
          levels={3}
          mipmapBlur
          radius={0.12}
        />
      </EffectComposer>
    </Canvas>
  );
}
