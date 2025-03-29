'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function Header({ section, setCurrentSection, isMobile, isTablet }) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const menuItems = [
    { label: 'Releases' },
    { label: 'Men' },
    { label: 'Women' },
    { label: 'Kids' },
  ];

  const selectedSectionCSS = 'transition-all duration-300 text-slate-200 font-semibold px-4 py-2 rounded-full relative z-10';
  const unselectedSectionCSS = 'transition-all duration-300 font-semibold px-4 py-2 rounded-full relative z-10';

  // Mobile menu button
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
      className={`z-50 flex items-center ${!isMobile && !isTablet ? 'justify-start' : 'justify-between'} h-24 ${isTablet ? 'h-28' : isMobile ? 'h-24' : 'h-40'} px-4 md:px-8 
                ${isTablet ? 'mx-4' : isMobile ? 'mx-2' : 'lg:mx-60'} ${isTablet ? 'space-x-8' : isMobile ? 'space-x-4' : 'md:space-x-20'} text-slate-700`}
    >
      
      <Link href="/" className={`relative ${isTablet ? 'w-20 h-20' : isMobile ? 'w-16 h-16' : 'w-24 h-24'}`}>
        <Image
          src="/Nike.svg"
          alt="Nike Logo"
          fill
          priority
          className="object-contain"
        />
      </Link>

      {isMobile || isTablet ? (
        <>
          <button 
            onClick={toggleMenu}
            className="z-50 p-2 text-slate-700"
          >
            <div className="w-6 h-0.5 bg-slate-700 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-slate-700 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-slate-700"></div>
          </button>
          
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-md z-40 flex flex-col items-center justify-center"
            >
              {menuItems.map((item) => (
                <button
                  className={`text-xl mb-6 ${item.label === section ? 'text-slate-700 font-bold' : 'text-slate-500'}`}
                  onClick={() => {
                    setCurrentSection(item.label);
                    setMenuOpen(false);
                  }}
                  key={item.label}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </>
      ) : (
        <div className='flex items-center gap-4 space-x-8 md:space-x-14'>
          <motion.div
            className="absolute bg-slate-700 h-10 rounded-full"
            initial={false}
            animate={{
              width: '110px',
              x: menuItems.findIndex(item => item.label === section) * 150
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          />

          {menuItems.map((item) => (
            <button
              className={item.label === section ? selectedSectionCSS : unselectedSectionCSS}
              onClick={() => setCurrentSection(item.label)}
              key={item.label}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </motion.header>
  );
} 