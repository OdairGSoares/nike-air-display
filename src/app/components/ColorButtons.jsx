'use client';

import { motion } from 'framer-motion';

export default function ColorButtons({ setColor, isMobile, isTablet }) {

  const colors = [
    { name: 'black', value: '#000000' },
    { name: 'red', value: '#ff0000' },
    { name: 'blue', value: '#0066ff' },
    { name: 'green', value: '#00ff00' },
    { name: 'purple', value: '#800080' },
    { name: 'yellow', value: '#ffff00' },
  ];
  
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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className={`${getPositionClass()} 
      flex items-center gap-3 md:gap-4 w-auto z-50 p-2 ${isTablet ? 'backdrop-blur-sm bg-white/10 rounded-full' : ''}`}
    >
      {colors.map((color) => (
        <motion.button
          key={color.name}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setColor(color.value)}
          className={`${isMobile ? 'w-6 h-6' : isTablet ? 'w-7 h-7' : 'w-8 h-8'} rounded-full shadow-lg
            border-2 border-white/20 hover:border-white/40
            transition-all duration-300 backdrop-blur-sm`}
          style={{ 
            backgroundColor: `${color.value}60`,
            boxShadow: `0 0 20px ${color.value}60`,
            WebkitTapHighlightColor: 'transparent'
          }}
        >
        </motion.button>
      ))}
    </motion.div>
  );
} 