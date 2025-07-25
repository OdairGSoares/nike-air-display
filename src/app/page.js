'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import Footer from './components/Footer';
import Background from './components/Background';
import ColorButtons from './components/ColorButtons';
import Scene3D from './components/Scene3D';

export default function Home() {
  const [section, setCurrentSection] = useState('Releases');
  const [color, setColor] = useState('#ffffff');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [modelVisible, setModelVisible] = useState(false);

  // Conteúdo dinâmico baseado na seção selecionada
  const sectionContent = {
    'Releases': {
      justIn: 'Novos Lançamentos',
      title: 'Coleção Nike Air Force',
      subtitle: 'A Coleção Completa do Legado',
      description: 'Explore a linha completa Nike Air Force, desde o icônico Air Force 1 até o revolucionário Air Max 90. Descubra décadas de inovação, estilo e performance que definiram a cultura de rua e excelência atlética através das gerações.',
      shopLink: 'https://www.nike.com/w/air-force-1-shoes-5sj3yzy7ok'
    },
    'Air Force 1': {
      justIn: 'Clássico',
      title: 'Nike Air Force 1',
      subtitle: 'O Que Começou Tudo',
      description: 'Criado em 1982, o Air Force 1 foi o primeiro tênis de basquete a apresentar o amortecimento Nike Air. Mais de 40 anos depois, este ícone do basquete permanece atual com seu design limpo, aerodinâmico e conforto inovador.',
      shopLink: 'https://www.nike.com/u/custom-nike-air-force-1-mid-10001938/5482226289'
    },
    'Air Force 90': {
      justIn: 'Patrimônio',
      title: 'Nike Air Max 90',
      subtitle: 'Máximo Conforto, Máximo Estilo',
      description: 'Nada tão estiloso, nada tão confortável, nada tão comprovado. O Nike Air Max 90 permanece fiel às suas origens de corrida com a icônica sola Waffle, sobreposições costuradas e detalhes clássicos em TPU. Cores clássicas celebram seu visual moderno enquanto o amortecimento Max Air adiciona conforto à jornada.',
      shopLink: 'https://www.nike.com/t/air-max-90-big-kids-shoes-lgH8r0/HF6358-100'
    }
  };

  // Detect device type
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width <= 1024);
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);

    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  // Trigger model animation on initial load com transição mais suave
  useEffect(() => {
    // Pequeno delay inicial antes de começar a mostrar o modelo
    const timer = setTimeout(() => {
      setModelVisible(true);
    }, 1000); // Delay aumentado para permitir que a página carregue primeiro
    return () => clearTimeout(timer);
  }, []);

  // Handle section change to trigger model animation com transições mais suaves
  const handleSectionChange = (newSection) => {
    if (newSection === section) return;

    // Hide model first - fade out suave
    setModelVisible(false);

    // Delay maior para mudança de seção para permitir animação completa
    setTimeout(() => {
      setCurrentSection(newSection);
      // Show model again after section change com delay maior
      setTimeout(() => {
        setModelVisible(true);
      }, 800); // Aumentar para dar tempo ao conteúdo da seção aparecer
    }, 500); // Dar tempo suficiente para o modelo desaparecer
  };

  // Handle color change animation com tempos mais suaves
  const handleColorChange = (newColor) => {
    if (newColor === color) return; // Prevenir mudanças desnecessárias

    // Fade out suave
    setModelVisible(false);

    // Esperar pela animação de saída
    setTimeout(() => {
      setColor(newColor);

      // Mostrar novamente após a mudança de cor
      setTimeout(() => {
        setModelVisible(true);
      }, 400); // Tempo maior para transição mais suave
    }, 350); // Esperar fade-out completo
  };

  // Obter conteúdo atual baseado na seção
  const currentContent = sectionContent[section];

  return (
    <div className='max-h-screen w-full overflow-x-hidden'>
      <Background />
      
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover opacity-30 z-10"
        style={{ minWidth: '100%', minHeight: '100%' }}
      >
        <source src="/Background.mp4" type="video/mp4" />
      </video>
      
      <ColorButtons
        setColor={handleColorChange}
        isMobile={isMobile}
        isTablet={isTablet}
        section={section}
      />
      <Header
        section={section}
        setCurrentSection={handleSectionChange}
        isMobile={isMobile}
        isTablet={isTablet}
      />

      <div className={`
        ${isMobile || isTablet ? 'flex flex-col' : 'grid grid-cols-2 gap-8'} 
        min-h-[calc(100vh-300px)] justify-center items-center 
        px-4 md:px-8 xl:px-60 
        ${isMobile ? 'mt-16' : isTablet ? 'mt-8' : 'mt-0'}
        text-slate-700
      `}>
        
        {/* Seção de Conteúdo de Texto */}
        <div className={`
          ${isMobile || isTablet ? 'text-center order-1' : 'text-left'} 
          w-full z-10 
          ${isMobile ? 'px-4' : isTablet ? 'px-6' : 'pr-8'} 
          ${isTablet ? 'max-w-2xl mx-auto' : ''}
          ${isMobile || isTablet ? 'mb-8' : ''}
        `}>
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className="space-y-4"
            >
              <span className="text-sm uppercase tracking-wider font-bold text-slate-600">
                {currentContent.justIn}
              </span>

              <h1 className={`
                text-4xl ${isTablet ? 'text-5xl' : 'md:text-5xl lg:text-6xl'} 
                font-[var(--font-outfit)] font-bold
                ${!isMobile && !isTablet ? 'leading-tight' : ''}
              `}>
                {currentContent.title}
              </h1>

              <h2 className={`
                text-xl ${isTablet ? 'text-2xl' : 'md:text-2xl lg:text-3xl'} 
                font-light tracking-wide
                ${!isMobile && !isTablet ? 'mb-6' : 'mb-4'}
              `}>
                {currentContent.subtitle}
              </h2>

              <p className={`
                font-[var(--font-inter)] 
                text-sm ${isTablet ? 'text-base' : 'md:text-base lg:text-lg'} 
                leading-relaxed
                ${isMobile ? 'px-4' : isTablet ? 'px-0' : 'pr-4'}
                ${isMobile ? 'hidden' : 'block'}
                max-w-lg
                ${!isMobile && !isTablet ? 'mx-0' : 'mx-auto'}
              `}>
                {currentContent.description}
              </p>

              <div className={`
                flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 
                ${isMobile || isTablet ? 'justify-center' : 'justify-start'}
                ${isMobile ? 'mt-6' : 'mt-8'}
              `}>
                <button className={`
                  bg-slate-700 text-white px-8 py-3 
                  transition-all duration-300 ease-in-out transform hover:scale-105 
                  hover:border-2 border-white/30 rounded-full 
                  text-sm font-bold tracking-wide
                  ${isMobile ? 'w-full' : ''}
                `}>
                  <a href={currentContent.shopLink} target="_blank" rel="noopener noreferrer">
                    Comprar Agora
                  </a>
                </button>

                <button className={`
                  bg-transparent text-slate-700 px-8 py-3 
                  transition-all duration-300 ease-in-out transform hover:scale-105 
                  border-2 border-slate-700 rounded-full 
                  text-sm font-bold tracking-wide
                  ${isMobile ? 'w-full' : ''}
                `}>
                  Saiba Mais
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Seção do Modelo 3D */}
        <motion.div 
          className={`
            w-full flex items-center justify-center
            ${isMobile ? 'h-[350px] order-2' : isTablet ? 'h-[450px] order-2' : 'h-[550px]'}
            ${isMobile || isTablet ? 'mt-0' : ''}
          `}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Scene3D 
            color={color} 
            isMobile={isMobile} 
            isTablet={isTablet} 
            visible={modelVisible}
            section={section}
            onColorChange={handleColorChange}
          />
        </motion.div>
      </div>

      <Footer isMobile={isMobile} isTablet={isTablet} />
    </div>
  );
}
