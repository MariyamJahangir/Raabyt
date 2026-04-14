

"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useAnimations,
  Environment,
  ContactShadows,
  Html,
} from "@react-three/drei";
import * as THREE from "three";

// ─── Loading spinner ───
function Loader() {
  return (
    <Html center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            border: "3px solid rgba(255,255,255,0.15)",
            borderTop: "3px solid #8B5CF6",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p style={{ color: "#c4b5fd", fontSize: 13, margin: 0, letterSpacing: 1 }}>
          Loading…
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </Html>
  );
}

// ─── Animated ground grid ───
function GroundGrid() {
  const ref = useRef<THREE.GridHelper>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      // Slowly scroll the grid to simulate walking movement
      ref.current.position.z = (clock.getElapsedTime() * 0.8) % 1;
    }
  });

  return (
    <gridHelper
      ref={ref}
      args={[20, 40, "#1e3a5f", "#0f2440"]}
      position={[0, -0.01, 0]}
    />
  );
}

// ─── Walking businessman model ───
function Businessman({ url }: { url: string }) {
  const group = useRef<any>(null);
  const { scene, animations } = useGLTF(url);
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    // Play walking animation (usually the first or only clip from Mixamo)
    const walkAction = actions[names[0]];
    if (walkAction) {
      walkAction.reset().fadeIn(0.3).play();
      walkAction.setLoop(THREE.LoopRepeat, Infinity);
    }
    return () => {
      if (walkAction) walkAction.fadeOut(0.3);
    };
  }, [actions, names]);

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1}
      position={[0, 0, 0]}
      rotation={[0, -0.3, 0]} // Slight angle toward the viewer
      dispose={null}
    />
  );
}

// ─── Floating particles for tech/futuristic feel ───
function FloatingParticles({ count = 60 }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useRef(
    Float32Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 12)
  ).current;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(t + i) * 0.001; // gentle float
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = t * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#8B5CF6"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Public component ───
export interface BusinessmanViewerProps {
  /** Path to the .glb model in /public (e.g. "/models/businessman-walking.glb") */
  modelUrl: string;
  /** Container height (default "600px") */
  height?: string;
  /** Show the animated grid floor (default true) */
  showGrid?: boolean;
  /** Show floating particles (default true) */
  showParticles?: boolean;
}

