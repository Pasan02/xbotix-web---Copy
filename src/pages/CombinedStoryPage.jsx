import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CombinedStoryPage.css';

gsap.registerPlugin(ScrollTrigger);

const CombinedStoryPage = () => {
  const containerRef = useRef(null);
  const firstSectionRef = useRef(null);
  const secondSectionRef = useRef(null);
  const dialogRef = useRef(null);
  const textRef = useRef(null);
  const laserBeamRef = useRef(null);
  const fotorLaserRef = useRef(null);
  const earthGlowRef = useRef(null);
  const messageContainerRef = useRef(null);
  const messageTextRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const dialogText = "With its last energy,\nEMO sends a beacon across the galaxy...";
    let currentIndex = 0;

    // Set initial states
    gsap.set(firstSectionRef.current, { opacity: 1, zIndex: 2 });
    gsap.set(secondSectionRef.current, { opacity: 0, zIndex: 1 });
    gsap.set(dialogRef.current, { opacity: 0, y: 50 });
    gsap.set(textRef.current, { opacity: 0 });
    gsap.set(laserBeamRef.current, { height: 0, opacity: 0 });
    gsap.set(fotorLaserRef.current, { height: 0, opacity: 0 });
    gsap.set(earthGlowRef.current, { opacity: 0 });
    gsap.set(messageContainerRef.current, { opacity: 0 });
    gsap.set(messageTextRef.current, { opacity: 0, y: 30 });
    gsap.set(buttonRef.current, { opacity: 0, y: 30 });

    // Create main timeline
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Dialog text typing animation (0% - 25%)
          if (progress <= 0.25) {
            const textProgress = progress / 0.25;
            const targetIndex = Math.floor(textProgress * dialogText.length);
            
            if (targetIndex > currentIndex) {
              for (let i = currentIndex; i < targetIndex && i < dialogText.length; i++) {
                const char = dialogText.charAt(i);
                if (char === '\n') {
                  textRef.current.innerHTML += '<br>';
                } else {
                  textRef.current.innerHTML += char;
                }
              }
              currentIndex = targetIndex;
            }
          }
        }
      }
    });

    // 1. Dialog box appears on scroll start (0% - 25%)
    mainTimeline.to(dialogRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.25,
      ease: "power2.out"
    }, 0)
    .to(textRef.current, {
      opacity: 1,
      duration: 0.25,
      ease: "power2.out"
    }, 0);

    // 2. Laser beam appears at 1/4 scroll (25% - 50%)
    mainTimeline.to(laserBeamRef.current, {
      height: "50vh",
      opacity: 1,
      duration: 0.25,
      ease: "power2.out"
    }, 0.25);

    // 3. Transition to second section at 1/2 scroll (50%)
    mainTimeline.to(dialogRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.1,
      ease: "power2.out"
    }, 0.48)
    .to(laserBeamRef.current, {
      opacity: 0,
      duration: 0.1,
      ease: "power2.out"
    }, 0.48)
    // Fade out first section and fade in second section
    .to(firstSectionRef.current, {
      opacity: 0,
      duration: 0.1,
      ease: "power2.out"
    }, 0.49)
    .to(secondSectionRef.current, {
      opacity: 1,
      zIndex: 2,
      duration: 0.1,
      ease: "power2.out"
    }, 0.5)
    // Start fotor laser
    .to(fotorLaserRef.current, {
      height: "50vh",
      opacity: 1,
      duration: 0.25,
      ease: "power2.out"
    }, 0.5);

    // 4. Earth glow at 3/4 scroll (75%)
    mainTimeline.to(earthGlowRef.current, {
      opacity: 1,
      duration: 0.1,
      ease: "power2.out"
    }, 0.75);

    // 5. Message text and button at bottom (85% - 100%)
    mainTimeline.to(messageContainerRef.current, {
      opacity: 1,
      duration: 0.05,
      ease: "power2.out"
    }, 0.85)
    .to(messageTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.1,
      ease: "power2.out"
    }, 0.87)
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.1,
      ease: "power2.out"
    }, 0.92);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="combined-story-page">
      {/* First Section - Robot Background */}
      <div ref={firstSectionRef} className="first-section background-image-page">
        {/* Dialog box */}
        <div ref={dialogRef} className="futuristic-dialogue-box">
          <div
            ref={textRef}
            style={{
              color: '#fff',
              fontSize: '1.05rem',
              fontFamily: 'Menda Medium, PP Monument Extended, Arial, sans-serif',
              padding: '1.2rem',
              textAlign: 'left',
              lineHeight: '1.5',
            }}
          >
          </div>
        </div>
        
        {/* Upward laser beam */}
        <div 
          ref={laserBeamRef}
          className="scroll-laser-beam"
          style={{
            position: 'fixed',
            left: 'calc(50% - 20px)',
            bottom: '50vh',
            width: '14px',
            marginLeft: '-7px',
            zIndex: 5,
            height: 0,
            background: 'linear-gradient(to top, rgba(255, 10, 10, 1), rgba(255, 60, 60, 0.9))',
            boxShadow: '0 0 50px 12px rgba(255, 20, 20, 1), 0 0 100px 20px rgba(255, 40, 40, 0.9)',
            transformOrigin: 'bottom center'
          }}
        >
          <div style={{
            position: 'absolute',
            bottom: '-25px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '50px',
            background: 'radial-gradient(ellipse at center, rgba(255, 10, 10, 1) 0%, rgba(255, 30, 30, 0.9) 20%, rgba(255, 80, 80, 0.6) 50%, rgba(255, 150, 150, 0.3) 80%, transparent 100%)',
            borderRadius: '50%',
            filter: 'blur(15px)'
          }} />
        </div>
      </div>

      {/* Second Section - Earth Background */}
      <div ref={secondSectionRef} className="second-section fotor-background-page">
        {/* Downward laser beam */}
        <div 
          ref={fotorLaserRef}
          className="scroll-fotor-laser"
          style={{
            position: 'fixed',
            left: '50%',
            top: '0',
            width: '14px',
            marginLeft: '-7px',
            zIndex: 5,
            height: 0,
            background: 'linear-gradient(to bottom, rgba(255, 10, 10, 1), rgba(255, 60, 60, 0.6))',
            boxShadow: '0 0 50px 12px rgba(255, 20, 20, 1), 0 0 100px 20px rgba(255, 40, 40, 0.9)',
            transformOrigin: 'top center'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-25px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '50px',
            background: 'radial-gradient(ellipse at center, rgba(255, 10, 10, 1) 0%, rgba(255, 30, 30, 0.9) 20%, rgba(255, 80, 80, 0.6) 50%, rgba(255, 150, 150, 0.3) 80%, transparent 100%)',
            borderRadius: '50%',
            filter: 'blur(15px)'
          }} />
        </div>
        
        {/* Earth glow effect overlay */}
        <div ref={earthGlowRef} className="earth-glow-overlay"></div>
        
        {/* Message text */}
        <div ref={messageContainerRef} className="message-container">
          <div ref={messageTextRef} className="message-text">
            That beacon has reached Earth...<br />
            and you have received it.
          </div>
          
          {/* Join Mission Button */}
          <button ref={buttonRef} className="join-mission-btn">
            Join the Mission
          </button>
        </div>
      </div>
    </div>
  );
};

export default CombinedStoryPage;