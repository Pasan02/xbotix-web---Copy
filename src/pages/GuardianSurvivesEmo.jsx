import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model as EmoRobotModel } from '../components/EmoRobotModel';
import StoryText from '../components/StoryText.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GuardianSurvivesEmo.css';

gsap.registerPlugin(ScrollTrigger);

export default function GuardianSurvivesEmo({ disableScrollFadeOut = false }) {
  const modelRef = useRef();
  const [modelReady, setModelReady] = useState(false);
  const textBoxRef = useRef();
  // for per-word animation we keep an array of refs
  const wordRefs = useRef([]);
  const emoTextRef = useRef();
  const robotContainerRef = useRef();

  // helper to set refs for word spans
  const setWordRef = (el, idx) => {
    wordRefs.current[idx] = el;
  };

  useEffect(() => {
    console.log('GuardianSurvivesEmo useEffect running, disableScrollFadeOut:', disableScrollFadeOut);

    // Set initial states - everything hidden
    gsap.set(textBoxRef.current, { opacity: 0, scale: 0.8 });
    // hide each word initially
    wordRefs.current.forEach((w) => gsap.set(w, { opacity: 0, y: 20 }));
    // EMO: hide and offset vertically, but don't alter scale (avoid pop)
    gsap.set(emoTextRef.current, { opacity: 0, y: 30 });
    // Robot: start hidden, no X transform so it won't slide
    gsap.set(robotContainerRef.current, { opacity: 0 });

    // Animation timeline with proper sequencing - ALWAYS run entrance animations
    const tl = gsap.timeline();

    // 1. Text box (SVG container) appears first
    tl.to(textBoxRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
    // 2. First line words animate in sequence (staggered) — longer stagger for readability
    .to(wordRefs.current, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: "power2.out",
      stagger: 0.14
    }, 0.6)
    // 3. EMO text fades/slides in (no pop) and robot appears at the same time (fade only)
    .to(emoTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: "power2.out"
    }, 1.3)
    .to(robotContainerRef.current, {
      opacity: 1,
      duration: 0.25,
      ease: "power1.out"
    }, "<")
    // 4. EMO glow pulse after appearance (no scale changes)
    .to(emoTextRef.current, {
      textShadow: "0 0 30px #e21a10, 0 0 60px #e21a10, 0 0 90px #e21a10",
      duration: 0.7,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1
    }, "+=0.05");

    console.log('Guardian entrance animations set up');

    // Add scroll-triggered fade out animation only if not disabled
    // This is disabled when used within GuardianToEmoFlow to avoid conflicts
    if (!disableScrollFadeOut) {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: '+=50vh',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Fade out both text and robot as user scrolls
          gsap.set([textBoxRef.current, robotContainerRef.current], {
            opacity: 1 - progress,
            y: -50 * progress // Move up slightly as they fade
          });
        }
      });
      console.log('Guardian scroll fade-out enabled');
    } else {
      console.log('Guardian scroll fade-out disabled (used in flow)');
    }

    return () => {
      // Clean up ScrollTriggers but not the entrance timeline
      ScrollTrigger.getAll().forEach(st => st.kill());
    };

  }, [disableScrollFadeOut]);

  return (
    <div className="guardian-container">
      {/* Desktop Layout */}
      <div className="desktop-layout">
        {/* Left side - Text container */}
        <div className="text-container">
          <div ref={textBoxRef} className="text-box">
            <StoryText
              backgroundSvg="/assets/textbox.svg"
              style={{ background: 'none', boxShadow: 'none', width: '400px', height: '250px' }}
            >
              <div style={{ width: '100%', textAlign: 'center' }}>
                {/* First line split into word spans for staggered animation */}
                <div style={{ marginBottom: '8px', display: 'block' }} aria-hidden>
                  {['One', 'guardian', 'survives'].map((word, idx) => (
                    <span
                      key={idx}
                      ref={(el) => setWordRef(el, idx)}
                      style={{
                        color: '#fff',
                        fontWeight: 400,
                        fontFamily: 'PP Monument Extended, Menda, sans-serif',
                        fontSize: '1.2rem',
                        letterSpacing: '1px',
                        display: 'inline-block',
                        marginRight: '8px',
                        verticalAlign: 'middle'
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
                {/* Use a plain DOM element for EMO so the ref points to a real node for GSAP */}
                <div
                  ref={emoTextRef}
                  role="heading"
                  aria-level={1}
                  style={{
                    color: '#fff',
                    fontWeight: 700,
                    fontFamily: 'PP Monument Extended, Menda, sans-serif',
                    fontSize: '2.5rem',
                    letterSpacing: '2px',
                    textShadow: '0 0 0 #e21a10, 0 0 8px #e21a10, 0 0 16px #e21a10',
                    WebkitTextStroke: '2px #e21a10',
                    padding: '0',
                    margin: '0',
                    lineHeight: '1.1',
                    display: 'block',
                      opacity: 0
                  }}
                >
                  EMO
                </div>
              </div>
            </StoryText>
          </div>
        </div>

        {/* Right side - Robot container */}
        <div className="robot-container-wrapper">
          <div ref={robotContainerRef} className="robot-container">
            <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 10], fov: 50 }} shadows>
              <color attach="background" args={["#111"]} />
              <fog attach="fog" args={["#111", 20, 40]} />
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1} castShadow 
                shadow-mapSize={[2048, 2048]}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
              />
              <spotLight position={[0, 10, 0]} intensity={0.5} castShadow angle={0.3} penumbra={1} />
              <React.Suspense fallback={null}>
                <EmoRobotModel ref={modelRef} targetSize={3 * 1.3} onReady={() => setModelReady(true)} />
              </React.Suspense>
            </Canvas>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="mobile-layout">
        {/* Text container - appears first on mobile */}
        <div className="text-container">
          <div ref={textBoxRef} className="text-box">
            <StoryText
              backgroundSvg="/assets/textbox.svg"
              style={{ background: 'none', boxShadow: 'none', width: '320px', height: '200px' }}
            >
              <div style={{ width: '100%', textAlign: 'center' }}>
                {/* First line split into word spans for staggered animation */}
                <div style={{ marginBottom: '6px', display: 'block' }} aria-hidden>
                  {['One', 'guardian', 'survives'].map((word, idx) => (
                    <span
                      key={idx}
                      ref={(el) => setWordRef(el, idx)}
                      style={{
                        color: '#fff',
                        fontWeight: 400,
                        fontFamily: 'PP Monument Extended, Menda, sans-serif',
                        fontSize: '1rem',
                        letterSpacing: '1px',
                        display: 'inline-block',
                        marginRight: '6px',
                        verticalAlign: 'middle'
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
                {/* Use a plain DOM element for EMO so the ref points to a real node for GSAP */}
                <div
                  ref={emoTextRef}
                  role="heading"
                  aria-level={1}
                  style={{
                    color: '#fff',
                    fontWeight: 700,
                    fontFamily: 'PP Monument Extended, Menda, sans-serif',
                    fontSize: '2rem',
                    letterSpacing: '2px',
                    textShadow: '0 0 0 #e21a10, 0 0 8px #e21a10, 0 0 16px #e21a10',
                    WebkitTextStroke: '2px #e21a10',
                    padding: '0',
                    margin: '0',
                    lineHeight: '1.1',
                    display: 'block',
                      opacity: 0
                  }}
                >
                  EMO
                </div>
              </div>
            </StoryText>
          </div>
        </div>

        {/* Robot container - appears below text on mobile */}
        <div className="robot-container-wrapper">
          <div ref={robotContainerRef} className="robot-container">
            <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 10], fov: 50 }} shadows>
              <color attach="background" args={["#111"]} />
              <fog attach="fog" args={["#111", 20, 40]} />
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1} castShadow 
                shadow-mapSize={[2048, 2048]}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
              />
              <spotLight position={[0, 10, 0]} intensity={0.5} castShadow angle={0.3} penumbra={1} />
              <React.Suspense fallback={null}>
                <EmoRobotModel ref={modelRef} targetSize={2.5} onReady={() => setModelReady(true)} />
              </React.Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
