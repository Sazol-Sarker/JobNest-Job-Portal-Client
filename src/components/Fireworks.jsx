import React, { useEffect } from "react";
import confetti from "canvas-confetti";

const Fireworks = () => {
  useEffect(() => {
    launchFireworks();
  }, []);

  const launchFireworks = () => {
    const duration = 1 * 800; 
    const end = Date.now() + duration;

    (function frame() {
      // Confetti configuration
      confetti({
        particleCount: 50, // Increased particle count for a denser effect
        angle: Math.random() * 360, // Random angles for explosion
        spread: 20, // Wider spread of particles
        origin: { x: 0.5, y: 0.5 }, // Center of the screen
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ff0"], // Different colors
        scalar: 1.1, // Adjust size of particles,
        width: 0.2, // Width of the fireworks area (30% of screen)
        height: 0.2,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame); // Repeat animation until the time is over
      }
    })();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2%", zIndex: 1 }}></div>
  );
};

export default Fireworks;
