import { motion, useTransform, useMotionValue } from "framer-motion";
import { useState } from "react";
import StatCard from "./StatCard";
import TechChip from "./TechChip";

function ProfileCard({ mouseX, mouseY }) {
  const [hovered, setHovered] = useState(false);

  // Fallback motion values if parent doesn't provide them (e.g. in isolation or storybook)
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);

  const mX = mouseX || fallbackX;
  const mY = mouseY || fallbackY;

  // Map mouse movement to subtle translations and 3D tilt rotations
  const transX = useTransform(mX, [-1, 1], [-10, 10]);
  const transY = useTransform(mY, [-1, 1], [-10, 10]);
  const rotX = useTransform(mY, [-1, 1], [4, -4]);
  const rotY = useTransform(mX, [-1, 1], [-4, 4]);

  const containerVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.12,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <motion.div
      style={{
        x: transX,
        y: transY,
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mx-auto w-full max-w-md"
    >
      {/* Slow pulsating ambient glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 -z-10 rounded-[40px] bg-gradient-to-r from-violet-600/35 to-blue-600/35 blur-3xl"
      />

      {/* Card wrapper with float loop & hover states */}
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={
          hovered
            ? { y: -8, scale: 1.02 }
            : { y: [0, -6, 0], scale: 1 }
        }
        transition={
          hovered
            ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            : {
                y: {
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                },
                scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }
        }
        className="relative rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl overflow-hidden shadow-lg shadow-black/10 transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(124,58,237,0.15),0_10px_30px_rgba(37,99,235,0.08)]"
      >
        {/* Glass reflection sheen sweep */}
        <motion.div
          initial={{ x: "-150%" }}
          animate={hovered ? { x: "150%" } : { x: "-150%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 -z-5 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none transform -skew-x-12"
        />

        <motion.img
          variants={childVariants}
          src="/assets/images/profile/profile.JPG"
          alt="Piyush Garg"
          loading="lazy"
          decoding="async"
          className="aspect-square w-full rounded-3xl object-cover"
        />

        <motion.div variants={childVariants} className="mt-6">
          <h3 className="text-2xl font-bold text-white">Piyush Garg</h3>
          <p className="mt-2 text-gray-400">Full Stack Developer</p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={staggerContainer}
          className="mt-8 grid grid-cols-3 gap-3"
        >
          <StatCard variants={childVariants} value="246+" label="Solved" />
          <StatCard variants={childVariants} value="181+" label="LeetCode" />
          <StatCard variants={childVariants} value="65+" label="GFG" />
        </motion.div>

        {/* Tech chips list */}
        <motion.div
          variants={staggerContainer}
          className="mt-8 flex flex-wrap gap-3"
        >
          <TechChip variants={childVariants}>React</TechChip>
          <TechChip variants={childVariants}>Next.js</TechChip>
          <TechChip variants={childVariants}>Node.js</TechChip>
          <TechChip variants={childVariants}>AI</TechChip>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ProfileCard;