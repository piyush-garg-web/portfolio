import { motion } from "framer-motion";
import { motionConfig } from "../../utils/motion";

function Badge({ children, className = "", ...props }) {
  return (
    <motion.span
      whileHover={{
        scale: 1.05,
        y: motionConfig.hoverLiftSmall,
        borderColor: "rgba(139, 92, 246, 0.4)",
        backgroundColor: "rgba(139, 92, 246, 0.15)",
        boxShadow: "0 4px 12px rgba(124, 58, 237, 0.15)",
      }}
      whileTap={{ scale: motionConfig.tapScale }}
      transition={{ duration: motionConfig.fast, ease: motionConfig.ease }}
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-violet-500/20
        bg-violet-500/10
        px-4
        py-2
        text-sm
        font-medium
        text-violet-300
        backdrop-blur-md
        cursor-default
        ${className}
      `}
      {...props}
    >
      {/* Animated status indicator */}
      <motion.span
        className="relative h-2 w-2 rounded-full bg-violet-400"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.span
          className="absolute -inset-1 rounded-full bg-violet-400/30"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.span>
      {children}
    </motion.span>
  );
}

export default Badge;