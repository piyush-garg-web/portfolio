import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { revealVariants, motionConfig } from "../../utils/motion";
import TechChip from "./TechChip";

function SkillCard({ title, skills, index = 0, ...props }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  // Cursor reactive lighting for card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
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
      // Infinite slow floating animation
      animate={{
        y: [0, -7 + index, 0],
        rotate: [0, 0.3 + index * 0.1, 0],
      }}
      transition={{
        y: {
          duration: 8 + index * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 10 + index * 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        y: motionConfig.hoverLift,
        scale: motionConfig.hoverScale,
        rotate: 0,
      }}
      whileHoverTransition={{
        duration: motionConfig.slow,
        ease: motionConfig.ease,
      }}
      className="interactive-card relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl shadow-xl shadow-black/15 cursor-default"
      {...props}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute -inset-[2px] rounded-3xl pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(139, 92, 246, 0.3) 90deg, transparent 180deg, rgba(236, 72, 153, 0.2) 270deg, transparent 360deg)",
          opacity: 0.3,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20 + index * 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="absolute inset-[2px] rounded-3xl bg-black/70 pointer-events-none" />

      {/* Cursor reactive lighting for card */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(139, 92, 246, 0.12), transparent 65%)`,
        }}
      />

      {/* Ambient glow inside card */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/10 to-transparent blur-md pointer-events-none"
        animate={{
          opacity: hovered ? [0.25, 0.4, 0.25] : [0.12, 0.2, 0.12],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Soft moving light reflection */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent pointer-events-none transform -skew-x-12"
        initial={{ x: "-150%" }}
        animate={{ x: "150%" }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 5 + index,
        }}
      />

      <div className="relative z-10">
        <h3 className="mb-6 text-xl font-bold text-white">{title}</h3>

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: motionConfig.staggerFast,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 relative"
        >
          {skills.map((skill, chipIndex) => (
            <TechChip
              key={skill}
              index={chipIndex}
              totalChips={skills.length}
              cardIndex={index}
            >
              {skill}
            </TechChip>
          ))}
        </motion.div>
      </div>

      {/* Hover glow */}
      <motion.div
        className="absolute -inset-5 rounded-[40px] bg-violet-600/20 blur-xl pointer-events-none -z-10"
        animate={{
          opacity: hovered ? 0.7 : 0,
          scale: hovered ? 1.12 : 0.9,
        }}
        transition={{
          duration: motionConfig.normal,
          ease: motionConfig.ease,
        }}
      />
    </motion.div>
  );
}

export default SkillCard;
