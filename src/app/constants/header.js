import { HEADER_ANIMATION, MENU_ANIMATION } from './animations';

// Configuração dos itens do menu
export const MENU_ITEMS = [
  { label: 'Releases', value: 'Releases', displayName: 'Lançamentos' },
  { label: 'Air Force 1', value: 'Air Force 1', displayName: 'Air Force 1' },
  { label: 'Air Force 90', value: 'Air Force 90', displayName: 'Air Max 90' },
];

// Re-export das animações para manter compatibilidade
export { HEADER_ANIMATION, MENU_ANIMATION };

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP_SMALL: 1280,
}; 