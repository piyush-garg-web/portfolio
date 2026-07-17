import { motion } from "framer-motion";
import { motionConfig } from "../../utils/motion";

function TimelineDot({ index }) {
  return (
    <motion.div
      initial={false}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: motionConfig.normal, ease: motionConfig.ease, delay: index * 0.08 }}
      className="relative z-10 block h-5 w-5 shrink-0"
    >
      {/* Expanding ripple effect */}
      <motion.div
        className="absolute inset-0 -m-4 rounded-full border border-violet-400/40 pointer-events-none"
        animate={{
          scale: [1, 2.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeOut",
          delay: index * 0.4,
        }}
      />
      <motion.div
        className="absolute inset-0 -m-3 rounded-full border border-fuchsia-400/30 pointer-events-none"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeOut",
          delay: index * 0.3 + 0.5,
        }}
      />

      {/* Outer breathing glow */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 -m-2.5 rounded-full bg-violet-500/30 blur-md"
      />

      {/* Main dot */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0px rgba(139, 92, 246, 0)",
            "0 0 16px rgba(139, 92, 246, 0.7)",
            "0 0 0px rgba(139, 92, 246, 0)",
          ],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative h-5 w-5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 shadow-lg shadow-violet-500/60"
      />

      {/* Inner bright core */}
      <motion.div
        animate={{
          scale: [0.75, 1, 0.75],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      />
    </motion.div>
  );
}

export default TimelineDot;
