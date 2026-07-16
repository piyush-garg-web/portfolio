import { motion } from "framer-motion";

function Badge({ children, className = "", ...props }) {
  return (
    <motion.span
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.span>
  );
}

export default Badge;