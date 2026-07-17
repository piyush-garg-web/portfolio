import { useEffect, useState } from "react";

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frameId = null;
    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = requestAnimationFrame(() => {
        setScrolled((current) => {
          const next = window.scrollY > 40;
          return current === next ? current : next;
        });
        frameId = null;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrolled;
}

export default useScrolled;
