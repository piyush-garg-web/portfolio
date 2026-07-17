import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { motionConfig } from "../../utils/motion";

function TechChip({
  children,
  index = 0,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  // Magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 200, damping: 20 });
  const magneticX = useTransform(springMouseX, [-1, 1], [-12, 12]);
  const magneticY = useTransform(springMouseY, [-1, 1], [-12, 12]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) / (rect.width / 2);
    const dy = (e.clientY - centerY) / (rect.height / 2);
    mouseX.set(dx);
    mouseY.set(dy);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.span
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 15, filter: "blur(5px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: motionConfig.normal,
            ease: motionConfig.ease,
            delay: index * motionConfig.staggerFast,
          },
        },
      }}
      style={{
        x: hovered ? magneticX : 0,
        y: hovered ? magneticY : 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        handleMouseLeave();
      }}
      onMouseMove={handleMouseMove}
      whileHover={{
        scale: 1.08,
        zIndex: 10,
      }}
      whileHoverTransition={{
        duration: motionConfig.normal,
        ease: motionConfig.ease,
      }}
      className="gpu-layer rounded-full border border-violet-500/25 bg-violet-500/12 px-4 py-2 text-sm text-violet-300 backdrop-blur-xl cursor-default relative"
      {...props}
    >
      {/* Breathing glow */}
      <motion.div
        className="absolute -inset-1 rounded-full bg-violet-600/30 blur-md pointer-events-none -z-10"
        animate={{
          opacity: hovered ? [0.4, 0.7, 0.4] : [0.2, 0.35, 0.2],
          scale: hovered ? [1, 1.15, 1] : [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Hover glow */}
      <motion.div
        className="absolute -inset-2 rounded-full bg-violet-600/25 blur-lg pointer-events-none -z-20"
        animate={{
          opacity: hovered ? 0.8 : 0,
          scale: hovered ? 1.2 : 0.9,
        }}
        transition={{
          duration: motionConfig.normal,
          ease: motionConfig.ease,
        }}
      />

      {children}
    </motion.span>
  );
}

export default TechChip;
