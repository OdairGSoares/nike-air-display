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

  return (
    <div className='max-h-screen w-full overflow-x-hidden'>
      <Background />
      <ColorButtons setColor={setColor} isMobile={isMobile} isTablet={isTablet} />
      <Header section={section} setCurrentSection={setCurrentSection} isMobile={isMobile} isTablet={isTablet} />

      <div className={`flex ${isMobile || isTablet ? 'flex-col' : 'flex-row'} justify-center items-center px-4 md:px-8 lg:px-25 lg:pl-55 text-slate-700 ${isMobile ? 'mt-16' : isTablet ? 'mt-8' : 'mt-0'}`}>
        <div className={`text-center ${!isMobile && !isTablet ? 'text-left' : ''} w-full z-10 px-4 md:px-8 ${isTablet ? 'max-w-2xl mx-auto' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <span className="text-sm uppercase tracking-wider font-bold text-slate-600">Just In</span>
              
              <h1 className={`text-4xl ${isTablet ? 'text-5xl' : 'md:text-5xl lg:text-7xl'} font-[var(--font-outfit)] font-bold`}>
                Nike Dunk Low
              </h1>

              <h2 className="text-xl md:text-2xl font-light tracking-wide">
                Legendary Style, Reborn
              </h2>

              <p className={`font-[var(--font-inter)] text-sm ${isTablet ? 'text-base' : 'md:text-base'} mt-4 sm:w-full p-4 sm:p-0 max-w-lg mx-auto md:mx-0`}>
                Born in the hardwood but taken to the streets, the Nike Dunk Low returns with crisp overlays and original team colors. This basketball icon channels '80s vibes with premium leather in the upper that breaks in beautifully and ages to perfection.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className='bg-slate-700 text-white px-8 py-3 transition-all 
                                 duration-300 ease-in-out transform hover:scale-105 
                                 hover:border-2 border-white/30 rounded-full text-sm font-bold tracking-wide'>
                  Shop Now
                </button>
                <button className='bg-transparent text-slate-700 px-8 py-3 transition-all 
                                 duration-300 ease-in-out transform hover:scale-105 
                                 border-2 border-slate-700 rounded-full text-sm font-bold tracking-wide'>
                  Learn More
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={`w-full ${isMobile ? 'h-[350px]' : isTablet ? 'h-[450px]' : 'h-[550px]'} ${isTablet ? 'mt-8' : isMobile ? 'mt-4' : 'mt-0'} flex items-center justify-center`}>
          <Scene3D color={color} isMobile={isMobile} isTablet={isTablet} />
        </div>
      </div>

      <Footer isMobile={isMobile} isTablet={isTablet} />
    </div>
  );
}
