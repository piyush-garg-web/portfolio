import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);
  const requestRef = useRef(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Premium smooth spring for liquid feel
  const cursorX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const cursorY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  // Trail creation - beautiful glowing particles
  const updateTrail = (x, y) => {
    const particle = {
      id: Math.random(),
      x,
      y,
      opacity: 0.7,
      scale: 1,
    };

    trailRef.current = [...trailRef.current, particle].slice(-8); // Keep 8 for elegant trail
    setTrail(trailRef.current);
  };

  // Animate trail particles with GPU acceleration
  useEffect(() => {
    const animateTrail = () => {
      trailRef.current = trailRef.current
        .map(p => ({
          ...p,
          opacity: p.opacity - 0.12, // Quick fade
          scale: p.scale - 0.15, // Shrink while fading
        }))
        .filter(p => p.opacity > 0);

      setTrail(trailRef.current);
      requestRef.current = requestAnimationFrame(animateTrail);
    };

    requestRef.current = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if ("ontouchstart" in window || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lastX = -100;
    let lastY = -100;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Only add trail when cursor actually moves (performance)
      const distance = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));
      if (distance > 4) {
        updateTrail(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const updateHoverTargets = () => {
      const elements = document.querySelectorAll(
        "a, button, [role='button'], .cursor-hover, input, textarea, .interactive-card, .project-image, .social-icon, .profile-image"
      );

      const enter = () => setHovered(true);
      const leave = () => setHovered(false);

      elements.forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };

    window.addEventListener("mousemove", move);
    updateHoverTargets();

    const observer = new MutationObserver(updateHoverTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  // Disable cursor on touch devices or reduced motion
  if ("ontouchstart" in window || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  return (
    <>
      {/* Beautiful glowing trail - light streak effect */}
      {trail.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="pointer-events-none fixed left-0 top-0 z-[9997] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            x: particle.x,
            y: particle.y,
            opacity: particle.opacity * (1 - index / trail.length),
            scale: particle.scale * (1 - index / trail.length * 0.4),
            background: `radial-gradient(circle, rgba(139, 92, 246, ${particle.opacity * 0.9}) 0%, rgba(124, 58, 237, ${particle.opacity * 0.5}) 40%, transparent 70%)`,
            boxShadow: `
              0 0 ${15 * particle.opacity}px rgba(139, 92, 246, ${particle.opacity * 0.7}),
              0 0 ${30 * particle.opacity}px rgba(124, 58, 237, ${particle.opacity * 0.4}),
              0 0 ${50 * particle.opacity}px rgba(167, 139, 250, ${particle.opacity * 0.2})
            `,
          }}
          transition={{ duration: 0 }}
        />
      ))}

      {/* Subtle cursor spotlight - very low opacity */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9996] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          width: 350,
          height: 350,
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.02) 0%, transparent 65%)",
        }}
      />

      {/* Main cursor - single small glowing violet dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400"
        style={{
          x: cursorX,
          y: cursorY,
          boxShadow: hovered
            ? "0 0 20px rgba(139, 92, 246, 0.9), 0 0 40px rgba(124, 58, 237, 0.6), 0 0 60px rgba(139, 92, 246, 0.3)"
            : "0 0 12px rgba(139, 92, 246, 0.7), 0 0 24px rgba(124, 58, 237, 0.4), 0 0 36px rgba(139, 92, 246, 0.2)",
        }}
        animate={{
          width: hovered ? 8 : 6,
          height: hovered ? 8 : 6,
        }}
        transition={{
          width: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        }}
      />
    </>
  );
}

export default CustomCursor;