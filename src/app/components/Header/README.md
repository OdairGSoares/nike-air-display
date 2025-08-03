# Header Component

## Visão Geral

O componente Header é um header responsivo que se adapta a diferentes tamanhos de tela, oferecendo uma experiência de navegação otimizada para mobile, tablet e desktop.

## Estrutura de Arquivos

```
src/app/components/
├── Header.jsx              # Componente principal
├── Logo.jsx                # Componente do logo
├── HamburgerButton.jsx     # Botão do menu mobile
├── MobileMenu.jsx          # Menu para dispositivos móveis
├── DesktopMenu.jsx         # Menu para desktop
└── Header/
    └── README.md           # Esta documentação
```

## Componentes

### Header.jsx
Componente principal que orquestra todos os sub-componentes e gerencia o estado responsivo.

**Props:**
- `section` (string): Seção atual selecionada
- `setCurrentSection` (function): Função para alterar a seção atual

### Logo.jsx
Componente responsivo do logo que se adapta ao tamanho da tela.

**Props:**
- `isMobile` (boolean): Indica se está em tela mobile
- `isTablet` (boolean): Indica se está em tela tablet
- `isDesktopSmall` (boolean): Indica se está em desktop pequeno

### HamburgerButton.jsx
Botão para abrir o menu mobile com animações suaves.

**Props:**
- `onClick` (function): Função chamada ao clicar no botão

### MobileMenu.jsx
Menu fullscreen para dispositivos móveis com animações de entrada/saída.

**Props:**
- `menuOpen` (boolean): Controla a visibilidade do menu
- `menuItems` (array): Lista de itens do menu
- `section` (string): Seção atual selecionada
- `setCurrentSection` (function): Função para alterar a seção
- `setMenuOpen` (function): Função para controlar a abertura do menu

### DesktopMenu.jsx
Menu horizontal para desktop com indicador animado da seção ativa.

**Props:**
- `menuItems` (array): Lista de itens do menu
- `section` (string): Seção atual selecionada
- `setCurrentSection` (function): Função para alterar a seção

## Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop Small**: 1024px - 1279px
- **Desktop**: >= 1280px

## Funcionalidades

- ✅ Responsividade completa
- ✅ Animações suaves com Framer Motion
- ✅ Menu mobile com overlay
- ✅ Indicador visual da seção ativa no desktop
- ✅ Acessibilidade com aria-labels
- ✅ Hover effects
- ✅ Transições CSS otimizadas

## Dependências

- `framer-motion`: Para animações
- `next/image`: Para otimização de imagens
- `next/link`: Para navegação

## Hooks Customizados

### useBreakpoints
Hook que detecta automaticamente o tamanho da tela e retorna os estados dos breakpoints.

## Utilitários

### classNames
Função utilitária para combinar classes CSS de forma condicional.

### getResponsiveClasses
Função que gera classes CSS baseadas no breakpoint atual.

## Constantes

### MENU_ITEMS
Array com a configuração dos itens do menu.

### HEADER_ANIMATION / MENU_ANIMATION
Configurações de animação para o header e menu mobile.

## Melhorias Implementadas

1. **Separação de Responsabilidades**: Cada componente tem uma responsabilidade específica
2. **Reutilização**: Hooks e utilitários podem ser reutilizados em outros componentes
3. **Manutenibilidade**: Código organizado e bem documentado
4. **Escalabilidade**: Fácil adição de novos itens de menu ou funcionalidades
5. **Performance**: Otimizações com memoização e lazy loading
6. **Acessibilidade**: Implementação de aria-labels e navegação por teclado 