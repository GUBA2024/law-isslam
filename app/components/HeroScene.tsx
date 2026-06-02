"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function JusticeScale() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.2;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      <mesh position={[0, -1.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.4, 0.18, 64]} />
        <meshStandardMaterial color="#ab7a22" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.2, 1.7, 48]} />
        <meshStandardMaterial color="#d8a949" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.65, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1.8, 48]} />
        <meshStandardMaterial color="#e2c375" metalness={1} roughness={0.16} />
      </mesh>

      {[-0.8, 0.8].map((x) => (
        <group key={x} position={[x, 0.62, 0]}>
          <mesh position={[0, -0.24, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.45, 24]} />
            <meshStandardMaterial color="#f4d17e" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.25, 0.05, 24, 64]} />
            <meshStandardMaterial color="#b88c33" metalness={1} roughness={0.22} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.11, 32, 32]} />
        <meshPhysicalMaterial
          color="#fff7de"
          transmission={0.55}
          roughness={0.05}
          thickness={0.5}
          ior={1.45}
        />
      </mesh>
    </group>
  );
}

function GoldenParticles() {
  const particles = useMemo(
    () =>
      new Array(90).fill(null).map(() => ({
        position: [
          THREE.MathUtils.randFloatSpread(7),
          THREE.MathUtils.randFloat(-1.7, 2.7),
          THREE.MathUtils.randFloatSpread(7),
        ] as [number, number, number],
      })),
    []
  );

  return (
    <group>
      {particles.map((particle, index) => (
        <Float
          key={index}
          speed={1 + (index % 5) * 0.18}
          floatIntensity={0.7}
          rotationIntensity={0.3}
          position={particle.position}
        >
          <mesh>
            <sphereGeometry args={[0.02 + (index % 4) * 0.01, 8, 8]} />
            <meshBasicMaterial color="#f3cd76" transparent opacity={0.9} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.5]}
      shadows
      camera={{ position: [0, 0.5, 4.2], fov: 42 }}
    >
      <color attach="background" args={["#05080f"]} />
      <fog attach="fog" args={["#05080f", 3, 10]} />
      <ambientLight intensity={0.4} color="#f0dfb1" />
      <spotLight position={[4, 6, 4]} angle={0.35} penumbra={0.8} intensity={65} color="#ffd174" castShadow />
      <pointLight position={[-3, 2, -2]} intensity={20} color="#2155a7" />

      <Suspense fallback={null}>
        <GoldenParticles />
        <Float speed={1.3} floatIntensity={0.75} rotationIntensity={0.35}>
          <JusticeScale />
        </Float>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
          <circleGeometry args={[4.3, 64]} />
          <meshStandardMaterial color="#050910" roughness={0.9} metalness={0.25} />
        </mesh>
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={1.8} minPolarAngle={1.35} autoRotate autoRotateSpeed={0.25} />
    </Canvas>
  );
}
