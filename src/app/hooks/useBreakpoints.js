import { useState, useEffect } from 'react';

export const useBreakpoints = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktopSmall, setIsDesktopSmall] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkBreakpoints = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktopSmall(width >= 1024 && width < 1280);
      setIsDesktop(width >= 1280);
    };

    checkBreakpoints();
    window.addEventListener('resize', checkBreakpoints);

    return () => {
      window.removeEventListener('resize', checkBreakpoints);
    };
  }, []);

  return { isMobile, isTablet, isDesktopSmall, isDesktop };
}; 