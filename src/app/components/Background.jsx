'use client';

import { useEffect, useRef, useState } from 'react';
import HALO from 'vanta/dist/vanta.halo.min';
import * as THREE from 'three';

export default function Background ({ options = {} }) {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        HALO({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          baseColor: 0x0,
          backgroundColor: 0xf1f5f9,
          amplitudeFactor: 2.00,
          size: 1.50,
          xOffset: 0.2,

          ...options
        })
      );
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
        setVantaEffect(null);
      }
    };
  }, []);

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 -z-10 transition-colors duration-1000"
      style={{ backgroundColor: '#f1f5f9' }}
    />
  );
};

