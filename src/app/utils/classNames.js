/**
 * Utilitário para combinar classes CSS de forma condicional
 * @param {...any} classes - Classes CSS a serem combinadas
 * @returns {string} - String com classes combinadas
 */
export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Utilitário para gerar classes responsivas baseadas em breakpoints
 * @param {Object} breakpointClasses - Objeto com classes para cada breakpoint
 * @param {Object} breakpoints - Objeto com estados dos breakpoints
 * @returns {string} - String com classes responsivas
 */
export const getResponsiveClasses = (breakpointClasses, breakpoints) => {
  const { isMobile, isTablet, isDesktopSmall, isDesktop } = breakpoints;
  
  if (isMobile) return breakpointClasses.mobile || '';
  if (isTablet) return breakpointClasses.tablet || '';
  if (isDesktopSmall) return breakpointClasses.desktopSmall || '';
  if (isDesktop) return breakpointClasses.desktop || '';
  
  return '';
}; 