import { motion } from 'framer-motion';
import { useMenuAnimation } from '../hooks/useMenuAnimation';

/**
 * Componente do menu desktop com animação do fundo
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.menuItems - Lista de itens do menu
 * @param {string} props.section - Seção atual selecionada
 * @param {function} props.setCurrentSection - Função para alterar a seção
 * @returns {JSX.Element} Componente DesktopMenu renderizado
 */
const DesktopMenu = ({ menuItems, section, setCurrentSection }) => {
  const selectedSectionCSS = 'transition-all duration-300 text-slate-200 font-semibold px-4 py-2 rounded-full relative z-10';
  const unselectedSectionCSS = 'transition-all duration-300 font-semibold px-4 py-2 rounded-full relative z-10 hover:text-slate-700';

  const { animationConfig } = useMenuAnimation(menuItems, section);

  return (
    <div className='flex items-center gap-4 relative'>
      {/* Fundo animado que indica a seção ativa */}
      <motion.div
        className="absolute bg-slate-700 h-10 ms-2 rounded-full"
        {...animationConfig}
      />

      {/* Botões do menu */}
      {menuItems.map((item) => (
        <button
          key={item.value}
          className={item.value === section ? selectedSectionCSS : unselectedSectionCSS}
          onClick={() => setCurrentSection(item.value)}
        >
          {item.displayName}
        </button>
      ))}
    </div>
  );
};

export default DesktopMenu; 