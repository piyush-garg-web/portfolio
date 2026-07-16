import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for the dual-circle cursor
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 });

  const ringX = useSpring(mouseX, { stiffness: 300, damping: 28 });
  const ringY = useSpring(mouseY, { stiffness: 300, damping: 28 });

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Track links, buttons, and custom hovers
    let activeListeners = [];

    const updateHoverTargets = () => {
      // Remove old listeners
      activeListeners.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      activeListeners = [];

      const elements = document.querySelectorAll(
        "a, button, [role='button'], .cursor-hover, input, textarea"
      );

      const enter = () => setHovered(true);
      const leave = () => setHovered(false);

      elements.forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
        activeListeners.push({ el, enter, leave });
      });
    };

    // Run targets update immediately
    updateHoverTargets();

    // Re-check target links when DOM updates
    const observer = new MutationObserver(updateHoverTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      activeListeners.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  if ("ontouchstart" in window) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400 mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          scale: hovered ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />

      {/* Outer Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400 mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          width: hovered ? 52 : 30,
          height: hovered ? 52 : 30,
          backgroundColor: hovered ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0)",
          scale: clicked ? 0.85 : 1,
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 25 },
          height: { type: "spring", stiffness: 300, damping: 25 },
          backgroundColor: { duration: 0.2 },
          scale: { type: "spring", stiffness: 500, damping: 15 },
        }}
      />
    </>
  );
}

export default CustomCursor;