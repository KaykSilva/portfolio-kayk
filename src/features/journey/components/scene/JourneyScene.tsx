"use client";

import { Canvas, type ThreeEvent, useFrame } from "@react-three/fiber";
import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Color,
  FogExp2,
  MathUtils,
  Object3D,
  type Group,
  type InstancedMesh,
  type PerspectiveCamera,
  type Points,
  type PointsMaterial,
  type SpotLight,
} from "three";
import type { JourneyMemory } from "../../data/memories";

const MONOLITH_SPACING = 7.4;
const MAX_PARTICLES = 960;

function monolithPosition(index: number) {
  return {
    x: index % 2 === 0 ? -1.65 : 1.65,
    y: -0.45 + (index % 3) * 0.18,
    z: -index * MONOLITH_SPACING,
  };
}

type SceneContentProps = {
  activeIndex: number;
  memories: readonly JourneyMemory[];
  onSelect: (index: number) => void;
};

const JourneyMonoliths = memo(function JourneyMonoliths({
  activeIndex,
  memories,
  onSelect,
}: SceneContentProps) {
  const mesh = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!mesh.current) return;

    memories.forEach((_, index) => {
      const position = monolithPosition(index);
      dummy.position.set(position.x, position.y, position.z);
      dummy.rotation.set(0.03 * (index % 2 ? 1 : -1), (index % 2 ? -1 : 1) * 0.12, 0);
      dummy.scale.set(1, 1 + (index % 3) * 0.08, 0.72);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [dummy, memories]);

  useEffect(() => {
    if (!mesh.current) return;

    memories.forEach((memory, index) => {
      const color = new Color(
        index === activeIndex
          ? memory.scenePreset.accent
          : index === hoveredIndex
            ? "#8f8b7d"
            : "#292923",
      );
      mesh.current?.setColorAt(index, color);
    });
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, [activeIndex, hoveredIndex, memories]);

  const updateHover = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHoveredIndex(event.instanceId ?? null);
    document.body.style.cursor = "pointer";
  };

  return (
    <>
      <instancedMesh
        ref={mesh}
        args={[undefined, undefined, memories.length]}
        onClick={(event) => {
          event.stopPropagation();
          if (event.instanceId !== undefined) onSelect(event.instanceId);
        }}
        onPointerMove={updateHover}
        onPointerOut={() => {
          setHoveredIndex(null);
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry args={[2.15, 4.8, 1.15]} />
        <meshStandardMaterial
          vertexColors
          metalness={0.72}
          roughness={0.48}
          emissive="#aaa58f"
          emissiveIntensity={0.045}
        />
      </instancedMesh>
      <HoverFragments hoveredIndex={hoveredIndex} />
    </>
  );
});

function HoverFragments({ hoveredIndex }: { hoveredIndex: number | null }) {
  const group = useRef<Group>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(42 * 3);
    for (let index = 0; index < 42; index += 1) {
      const offset = index * 3;
      values[offset] = ((index * 5.31) % 1 - 0.5) * 3.5;
      values[offset + 1] = ((index * 8.17) % 1 - 0.5) * 5.5;
      values[offset + 2] = ((index * 3.73) % 1 - 0.5) * 2.2;
    }
    return values;
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.08;
  });

  const target = hoveredIndex === null ? null : monolithPosition(hoveredIndex);

  return (
    <group
      ref={group}
      position={target ? [target.x, target.y, target.z] : [0, -100, 0]}
      visible={target !== null}
    >
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#e8e3cf" size={0.045} transparent opacity={0.62} depthWrite={false} />
      </points>
    </group>
  );
}

function JourneyParticles({ memory }: { memory: JourneyMemory }) {
  const points = useRef<Points>(null);
  const material = useRef<PointsMaterial>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(MAX_PARTICLES * 3);
    for (let index = 0; index < MAX_PARTICLES; index += 1) {
      const offset = index * 3;
      values[offset] = ((index * 13.37) % 1 - 0.5) * 18;
      values[offset + 1] = ((index * 7.91) % 1 - 0.5) * 11;
      values[offset + 2] = -((index * 3.73) % 1) * 64 + 8;
    }
    return values;
  }, []);

  useEffect(() => {
    points.current?.geometry.setDrawRange(0, memory.scenePreset.particleCount);
  }, [memory]);

  useFrame(({ clock }, delta) => {
    if (!points.current || !material.current) return;
    points.current.rotation.y = clock.elapsedTime * 0.0025;
    material.current.opacity = MathUtils.damp(material.current.opacity, 0.18 + memory.scenePreset.structureDensity * 0.28, 2, delta);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={material} color="#d7d2be" size={0.025} transparent opacity={0.2} depthWrite={false} />
    </points>
  );
}

function CameraJourney({ activeIndex }: { activeIndex: number }) {
  const initialized = useRef(false);

  useFrame(({ camera }, delta) => {
    const perspectiveCamera = camera as PerspectiveCamera;
    const monolith = monolithPosition(activeIndex);
    const targetX = monolith.x * 0.26;
    const targetY = 1.25;
    const targetZ = monolith.z + 7.8;

    if (!initialized.current) {
      perspectiveCamera.position.set(0, 3.6, 15.5);
      initialized.current = true;
    }

    perspectiveCamera.position.x = MathUtils.damp(perspectiveCamera.position.x, targetX, 1.3, delta);
    perspectiveCamera.position.y = MathUtils.damp(perspectiveCamera.position.y, targetY, 1.15, delta);
    perspectiveCamera.position.z = MathUtils.damp(perspectiveCamera.position.z, targetZ, 1.05, delta);
    perspectiveCamera.lookAt(monolith.x * 0.42, 0, monolith.z);
  });

  return null;
}

function MemoryLight({ memory, activeIndex }: { memory: JourneyMemory; activeIndex: number }) {
  const light = useRef<SpotLight>(null);

  useFrame((_, delta) => {
    if (!light.current) return;
    const position = monolithPosition(activeIndex);
    light.current.position.x = MathUtils.damp(light.current.position.x, position.x, 2, delta);
    light.current.position.z = MathUtils.damp(light.current.position.z, position.z + 2, 2, delta);
    light.current.intensity = MathUtils.damp(light.current.intensity, memory.scenePreset.lightIntensity * 12, 1.8, delta);
    light.current.color.lerp(new Color(memory.scenePreset.accent), 1 - Math.exp(-delta * 2));
  });

  return <spotLight ref={light} position={[0, 7, 2]} angle={0.48} penumbra={0.86} distance={20} intensity={5} />;
}

function SceneContent({ activeIndex, memories, onSelect }: SceneContentProps) {
  const activeMemory = memories[activeIndex];

  return (
    <>
      <ambientLight intensity={0.18 + activeIndex * 0.025} color="#8f8a78" />
      <MemoryLight memory={activeMemory} activeIndex={activeIndex} />
      <JourneyMonoliths activeIndex={activeIndex} memories={memories} onSelect={onSelect} />
      <JourneyParticles memory={activeMemory} />
      <CameraJourney activeIndex={activeIndex} />
      <mesh position={[0, -3, -24]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[32, 90]} />
        <meshStandardMaterial color="#11110f" roughness={1} />
      </mesh>
    </>
  );
}

export function JourneyScene(props: SceneContentProps) {
  return (
    <Canvas
      camera={{ position: [0, 3.6, 15.5], fov: 48, near: 0.1, far: 100 }}
      dpr={[1, 1.35]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(new Color("#0d0d0b"));
        scene.fog = new FogExp2("#151511", 0.042);
      }}
    >
      <SceneContent {...props} />
    </Canvas>
  );
}
