import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "[role='button']",
  "input",
  "textarea",
  ".cursor-hover",
  ".interactive-card",
  ".project-image",
  ".social-icon",
  ".profile-image",
].join(",");

const TRAIL_LENGTH = 4;

function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return undefined;

    const pointer = { x: -100, y: -100, speed: 0, angle: 0 };
    const points = Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }));
    let frameId = null;
    let visible = false;
    let lastMoveAt = 0;

    const paint = () => {
      pointer.speed *= 0.88;

      points.forEach((point, index) => {
        const leader = index === 0 ? pointer : points[index - 1];
        const follow = 0.28 - index * 0.008;
        point.x += (leader.x - point.x) * follow;
        point.y += (leader.y - point.y) * follow;

        const intensity = Math.max(0.08, 1 - index / TRAIL_LENGTH);
        const size = 1 + intensity * 1.8;
        const node = trailRefs.current[index];
        if (node) {
          node.style.opacity = String(visible ? intensity * Math.min(pointer.speed / 8, 1) : 0);
          node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) scale(${size})`;
        }
      });

      if (visible && (performance.now() - lastMoveAt < 260 || pointer.speed > 0.08)) {
        frameId = requestAnimationFrame(paint);
      } else {
        trailRefs.current.forEach((node) => {
          if (node) node.style.opacity = "0";
        });
        frameId = null;
      }
    };

    const start = () => {
      if (frameId === null) frameId = requestAnimationFrame(paint);
    };

    const handlePointerMove = (event) => {
      const deltaX = event.clientX - pointer.x;
      const deltaY = event.clientY - pointer.y;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.speed = Math.min(Math.hypot(deltaX, deltaY), 32);
      if (pointer.speed > 0.1) pointer.angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      lastMoveAt = performance.now();
      if (!visible) {
        visible = true;
        cursorRef.current.style.opacity = "1";
      }
      const stretch = 1 + Math.min(pointer.speed / 70, 0.16);
      cursorRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) rotate(${pointer.angle}deg) scaleX(${stretch})`;
      start();
    };

    const handlePointerOver = (event) => {
      cursorRef.current.classList.toggle("energy-cursor--active", Boolean(event.target.closest(INTERACTIVE_SELECTOR)));
    };

    const handlePointerLeave = () => {
      visible = false;
      cursorRef.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("mouseleave", handlePointerLeave);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {Array.from({ length: TRAIL_LENGTH }, (_, index) => (
        <span
          key={index}
          ref={(node) => { trailRefs.current[index] = node; }}
          className="energy-cursor-trail"
        />
      ))}
      <span ref={cursorRef} className="energy-cursor" />
    </div>
  );
}

export default CustomCursor;
