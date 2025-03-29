'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Model3D({ color, isMobile, isTablet }) {
  const { scene } = useGLTF('/modelo.glb');
  const modelRef = useRef();
  const [currentTexture, setCurrentTexture] = useState(null);

  // Textures mapping - associating colors with texture paths
  const textureMap = {
    '#000000': '/textures/black_texture.jpg',
    '#ff0000': '/textures/red_texture.jpg',
    '#0066ff': '/textures/blue_texture.jpg',
    '#00ff00': '/textures/green_texture.jpg',
    '#800080': '/textures/purple_texture.jpg',
    '#ffff00': '/textures/yellow_texture.jpg',
  };

  // Effect to apply texture when color changes
  useEffect(() => {
    if (!color) return;
    
    // Create a new texture loader
    const textureLoader = new THREE.TextureLoader();
    
    // Load the texture based on the selected color
    if (textureMap[color]) {
      textureLoader.load(textureMap[color], (texture) => {
        // Set texture settings
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = false;
        
        setCurrentTexture(texture);
        
        // Apply texture to all materials in the model
        scene.traverse((node) => {
          if (node.isMesh && node.material) {
            node.material.map = texture;
            node.material.needsUpdate = true;
          }
        });
      });
    } else {
      // If no texture is available for this color, apply color directly
      scene.traverse((node) => {
        if (node.isMesh && node.material) {
          node.material.color.set(color);
          node.material.needsUpdate = true;
        }
      });
    }
  }, [color, scene]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  // Get scale based on device type
  const getScale = () => {
    if (isMobile) return 0.45;
    if (isTablet) return 0.5;
    return 0.45;
  };

  // Get position based on device type
  const getPosition = () => {
    if (isMobile) return [0, -1, 0];
    if (isTablet) return [0, -1, 0];
    return [0, -1.3, 0];
  };

  return (
    <group ref={modelRef}>
      <primitive 
        object={scene} 
        scale={getScale()}
        rotation={[0, 0, 0]} 
        position={getPosition()} 
      />
    </group>
  );
}

useGLTF.preload('/modelo.glb');
