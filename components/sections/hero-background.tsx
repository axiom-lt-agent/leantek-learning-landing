"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const [positions, velocities] = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return [pos, vel];
  }, []);

  const geometryRef = useRef<THREE.BufferGeometry>(null);

  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
    }
  }, [positions]);

  useFrame(() => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;
    for (let i = 0; i < posArray.length / 3; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];
      if (Math.abs(posArray[i * 3]) > 6) velocities[i * 3] *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > 4) velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArray[i * 3 + 2]) > 3) velocities[i * 3 + 2] *= -1;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.04}
        color="#38bdf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-2, 1, -2]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color="#0ea5e9"
          transparent
          opacity={0.25}
          wireframe
        />
      </mesh>
      <mesh position={[2.5, -0.5, -1]}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#d946ef"
          transparent
          opacity={0.2}
          wireframe
        />
      </mesh>
      <mesh position={[0, 2, -3]}>
        <torusGeometry args={[0.5, 0.08, 8, 24]} />
        <meshStandardMaterial
          color="#38bdf8"
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
      <mesh position={[-1.5, -1.5, -1.5]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color="#7dd3fc"
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <Particles />
      <FloatingShapes />
    </>
  );
}

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      // Cleanup handled by React Three Fiber automatically
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10"
      style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #082f49 50%, #0c4a6e 100%)" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <Scene />
      </Canvas>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(8,47,73,0.4) 100%)",
        }}
      />
    </div>
  );
}
