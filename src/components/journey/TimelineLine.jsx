import { motion, useTransform } from "framer-motion";
import { motionConfig } from "../../utils/motion";

function TimelineLine({ scrollYProgress }) {
  // Transform scroll progress to height for fill
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="absolute left-4 top-0 z-0 h-full w-[2px] overflow-hidden md:left-1/2 md:-translate-x-1/2">
      {/* Base line with soft glow */}
      <motion.div
        initial={{ opacity: 0, height: "0%" }}
        whileInView={{ opacity: 1, height: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: motionConfig.slow, ease: motionConfig.ease }}
        className="absolute inset-0 bg-gradient-to-b from-violet-500/30 via-fuchsia-500/20 to-violet-500/30 blur-sm"
      />

      {/* Animated flowing light gradient */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.8), rgba(236, 72, 153, 0.6), transparent, rgba(139, 92, 246, 0.7), transparent)",
          backgroundSize: "100% 200%",
        }}
      />

      {/* Fill effect on scroll */}
      <motion.div
        style={{ height: fillHeight }}
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-violet-400 via-fuchsia-400 to-violet-400 shadow-lg shadow-violet-500/40"
      />
    </div>
  );
}

export default TimelineLine;
