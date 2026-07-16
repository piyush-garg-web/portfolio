import { motion } from "framer-motion";
import { motionConfig } from "../../utils/motion";

function TimelineLine() {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      whileInView={{ height: "100%", opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: motionConfig.slower, ease: motionConfig.ease }}
      className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 lg:left-0 lg:translate-x-0 overflow-hidden"
    >
      {/* Animated flowing light gradient */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="h-full w-full"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.6), rgba(124, 58, 237, 0.4), transparent, rgba(139, 92, 246, 0.5), transparent)",
          backgroundSize: "100% 200%",
        }}
      />
      
      {/* Subtle energy pulse */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-b from-violet-500/20 to-blue-500/20"
      />
    </motion.div>
  );
}

export default TimelineLine;