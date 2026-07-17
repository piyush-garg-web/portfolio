import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { revealVariants, motionConfig } from "../../utils/motion";

function InfoCard({ title, value, index = 0, ...props }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  // Cursor reactive lighting
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Transform cursor position to gradient position
  const lightX = useTransform(springX, [-1, 1], [25, 75]);
  const lightY = useTransform(springY, [-1, 1], [25, 75]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      variants={revealVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        handleMouseLeave();
      }}
      onMouseMove={handleMouseMove}
      // Slow floating animation with different timings
      animate={{
        y: [0, -5 + index, 0],
      }}
      transition={{
        y: {
          duration: 6 + index * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: motionConfig.hoverScale,
      }}
      whileHoverTransition={{
        duration: motionConfig.normal,
        ease: motionConfig.ease,
      }}
      className="interactive-card gpu-layer relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl shadow-lg shadow-black/10 cursor-default"
      {...props}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute -inset-[2px] rounded-2xl pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(139, 92, 246, 0.35) 90deg, transparent 180deg, rgba(236, 72, 153, 0.25) 270deg, transparent 360deg)",
          opacity: 0.3,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 18 + index * 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="absolute inset-[2px] rounded-2xl bg-black/70 pointer-events-none" />

      {/* Cursor reactive lighting */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(139, 92, 246, 0.15), transparent 60%)`,
        }}
      />

      {/* Ambient glow inside card */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/12 to-transparent blur-md pointer-events-none"
        animate={{
          opacity: hovered ? [0.3, 0.5, 0.3] : [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Soft moving light reflection */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none transform -skew-x-12"
        initial={{ x: "-150%" }}
        animate={{ x: "150%" }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 4 + index,
        }}
      />

      <div className="relative z-10">
        <p className="text-sm text-gray-400">{title}</p>
        <h3 className="mt-2 text-lg font-semibold text-white">{value}</h3>
      </div>

      {/* Hover glow */}
      <motion.div
        className="absolute -inset-4 rounded-3xl bg-violet-600/20 blur-xl pointer-events-none -z-10"
        animate={{
          opacity: hovered ? 0.6 : 0,
          scale: hovered ? 1.1 : 0.9,
        }}
        transition={{
          duration: motionConfig.normal,
          ease: motionConfig.ease,
        }}
      />
    </motion.div>
  );
}

export default InfoCard;
