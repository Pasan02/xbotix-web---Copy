
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FuturisticDialogBox.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const BottomLeftDialog = ({
  text = "With its last energy,\nEMO sends a beacon across the galaxy...",
  width = 360,
  height = 200,
  minFontSize = 12,
  maxFontSize = 18
}) => {
  const dialogRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const textElement = textRef.current;
    
    if (!dialog || !textElement) return;
    
    // Set initial state (hidden)
    gsap.set(dialog, { autoAlpha: 0 });
    textElement.innerHTML = "";

    // Insert the text variable from props
    const theText = text;
    let typeInterval;
    let currentIndex = 0;

    // Auto-fit: reduce font size until text fits the dialog box
    const fitText = () => {
      if (!textRef.current) return;
      const el = textRef.current;
      let current = maxFontSize;
      el.style.fontSize = `${current}px`;
      el.style.whiteSpace = 'pre-wrap';
      el.style.overflow = 'hidden';

      const maxH = height;
      const maxW = width;

      // iteratively reduce font size until fits
      while ((el.scrollHeight > maxH || el.scrollWidth > maxW) && current > minFontSize) {
        current = Math.max(minFontSize, Math.floor(current - Math.max(1, current * 0.06)));
        el.style.fontSize = `${current}px`;
      }
    };

    // Run fitText once immediately
    fitText();
    
    // Create a gsap context to scope this animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top", // Start immediately when page loads
          end: "center center", // Complete when middle of page reaches middle of viewport
          scrub: 1, // Smooth scrubbing
          onEnter: () => {
            // Fade in the dialog when scrolling begins
            gsap.to(dialog, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' })
          },
          onUpdate: (self) => {
            // Calculate how much text should be displayed based on scroll progress
            const progress = self.progress;
            const targetIndex = Math.floor(progress * theText.length);

            // If target moved forward, type characters up to the target (smooth typing)
            if (targetIndex > currentIndex) {
              // Clear any existing interval
              if (typeInterval) clearInterval(typeInterval);

              // Type characters up to the target index
              typeInterval = setInterval(() => {
                if (currentIndex < targetIndex && currentIndex < theText.length) {
                  const char = theText.charAt(currentIndex);
                  if (char === '\n') {
                    textElement.innerHTML += '<br>';
                  } else {
                    textElement.innerHTML += char;
                  }
                  currentIndex++;
                } else {
                  clearInterval(typeInterval);
                }
              }, 20); // Fast typing to catch up with scroll

            // If target moved backward, remove whole words so upward scrolling removes words
            } else if (targetIndex < currentIndex) {
              // Cancel any typing interval
              if (typeInterval) {
                clearInterval(typeInterval);
                typeInterval = null;
              }

              // Find the previous word boundary before or equal to targetIndex
              // Treat any whitespace (space/newline) as a boundary
              let boundary = targetIndex;
              while (boundary > 0 && !/\s/.test(theText.charAt(boundary - 1))) {
                boundary--;
              }

              // If boundary is 0 and targetIndex > 0 but no whitespace found, snap to 0
              if (boundary === 0 && targetIndex > 0) boundary = 0;

              // Update displayed text up to the boundary
              currentIndex = boundary;
              const visible = theText.substring(0, currentIndex).replace(/\n/g, '<br>');
              textElement.innerHTML = visible;
            }
          },
          onComplete: () => {
            // Ensure all text is displayed when animation completes
            currentIndex = theText.length;
            textElement.innerHTML = theText.replace(/\n/g, '<br>');
            // Re-run fit after full text displayed in case spacing changed
            fitText();
          }
        }
      });
    }, dialogRef);
    
    // Cleanup function
    return () => {
      if (typeInterval) {
        clearInterval(typeInterval);
      }
      ctx.revert();
    };
    
  }, []);

  // Inline styles ensure the box matches requested size and the text fits
  return (
    <div
      className="futuristic-dialogue-box"
      ref={dialogRef}
      style={{ width: `${width}px`, height: `${height}px`, overflow: 'hidden' }}
    >
      <div
        ref={textRef}
        style={{
          color: '#fff',
          fontSize: `${maxFontSize}px`,
          fontFamily: 'Menda Medium, PP Monument Extended, Arial, sans-serif',
          padding: '1.2rem',
          textAlign: 'left',
          lineHeight: '1.3',
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word'
        }}
        aria-live="polite"
      >
      </div>
    </div>
  );
};

export default BottomLeftDialog;
