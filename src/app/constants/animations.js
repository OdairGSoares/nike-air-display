// Configurações de animação para o menu desktop
export const MENU_BACKGROUND_ANIMATION = {
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30
  },
  fade: {
    duration: 0.3
  },
  scale: {
    duration: 0.2
  }
};

// Configurações de animação para o header
export const HEADER_ANIMATION = {
  initial: { y: -100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -100, opacity: 0 },
  transition: { type: "spring", stiffness: 100, damping: 20, mass: 1 }
};

// Configurações de animação para o menu mobile
export const MENU_ANIMATION = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Configurações de animação para botões
export const BUTTON_ANIMATION = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  }
}; 