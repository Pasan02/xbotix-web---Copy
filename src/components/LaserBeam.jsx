import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LaserBeam.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const LaserBeam = () => {
  const laserRef = useRef(null);

  useEffect(() => {
    const laser = laserRef.current;
    
    if (!laser) return;

    // Set initial state - beam starts at middle with no height
    gsap.set(laser, { 
      height: 0,
      opacity: 0,
      transformOrigin: 'bottom center' // Grow from bottom up
    });

      // Create a gsap context to scope animations to this component and make cleanup safe
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "body",
            start: "top top", // Start when user starts scrolling
            end: "bottom bottom", // End when bottom of page reaches bottom of viewport
            scrub: 1, // Smooth scrubbing
          }
        });

        // Animate the beam growing upward based on scroll
        tl.to(laser, {
          height: '50vh', // Grow to 50vh (from middle to top)
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        })
        .to(laser, {
          opacity: 0.9,
          duration: 1,
          ease: "power1.inOut",
          yoyo: true,
          repeat: 1
        });
      }, laserRef);

      return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={laserRef}
      className="laser-beam-upward red" // Using a different class to avoid conflicts
      style={{
        position: 'fixed',
        left: 'calc(50% - 20px)', // Moved 5 pixels to the left
        bottom: '50vh', // Position from bottom: 50vh means middle of screen
        width: '14px', // Increased width for more intensity
        marginLeft: '-7px', // Adjusted margin for new width
        zIndex: 5,
        height: 0, // Start with no height
        background: 'linear-gradient(to top, rgba(255, 10, 10, 1), rgba(255, 60, 60, 0.9))', // More intense colors
        boxShadow: '0 0 50px 12px rgba(255, 20, 20, 1), 0 0 100px 20px rgba(255, 40, 40, 0.9), 0 0 150px 30px rgba(255, 0, 0, 0.7)', // Much stronger glow
        filter: 'blur(0.1px)', // Even sharper
        transformOrigin: 'bottom center' // This is crucial - grows from bottom
      }}
    >
      {/* Glow effect at the bottom (origin point) */}
      <div style={{
        position: 'absolute',
        bottom: '-25px', // At the bottom of the beam (start point)
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px', // Larger glow for more intensity
        height: '50px', // Larger glow for more intensity
        background: 'radial-gradient(ellipse at center, rgba(255, 10, 10, 1) 0%, rgba(255, 30, 30, 0.9) 20%, rgba(255, 80, 80, 0.6) 50%, rgba(255, 150, 150, 0.3) 80%, transparent 100%)', // More intense glow
        borderRadius: '50%',
        filter: 'blur(15px)' // More blur for intense glow
      }} />
    </div>
  );
};

export default LaserBeam;