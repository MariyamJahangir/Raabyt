"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

/* ─── Orbiting Particles ─── */

const ORBIT_COUNT = 600;

function OrbitingParticles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(ORBIT_COUNT * 3);
    for (let i = 0; i < ORBIT_COUNT; i++) {
      const i3 = i * 3;
      // Distribute on expanding shells
      const radius = 2.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(ORBIT_COUNT * 3);
    const cyanR = 6 / 255, cyanG = 182 / 255, cyanB = 212 / 255;
    const purpleR = 139 / 255, purpleG = 92 / 255, purpleB = 246 / 255;
    for (let i = 0; i < ORBIT_COUNT; i++) {
      const t = Math.random();
      const i3 = i * 3;
      col[i3] = THREE.MathUtils.lerp(cyanR, purpleR, t);
      col[i3 + 1] = THREE.MathUtils.lerp(cyanG, purpleG, t);
      col[i3 + 2] = THREE.MathUtils.lerp(cyanB, purpleB, t);
    }
    return col;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.08;
    ref.current.rotation.x += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── Shield Wireframe ─── */

function ShieldSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const innerRef = useRef<THREE.LineSegments>(null);

  const outerEdges = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 2);
    return new THREE.EdgesGeometry(geo);
  }, []);

  const innerEdges = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.4, 1);
    return new THREE.EdgesGeometry(geo);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const rotY = t * 0.1;
    const rotX = Math.sin(t * 0.08) * 0.15;

    if (meshRef.current) {
      meshRef.current.rotation.y = rotY;
      meshRef.current.rotation.x = rotX;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = rotY;
      wireRef.current.rotation.x = rotX;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -rotY * 0.6;
      innerRef.current.rotation.x = -rotX * 0.5;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group>
        {/* Solid fill — faint */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2, 2]} />
          <meshStandardMaterial
            color="#06B6D4"
            transparent
            opacity={0.03}
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>

        {/* Outer wireframe — cyan */}
        <lineSegments ref={wireRef} geometry={outerEdges}>
          <lineBasicMaterial
            color="#06B6D4"
            transparent
            opacity={0.5}
            linewidth={1}
          />
        </lineSegments>

        {/* Inner wireframe — purple, counter-rotating */}
        <lineSegments ref={innerRef} geometry={innerEdges}>
          <lineBasicMaterial
            color="#8B5CF6"
            transparent
            opacity={0.35}
            linewidth={1}
          />
        </lineSegments>

        {/* Core glow */}
        <pointLight color="#06B6D4" intensity={3} distance={5} decay={2} />
        <pointLight
          color="#8B5CF6"
          intensity={1.5}
          distance={4}
          decay={2}
          position={[0.5, 1, 0.5]}
        />
      </group>
    </Float>
  );
}

/* ─── Mouse Parallax ─── */

function MouseParallax() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector2(0, 0));

  useThree(({ gl }) => {
    const canvas = gl.domElement;
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      target.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    canvas.addEventListener("mousemove", onMove, { passive: true });
    return () => canvas.removeEventListener("mousemove", onMove);
  });

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.current.x, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.current.y, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ─── Exported Scene ─── */

export default function UFMShieldScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent" }}
    >
      <color attach="background" args={["#0A0A0F"]} />

      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#06B6D4" />
      <pointLight position={[-4, -2, 3]} intensity={0.4} color="#8B5CF6" decay={2} distance={12} />

      <Environment preset="night" />

      <OrbitingParticles />
      <ShieldSphere />
      <MouseParallax />
    </Canvas>
  );
}
