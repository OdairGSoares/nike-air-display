'use client';

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Model3D from './Model3D';
import ColorButtons from './ColorButtons';

export default function Scene3D({ color, isMobile, isTablet, visible = true }) {
  const [modelColor, setModelColor] = useState('#ffffff');
 

  const handleColorChange = (color) => {
    setModelColor(color);
  };

  // Get camera position based on device type
  const getCameraPosition = () => {
    if (isMobile) return [0, -0.8, 2.8];
    if (isTablet) return [0, -0.7, 2.5];
    return [-0.6, -0.6, 2.3];
  };

  // Get camera target (where the camera aponta) based on device type
  const getCameraTarget = () => {
    if (isMobile) return [0, -0.7, 0];
    if (isTablet) return [0, -0.7, 0];
    return [-0.6, -0.9, 0];
  };

  // Get field of view based on device type
  const getFov = () => {
    if (isMobile) return 45;
    if (isTablet) return 42;
    return 40;
  };

  return (
      <Canvas
        camera={{ 
          position: getCameraPosition(),
          fov: getFov(),
        }}
        dpr={[1, 2]} // Limit pixel ratio for better performance
        style={{ touchAction: 'none' }} // Prevents scrolling issues on mobile
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Model3D 
          color={color} 
          position={[0, 0, 0]}
          isMobile={isMobile}
          isTablet={isTablet}
          visible={visible}
        />
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.8}
          minDistance={1}
          maxDistance={10}
          target={getCameraTarget()}
        />
        <Environment preset="city" />
      </Canvas>
  );
} 