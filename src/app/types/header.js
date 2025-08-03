/**
 * @typedef {Object} MenuItem
 * @property {string} label - Label interno do item do menu
 * @property {string} value - Valor único do item do menu
 * @property {string} displayName - Nome de exibição do item do menu
 */

/**
 * @typedef {Object} Breakpoints
 * @property {boolean} isMobile - Indica se está em tela mobile (< 768px)
 * @property {boolean} isTablet - Indica se está em tela tablet (768px - 1023px)
 * @property {boolean} isDesktopSmall - Indica se está em desktop pequeno (1024px - 1279px)
 * @property {boolean} isDesktop - Indica se está em desktop (>= 1280px)
 */

/**
 * @typedef {Object} HeaderProps
 * @property {string} section - Seção atual selecionada
 * @property {function} setCurrentSection - Função para alterar a seção atual
 */

/**
 * @typedef {Object} LogoProps
 * @property {boolean} isMobile - Indica se está em tela mobile
 * @property {boolean} isTablet - Indica se está em tela tablet
 * @property {boolean} isDesktopSmall - Indica se está em desktop pequeno
 */

/**
 * @typedef {Object} MenuProps
 * @property {Array<MenuItem>} menuItems - Lista de itens do menu
 * @property {string} section - Seção atual selecionada
 * @property {function} setCurrentSection - Função para alterar a seção atual
 */

/**
 * @typedef {Object} MobileMenuProps
 * @property {boolean} menuOpen - Indica se o menu mobile está aberto
 * @property {Array<MenuItem>} menuItems - Lista de itens do menu
 * @property {string} section - Seção atual selecionada
 * @property {function} setCurrentSection - Função para alterar a seção atual
 * @property {function} setMenuOpen - Função para controlar a abertura do menu
 */ 