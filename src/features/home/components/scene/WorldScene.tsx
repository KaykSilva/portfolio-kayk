"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import {
  Color,
  FogExp2,
  MathUtils,
  Object3D,
  type BufferAttribute,
  type Group,
  type InstancedMesh,
  type Points,
  type PointsMaterial,
} from "three";
import { Pod } from "./Pod";
import { BlackBox } from "./BlackBox";

const TOWERS = 42;
const PARTICLES = 1100;

function Ruins() {
  const mesh = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const transforms = useMemo(
    () =>
      Array.from({ length: TOWERS }, (_, index) => {
        const side = index % 2 === 0 ? -1 : 1;
        const lane = Math.floor(index / 2);
        const seed = (index * 7.31) % 1;
        return {
          position: [side * (3.5 + seed * 6.5), -2 + seed, -lane * 4 - 4] as const,
          scale: [1.2 + seed * 2.2, 4 + seed * 10, 1.5 + seed * 3] as const,
          rotation: (seed - 0.5) * 0.12,
        };
      }),
    [],
  );

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    transforms.forEach((transform, index) => {
      dummy.position.set(...transform.position);
      dummy.rotation.set(0, transform.rotation, Math.sin(clock.elapsedTime * 0.08 + index) * 0.003);
      dummy.scale.set(...transform.scale);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, TOWERS]} frustumCulled>
      <boxGeometry />
      <meshStandardMaterial
        color="#d8d5d0"
        emissive="#55534f"
        emissiveIntensity={0.12}
        roughness={0.94}
        metalness={0.02}
      />
    </instancedMesh>
  );
}

function Dust() {
  const points = useRef<Points>(null);
  const positionAttribute = useRef<BufferAttribute>(null);
  const material = useRef<PointsMaterial>(null);
  const previousScroll = useRef(0);
  const travelSpeed = useRef(0);
  const positions = useMemo(() => {
    const values = new Float32Array(PARTICLES * 3);
    for (let index = 0; index < PARTICLES; index += 1) {
      const offset = index * 3;
      values[offset] = ((index * 13.37) % 1 - 0.5) * 28;
      values[offset + 1] = ((index * 7.91) % 1 - 0.5) * 14;
      values[offset + 2] = -((index * 3.73) % 1) * 50;
    }
    return values;
  }, []);

  useFrame(({ clock }, delta) => {
    if (!points.current || !positionAttribute.current || !material.current) return;

    const currentScroll = window.scrollY;
    const scrollImpulse = Math.min(Math.abs(currentScroll - previousScroll.current) / 35, 1);
    previousScroll.current = currentScroll;
    travelSpeed.current = MathUtils.damp(
      travelSpeed.current,
      scrollImpulse,
      scrollImpulse > travelSpeed.current ? 14 : 2.8,
      delta,
    );

    const array = positionAttribute.current.array as Float32Array;
    const depthStep = 0.012 + travelSpeed.current * 0.75;
    for (let index = 2; index < array.length; index += 3) {
      array[index] += depthStep;
      if (array[index] > 7) array[index] = -50;
    }
    positionAttribute.current.needsUpdate = true;

    material.current.size = 0.035 + travelSpeed.current * 0.085;
    material.current.opacity = 0.45 + travelSpeed.current * 0.4;
    points.current.rotation.y = clock.elapsedTime * 0.003;
    points.current.position.y = Math.sin(clock.elapsedTime * 0.08) * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          ref={positionAttribute}
          attach="attributes-position"
          args={[positions, 3]}
          usage={35048}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        color="#fffbea"
        size={0.035}
        transparent
        opacity={0.45}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function ScrollPod() {
  const pod = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    if (!pod.current) return;

    const travelDistance = Math.max(window.innerHeight * 1.25, 1);
    const progress = MathUtils.clamp(window.scrollY / travelDistance, 0, 1);
    const liftProgress = MathUtils.clamp(progress / 0.24, 0, 1);
    const lifted = liftProgress * liftProgress * (3 - 2 * liftProgress);
    const travelProgress = MathUtils.clamp((progress - 0.1) / 0.9, 0, 1);
    const eased = travelProgress * travelProgress * (3 - 2 * travelProgress);

    const targetX = 0;
    const targetY = MathUtils.lerp(-4.2, 0.35, lifted) + Math.sin(eased * Math.PI * 2.5) * 0.25;
    const targetZ = MathUtils.lerp(-3, -50, eased);

    pod.current.position.x = MathUtils.damp(pod.current.position.x, targetX, 2.8, delta);
    pod.current.position.y = MathUtils.damp(
      pod.current.position.y,
      targetY + Math.sin(clock.elapsedTime * 0.8) * 0.08,
      2.8,
      delta,
    );
    pod.current.position.z = MathUtils.damp(pod.current.position.z, targetZ, 2.8, delta);
    pod.current.rotation.y = MathUtils.damp(
      pod.current.rotation.y,
      Math.PI + MathUtils.lerp(-0.12, 0.12, eased),
      3,
      delta,
    );
    pod.current.rotation.z = MathUtils.damp(
      pod.current.rotation.z,
      Math.sin(eased * Math.PI * 2) * 0.08,
      3,
      delta,
    );
  });

  return (
    <group
      ref={pod}
      position={[0, -4.2, -3]}
      rotation={[0, Math.PI - 0.12, 0]}
      scale={1.25}
    >
      <Pod />
    </group>
  );
}

function World() {
  const world = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!world.current) return;
    const scroll = window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    world.current.position.z = MathUtils.damp(world.current.position.z, scroll * 20, 1.1, delta);
    world.current.rotation.y = MathUtils.damp(world.current.rotation.y, state.pointer.x * 0.025, 2, delta);
    world.current.rotation.x = MathUtils.damp(world.current.rotation.x, -state.pointer.y * 0.012, 2, delta);
  });

  return (
    <group ref={world}>
      <Ruins />
      <Dust />
      <Suspense fallback={null}>
        <group position={[3.8, 0.35, -3]} scale={1.25}>
          <BlackBox />
        </group>
        <ScrollPod />
      </Suspense>
      <mesh position={[0, -3.5, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 70]} />
        <meshStandardMaterial color="#11110f" roughness={1} />
      </mesh>
    </group>
  );
}

export function WorldScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 8], fov: 52, near: 0.1, far: 90 }}
      dpr={[1, 1.35]}
      gl={{ alpha: false, antialias: false, powerPreference: "high-performance" }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(new Color("#0d0d0b"));
        scene.fog = new FogExp2("#1b1a18", 0.032);
      }}
    >
      <ambientLight intensity={0.7} color="#a9a48f" />
      <directionalLight position={[-7, 10, 4]} intensity={2.1} color="#eee8d2" />
      <World />
    </Canvas>
  );
}
