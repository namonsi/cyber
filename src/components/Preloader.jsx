import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      gsap.to(".preloader", {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut",
        onComplete: onComplete
      });
    }
  }, [progress, onComplete]);

  return (
    <div className="preloader fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center font-mono">
      <div className="relative w-64 h-[2px] bg-white/10 mb-8 overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-cyan-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="text-cyan-500 text-xs tracking-[0.5em] uppercase mb-2">
        Initializing Neon Protocol
      </div>
      
      <div className="text-white text-6xl font-black italic tracking-tighter">
        {progress}%
      </div>

      <div className="absolute bottom-10 left-10 text-[8px] text-white/30 space-y-1 uppercase">
        <div>> Booting kernel...</div>
        <div>> Establishing neural link...</div>
        <div>> Calibrating city punks...</div>
        <div>{progress > 50 ? '> Bypass firewalls: SUCCESS' : '> Bypass firewalls: IN PROGRESS'}</div>
      </div>
    </div>
  );
};

export default Preloader;
