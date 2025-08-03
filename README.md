# Nike 3D - Experiência Interativa de Produtos

## 🎯 Visão Geral

Nike 3D é uma aplicação web moderna que oferece uma experiência interativa e imersiva para explorar produtos Nike através de visualização 3D. O projeto combina tecnologias de ponta como Three.js, React Three Fiber e Framer Motion para criar uma interface responsiva e animada.

## ✨ Funcionalidades Principais

### 🎨 Visualização 3D Interativa
- **Modelos 3D Realistas**: Renderização de produtos Nike em alta qualidade
- **Controles Interativos**: Rotação, zoom e navegação suave dos modelos
- **Múltiplos Produtos**: Nike Air Force 1 e Nike Air Max 90
- **Variações de Cor**: Sistema dinâmico de mudança de cores em tempo real

### 📱 Design Responsivo
- **Mobile-First**: Otimizado para dispositivos móveis
- **Breakpoints Inteligentes**: Adaptação automática para tablet e desktop
- **Navegação Adaptativa**: Menu hamburger para mobile, menu horizontal para desktop
- **Animações Suaves**: Transições fluidas entre diferentes tamanhos de tela

### 🎭 Animações Avançadas
- **Framer Motion**: Sistema de animações baseado em física
- **Transições de Página**: Animações de entrada e saída suaves
- **Micro-interações**: Feedback visual para todas as ações do usuário
- **Performance Otimizada**: Animações 60fps com hardware acceleration

### 🎯 Seções Interativas
- **Lançamentos**: Apresentação dos novos produtos
- **Air Force 1**: Detalhes e história do modelo clássico
- **Air Max 90**: Informações sobre o modelo revolucionário

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15.2.3**: Framework React com App Router
- **React 19**: Biblioteca de interface do usuário
- **TypeScript**: Tipagem estática (configurado)

### 3D & Animações
- **Three.js**: Biblioteca 3D para WebGL
- **React Three Fiber**: Renderizador React para Three.js
- **@react-three/drei**: Utilitários para React Three Fiber
- **Framer Motion**: Biblioteca de animações
- **GSAP**: Animações avançadas
- **Vanta**: Efeitos de fundo animados

### Estilização
- **Tailwind CSS 4**: Framework CSS utilitário
- **PostCSS**: Processador CSS
- **CSS Modules**: Estilos modulares

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx              # Componente principal do header
│   │   │   ├── Logo.jsx                # Logo responsivo
│   │   │   ├── HamburgerButton.jsx     # Botão do menu mobile
│   │   │   ├── MobileMenu.jsx          # Menu para dispositivos móveis
│   │   │   ├── DesktopMenu.jsx         # Menu para desktop
│   │   │   └── README.md               # Documentação do header
│   │   ├── Background.jsx              # Fundo animado
│   │   ├── ColorButtons.jsx            # Controles de cor
│   │   ├── Footer.jsx                  # Rodapé da aplicação
│   │   ├── Model3D.jsx                 # Componente do modelo 3D
│   │   └── Scene3D.jsx                 # Cena 3D principal
│   ├── constants/
│   │   ├── animations.js               # Configurações de animação
│   │   ├── animations/README.md        # Documentação das animações
│   │   └── header.js                   # Constantes do header
│   ├── hooks/
│   │   ├── useBreakpoints.js           # Hook para detectar breakpoints
│   │   └── useMenuAnimation.js         # Hook para animações do menu
│   ├── types/
│   │   └── header.js                   # Tipos TypeScript/JSDoc
│   ├── utils/
│   │   └── classNames.js               # Utilitários CSS
│   ├── globals.css                     # Estilos globais
│   ├── layout.js                       # Layout da aplicação
│   └── page.js                         # Página principal
├── public/
│   ├── Models/                         # Modelos 3D (.glb)
│   │   ├── Nike Air Force 1/
│   │   ├── Nike Air Max 90/
│   │   └── *.glb
│   ├── Background.mp4                  # Vídeo de fundo
│   ├── Nike.svg                        # Logo Nike
│   └── *.svg                           # Outros ícones
├── package.json                        # Dependências e scripts
├── next.config.mjs                     # Configuração Next.js
├── postcss.config.mjs                  # Configuração PostCSS
├── tailwind.config.js                  # Configuração Tailwind
└── README.md                           # Este arquivo
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd nike-3d
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute em modo de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

4. **Acesse a aplicação**
```
http://localhost:3000
```

### Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run turbo        # Servidor com Turbopack
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
```

## 🎨 Sistema de Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop Small**: 1024px - 1279px
- **Desktop**: >= 1280px

### Cores
- **Primária**: Slate (tons de cinza)
- **Secundária**: Branco e preto
- **Acentos**: Cores dos produtos Nike

### Tipografia
- **Família**: Sistema padrão do navegador
- **Pesos**: Regular, Medium, Semibold, Bold

## 🔧 Arquitetura

### Componentes Modulares
O projeto segue uma arquitetura modular com:
- **Separação de Responsabilidades**: Cada componente tem uma função específica
- **Reutilização**: Hooks e utilitários compartilhados
- **Manutenibilidade**: Código bem documentado e organizado
- **Escalabilidade**: Fácil adição de novos recursos

### Sistema de Animações
- **Centralizado**: Todas as animações em constantes reutilizáveis
- **Consistente**: Padrões uniformes em todo o projeto
- **Performance**: Otimizado para 60fps
- **Acessibilidade**: Respeita preferências de movimento

### Gerenciamento de Estado
- **Local**: Estado gerenciado localmente com React hooks
- **Responsivo**: Detecção automática de breakpoints
- **Reativo**: Atualizações automáticas baseadas em mudanças

## 📱 Responsividade

### Mobile (< 768px)
- Menu hamburger com overlay fullscreen
- Layout otimizado para touch
- Animações simplificadas para performance

### Tablet (768px - 1023px)
- Layout intermediário
- Menu adaptativo
- Balanceamento entre funcionalidade e performance

### Desktop (>= 1024px)
- Menu horizontal completo
- Animações avançadas
- Experiência completa com todos os recursos

## 🎯 Performance

### Otimizações Implementadas
- **Lazy Loading**: Carregamento sob demanda dos modelos 3D
- **Image Optimization**: Otimização automática de imagens com Next.js
- **Code Splitting**: Divisão automática do código
- **Bundle Analysis**: Análise de tamanho do bundle

### Métricas Alvo
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔍 Acessibilidade

### Implementações
- **ARIA Labels**: Labels descritivos para elementos interativos
- **Navegação por Teclado**: Suporte completo a navegação via teclado
- **Contraste**: Cores com contraste adequado
- **Reduced Motion**: Respeita preferências de movimento reduzido

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ usando Next.js, Three.js e Framer Motion** 