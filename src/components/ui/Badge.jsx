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
      {children}
    </motion.span>
  );
}

export default Badge;