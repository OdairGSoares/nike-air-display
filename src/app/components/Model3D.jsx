'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Model3D({ color, isMobile, isTablet, visible = true, section, onColorChange }) {
  const modelRef = useRef();
  const animationRef = useRef({ active: false });
  const [currentTexture, setCurrentTexture] = useState(null);
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.01);
  const [position, setPosition] = useState([0, -1.5, 0]);
  const [currentModel, setCurrentModel] = useState(null);
  const [effectiveColor, setEffectiveColor] = useState(color);

  // Mapeamento de seções para modelos 3D
  const modelMap = {
    'Releases': '/Models/Nike Air Force.glb',
    'Air Force 1': '/Models/Nike Air Force 1.glb', 
    'Air Force 90': '/Models/Nike Air Max 90.glb'
  };

  // Cores disponíveis para cada modelo (sincronizado com ColorButtons.jsx)
  const colorsBySection = {
    'Releases': [
      { name: 'white', value: '#ffffff', label: 'Branco' },
      { name: 'blue', value: '#0066ff', label: 'Branco e Azul' },
      { name: 'black', value: '#000000', label: 'Preto e Branco' },
      { name: 'brown', value: '#8B4513', label: 'Preto e Marrom' },
    ],
    'Air Force 1': [
      { name: 'white', value: '#ffffff', label: 'Branco' },
      { name: 'blue', value: '#0066ff', label: 'Branco e Azul' },
      { name: 'black', value: '#000000', label: 'Preto e Branco' },
      { name: 'brown', value: '#8B4513', label: 'Preto e Marrom' },
    ],
    'Air Force 90': [
      { name: 'blue', value: '#0066ff', label: 'Azul Branco e Cinza' },
      { name: 'green', value: '#00ff00', label: 'Verde Branco e Cinza' },
      { name: 'yellow', value: '#ffff00', label: 'Amarelo e Cinza' },
      { name: 'red', value: '#ff0000', label: 'Preto e Vermelho' },
      { name: 'black', value: '#000000', label: 'Preto e Branco' },
    ]
  };

  // Carregar modelo baseado na seção
  const modelPath = modelMap[section] || '/Models/Nike Air Force 1.glb';
  const { scene } = useGLTF(modelPath);

  // Debug: log da seção atual para verificar se está recebendo corretamente
  useEffect(() => {
    console.log('Model3D recebeu seção:', section);
    console.log('Carregando modelo:', modelPath);
  }, [section, modelPath]);

  // Verificar se a cor atual está disponível no modelo e fazer fallback se necessário
  useEffect(() => {
    if (!section || !color) return;

    const availableColors = colorsBySection[section] || [];
    const colorExists = availableColors.some(colorOption => colorOption.value === color);
    
    if (!colorExists && availableColors.length > 0) {
      // Cor atual não existe no modelo, usar a primeira cor disponível
      const firstColor = availableColors[0].value;
      setEffectiveColor(firstColor);
      
      // Notificar o componente pai sobre a mudança de cor
      if (onColorChange) {
        onColorChange(firstColor);
      }
      
      console.log(`Cor ${color} não disponível para ${section}, usando ${firstColor}`);
    } else {
      // Cor atual é válida para este modelo
      setEffectiveColor(color);
    }
  }, [section, color, onColorChange]);

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
        const posY = targetPosition[1] + (1 - easeOutBack(rawProgress)) * -0.3; // Ajustado para posições abaixadas
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
          startPosition[1] - progress * 0.2, // Ajustado para trabalhar com posições abaixadas
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
  }, [visible, isMobile, isTablet, section]); // Adicionamos section às dependências para reanigar quando mudar o modelo

  // Mapeamento de texturas específicas para cada modelo
  const textureMap = {
    'Releases': {
      '#ffffff': '/Models/Nike Air Force 1/Branco.jpg',
      '#0066ff': '/Models/Nike Air Force 1/Branco e Azul.jpg',
      '#000000': '/Models/Nike Air Force 1/Preto e Branco.jpg',
      '#8B4513': '/Models/Nike Air Force 1/Preto e Marrom.png',
    },
    'Air Force 1': {
      '#ffffff': '/Models/Nike Air Force 1/Branco.jpg',
      '#0066ff': '/Models/Nike Air Force 1/Branco e Azul.jpg',
      '#000000': '/Models/Nike Air Force 1/Preto e Branco.jpg',
      '#8B4513': '/Models/Nike Air Force 1/Preto e Marrom.png',
    },
    'Air Force 90': {
      '#0066ff': '/Models/Nike Air Max 90/Azul Branco e Cinza.jpg',
      '#00ff00': '/Models/Nike Air Max 90/Verde Branco e Cinza.jpg',
      '#ffff00': '/Models/Nike Air Max 90/Amarelo e Cinza.jpg',
      '#ff0000': '/Models/Nike Air Max 90/Preto e Vermelho.jpg',
      '#000000': '/Models/Nike Air Max 90/Preto e Branco.jpg',
    }
  };

  // Effect to apply texture when color changes
  useEffect(() => {
    if (!effectiveColor || !scene || !section) return;
    
        // PRIMEIRO: Limpar todos os materiais do modelo anterior
    scene.traverse((node) => {
      if (node.isMesh && node.material) {
        // Resetar o material para estado limpo
        node.material.map = null;
        node.material.color.set('#ffffff'); // Cor neutra
        node.material.needsUpdate = true;
        node.material.transparent = true;
      }
    });
    
    // Tratamento especial para o modelo Releases - aplicar cor diretamente aos materiais específicos
    if (section === 'Releases') {
      const targetMaterials = [
        'Scene_-_Root_1_1.001',
        'Leather_Copy_1_1748881.001',
        'Leather_Copy_1_1748881'
      ];
      
      scene.traverse((node) => {
        if (node.isMesh && node.material) {
          // Verificar se o material está na lista de materiais alvo
          if (targetMaterials.includes(node.material.name)) {
            // Aplicar cor diretamente ao material específico
            node.material.color.set(effectiveColor);
            node.material.map = null; // Garantir que não há textura
            node.material.needsUpdate = true;
            
            // Make materials transparent for opacity animation
            node.material.transparent = true;
          }
        }
      });
      
      return; // Sair do useEffect para não executar a lógica de textura
    }
    
    // Para outros modelos, usar texturas como antes
    const textureLoader = new THREE.TextureLoader();
    
    // Get the texture map for current section
    const currentTextureMap = textureMap[section];
    
    if (currentTextureMap && currentTextureMap[effectiveColor]) {
      // Load the specific texture for this model and color
      textureLoader.load(currentTextureMap[effectiveColor], (texture) => {
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
      // Fallback: apply color directly if no texture is available
      scene.traverse((node) => {
        if (node.isMesh && node.material) {
          node.material.color.set(effectiveColor);
          node.material.needsUpdate = true;
          
          // Make materials transparent for opacity animation
          node.material.transparent = true;
        }
      });
    }
  }, [effectiveColor, scene, section]);

  // Apply opacity to model materials
  useEffect(() => {
    if (!scene) return;
    
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
    if (isMobile) return 0.5;
    if (isTablet) return 0.5;
    return 0.5; // Aumentado ligeiramente para desktop
  }

  // Get position based on device type - centralizados horizontalmente e abaixados
  function getPosition() {
    if (isMobile) return [0, -1, 0];
    if (isTablet) return [0, -1.1, 0];
    return [-0.6, -1.3, 0]; // Modelos abaixados no frame 3D
  }

  // Renderizar apenas se temos um scene válido
  if (!scene) {
    return null;
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

// Preload todos os modelos para melhor performance
useGLTF.preload('/Models/Nike Air Force 1.glb');
useGLTF.preload('/Models/Nike Air Max 90.glb');
useGLTF.preload('/Models/Nike Air Force.glb');
