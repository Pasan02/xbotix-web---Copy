import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from '../components/EmoRobotModel';
import RobotLaserBeam from '../components/RobotLaserBeam';
import StoryText from '../components/StoryText.jsx';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Vector3 } from 'three'

export default function EmoRobotPage({ disableScrollAnimations = false }) {
  const modelRef = useRef()
  const [modelReady, setModelReady] = React.useState(false)
  const [headPosition, setHeadPosition] = React.useState({ x: '50%', y: '50%' })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  // Create the scroll tween only after the model is ready and if not disabled
  useEffect(() => {
    if (!modelReady || disableScrollAnimations) return
    if (!modelRef.current) return

    // Create a scoped GSAP context so cleanup only affects this component's animations
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
    }, modelRef)

    // ctx.revert will clean up timelines and triggers created inside this context
    return () => ctx.revert()
  }, [modelReady, disableScrollAnimations])

  function HeadTracker() {
    const { camera, size } = useThree()
    useFrame(() => {
      if (!modelRef.current) return

      // Try to find a head-like child; fallback to modelRef position
      let headWorldPos = new Vector3()
      const group = modelRef.current
      // If the model has children, use the first child's top-most position as head
      if (group.children && group.children.length) {
        // Prefer a node named 'Head' if present
        const headNode = group.children.find(c => /head/i.test(c.name)) || group.children[0]
        headNode.getWorldPosition(headWorldPos)
        // Add a small upward offset to place laser at the "head" rather than center
        headWorldPos.y += 0.5
      } else {
        group.getWorldPosition(headWorldPos)
        headWorldPos.y += 0.5
      }

      // Project to screen space
      const projected = headWorldPos.clone().project(camera)
      const x = (projected.x * 0.5 + 0.5) * size.width
      const y = (-projected.y * 0.5 + 0.5) * size.height
      
      // Update state so RobotLaserBeam re-renders with new position
      setHeadPosition({ x: x + 'px', y: y + 'px' })
    })
    return null
  }

  // Refs for the bottom-left StoryText typing animation
  const textRef = useRef(null);
  // wrapperRef targets the entire StoryText container (SVG + children)
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Skip text animations if disabled (when used in flow)
    if (disableScrollAnimations) return;

    // Use the user's GSAP scroll-triggered typing snippet adapted to refs
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const textElement = textRef.current;
    if (!wrapper || !textElement) return;

    // start hidden; we'll reveal on first user scroll
    gsap.set(wrapper, { autoAlpha: 0 });
    textElement.innerHTML = '';

    const text = "With its last energy,\nEMO sends a beacon across the galaxy...";
    let typeInterval = null;
    let currentIndex = 0;

      // Fit text by reducing font size until it fits within the wrapper box
    const fitText = (minFont = 8, maxFont = 10) => {
      let size = maxFont;
      textElement.style.fontSize = `${size}px`;
      textElement.style.whiteSpace = 'pre-wrap';
      textElement.style.overflow = 'hidden';
      const maxH = wrapper.clientHeight - 8;
      const maxW = wrapper.clientWidth - 8;
      while ((textElement.scrollHeight > maxH || textElement.scrollWidth > maxW) && size > minFont) {
        size = Math.max(minFont, Math.floor(size - Math.max(1, size * 0.06)));
        textElement.style.fontSize = `${size}px`;
      }
    };

  // initial fit baseline (use a smaller max font so text fits the SVG)
  fitText(10, 16);

    // hoist the onFirstScroll so cleanup can remove it if the component unmounts
    let onFirstScroll = null;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'center center',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const targetIndex = Math.floor(progress * text.length);

            if (targetIndex > currentIndex) {
              if (typeInterval) clearInterval(typeInterval);
              typeInterval = setInterval(() => {
                if (currentIndex < targetIndex && currentIndex < text.length) {
                  const char = text.charAt(currentIndex);
                  if (char === '\n') {
                    textElement.innerHTML += '<br>';
                  } else {
                    textElement.innerHTML += char;
                  }
                  currentIndex++;
                } else {
                  clearInterval(typeInterval);
                }
              }, 20);

            } else if (targetIndex < currentIndex) {
              if (typeInterval) {
                clearInterval(typeInterval);
                typeInterval = null;
              }
              let boundary = targetIndex;
              while (boundary > 0 && !/\s/.test(text.charAt(boundary - 1))) {
                boundary--;
              }
              if (boundary === 0 && targetIndex > 0) boundary = 0;
              currentIndex = boundary;
              const visible = text.substring(0, currentIndex).replace(/\n/g, '<br>');
              textElement.innerHTML = visible;
            }
          },
            onComplete: () => {
            currentIndex = text.length;
            textElement.innerHTML = text.replace(/\n/g, '<br>');
            // Re-fit with larger ceiling so final layout keeps larger type when possible
            fitText(8, 16);
          }
        }
      });

      // Reveal the whole wrapper the first time the user scrolls (one-time)
      onFirstScroll = () => {
        gsap.to(wrapper, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' });
        window.removeEventListener('scroll', onFirstScroll, { passive: true });
        // clear the reference so cleanup won't try to remove again
        onFirstScroll = null;
      };
      window.addEventListener('scroll', onFirstScroll, { passive: true });
    }, wrapperRef);

    return () => {
      if (typeInterval) clearInterval(typeInterval);
      // remove the scroll listener if still present
      try {
        if (typeof onFirstScroll === 'function') window.removeEventListener('scroll', onFirstScroll, { passive: true });
      } catch (e) {
        // ignore
      }
      ctx.revert();
    };
  }, [disableScrollAnimations]);

  // Inline styles for the text node inside the StoryText frame
  const innerTextStyle = { width: '100%', textAlign: 'left', padding: '0.6rem', color: '#fff', lineHeight: '1.25', fontFamily: 'PP Monument Extended, Menda, sans-serif', fontSize: '14px' };

  return (
    <div style={{ width: '100%', minHeight: '200vh', background: '#111', overflowX: 'hidden' }}>
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
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          autoRotate={false}
          minDistance={2}
          maxDistance={100}
          target={[0, 0, 0]}
        />
  </Canvas>
    {/* spacer content so the page can be scrolled and trigger the animation */}
  <div style={{ height: '200vh' }} />
  {/* Robot laser beam that originates from the head and follows the robot */}
  <RobotLaserBeam headPosition={headPosition} />
  
      {/* Bottom-left StoryText with inline animated text (GSAP ScrollTrigger) - Hidden when used in flow */}
      {!disableScrollAnimations && (
        <div ref={wrapperRef} style={{ position: 'fixed', left: 24, bottom: 24, zIndex: 12 }}>
          <StoryText backgroundSvg="/assets/textbox.svg" style={{ background: 'none', boxShadow: 'none', width: '360px', height: '200px' }}>
            <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
              <div ref={textRef} style={innerTextStyle} />
            </div>
          </StoryText>
        </div>
      )}
    </div>
  );
}
