"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Particle Field ─── */

const PARTICLE_COUNT = 500;

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);

    const purpleR = 139 / 255, purpleG = 92 / 255, purpleB = 246 / 255;
    const magentaR = 217 / 255, magentaG = 70 / 255, magentaB = 239 / 255;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 20;
      pos[i3 + 1] = (Math.random() - 0.5) * 20;
      pos[i3 + 2] = (Math.random() - 0.5) * 20;

      const t = Math.random();
      col[i3] = THREE.MathUtils.lerp(purpleR, magentaR, t);
      col[i3 + 1] = THREE.MathUtils.lerp(purpleG, magentaG, t);
      col[i3 + 2] = THREE.MathUtils.lerp(purpleB, magentaB, t);

      sz[i] = Math.random() * 2 + 0.5;
    }

    return { positions: pos, colors: col, sizes: sz };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.015;
    ref.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── Enterprise 3D Object — Torus Knot ─── */

function EnterpriseObject() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.15;
  });

  return (
    <group position={[3, 0, -1]}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.35, 64, 16]} />
        <meshStandardMaterial
          color="#8B5CF6"
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      <pointLight color="#8B5CF6" intensity={3} distance={8} decay={2} />
    </group>
  );
}

/* ─── Mouse Parallax Rig ─── */

function MouseParallax() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector2(0, 0));

  const onMove = useCallback((e: { clientX: number; clientY: number }) => {
    target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.8;
    target.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.4;
  }, []);

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.current.x, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.current.y, 0.02);
    camera.lookAt(0, 0, 0);
  });

  useThree(({ gl }) => {
    const canvas = gl.domElement;
    canvas.addEventListener("mousemove", onMove, { passive: true });
    return () => canvas.removeEventListener("mousemove", onMove);
  });

  return null;
}

/* ─── Exported Scene ─── */

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  return (
    <Canvas
      onCreated={onReady}
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      frameloop="always"
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent" }}
    >
      <color attach="background" args={["#0A0A0F"]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#A78BFA" />

      <ParticleField />
      <EnterpriseObject />
      <MouseParallax />
    </Canvas>
  );
}
