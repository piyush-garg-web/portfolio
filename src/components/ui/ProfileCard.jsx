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
  const rotX = useTransform(mY, [-1, 1], [5, -5]);
  const rotY = useTransform(mX, [-1, 1], [-5, 5]);

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
      {/* Ambient glow behind profile card */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-4 -z-10 rounded-[48px] bg-gradient-to-r from-violet-600/60 via-fuchsia-600/40 to-blue-600/60 blur-3xl"
      />

      {/* Rotating glow ring */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: {
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute -inset-2 -z-10 rounded-[44px] border-2 border-violet-500/30 blur-xl"
      />

      {/* Card wrapper with float loop & hover states */}
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={
          hovered
            ? { scale: motionConfig.hoverScale }
            : { y: [0, -10, 0], scale: 1 }
        }
        transition={
          hovered
            ? { duration: motionConfig.normal, ease: motionConfig.ease }
            : {
                y: {
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut",
                },
                scale: { duration: motionConfig.normal, ease: motionConfig.ease },
              }
        }
        className="profile-image gpu-layer relative rounded-[32px] border border-white/15 bg-white/5 p-6 backdrop-blur-2xl overflow-hidden shadow-xl shadow-black/15 transition-shadow duration-500 hover:shadow-[0_30px_80px_rgba(124,58,237,0.3),0_20px_50px_rgba(37,99,235,0.2)]"
      >
        {/* Moving light reflection */}
        <motion.div
          initial={{ x: "-150%" }}
          animate={{ x: "150%" }}
          transition={{
            duration: 2,
            ease: motionConfig.ease,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="absolute inset-0 -z-5 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none transform -skew-x-12"
        />

        {/* Ambient glow inside card */}
        <motion.div
          animate={{
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-violet-500/25 via-fuchsia-500/15 to-blue-500/25 blur-xl"
        />

        {/* Profile image container with glow */}
        <div className="relative">
          {/* Ambient glow behind image */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-violet-600/40 to-blue-600/40 blur-2xl"
          />
          <motion.img
            variants={childVariants}
            src="/assets/images/profile/profile.JPG"
            alt="Piyush Garg"
            loading="lazy"
            decoding="async"
            className="gpu-layer aspect-square w-full rounded-3xl object-cover relative z-10 shadow-xl"
          />
        </div>

        <motion.div variants={childVariants} className="mt-6 relative z-10">
          <h3 className="text-2xl font-bold text-white">Piyush Garg</h3>
          <p className="mt-2 text-gray-400">Full Stack Developer</p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={staggerContainer}
          className="mt-8 grid grid-cols-3 gap-3 relative z-10"
        >
          <StatCard variants={childVariants} value="246+" label="Solved" delay={0} />
          <StatCard variants={childVariants} value="181+" label="LeetCode" delay={0.2} />
          <StatCard variants={childVariants} value="65+" label="GFG" delay={0.4} />
        </motion.div>

        {/* Tech chips list */}
        <motion.div
          variants={staggerContainer}
          className="mt-8 flex flex-wrap gap-3 relative z-10"
        >
          <TechChip variants={childVariants} index={0}>React</TechChip>
          <TechChip variants={childVariants} index={1}>Next.js</TechChip>
          <TechChip variants={childVariants} index={2}>Node.js</TechChip>
          <TechChip variants={childVariants} index={3}>AI</TechChip>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ProfileCard;
