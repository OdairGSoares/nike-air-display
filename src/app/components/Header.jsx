'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useBreakpoints } from '../hooks/useBreakpoints';
import { MENU_ITEMS, HEADER_ANIMATION } from '../constants/header';
import { classNames, getResponsiveClasses } from '../utils/classNames';
import Logo from './Logo';
import HamburgerButton from './HamburgerButton';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';

/**
 * Componente principal do Header responsivo
 * @param {Object} props - Propriedades do componente
 * @param {string} props.section - Seção atual selecionada
 * @param {function} props.setCurrentSection - Função para alterar a seção atual
 * @returns {JSX.Element} Componente Header renderizado
 */
export default function Header({ section, setCurrentSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const breakpoints = useBreakpoints();
  const { isMobile, isTablet, isDesktopSmall, isDesktop } = breakpoints;

  const isSmallScreen = isMobile || isTablet || isDesktopSmall;
  const isLargeScreen = isDesktop;

  /**
   * Gera as classes CSS responsivas para o header
   * @returns {string} String com todas as classes CSS aplicadas
   */
  const getHeaderClasses = () => {
    const baseClasses = 'z-50 flex items-center text-slate-700';
    const justifyClass = isLargeScreen ? 'justify-start' : 'justify-between';
    
    const heightClasses = {
      mobile: 'h-24',
      tablet: 'h-28',
      desktopSmall: 'h-24',
      desktop: 'h-40'
    };
    
    const marginClasses = {
      mobile: 'mx-2',
      tablet: 'mx-4',
      desktopSmall: 'mx-2',
      desktop: 'xl:mx-60'
    };
    
    const spacingClasses = {
      mobile: 'space-x-4',
      tablet: 'space-x-8',
      desktopSmall: 'space-x-4',
      desktop: 'md:space-x-10'
    };

    return classNames(
      baseClasses,
      justifyClass,
      'px-4 md:px-8',
      getResponsiveClasses(heightClasses, breakpoints),
      getResponsiveClasses(marginClasses, breakpoints),
      getResponsiveClasses(spacingClasses, breakpoints)
    );
  };

  /**
   * Alterna o estado do menu mobile
   */
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <motion.header
      {...HEADER_ANIMATION}
      className={getHeaderClasses()}
    >
      <Logo isMobile={isMobile} isTablet={isTablet} isDesktopSmall={isDesktopSmall} />

      {isSmallScreen ? (
        <>
          <HamburgerButton onClick={toggleMenu} />
          <MobileMenu 
            menuOpen={menuOpen}
            menuItems={MENU_ITEMS}
            section={section}
            setCurrentSection={setCurrentSection}
            setMenuOpen={setMenuOpen}
          />
        </>
      ) : (
        <DesktopMenu 
          menuItems={MENU_ITEMS}
          section={section}
          setCurrentSection={setCurrentSection}
        />
      )}
    </motion.header>
  );
} 