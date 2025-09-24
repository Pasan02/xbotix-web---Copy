import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GuardianSurvivesEmo from './GuardianSurvivesEmo';
import EmoRobotPage from './EmoRobotPage';
import './CombinedStoryPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function GuardianToEmoFlow() {
  const guardianRef = useRef(null);
  const robotRef = useRef(null);

  useEffect(() => {
    // Add a delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!guardianRef.current || !robotRef.current) {
        console.log('Missing refs:', { guardian: !!guardianRef.current, robot: !!robotRef.current });
        return;
      }

      // Find the Guardian's text box and robot container elements
      const guardianTextBox = guardianRef.current.querySelector('.text-box');
      const guardianRobotContainer = guardianRef.current.querySelector('.robot-container');

      console.log('Found elements:', { textBox: !!guardianTextBox, robotContainer: !!guardianRobotContainer });

      if (!guardianTextBox || !guardianRobotContainer) {
        console.log('Missing Guardian elements - trying alternative selectors');
        // Try to find any elements to fade out
        const allGuardianElements = guardianRef.current.querySelectorAll('*');
        console.log('All Guardian elements:', allGuardianElements.length);
        return;
      }

      // Initial state - robot section is hidden, positioned to overlay
      gsap.set(robotRef.current, { 
        autoAlpha: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 10
      });

      // Create smooth crossfade animation that controls both Guardian fade-out and Robot fade-in
      ScrollTrigger.create({
        trigger: guardianRef.current,
        start: 'top top',
        end: '+=150vh', // Extended scroll range
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          console.log('Scroll progress:', progress);
          
          // Fade out Guardian elements (text box and robot)
          const guardianOpacity = Math.max(0, 1 - progress * 1.5); // Slower fade out
          const guardianY = -50 * progress; // Move up as they fade
          
          gsap.set([guardianTextBox, guardianRobotContainer], {
            opacity: guardianOpacity,
            y: guardianY
          });
          
          // Start fading in robot when Guardian starts fading out (around 30% scroll)
          if (progress > 0.2) {
            const fadeProgress = Math.min((progress - 0.2) / 0.6, 1); // Map 0.2-0.8 to 0-1
            gsap.set(robotRef.current, {
              autoAlpha: fadeProgress
            });
            console.log('Robot fade progress:', fadeProgress);
          }
          
          // At end of scroll, switch robot section to normal positioning
          if (progress >= 0.9) {
            gsap.set(robotRef.current, {
              position: 'relative',
              top: 'auto',
              left: 'auto',
              height: 'auto',
              autoAlpha: 1,
              zIndex: 1
            });
            console.log('Robot positioned normally');
          }
        }
      });

      console.log('ScrollTrigger created successfully');

    }, 100); // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div style={{ width: '100%', background: '#111', overflowX: 'hidden', minHeight: '300vh' }}>
      {/* Guardian Section - Extended height for scrolling */}
      <div 
        ref={guardianRef}
        style={{ 
          width: '100%',
          minHeight: '200vh', // Extended to allow for scroll animation
          position: 'relative',
          zIndex: 2
        }}
      >
        <GuardianSurvivesEmo disableScrollFadeOut={true} />
        {/* Spacer to allow scrolling */}
        <div style={{ height: '100vh', background: '#111' }} />
      </div>

      {/* Robot Section - will be positioned fixed during transition */}
      <div 
        ref={robotRef}
        style={{ 
          width: '100%',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1
        }}
      >
        <EmoRobotPage disableScrollAnimations={true} />
      </div>
    </div>
  );
}
