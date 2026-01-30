import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

function Head({ speaking, intensity = 1 }) {
  const group = useRef();
  const leftEye = useRef();
  const rightEye = useRef();
  const mouth = useRef();
  const glow = useRef();

  // simple param for blink/time
  let t = 0;

  useFrame((state, delta) => {
    t += delta;

    // slow rotation + bob
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.25;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.07) * 0.03;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.03;
    }

    // eyes blink every 4s
    const blink = (Math.sin(t * 2 * Math.PI * 0.5) + 1) / 2; // 0..1
    const shouldBlink = (Math.sin(t * Math.PI * 0.5) > 0.98); // brief
    const eyeScaleY = shouldBlink ? 0.05 : 1;

    if (leftEye.current && rightEye.current) {
      leftEye.current.scale.y = THREE.MathUtils.lerp(leftEye.current.scale.y, eyeScaleY, 0.25);
      rightEye.current.scale.y = THREE.MathUtils.lerp(rightEye.current.scale.y, eyeScaleY, 0.25);
    }

    // mouth animates when speaking
    if (mouth.current) {
      const target = speaking ? 0.8 + Math.abs(Math.sin(state.clock.elapsedTime * 20)) * 0.7 : 0.12;
      mouth.current.scale.y = THREE.MathUtils.lerp(mouth.current.scale.y, target, 0.2);
    }

    // glow intensity when speaking
    if (glow.current) {
      glow.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        glow.current.material.emissiveIntensity || 0.5,
        speaking ? 2.5 * intensity : 0.6,
        0.05
      );
    }
  });

  return (
    <group ref={group} dispose={null} position={[0, -0.1, 0]}>
      {/* Head shell (semi-transparent hologram) */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.6, 48, 48]} />
        <meshPhysicalMaterial
          transmission={0.2}
          opacity={0.95}
          transparent
          roughness={0.2}
          metalness={0.5}
          clearcoat={0.7}
          color={"#73d0ff"}
          emissive={"#4fbfff"}
          emissiveIntensity={0.6}
          reflectivity={0.2}
        />
      </mesh>

      {/* Inner wire / strata to give hologram feel */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.65, 0.01, 6, 64]} />
        <meshStandardMaterial color="#7fe7ff" emissive="#7fe7ff" emissiveIntensity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0.5, 0]}>
        <torusGeometry args={[0.55, 0.01, 6, 64]} />
        <meshStandardMaterial color="#b0f0ff" emissive="#b0f0ff" emissiveIntensity={0.25} />
      </mesh>

      {/* Eyes */}
      <group position={[0, 0.05, 0.45]}>
        <mesh ref={leftEye} position={[-0.18, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#001b2e" emissive="#99f0ff" emissiveIntensity={0.6} />
        </mesh>
        <mesh ref={rightEye} position={[0.18, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#001b2e" emissive="#99f0ff" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Mouth (thin torus scaled in Y for talk) */}
      <mesh ref={mouth} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.18, 0.48]}>
        <torusGeometry args={[0.18, 0.03, 8, 64]} />
        <meshStandardMaterial color="#99f0ff" emissive="#99f0ff" emissiveIntensity={0.8} />
      </mesh>

      {/* Glow bubble */}
      <mesh ref={glow} scale={[1.4, 1.4, 1.4]}>
        <sphereGeometry args={[0.62, 32, 32]} />
        <meshStandardMaterial
          color="#57e0ff"
          transparent
          opacity={0.12}
          emissive="#57e0ff"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

export default function Avatar3D({ speaking = false, size = 220 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 16,
        overflow: "hidden",
        background: "linear-gradient(180deg, rgba(10,10,20,0.4), rgba(0,0,0,0.2))",
        boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <spotLight position={[-5, 2, 5]} angle={0.4} penumbra={0.5} intensity={0.4} />
        <Head speaking={speaking} />
        {/* orbit disabled but useful during dev */}
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
      </Canvas>
    </div>
  );
}