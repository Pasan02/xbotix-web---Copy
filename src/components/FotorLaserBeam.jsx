import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LaserBeam.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const FotorLaserBeam = () => {
  const laserRef = useRef(null);

  useEffect(() => {
    const laser = laserRef.current;
    
    if (!laser) return;

    // Set initial state - beam starts with no height
    gsap.set(laser, { 
      height: 0,
      opacity: 0,
      transformOrigin: 'top center' // Grow from top down
    });

    // Set initial state for earth glow
    const earthGlow = document.querySelector('.earth-glow-overlay');
    if (earthGlow) {
      gsap.set(earthGlow, { opacity: 0 });
    }

    // Create separate ScrollTrigger for earth glow
    gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "45% center", // Start when we're 45% through the scroll
        end: "50% center",
        scrub: false, // No scrub for instant trigger
        onEnter: () => {
          if (earthGlow) {
            gsap.to(earthGlow, {
              opacity: 1,
              duration: 2,
              ease: "power2.out"
            });
          }
        }
      }
    });

    // Create scroll-triggered timeline for laser beam (starts at top, completes 30px before middle)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top", // Start immediately when page loads
        end: "center center", // End when middle of page reaches middle of viewport
        scrub: 1, // Smooth scrubbing
      }
    });

    // Animate the beam growing downward based on scroll
    tl.to(laser, {
      height: 'calc(50vh + 85px)', // Grow to 30px before middle
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

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={laserRef}
      className="laser-beam-downward red" // Using red variant and different class
      style={{
        position: 'fixed',
        left: '50%',
        top: '0', // Start from top of screen
        width: '14px',
        marginLeft: '-7px',
        zIndex: 5,
        height: 0, // Start with no height
        background: 'linear-gradient(to bottom, rgba(255, 10, 10, 1), rgba(255, 60, 60, 0.6))', // Red gradient going down
        boxShadow: '0 0 50px 12px rgba(255, 20, 20, 1), 0 0 100px 20px rgba(255, 40, 40, 0.9), 0 0 150px 30px rgba(255, 0, 0, 0.7)',
        filter: 'blur(0.1px)',
        transformOrigin: 'top center' // This is crucial - grows from top
      }}
    >
      {/* Glow effect at the top (origin point) */}
      <div style={{
        position: 'absolute',
        top: '-25px', // At the top of the beam (start point)
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: '50px',
        background: 'radial-gradient(ellipse at center, rgba(255, 10, 10, 1) 0%, rgba(255, 30, 30, 0.9) 20%, rgba(255, 80, 80, 0.6) 50%, rgba(255, 150, 150, 0.3) 80%, transparent 100%)',
        borderRadius: '50%',
        filter: 'blur(15px)'
      }} />
    </div>
  );
};

export default FotorLaserBeam;