'use client';

import { motion } from 'framer-motion';

export default function Footer({ isMobile, isTablet }) {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      className="fixed bottom-0 left-0 right-0 backdrop-blur-md 
                 border-t border-white/50 z-50 bg-slate-50/60">

        <div className={`flex justify-between items-center ${isTablet ? 'h-16' : 'h-14'} 
                      px-4 ${isTablet ? 'px-8' : isMobile ? 'px-4' : 'md:px-8 lg:px-60'} text-slate-700`}>

          <p className="text-xs md:text-sm">© 2024 Glass UI. All rights reserved.</p>

          <div className="flex gap-2 md:gap-4">
            <a href="#" className={`${isTablet ? 'text-sm' : 'text-xs md:text-sm'} hover:text-white transition-colors`}>
              Privacy
            </a>
            <a href="#" className={`${isTablet ? 'text-sm' : 'text-xs md:text-sm'} hover:text-white transition-colors`}>
              Terms
            </a>
          </div>

        </div>

    </motion.footer>
  );
};
