import { useState, useEffect } from 'react';
import { MENU_BACKGROUND_ANIMATION } from '../constants/animations';

/**
 * Hook para gerenciar a animação do menu desktop
 * @param {Array} menuItems - Lista de itens do menu
 * @param {string} section - Seção atual selecionada
 * @returns {Object} Estado e funções da animação
 */
export const useMenuAnimation = (menuItems, section) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Aguarda um pequeno delay para garantir que o DOM esteja pronto
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const getPosition = () => {
    const currentIndex = menuItems.findIndex(item => item.value === section);
    return currentIndex >= 0 ? currentIndex * 135 : 0;
  };

  const animationConfig = {
    initial: {
      width: '120px',
      x: getPosition(),
      opacity: 0,
      scale: 0.8
    },
    animate: {
      width: '120px',
      x: getPosition(),
      opacity: isInitialized ? 1 : 0,
      scale: isInitialized ? 1 : 0.8
    },
    transition: {
      ...MENU_BACKGROUND_ANIMATION.spring,
      opacity: MENU_BACKGROUND_ANIMATION.fade,
      scale: MENU_BACKGROUND_ANIMATION.scale
    }
  };

  return {
    isInitialized,
    getPosition,
    animationConfig
  };
}; 