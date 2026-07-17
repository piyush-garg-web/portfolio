import { motion } from "framer-motion";
import { motionConfig, viewportConfig } from "../../utils/motion";

function SectionHeading({ eyebrow, title, description, showShimmer = false }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: motionConfig.staggerFast,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: motionConfig.normal, ease: motionConfig.ease },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="mb-16 max-w-3xl relative"
    >
      {/* Gentle moving spotlight behind heading */}
      <motion.div
        className="absolute -inset-10 bg-gradient-to-br from-violet-600/15 via-fuchsia-600/8 to-transparent blur-3xl pointer-events-none"
        animate={{
          backgroundPosition: ["0% 0%", "100% 50%", "0% 100%", "0% 0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      <motion.p
        variants={itemVariants}
        className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400 relative z-10"
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        variants={itemVariants}
        className="mt-4 text-4xl font-black text-white md:text-5xl relative z-10"
      >
        {showShimmer ? (
          <span className="relative inline-block">
            <span className="relative z-10">{title}</span>
            {/* Animated gradient shimmer */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["-100% 50%", "100% 50%", "-100% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                backgroundSize: "200% 100%",
              }}
            >
              {title}
            </motion.span>
          </span>
        ) : (
          title
        )}
      </motion.h2>

      {description && (
        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg leading-8 text-gray-400 relative z-10"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
