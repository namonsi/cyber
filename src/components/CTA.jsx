import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(() => {
    // Scaling text animation - from massive to normalized
    gsap.fromTo(
      textRef.current,
      { scale: 5, opacity: 0, filter: "blur(20px)" },
      {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: true,
        },
      }
    );

    // Background transition
    gsap.to(bgRef.current, {
      backgroundColor: "#00f3ff",
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "steps(1)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        toggleActions: "play pause resume pause"
      }
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative h-[150vh] w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ 
             backgroundImage: "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
             backgroundSize: "40px 40px"
           }} 
      />

      <div className="relative z-20 text-center flex flex-col items-center">
        <h2 
          ref={textRef}
          className="text-[15vw] font-black italic tracking-tighter text-white leading-none mb-20 select-none"
        >
          PLAY<br/>NOW
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <button className="relative group px-16 py-6 bg-cyan-500 text-black font-black uppercase text-2xl skew-x-[-10deg] hover:bg-white transition-colors duration-300">
            <span className="block skew-x-[10deg]">Download Protocol</span>
          </button>
          
          <button className="px-16 py-6 border-4 border-pink-500 text-pink-500 font-black uppercase text-2xl skew-x-[-10deg] hover:bg-pink-500 hover:text-white transition-all duration-300">
            <span className="block skew-x-[10deg]">Join the Grid</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-20 left-0 w-full flex justify-around px-10 text-[10px] tracking-[1em] text-cyan-500/30 uppercase font-bold">
        <span>0x882A - ONLINE</span>
        <span>LATENCY 0MS</span>
        <span>UPLINK STABLE</span>
      </div>
    </section>
  );
};

export default CTA;

