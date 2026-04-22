import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxFeatures = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.feature-section');
    
    sections.forEach((section) => {
      // Image reveal
      gsap.from(section.querySelector('.img-reveal'), {
         scale: 1.5,
         filter: "blur(20px)",
         opacity: 0,
         scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "center center",
            scrub: 1,
         }
      });

      // Text slide-up
      gsap.from(section.querySelector('.text-reveal'), {
         y: 100,
         opacity: 0,
         duration: 1,
         scrollTrigger: {
            trigger: section,
            start: "top 70%",
         }
      });
    });

    // Background Text Scroll
    gsap.to(".bg-scroll-text", {
      x: "-20%",
      scrollTrigger: {
        trigger: ".bg-scroll-container",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-black text-white">
      {/* Massive Scroll Text Section */}
      <div className="bg-scroll-container py-40 overflow-hidden border-t border-b border-white/10">
        <h2 className="bg-scroll-text text-[25vw] font-black italic whitespace-nowrap opacity-[0.03] select-none uppercase leading-none">
          CYBERNETIC_FUTURE_UNLEASHED_NEON_PROTOCOL_
        </h2>
      </div>

      {/* Feature 01 */}
      <section className="feature-section min-h-screen grid md:grid-cols-2 items-center px-10 md:px-40 gap-20 py-20">
         <div className="text-reveal order-2 md:order-1">
            <span className="text-[#fcee0a] font-mono tracking-[0.5em] text-xs mb-10 block">01 / EVOLUTION</span>
            <h3 className="text-8xl font-black italic mb-10 leading-none">NEURAL<br/>LINK</h3>
            <p className="text-xl text-white/50 max-w-md leading-relaxed border-l-2 border-[#fcee0a] pl-8">
               Beyond the physical limits of the human form. Connect to the global neural grid and experience existence at light speed.
            </p>
         </div>
         <div className="img-reveal order-1 md:order-2 aspect-[4/5] overflow-hidden rounded-lg">
            <img 
               src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070" 
               className="w-full h-full object-cover" 
               alt="Neural Tech"
            />
         </div>
      </section>

      {/* Feature 02 */}
      <section className="feature-section min-h-screen grid md:grid-cols-2 items-center px-10 md:px-40 gap-20 py-20 bg-[#050505]">
          <div className="img-reveal aspect-[4/5] overflow-hidden rounded-lg">
            <img 
               src="https://images.unsplash.com/photo-1542462012-70b14dc74c2c?auto=format&fit=crop&q=80&w=2070" 
               className="w-full h-full object-cover" 
               alt="Glow Streets"
            />
         </div>
         <div className="text-reveal">
            <span className="text-cyan-500 font-mono tracking-[0.5em] text-xs mb-10 block">02 / DOMINANCE</span>
            <h3 className="text-8xl font-black italic mb-10 leading-none">IRON<br/>SKIES</h3>
            <p className="text-xl text-white/50 max-w-md leading-relaxed border-l-2 border-cyan-500 pl-8">
               The skyline is no longer the limit. Rule the vertical chaos of Mega-City 01 from the high-bandwidth terraces.
            </p>
         </div>
      </section>
    </div>
  );
};

export default ParallaxFeatures;
