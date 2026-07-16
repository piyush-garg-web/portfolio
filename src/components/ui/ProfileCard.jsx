import { motion, useTransform, useMotionValue } from "framer-motion";
import { useState } from "react";
import StatCard from "./StatCard";
import TechChip from "./TechChip";
import { motionConfig, parallaxMax } from "../../utils/motion";

function ProfileCard({ mouseX, mouseY }) {
  const [hovered, setHovered] = useState(false);

  // Fallback motion values if parent doesn't provide them (e.g. in isolation or storybook)
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);

  const mX = mouseX || fallbackX;
  const mY = mouseY || fallbackY;

  // Map mouse movement to subtle translations and 3D tilt rotations (max 10px)
  const transX = useTransform(mX, [-1, 1], [-parallaxMax, parallaxMax]);
  const transY = useTransform(mY, [-1, 1], [-parallaxMax, parallaxMax]);
  const rotX = useTransform(mY, [-1, 1], [4, -4]);
  const rotY = useTransform(mX, [-1, 1], [-4, 4]);

  const containerVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: motionConfig.slow,
        ease: motionConfig.ease,
        staggerChildren: motionConfig.staggerNormal,
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
        duration: motionConfig.normal,
        ease: motionConfig.ease,
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: motionConfig.staggerFast,
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
      {/* Permanent infinite pulsating ambient glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 -z-10 rounded-[40px] bg-gradient-to-r from-violet-600/50 to-blue-600/50 blur-3xl"
      />

      {/* Additional rotating glow ring */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute inset-0 -z-10 rounded-[45px] border-2 border-violet-500/20 blur-xl"
      />

      {/* Card wrapper with float loop & hover states */}
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={
          hovered
            ? { y: motionConfig.hoverLift, scale: motionConfig.hoverScale }
            : { y: [0, -8, 0], scale: 1 }
        }
        transition={
          hovered
            ? { duration: motionConfig.normal, ease: motionConfig.ease }
            : {
                y: {
                  repeat: Infinity,
                  duration: 7,
                  ease: "easeInOut",
                },
                scale: { duration: motionConfig.normal, ease: motionConfig.ease },
              }
        }
        className="profile-image relative rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl overflow-hidden shadow-lg shadow-black/10 transition-shadow duration-500 hover:shadow-[0_25px_60px_rgba(124,58,237,0.2),0_15px_40px_rgba(37,99,235,0.1)]"
      >
        {/* Glass reflection sheen sweep */}
        <motion.div
          initial={{ x: "-150%" }}
          animate={hovered ? { x: "150%" } : { x: "-150%" }}
          transition={{ duration: 1.2, ease: motionConfig.ease }}
          className="absolute inset-0 -z-5 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none transform -skew-x-12"
        />

        {/* Breathing glow effect on image */}
        <motion.div
          animate={{
            opacity: hovered ? [0.15, 0.25, 0.15] : [0.1, 0.18, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 blur-xl"
        />

        <motion.img
          variants={childVariants}
          src="/assets/images/profile/profile.JPG"
          alt="Piyush Garg"
          loading="lazy"
          decoding="async"
          className="aspect-square w-full rounded-3xl object-cover relative z-10"
        />

        <motion.div variants={childVariants} className="mt-6 relative z-10">
          <h3 className="text-2xl font-bold text-white">Piyush Garg</h3>
          <p className="mt-2 text-gray-400">Full Stack Developer</p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={staggerContainer}
          className="mt-8 grid grid-cols-3 gap-3 relative z-10"
        >
          <StatCard variants={childVariants} value="246+" label="Solved" />
          <StatCard variants={childVariants} value="181+" label="LeetCode" />
          <StatCard variants={childVariants} value="65+" label="GFG" />
        </motion.div>

        {/* Tech chips list */}
        <motion.div
          variants={staggerContainer}
          className="mt-8 flex flex-wrap gap-3 relative z-10"
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