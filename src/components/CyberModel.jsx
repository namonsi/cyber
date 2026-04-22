import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial, Float, PresentationControls, Stage } from '@react-three/drei';

const Model = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.5;
    const scrollY = window.scrollY;
    meshRef.current.rotation.z = scrollY * 0.005;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.35, 256, 32]} />
      <MeshWobbleMaterial 
        color="#00f3ff" 
        factor={0.6} 
        speed={2} 
        roughness={0.1}
        metalness={1}
        emissive="#00f3ff"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

const CyberModel = () => {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas dpr={[1, 2]} camera={{ fov: 45 }}>
        <color attach="background" args={['#000000']} />
        <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
          <Stage environment="city" intensity={0.6} contactShadow={false}>
            <Model />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  );
};

export default CyberModel;

