import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

const AnimatedCharacter = () => {
  const containerRef = useRef(null);
  const pupilRef = useRef(null);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glitching) return;
      
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 20;
      const y = (clientY - window.innerHeight / 2) / 20;

      gsap.to(containerRef.current, {
        x: x,
        y: y,
        duration: 1.5,
        ease: 'power2.out'
      });

      // Pupil Tracking logic
      const pupilX = (clientX / window.innerWidth - 0.5) * 30;
      const pupilY = (clientY / window.innerHeight - 0.5) * 30;
      
      gsap.to(pupilRef.current, {
        x: pupilX,
        y: pupilY,
        duration: 0.2
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [glitching]);

  const handleClick = () => {
    setGlitching(true);
    gsap.timeline({ onComplete: () => setGlitching(false) })
      .to(containerRef.current, {
        rotate: 360,
        scale: 1.2,
        filter: 'hue-rotate(180deg) brightness(2)',
        duration: 0.6,
        ease: 'back.inOut(1.7)'
      })
      .to(containerRef.current, {
        rotate: 0,
        scale: 1,
        filter: 'none',
        duration: 0.4
      });
  };

  return (
    <div 
      ref={containerRef}
      className={`fixed bottom-10 right-10 z-[110] cursor-pointer group pointer-events-auto transition-opacity duration-500`}
      onClick={handleClick}
    >
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black border border-cyan-500 text-cyan-500 px-3 py-1 text-[10px] uppercase font-bold italic tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
        SYSTEM_VERIFIED
      </div>

      <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-[0_0_20px_rgba(0,243,255,0.6)]">
        {/* Outer Ring */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="#222" strokeWidth="2" strokeDasharray="10 5" className="animate-spin-slow" />
        {/* Inner Mechanics */}
        <circle cx="50" cy="50" r="35" fill="#0a0a0a" stroke="#00f3ff" strokeWidth="1" />
        {/* The Eye */}
        <g ref={pupilRef}>
          <circle cx="50" cy="50" r="15" fill="#00f3ff" style={{ filter: 'blur(2px)' }} />
          <circle cx="50" cy="50" r="8" fill="#000" />
          <circle cx="47" cy="47" r="2" fill="#fff" />
        </g>
        {/* Decorative HUD lines */}
        <path d="M 10 50 L 25 50 M 75 50 L 90 50 M 50 10 L 50 25 M 50 75 L 50 90" stroke="#00f3ff" strokeWidth="1" />
      </svg>
      
      <div className="absolute inset-0 bg-cyan-500/10 rounded-full animate-ping pointer-events-none opacity-20" />
    </div>
  );
};

export default AnimatedCharacter;


