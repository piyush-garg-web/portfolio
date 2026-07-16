import { motion } from "framer-motion";
import { revealVariants, motionConfig } from "../../utils/motion";

function SkillCard({ title, skills, index = 0, ...props }) {
  const chipVariants = {
    hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: motionConfig.fast,
        ease: motionConfig.ease,
      },
    },
  };

  return (
    <motion.div
      variants={revealVariants}
      // Infinite slow floating animation - vertical oscillation + slight rotation
      animate={{
        y: [0, -6, 0],
        rotate: [0, 0.5, 0],
      }}
      transition={{
        y: {
          duration: 7 + index * 2, // Different timing for each card
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 8 + index * 2.5, // Different timing for rotation
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        y: motionConfig.hoverLift,
        scale: motionConfig.hoverScale,
        rotate: 0, // Reset rotation on hover
        borderColor: "rgba(139, 92, 246, 0.3)",
        backgroundColor: "rgba(139, 92, 246, 0.06)",
        boxShadow: "0 15px 30px rgba(124, 58, 237, 0.12)",
      }}
      whileHoverTransition={{
        duration: motionConfig.slow,
        ease: motionConfig.ease,
      }}
      className="interactive-card rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-shadow duration-300 cursor-default"
      {...props}
    >
      <h3 className="mb-6 text-xl font-bold text-white">
        {title}
      </h3>

      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: motionConfig.staggerFast,
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap gap-3"
      >
        {skills.map((skill) => (
          <motion.span
            key={skill}
            variants={chipVariants}
            whileHover={{
              y: -2,
              scale: 1.05,
              borderColor: "rgba(139, 92, 246, 0.5)",
              backgroundColor: "rgba(139, 92, 246, 0.18)",
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(139, 92, 246, 0.2)",
            }}
            transition={{ duration: motionConfig.slow, ease: motionConfig.ease }}
            className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300 transition-colors"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default SkillCard;