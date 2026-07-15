import { useEffect, useState } from "react";

function CustomCursor() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [hover, setHover] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const move = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const enter = () => setHover(true);
    const leave = () => setHover(false);

    window.addEventListener("mousemove", move);

    const elements = document.querySelectorAll(
      "a,button,.cursor-hover"
    );

    elements.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);

      elements.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  if ("ontouchstart" in window) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400"
        style={{
          transform: `translate(${position.x}px,${position.y}px)`,
        }}
      />

      <div
        className={`pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500 transition-all duration-200 ${
          hover
            ? "h-14 w-14"
            : "h-8 w-8"
        }`}
        style={{
          transform: `translate(${position.x}px,${position.y}px)`,
        }}
      />
    </>
  );
}

export default CustomCursor;