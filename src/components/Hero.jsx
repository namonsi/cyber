import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CyberModel from './CyberModel';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Entrance: Elegant fade and slide
    gsap.from(".nav-item", { opacity: 0, y: -20, stagger: 0.1, duration: 1 });
    gsap.from(".hero-title span", { 
      y: 100, 
      opacity: 0, 
      stagger: 0.2, 
      duration: 1.5, 
      ease: "power4.out" 
    });

    // Scroll: Parallax and Scaling
    gsap.to(".hero-title", {
       y: -100,
       opacity: 0.5,
       scrollTrigger: {
         trigger: containerRef.current,
         start: "top top",
         end: "bottom top",
         scrub: true,
       }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center pt-20">
      {/* HUD Nav */}
      <nav className="fixed top-0 left-0 w-full p-10 flex justify-between items-center z-[100] mix-blend-difference font-bold text-xs tracking-[0.5em] uppercase">
        <div className="nav-item">CP_X99</div>
        <div className="nav-item flex gap-10">
          <span>PROTOCOLS</span>
          <span>THE_GRID</span>
          <span className="text-[#fcee0a]">JOIN_NOW</span>
        </div>
      </nav>

      <div className="relative z-20 text-center">
        <h1 className="hero-title flex flex-col text-[15vw] font-black leading-[0.8] italic tracking-tighter uppercase select-none">
          <span className="block">CITY</span>
          <span className="block text-right ml-[10vw] text-[#fcee0a] italic">PUNKS</span>
        </h1>
      </div>

      {/* Hero Background Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw]">
          <CyberModel />
        </div>
      </div>

      {/* Decorative Text */}
      <div className="absolute bottom-10 left-10 text-[10px] tracking-[0.5em] text-white/40 uppercase font-mono">
        Status: Online // Latency: 4ms // Protocol: 0x882A
      </div>
      
      <div className="absolute bottom-10 right-10 text-[10px] tracking-[0.5em] text-white/40 uppercase font-mono">
        SCROLL_TO_ENTER
      </div>
    </section>
  );
};

export default Hero;


