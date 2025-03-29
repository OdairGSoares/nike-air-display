'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Model3D({ color, isMobile, isTablet, visible = true }) {
  const { scene } = useGLTF('/modelo.glb');
  const modelRef = useRef();
  const animationRef = useRef({ active: false });
  const [currentTexture, setCurrentTexture] = useState(null);
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.01);
  const [position, setPosition] = useState([0, -1.5, 0]);

  // Função de easing para suavizar a animação (easeOutCubic)
  const easeOutCubic = (x) => {
    return 1 - Math.pow(1 - x, 3);
  };

  // Função de easing para entrada (easeOutBack - com pequeno efeito de rebote)
  const easeOutBack = (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  };

  // Animação de entrada/saída do modelo
  useEffect(() => {
    // Cancelando qualquer animação em andamento
    if (animationRef.current.timeoutId) {
      clearTimeout(animationRef.current.timeoutId);
    }
    
    // Marcando nova animação como ativa
    animationRef.current.active = true;
    
    if (visible) {
      // Animação de entrada
      const targetScale = getScale();
      const targetPosition = getPosition();
      const startScale = scale;
      const startPosition = [...position];
      const steps = 30; // Aumentando o número de passos para maior suavidade
      let step = 0;
      
      const animate = () => {
        // Verificar se a animação ainda está ativa
        if (!animationRef.current.active) return;
        
        step += 1;
        const rawProgress = step / steps;
        // Aplicando função de easing para suavizar
        const progress = easeOutCubic(rawProgress);
        
        // Interpolar os valores com easing
        setScale(0.01 + progress * (targetScale - 0.01));
        setOpacity(Math.min(1, progress * 1.2)); // Acelera um pouco a opacidade
        
        // Para posição, usamos uma curva ligeiramente diferente para parecer mais natural
        const posX = targetPosition[0] * easeOutCubic(rawProgress);
        const posY = targetPosition[1] + (1 - easeOutBack(rawProgress)) * -0.5;
        const posZ = targetPosition[2];
        
        setPosition([posX, posY, posZ]);
        
        if (step < steps) {
          animationRef.current.timeoutId = setTimeout(animate, 16); // ~60fps
        }
      };
      
      animate();
    } else {
      // Animação de saída
      const startScale = scale;
      const startPosition = [...position];
      const steps = 15; // Mais passos para saída também
      let step = 0;
      
      const animate = () => {
        // Verificar se a animação ainda está ativa
        if (!animationRef.current.active) return;
        
        step += 1;
        const rawProgress = step / steps;
        // Aplicando função de easing para suavizar
        const progress = easeOutCubic(rawProgress);
        
        // Interpolar os valores de saída com easing
        setScale(startScale * (1 - progress) + 0.01 * progress);
        setOpacity(1 - progress);
        
        // Saída mais suave para a posição
        setPosition([
          startPosition[0] * (1 - progress),
          startPosition[1] - progress * 0.3, // Movimento vertical mais sutil
          startPosition[2]
        ]);
        
        if (step < steps) {
          animationRef.current.timeoutId = setTimeout(animate, 16); // ~60fps
        }
      };
      
      animate();
    }
    
    // Função de limpeza
    return () => {
      // Marcar animação como inativa
      animationRef.current.active = false;
      
      // Limpar timeout
      if (animationRef.current.timeoutId) {
        clearTimeout(animationRef.current.timeoutId);
      }
    };
  }, [visible, isMobile, isTablet]); // removemos scale e position das dependências

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

  // Apply opacity to model materials
  useEffect(() => {
    scene.traverse((node) => {
      if (node.isMesh && node.material) {
        node.material.transparent = true;
        node.material.opacity = opacity;
        node.material.needsUpdate = true;
      }
    });
  }, [scene, opacity]);

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

  return (
    <group 
      ref={modelRef}
      position={position}
    >
      <primitive 
        object={scene} 
        scale={scale}
      />
    </group>
  );
}

useGLTF.preload('/modelo.glb');
