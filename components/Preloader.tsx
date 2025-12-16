'use client';

import { useState, useEffect } from 'react';

export function Preloader() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHidden(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`preloader ${isHidden ? 'hidden' : ''}`} id="preloader">
      <div className="preloader-inner">
        <div className="preloader-circle"></div>
        <span>SWAY</span>
      </div>
    </div>
  );
}
