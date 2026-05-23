"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/**
 * Hero 3D scene — multiple glossy dark spheres at depth,
 * lit by a single soft blue rim, drifting gently.
 * Designed to feel like floating planets seen through atmosphere.
 */
type SphereProps = {
  position: [number, number, number];
  size: number;
  speed?: number;
  hue?: number;
};

function GlossSphere({ position, size, speed = 1, hue = 0.62 }: SphereProps) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.rotation.y = t * 0.15;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.1;
  });

  // Slightly varied dark colors with a hint of blue
  const color = useMemo(() => {
    const c = new THREE.Color();
    c.setHSL(hue, 0.6, 0.05);
    return c;
  }, [hue]);

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={ref} position={position} castShadow receiveShadow>
        <sphereGeometry args={[size, 64, 64]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.4}
          roughness={0.15}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          envMapIntensity={1.4}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      {/* Ambient + key + rim lighting for that "planet in space" feel */}
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[8, 6, 8]}
        intensity={1.2}
        color="#4d8dff"
      />
      <directionalLight
        position={[-6, -2, -4]}
        intensity={0.6}
        color="#9d6cff"
      />
      <pointLight position={[0, 0, 5]} intensity={0.4} color="#ffffff" />

      {/* The spheres — sized and placed asymmetrically, like the reference */}
      <GlossSphere position={[-3.4, 0.2, -0.5]} size={1.1} speed={0.7} hue={0.62} />
      <GlossSphere position={[3.6, 0.4, -0.2]} size={1.3} speed={0.5} hue={0.66} />
      <GlossSphere position={[-1.8, -2.2, 1]} size={0.5} speed={1.1} hue={0.6} />
      <GlossSphere position={[2.2, -2.5, 1.5]} size={0.45} speed={1.3} hue={0.68} />
      <GlossSphere position={[0, 3, -2]} size={0.7} speed={0.6} hue={0.7} />

      {/* Environment for reflections */}
      <Environment preset="night" environmentIntensity={0.6} />
    </>
  );
}

export function SphereScene({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
