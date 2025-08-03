# Sistema de Animações

## Visão Geral

Este sistema centraliza todas as configurações de animação utilizadas nos componentes do header, garantindo consistência e facilitando a manutenção.

## Estrutura

### MENU_BACKGROUND_ANIMATION
Configurações específicas para a animação do fundo do menu desktop:

- **spring**: Configurações da animação spring (tipo, stiffness, damping)
- **fade**: Duração da animação de fade (opacidade)
- **scale**: Duração da animação de escala

### HEADER_ANIMATION
Configurações para a animação de entrada do header:

- **initial**: Estado inicial (y: -100, opacity: 0)
- **animate**: Estado final (y: 0, opacity: 1)
- **exit**: Estado de saída (y: -100, opacity: 0)
- **transition**: Configurações da transição

### MENU_ANIMATION
Configurações para o menu mobile:

- **initial**: Estado inicial (opacity: 0, y: -20)
- **animate**: Estado final (opacity: 1, y: 0)
- **exit**: Estado de saída (opacity: 0, y: -20)

### BUTTON_ANIMATION
Configurações para animações de botões:

- **hover**: Efeito ao passar o mouse (scale: 1.05)
- **tap**: Efeito ao clicar (scale: 0.95)

## Uso

```javascript
import { HEADER_ANIMATION, BUTTON_ANIMATION } from '../constants/animations';

// No componente
<motion.header {...HEADER_ANIMATION}>
  <motion.button whileHover={BUTTON_ANIMATION.hover}>
    Botão
  </motion.button>
</motion.header>
```

## Melhorias Implementadas

1. **Centralização**: Todas as animações em um local
2. **Consistência**: Padrões uniformes em todo o projeto
3. **Manutenibilidade**: Fácil alteração de valores
4. **Reutilização**: Configurações podem ser usadas em múltiplos componentes
5. **Performance**: Configurações otimizadas para suavidade 