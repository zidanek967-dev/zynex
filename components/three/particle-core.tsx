"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const BRAND = new THREE.Color("#3D6BFF");
const BRAND_2 = new THREE.Color("#C6FF3E");
const PARTICLE_COUNT = 1600;

// Computed once at module load (not inside render/useMemo) since it's pure
// randomized setup data with no dependency on props, state, or React at all.
function createParticleGeometry() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const tmpColor = new THREE.Color();

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Distribute points roughly on a sphere shell with some radial jitter —
    // reads as a "core" rather than a flat disc or solid ball.
    const radius = 2.1 + Math.random() * 0.9;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    tmpColor.copy(BRAND).lerp(BRAND_2, Math.random() * 0.6);
    colors[i * 3] = tmpColor.r;
    colors[i * 3 + 1] = tmpColor.g;
    colors[i * 3 + 2] = tmpColor.b;
  }

  return { positions, colors };
}

const PARTICLE_GEOMETRY = createParticleGeometry();

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, colors } = PARTICLE_GEOMETRY;
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Gentle constant spin plus a lazy ease toward the pointer position —
    // reads as "reacting to cursor" without being twitchy.
    target.current.x = state.pointer.y * 0.35;
    target.current.y = state.pointer.x * 0.45;

    pointsRef.current.rotation.x += delta * 0.05;
    pointsRef.current.rotation.y += delta * 0.08;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      pointsRef.current.rotation.x + (target.current.x - pointsRef.current.rotation.x) * 0.02,
      1,
    );
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(
      pointsRef.current.rotation.y,
      pointsRef.current.rotation.y + (target.current.y - pointsRef.current.rotation.y) * 0.02,
      1,
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Core() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12;
      meshRef.current.rotation.x += delta * 0.04;
    }
    if (innerRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.04;
      innerRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color={BRAND} wireframe transparent opacity={0.5} />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.55, 2]} />
        <meshBasicMaterial color={BRAND_2} wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export function ParticleCore() {
  return (
    <>
      <Core />
      <ParticleField />
    </>
  );
}
