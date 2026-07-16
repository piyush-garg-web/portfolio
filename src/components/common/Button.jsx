import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

function Button({
  children,
  href,
  target = "_self",
  variant = "primary",
  className = "",
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [shineKey, setShineKey] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Magnetic effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * 0.15;
      const y = (e.clientY - (rect.top + rect.height / 2)) * 0.15;
      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // Periodic shine every 8-10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShineKey((prev) => prev + 1);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium overflow-hidden transition-shadow duration-300";

  const variants = {
    primary:
      "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-600/20 hover:shadow-lg hover:shadow-violet-600/40",

    secondary:
      "border border-white/10 bg-white/5 text-white backdrop-blur-xl hover:bg-white/10 hover:border-white/20",
  };

  const content = (
    <div
      ref={ref}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={
          hovered
            ? { scale: 1.04, y: -3 }
            : variant === "primary"
            ? { scale: [1, 1.015, 1], y: 0 }
            : { scale: 1, y: 0 }
        }
        whileTap={{ scale: 0.96 }}
        transition={
          hovered
            ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            : variant === "primary"
            ? {
                scale: {
                  repeat: Infinity,
                  duration: 4.5,
                  ease: "easeInOut",
                },
                y: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }
            : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        }
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {/* Glow effect on hover */}
        {variant === "primary" && (
          <div className="absolute inset-0 rounded-xl bg-violet-500/0 transition-colors duration-300 group-hover:bg-violet-500/20 blur-xl -z-10" />
        )}

        {/* Periodic shine + hover shine */}
        {variant === "primary" && (
          <motion.div
            key={shineKey + (hovered ? "-hover" : "-idle")}
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={
              hovered
                ? { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
                : {
                    duration: 1.2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 7.8,
                  }
            }
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"
          />
        )}

        <span className="relative z-10">{children}</span>
      </motion.div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className="group"
      >
        {content}
      </a>
    );
  }

  return (
    <button className="group" {...props}>
      {content}
    </button>
  );
}

export default Button;