export default function BusinessmanViewer({
  modelUrl,
  height = "600px",
  showGrid = true,
  showParticles = true,
}: BusinessmanViewerProps) {
  return (
    <div
      style={{
        width: "100%",
        height,
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{ position: [0, 1.2, 3.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Lighting — brand purple tones */}
        <ambientLight intensity={0.5} color="#e0d4fc" />
        <directionalLight position={[5, 8, 3]} intensity={1.2} color="#ffffff" castShadow />
        <directionalLight position={[-4, 3, -2]} intensity={0.4} color="#8B5CF6" />
        <pointLight position={[0, 3, -3]} intensity={0.5} color="#8B5CF6" />

        {/* Scene elements */}
        <Suspense fallback={<Loader />}>
          <Businessman url={modelUrl} />
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.6}
            scale={8}
            blur={2.5}
            far={3}
            color="#0A0A0F"
          />
          <Environment preset="city" environmentIntensity={0.3} />
        </Suspense>

        {showGrid && <GroundGrid />}
        {showParticles && <FloatingParticles />}

        {/* Camera controls */}
        <OrbitControls
          target={[0, 0.9, 0]}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate
          autoRotateSpeed={0.5}
        />

        {/* Fog for depth */}
        <fog attach="fog" args={["#0A0A0F", 5, 15]} />
      </Canvas>
    </div>
  );
}




// "use client";

// import { Suspense, useEffect, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import {
//   OrbitControls,
//   useGLTF,
//   useAnimations,
//   Environment,
//   ContactShadows,
//   Html,
// } from "@react-three/drei";

// // ─── Loading spinner shown while the model downloads ───
// function Loader() {
//   return (
//     <Html center>
//       <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
//         <div
//           style={{
//             width: 40,
//             height: 40,
//             border: "3px solid rgba(255,255,255,0.2)",
//             borderTop: "3px solid #6366f1",
//             borderRadius: "50%",
//             animation: "spin 0.8s linear infinite",
//           }}
//         />
//         <p style={{ color: "#a5b4fc", fontSize: 14, margin: 0 }}>Loading model…</p>
//         <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//       </div>
//     </Html>
//   );
// }

// // ─── The 3D character mesh ───
// interface CharacterProps {
//   url: string;
//   scale?: number;
//   position?: [number, number, number];
//   animationIndex?: number;
// }

// function Character({
//   url,
//   scale = 1,
//   position = [0, -1, 0],
//   animationIndex = 0,
// }: CharacterProps) {
//   const group = useRef<any>(null);
//   const { scene, animations } = useGLTF(url);
//   const { actions, names } = useAnimations(animations, group);

//   useEffect(() => {
//     // Play the requested animation (defaults to the first one)
//     const name = names[animationIndex] ?? names[0];
//     if (name && actions[name]) {
//       actions[name]!.reset().fadeIn(0.4).play();
//     }
//     return () => {
//       if (name && actions[name]) actions[name]!.fadeOut(0.4);
//     };
//   }, [actions, names, animationIndex]);

//   return (
//     <primitive
//       ref={group}
//       object={scene}
//       scale={scale}
//       position={position}
//       dispose={null}
//     />
//   );
// }

// // ─── Public component you drop into any page ───
// export interface CharacterViewerProps {
//   /** Path to your .glb / .gltf model (put it in /public) */
//   modelUrl: string;
//   /** Uniform scale factor (default 1) */
//   scale?: number;
//   /** Position offset [x, y, z] (default [0, -1, 0]) */
//   position?: [number, number, number];
//   /** Which animation clip to play (0-based index, default 0) */
//   animationIndex?: number;
//   /** Container height in CSS units (default "500px") */
//   height?: string;
//   /** Show orbit controls so users can rotate/zoom (default true) */
//   interactive?: boolean;
//   /** Auto-rotate speed — set to 0 to disable (default 1) */
//   autoRotateSpeed?: number;
//   /** Background color — use "transparent" for no background (default "transparent") */
//   bgColor?: string;
// }

// export default function CharacterViewer({
//   modelUrl,
//   scale = 1,
//   position = [0, -1, 0],
//   animationIndex = 0,
//   height = "500px",
//   interactive = true,
//   autoRotateSpeed = 1,
//   bgColor = "transparent",
// }: CharacterViewerProps) {
//   return (
//     <div style={{ width: "100%", height, position: "relative" }}>
//       <Canvas
//         camera={{ position: [0, 1, 3.5], fov: 45 }}
//         gl={{ antialias: true, alpha: bgColor === "transparent" }}
//         style={{
//           background: bgColor === "transparent" ? "none" : bgColor,
//           borderRadius: 12,
//         }}
//       >
//         {/* Lighting */}
//         <ambientLight intensity={0.6} />
//         <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
//         <directionalLight position={[-3, 3, -3]} intensity={0.3} />

//         {/* Character model with loading fallback */}
//         <Suspense fallback={<Loader />}>
//           <Character
//             url={modelUrl}
//             scale={scale}
//             position={position}
//             animationIndex={animationIndex}
//           />
//           <ContactShadows
//             position={[0, -1, 0]}
//             opacity={0.4}
//             scale={10}
//             blur={2}
//           />
//           <Environment preset="city" />
//         </Suspense>

//         {/* Controls */}
//         {interactive && (
//           <OrbitControls
//             target={[0, 0.5, 0]}
//             enablePan={false}
//             enableZoom={true}
//             minDistance={2}
//             maxDistance={8}
//             autoRotate={autoRotateSpeed > 0}
//             autoRotateSpeed={autoRotateSpeed}
//           />
//         )}
//       </Canvas>
//     </div>
//   );
// }
