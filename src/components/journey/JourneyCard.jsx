import { motion } from "framer-motion";
import { useState } from "react";
import { motionConfig, slideLeftVariants, slideRightVariants } from "../../utils/motion";

function JourneyCard({ item, reverse }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={reverse ? slideRightVariants : slideLeftVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`w-full lg:w-[45%] ${
        reverse ? "lg:ml-auto lg:mr-0" : "lg:ml-0 lg:mr-auto"
      }`}
    >
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{
          y: motionConfig.hoverLift,
          scale: motionConfig.hoverScale,
          borderColor: "rgba(139, 92, 246, 0.4)",
          backgroundColor: "rgba(139, 92, 246, 0.08)",
          boxShadow: "0 20px 40px rgba(124, 58, 237, 0.15)",
        }}
        transition={{ duration: motionConfig.normal, ease: motionConfig.ease }}
        className="interactive-card relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-shadow duration-300 cursor-default"
      >
        {/* Glass reflection sheen sweep */}
        <motion.div
          initial={{ x: "-150%" }}
          animate={hovered ? { x: "150%" } : { x: "-150%" }}
          transition={{ duration: 1.0, ease: motionConfig.ease }}
          className="absolute inset-0 -z-5 bg-gradient-to-r from-transparent via-white/12 to-transparent pointer-events-none transform -skew-x-12"
        />

        <p className="text-sm font-semibold text-violet-400">
          {item.year}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-white">
          {item.title}
        </h3>

        <p className="mt-1 text-sm text-violet-300">
          {item.location}
        </p>

        <p className="mt-5 leading-7 text-gray-400">
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default JourneyCard;