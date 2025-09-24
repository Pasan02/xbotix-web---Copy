import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FotorBackgroundPage.css';
import FotorLaserBeam from '../components/FotorLaserBeam';

gsap.registerPlugin(ScrollTrigger);

const FotorBackgroundPage = () => {
  useEffect(() => {
    // Create a scroll trigger for the glow effect
    ScrollTrigger.create({
      trigger: ".fotor-background-page",
      start: "top 0%", // When page comes into view
      end: "bottom 100%", // Full page scroll
      scrub: false, // Not scrubbed, just triggered
      onEnter: () => {
        // Wait for laser beam to reach middle before showing glow
        setTimeout(() => {
          gsap.to(".earth-glow-overlay", {
            duration: 1.5,
            opacity: 1,
            ease: "power2.out"
          });
        }, 2000); // Delay to sync with laser beam
      },
    });

    // Animate text when scrolling past middle
    ScrollTrigger.create({
      trigger: ".fotor-background-page",
      start: "50% 80%", // Trigger when middle of page reaches 80% from top
      scrub: false,
      onEnter: () => {
        // First show the container
        gsap.to(".message-container", {
          duration: 0.5,
          opacity: 1,
          ease: "power2.out"
        });
        
        // Then animate the text in
        gsap.to(".message-text", {
          duration: 1.2,
          opacity: 1,
          y: 0,
          ease: "power2.out",
          delay: 0.3
        });
      }
    });

    // Animate button when reaching bottom
    ScrollTrigger.create({
      trigger: ".fotor-background-page",
      start: "80% 90%", // Trigger near bottom
      scrub: false,
      onEnter: () => {
        gsap.to(".join-mission-btn", {
          duration: 1,
          opacity: 1,
          y: 0,
          ease: "power2.out"
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="fotor-background-page">
      <FotorLaserBeam />
      {/* Earth glow effect overlay */}
      <div className="earth-glow-overlay"></div>
      
      {/* Message text */}
      <div className="message-container">
        <div className="message-text">
          That beacon has reached Earth...<br />
          and you have received it.
        </div>
        
        {/* Join Mission Button */}
        <button className="join-mission-btn">
          Join the Mission
        </button>
      </div>
    </div>
  );
};

export default FotorBackgroundPage;