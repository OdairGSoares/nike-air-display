import { motion } from 'framer-motion';
import { BUTTON_ANIMATION } from '../constants/animations';

const HamburgerButton = ({ onClick }) => (
  <motion.button 
    onClick={onClick}
    className="z-50 p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
    aria-label="Abrir menu"
    whileHover={BUTTON_ANIMATION.hover}
    whileTap={BUTTON_ANIMATION.tap}
  >
    <div className="w-6 h-0.5 bg-slate-700 mb-1.5 transition-all"></div>
    <div className="w-6 h-0.5 bg-slate-700 mb-1.5 transition-all"></div>
    <div className="w-6 h-0.5 bg-slate-700 transition-all"></div>
  </motion.button>
);

export default HamburgerButton; 