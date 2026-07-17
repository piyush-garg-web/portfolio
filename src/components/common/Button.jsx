import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { motionConfig } from "../../utils/motion";

function Button({
  children,
  href,
  target = "_self",
  variant = "primary",
  className = "",
  ...props
}) {
  const ref = useRef(null);
  const boundsRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const x = useSpring(magneticX, { stiffness: 340, damping: 26, mass: 0.55 });
  const y = useSpring(magneticY, { stiffness: 340, damping: 26, mass: 0.55 });

  const handleMouseMove = (event) => {
    const rect = boundsRef.current;
    if (!rect) return;
    magneticX.set((event.clientX - (rect.left + rect.width / 2)) * 0.12);
    magneticY.set((event.clientY - (rect.top + rect.height / 2)) * 0.12);
  };

  const handleMouseLeave = () => {
    boundsRef.current = null;
    magneticX.set(0);
    magneticY.set(0);
    setHovered(false);
  };

  const handleMouseEnter = () => {
    if (ref.current) boundsRef.current = ref.current.getBoundingClientRect();
    setHovered(true);
  };

  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium overflow-hidden transition-shadow duration-300";

  const variants = {
    primary:
      "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-600/25 hover:shadow-xl hover:shadow-violet-600/40",

    secondary:
      "border border-white/10 bg-white/5 text-white backdrop-blur-xl hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-violet-600/10",
  };

  const content = (
    <motion.div
      ref={ref}
      style={{ x, y, translateZ: 0 }}
      className="gpu-layer inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={
          hovered
            ? { scale: 1.03, y: motionConfig.hoverLiftSmall }
            : variant === "primary"
            ? { scale: [1, 1.01, 1], y: 0 }
            : { scale: 1, y: 0 }
        }
        whileTap={{ scale: motionConfig.tapScale }}
        transition={
          hovered
            ? { duration: motionConfig.normal, ease: motionConfig.ease }
            : variant === "primary"
            ? {
                scale: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                },
                y: { duration: motionConfig.normal, ease: motionConfig.ease },
              }
            : { duration: motionConfig.normal, ease: motionConfig.ease }
        }
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {/* Glow effect on hover */}
        {variant === "primary" && (
          <motion.div
            animate={{
              opacity: hovered ? 0.3 : 0,
              scale: hovered ? 1.2 : 1,
            }}
            transition={{ duration: motionConfig.normal, ease: motionConfig.ease }}
            className="absolute inset-0 rounded-xl bg-violet-500 blur-xl -z-10"
          />
        )}

        {/* Periodic shine + hover shine */}
        {variant === "primary" && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={
              hovered
                ? { duration: 0.8, ease: motionConfig.ease }
                : {
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 8.5,
                  }
            }
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
          />
        )}

        <span className="relative z-10">{children}</span>
      </motion.div>
    </motion.div>
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
