'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

export default function Model3D({ color, isMobile, isTablet, visible = true }) {
  const { scene } = useGLTF('/modelo.glb');
  const modelRef = useRef();
  const [currentTexture, setCurrentTexture] = useState(null);

  // Simplificando as animações para um fade-in mais elegante
  const springs = useSpring({
    scale: visible ? getScale() : 0.01,
    y: visible ? getPosition()[1] : getPosition()[1] - 0.5,
    x: visible ? getPosition()[0] : getPosition()[0] - 0.5,
    opacity: visible ? 1 : 0,
    config: { mass: 1, tension: 120, friction: 14 },
  });

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
            
            // Make materials transparent for opacity animation
            node.material.transparent = true;
          }
        });
      });
    } else {
      // If no texture is available for this color, apply color directly
      scene.traverse((node) => {
        if (node.isMesh && node.material) {
          node.material.color.set(color);
          node.material.needsUpdate = true;
          
          // Make materials transparent for opacity animation
          node.material.transparent = true;
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
  function getScale() {
    if (isMobile) return 0.45;
    if (isTablet) return 0.5;
    return 0.48; // Aumentado ligeiramente para desktop
  }

  // Get position based on device type
  function getPosition() {
    if (isMobile) return [0, -1, 0];
    if (isTablet) return [0, -1, 0];
    return [-0.6, -1.3, 0]; // Movido para a esquerda na versão desktop
  }

  // Apply opacity to all materials
  useEffect(() => {
    scene.traverse((node) => {
      if (node.isMesh && node.material) {
        node.material.transparent = true;
      }
    });
  }, [scene]);

  // Extrair z da posição original
  const [, , z] = getPosition();

  return (
    <animated.group 
      ref={modelRef}
      position-x={springs.x}
      position-y={springs.y}
      position-z={z}
    >
      <animated.primitive 
        object={scene} 
        scale={springs.scale}
        opacity={springs.opacity}
      />
    </animated.group>
  );
}

useGLTF.preload('/modelo.glb');
