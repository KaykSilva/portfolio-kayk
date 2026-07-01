"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  Color,
  FogExp2,
  MathUtils,
  Object3D,
  type BufferGeometry,
  type Group,
  type InstancedMesh,
  type MeshStandardMaterial,
  type Points,
  type PointsMaterial,
} from "three";
import type { ProjectScenePreset } from "../../data/projects";
import { useMobileExperience } from "@/shared/hooks/useMobileExperience";

const ARTIFACT_COUNT = 24;
const MAX_PARTICLES = 900;

function createFormation(preset: ProjectScenePreset) {
  const positions = new Float32Array(ARTIFACT_COUNT * 3);

  for (let index = 0; index < ARTIFACT_COUNT; index += 1) {
    const offset = index * 3;
    const layer = Math.floor(index / 6);
    const slot = index % 6;

    if (preset.formation === "orbit") {
      const angle = (index / ARTIFACT_COUNT) * Math.PI * 4;
      const radius = 1.2 + layer * 0.38;
      positions[offset] = Math.cos(angle) * radius;
      positions[offset + 1] = (layer - 1.5) * 0.55;
      positions[offset + 2] = Math.sin(angle) * radius - 1.5;
    } else if (preset.formation === "column") {
      positions[offset] = (slot - 2.5) * 0.48;
      positions[offset + 1] = (layer - 1.5) * 0.82;
      positions[offset + 2] = -layer * 0.7 - Math.abs(slot - 2.5) * 0.16;
    } else if (preset.formation === "scatter") {
      positions[offset] = ((index * 3.17) % 6) - 3;
      positions[offset + 1] = ((index * 1.73) % 4) - 2;
      positions[offset + 2] = -((index * 2.41) % 5) - 0.5;
    } else {
      positions[offset] = (slot - 2.5) * 0.62;
      positions[offset + 1] = (layer - 1.5) * 0.62;
      positions[offset + 2] = -layer * 0.45;
    }
  }

  return positions;
}

function ArchiveArtifact({ preset }: { preset: ProjectScenePreset }) {
  const mesh = useRef<InstancedMesh>(null);
  const material = useRef<MeshStandardMaterial>(null);
  const group = useRef<Group>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const current = useRef(new Float32Array(ARTIFACT_COUNT * 3));
  const target = useMemo(() => createFormation(preset), [preset]);
  const targetColor = useMemo(() => new Color(preset.accent), [preset.accent]);

  useFrame(({ clock }, delta) => {
    if (!mesh.current || !material.current || !group.current) return;

    for (let index = 0; index < ARTIFACT_COUNT; index += 1) {
      const offset = index * 3;
      current.current[offset] = MathUtils.damp(current.current[offset], target[offset], 2.2, delta);
      current.current[offset + 1] = MathUtils.damp(current.current[offset + 1], target[offset + 1], 2.2, delta);
      current.current[offset + 2] = MathUtils.damp(current.current[offset + 2], target[offset + 2], 2.2, delta);

      dummy.position.set(current.current[offset], current.current[offset + 1], current.current[offset + 2]);
      dummy.rotation.set(index * 0.19, clock.elapsedTime * 0.05 + index * 0.34, index * 0.11);
      const size = 0.2 + (index % 5) * 0.045;
      dummy.scale.set(size, size * (1 + (index % 3) * 0.5), size);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(index, dummy.matrix);
    }

    mesh.current.instanceMatrix.needsUpdate = true;
    material.current.color.lerp(targetColor, Math.min(delta * 1.4, 1));
    group.current.rotation.y = clock.elapsedTime * 0.025;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.28) * 0.08;
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[undefined, undefined, ARTIFACT_COUNT]}>
        <boxGeometry />
        <meshStandardMaterial ref={material} color={preset.accent} roughness={0.58} metalness={0.42} />
      </instancedMesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.006, 4, 96]} />
        <meshBasicMaterial color={preset.accent} transparent opacity={0.34} />
      </mesh>
    </group>
  );
}

function SignalField({ mobile, preset }: { mobile: boolean; preset: ProjectScenePreset }) {
  const points = useRef<Points>(null);
  const material = useRef<PointsMaterial>(null);
  const geometry = useRef<BufferGeometry>(null);
  const targetColor = useMemo(() => new Color(preset.accent), [preset.accent]);
  const positions = useMemo(() => {
    const array = new Float32Array(MAX_PARTICLES * 3);
    for (let index = 0; index < MAX_PARTICLES; index += 1) {
      const offset = index * 3;
      array[offset] = ((index * 13.37) % 1 - 0.5) * 12;
      array[offset + 1] = ((index * 7.91) % 1 - 0.5) * 9;
      array[offset + 2] = -((index * 3.73) % 1) * 13 + 3;
    }
    return array;
  }, []);

  useFrame(({ clock }, delta) => {
    if (!points.current || !material.current || !geometry.current) return;
    geometry.current.setDrawRange(0, mobile ? Math.min(preset.particleCount, 320) : preset.particleCount);
    material.current.color.lerp(targetColor, Math.min(delta * 1.2, 1));
    points.current.rotation.y = clock.elapsedTime * 0.008;
    points.current.position.z = Math.sin(clock.elapsedTime * 0.18) * 0.18;
  });

  return (
    <points ref={points}>
      <bufferGeometry ref={geometry}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={material} color={preset.accent} size={0.025} transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}

function CameraRig({ mobile, preset }: { mobile: boolean; preset: ProjectScenePreset }) {
  useFrame(({ camera, pointer }, delta) => {
    camera.position.x = MathUtils.damp(camera.position.x, preset.cameraX + (mobile ? 0 : pointer.x * 0.12), 1.5, delta);
    camera.position.y = MathUtils.damp(camera.position.y, 0.5 + preset.cameraY + (mobile ? 0 : pointer.y * 0.08), 1.5, delta);
    camera.position.z = MathUtils.damp(camera.position.z, 6.4, 1.2, delta);
    camera.lookAt(0, 0, -1.2);
  });

  return null;
}

export function ProjectScene({ preset }: { preset: ProjectScenePreset }) {
  const mobile = useMobileExperience();

  return (
    <Canvas
      camera={{ position: [0, 1.4, 8.4], fov: 47, near: 0.1, far: 40 }}
      dpr={mobile ? 1 : [1, 1.35]}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor("#0d0d0b", 0);
        scene.fog = new FogExp2("#0d0d0b", 0.065);
      }}
    >
      <ambientLight intensity={0.5} color="#b8b29c" />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color="#eee8d2" />
      <ArchiveArtifact preset={preset} />
      <SignalField mobile={mobile} preset={preset} />
      <CameraRig mobile={mobile} preset={preset} />
    </Canvas>
  );
}
