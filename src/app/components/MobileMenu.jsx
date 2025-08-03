import { motion, AnimatePresence } from 'framer-motion';
import { MENU_ANIMATION } from '../constants/animations';

const MobileMenu = ({ menuOpen, menuItems, section, setCurrentSection, setMenuOpen }) => (
  <AnimatePresence>
    {menuOpen && (
      <motion.div 
        {...MENU_ANIMATION}
        className="fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-md z-40 flex flex-col items-center justify-center"
      >
        {menuItems.map((item, index) => (
          <motion.button
            key={item.value}
            className={`text-xl mb-6 transition-colors hover:text-slate-700 ${
              item.value === section ? 'text-slate-700 font-bold' : 'text-slate-500'
            }`}
            onClick={() => {
              setCurrentSection(item.value);
              setMenuOpen(false);
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {item.displayName}
          </motion.button>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

export default MobileMenu; 