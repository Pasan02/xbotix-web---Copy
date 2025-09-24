import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from '../components/EmoRobotModel';
import RobotLaserBeam from '../components/RobotLaserBeam';
import StoryText from '../components/StoryText';
import './CombinedStoryPage.css';
// ...existing code...
import { Vector3 } from 'three';

gsap.registerPlugin(ScrollTrigger);

const EmoFotorCombinedPage = () => {
  const containerRef = useRef(null);
  const firstSectionRef = useRef(null);
  const secondSectionRef = useRef(null);
  const textRef = useRef(null);
  // wrapperRef will point at the StoryText container (SVG + children)
  const wrapperRef = useRef(null);
  const laserBeamRef = useRef(null);
  const fotorLaserRef = useRef(null);
  const earthGlowRef = useRef(null);
  const messageContainerRef = useRef(null);
  const messageTextRef = useRef(null);
  const buttonRef = useRef(null);

  const modelRef = useRef();
  const [modelReady, setModelReady] = React.useState(false);
  const [headPosition, setHeadPosition] = React.useState({ x: '50%', y: '50%' });

  useEffect(() => {
    // Section transition timeline (first half: EmoRobot, second half: Fotor)
    if (!containerRef.current) return;

    // Initial states
    gsap.set(firstSectionRef.current, { opacity: 1, zIndex: 2 });
    gsap.set(secondSectionRef.current, { opacity: 0, zIndex: 1 });
    gsap.set(earthGlowRef.current, { opacity: 0 });
    gsap.set(messageContainerRef.current, { opacity: 0 });
    gsap.set(messageTextRef.current, { opacity: 0, y: 30 });
    gsap.set(buttonRef.current, { opacity: 0, y: 30 });
    // Ensure the StoryText wrapper (dialog) is hidden at load; it will be revealed on first scroll
    try {
      if (wrapperRef.current) gsap.set(wrapperRef.current, { autoAlpha: 0 });
    } catch (e) {}

    // Dialog text typing animation (0% - 50%)
    const dialogText = "With its last energy,\nEMO sends a beacon across the galaxy...";
    let currentIndex = 0;

    let wrapperShown = false;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Reveal the wrapper as soon as the timeline starts progressing
          if (!wrapperShown && progress > 0) {
            wrapperShown = true;
            try { if (wrapperRef.current) gsap.to(wrapperRef.current, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' }); } catch(e) {}
          }

          // Dialog typing: 0–40% scroll (finish slightly earlier)
          if (progress <= 0.2) {
            const textProgress = progress / 0.2;
            const targetIndex = Math.floor(textProgress * dialogText.length);
            if (targetIndex > currentIndex) {
              for (let i = currentIndex; i < targetIndex && i < dialogText.length; i++) {
                const char = dialogText.charAt(i);
                if (char === '\n') textRef.current.innerHTML += '<br>';
                else textRef.current.innerHTML += char;
              }
              currentIndex = targetIndex;
            }
          }
        }
      }
    });

    // Dialog box laser growth/timing: keep existing animation but the actual reveal is handled on first scroll
    // (we keep the y/position transitions but do not force an immediate opacity set here to avoid conflicts)
    tl.to(wrapperRef.current, {
      y: 0,
      duration: 0.25,
      ease: "power2.out"
    }, 0)
    .to(textRef.current, {
      opacity: 1,
      duration: 0.25,
      ease: "power2.out"
    }, 0)
    .to(laserBeamRef.current, {
      height: "50vh",
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, 0)
    // Robot section fades out, Fotor fades in at halfway
    .to(wrapperRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.01,
      ease: "none"
    }, 0.49)
    .to(wrapperRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.1,
      ease: "power2.out"
    }, 0.5)
    .to(laserBeamRef.current, {
      opacity: 0,
      duration: 0.1,
      ease: "power2.out"
    }, 0.5)
    .to(firstSectionRef.current, {
      opacity: 0,
      duration: 0.1,
      ease: "power2.out"
    }, 0.5)
    .to(secondSectionRef.current, {
      opacity: 1,
      zIndex: 2,
      duration: 0.1,
      ease: "power2.out"
    }, 0.5)
    // Fotor laser grows in second half
    .to(fotorLaserRef.current, {
      height: "50vh",
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, 0.5)
    // Earth glow, message, button (timing matches FotorBackgroundPage)
    .to(earthGlowRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.out"
    }, 0.75)
    .to(messageContainerRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, 0.85)
    .to(messageTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    }, 0.87)
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, 0.92);

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  // 3D model scroll move (similar to EmoRobotPage)
  useEffect(() => {
    if (!modelReady || !modelRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(modelRef.current.position, {
        y: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      })
    }, modelRef);

    return () => ctx.revert();
  }, [modelReady]);

  function HeadTracker() {
    const { camera, size } = useThree();
    useFrame(() => {
      if (!modelRef.current) return;
      let headWorldPos = new Vector3();
      const group = modelRef.current;
      if (group.children && group.children.length) {
        const headNode = group.children.find(c => /head/i.test(c.name)) || group.children[0];
        headNode.getWorldPosition(headWorldPos);
        headWorldPos.y += 0.5;
      } else {
        group.getWorldPosition(headWorldPos);
        headWorldPos.y += 0.5;
      }

      const projected = headWorldPos.clone().project(camera);
      const x = (projected.x * 0.5 + 0.5) * size.width;
      const y = (-projected.y * 0.5 + 0.5) * size.height;
      setHeadPosition({ x: x + 'px', y: y + 'px' });
    });
    return null;
  }

  return (
    <div ref={containerRef} className="combined-story-page">
      {/* EmoRobotPage section (first half scroll) */}
      <div ref={firstSectionRef} className="first-section background-image-page" style={{ position: 'relative', zIndex: 2, opacity: 1 }}>
        <Canvas style={{ position: 'fixed', top: 0, left: 0 }} camera={{ position: [0, 0, 10], fov: 50 }} shadows>
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
            <Model ref={modelRef} onReady={() => setModelReady(true)} />
            <HeadTracker />
          </React.Suspense>
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} autoRotate={false} minDistance={2} maxDistance={100} target={[0,0,0]} />
        </Canvas>
        <div style={{ height: '200vh' }} />
        {/* dialogRef removed — StoryText wrapper controls the dialog appearance now */}
        <RobotLaserBeam headPosition={headPosition} />
        {/* Replace BottomLeftDialog with StoryText so the textbox uses the SVG frame and auto-fit behaviour */}
        <div ref={wrapperRef} style={{ position: 'fixed', left: 24, bottom: 24, zIndex: 12 }}>
          <StoryText disableScrollAnimation={true} backgroundSvg="/assets/textbox.svg" style={{ background: 'none', boxShadow: 'none', width: '360px', height: '200px' }}>
            <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
              <div ref={textRef} style={{ color: '#fff', fontSize: '14px', fontFamily: 'Menda Medium, PP Monument Extended, Arial, sans-serif', padding: '1.2rem', textAlign: 'left', lineHeight: '1.5' }} />
            </div>
          </StoryText>
        </div>
      </div>

      {/* FotorBackgroundPage section (second half scroll) */}
      <div ref={secondSectionRef} className="second-section fotor-background-page" style={{ position: 'relative', zIndex: 1, opacity: 0 }}>
        <div ref={fotorLaserRef} className="scroll-fotor-laser" style={{ position: 'fixed', left: '50%', top: '0', width: '14px', marginLeft: '-7px', zIndex: 5, height: 0, background: 'linear-gradient(to bottom, rgba(255, 10, 10, 1), rgba(255, 60, 60, 0.6))', boxShadow: '0 0 50px 12px rgba(255, 20, 20, 1), 0 0 100px 20px rgba(255, 40, 40, 0.9)', transformOrigin: 'top center' }}>
          <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '50px', background: 'radial-gradient(ellipse at center, rgba(255, 10, 10, 1) 0%, rgba(255, 30, 30, 0.9) 20%, rgba(255, 80, 80, 0.6) 50%, rgba(255, 150, 150, 0.3) 80%, transparent 100%)', borderRadius: '50%', filter: 'blur(15px)' }} />
        </div>
        <div ref={earthGlowRef} className="earth-glow-overlay"></div>
        <div ref={messageContainerRef} className="message-container">
          <div ref={messageTextRef} className="message-text">That beacon has reached Earth...<br/>and you have received it.</div>
          <button ref={buttonRef} className="join-mission-btn">Join the Mission</button>
        </div>
      </div>
    </div>
  );
};

export default EmoFotorCombinedPage;
