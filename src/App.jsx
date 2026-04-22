import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import Hero from './components/Hero';
import ParallaxFeatures from './components/ParallaxFeatures';
import CTA from './components/CTA';
import AnimatedCharacter from './components/AnimatedCharacter';
import Preloader from './components/Preloader';



function App() {
  const cursorRef = useRef(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Custom Cursor Follow
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out'
      });
    };
    window.addEventListener('mousemove', moveCursor);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.1, // Stability
    });


    // Connect Lenis to GSAP ScrollTrigger
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-black relative selection:bg-cyan-500 selection:text-black">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {/* Custom Cursor */}

      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-8 h-8 border-2 border-cyan-400 rounded-full pointer-events-none z-[999] mix-blend-difference hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      <Hero />
      <ParallaxFeatures />
      <CTA />
      
      <AnimatedCharacter />


      
      {/* Global Noise Overlay for Texture */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.65" 
              numOctaves="3" 
              stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </main>
  );
}

export default App;
