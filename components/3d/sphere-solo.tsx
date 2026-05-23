"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/**
 * A single dominant sphere — used as a backdrop for "era" / "Enter a new era" sections.
 * Subtle slow rotation, lit from below to suggest a horizon.
 */
function BigSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.06;
  });
  return (
    <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.15}>
      <mesh ref={ref} position={[0, -0.6, 0]}>
        <sphereGeometry args={[3, 96, 96]} />
        <meshPhysicalMaterial
          color={new THREE.Color().setHSL(0.62, 0.4, 0.04)}
          metalness={0.5}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.15}
          envMapIntensity={1.6}
        />
      </mesh>
    </Float>
  );
}

export function SphereSolo({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, -3, 6]} intensity={1.5} color="#4d8dff" />
        <directionalLight position={[4, 4, 4]} intensity={0.4} color="#9d6cff" />
        <pointLight position={[-4, 2, 3]} intensity={0.3} color="#ffffff" />
        <BigSphere />
        <Environment preset="night" environmentIntensity={0.5} />
      </Canvas>
    </div>
  );
}
