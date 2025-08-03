import Link from 'next/link';
import Image from 'next/image';
import { getResponsiveClasses } from '../utils/classNames';

const Logo = ({ isMobile, isTablet, isDesktopSmall }) => {
  const breakpoints = { isMobile, isTablet, isDesktopSmall, isDesktop: !isMobile && !isTablet && !isDesktopSmall };
  
  const sizeClasses = {
    mobile: 'w-16 h-16',
    tablet: 'w-20 h-20',
    desktopSmall: 'w-16 h-16',
    desktop: 'w-24 h-24'
  };

  const logoSize = getResponsiveClasses(sizeClasses, breakpoints);

  return (
    <Link href="/" className={`relative ${logoSize}`}>
      <Image
        src="/Nike.svg"
        alt="Nike Logo"
        fill
        priority
        className="object-contain"
      />
    </Link>
  );
};

export default Logo; 