import { motion } from "framer-motion";
import { motionConfig } from "../../utils/motion";

function TimelineDot() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: motionConfig.normal, ease: motionConfig.ease }}
      className="relative z-10"
    >
      {/* Outer glow ring */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 -m-2 rounded-full bg-violet-500/30 blur-md"
      />
      
      {/* Main dot */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0px rgba(139, 92, 246, 0)",
            "0 0 12px rgba(139, 92, 246, 0.6)",
            "0 0 0px rgba(139, 92, 246, 0)",
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative h-4 w-4 rounded-full bg-violet-400"
      />
      
      {/* Inner bright core */}
      <motion.div
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      />
    </motion.div>
  );
}

export default TimelineDot;