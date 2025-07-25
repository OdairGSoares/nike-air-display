'use client';

import { motion } from 'framer-motion';

export default function ColorButtons({ setColor, isMobile, isTablet, section }) {

  // Cores específicas para cada modelo baseadas nas texturas disponíveis
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

  // Get colors for current section
  const colors = colorsBySection[section] || colorsBySection['Releases'];
  
  // Determine position based on device type
  const getPositionClass = () => {
    if (isMobile) {
      return 'fixed bottom-28 left-0 right-0 flex-row justify-center';
    } else if (isTablet) {
      return 'fixed right-4 top-1/2 -translate-y-1/2 flex-col';
    } else {
      return 'fixed right-8 top-1/2 -translate-y-[40%] flex-col';
    }
  };
  
  return (
    <motion.div
      key={section} // Força re-render quando a seção muda
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className={`${getPositionClass()} 
      flex items-center gap-3 md:gap-4 w-auto z-50 p-2 ${isTablet ? 'backdrop-blur-sm bg-white/10 rounded-full' : ''}`}
    >
      {colors.map((color) => (
        <motion.button
          key={`${section}-${color.name}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setColor(color.value)}
          className={`${isMobile ? 'w-6 h-6' : isTablet ? 'w-7 h-7' : 'w-8 h-8'} rounded-full shadow-lg
            border-2 border-white/20 hover:border-white/40
            transition-all duration-300 backdrop-blur-sm group relative`}
          style={{ 
            backgroundColor: `${color.value}60`,
            boxShadow: `0 0 20px ${color.value}60`,
            WebkitTapHighlightColor: 'transparent'
          }}
          title={color.label}
        >
          {/* Tooltip para mostrar o nome da cor */}
          <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
                         bg-black/80 text-white text-xs px-2 py-1 rounded 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                         whitespace-nowrap pointer-events-none z-10">
            {color.label}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
} 