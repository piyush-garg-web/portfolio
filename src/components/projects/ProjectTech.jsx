import { motion } from "framer-motion";
import { motionConfig } from "../../utils/motion";

function ProjectTech({ tech }) {
  return (
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
      className="mt-6 flex flex-wrap gap-3"
    >
      {tech.map((item, index) => (
        <motion.span
          key={item}
          variants={{
            hidden: { opacity: 0, scale: 0.9, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              transition: { duration: motionConfig.fast, ease: motionConfig.ease },
            },
          }}
          animate={{
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 4 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            y: -3,
            scale: 1.08,
            borderColor: "rgba(139, 92, 246, 0.5)",
            backgroundColor: "rgba(139, 92, 246, 0.2)",
            color: "#ffffff",
            boxShadow: "0 8px 16px rgba(124, 58, 237, 0.25)",
          }}
          whileTap={{ scale: motionConfig.tapScale }}
          transition={{ duration: motionConfig.fast, ease: motionConfig.ease }}
          className="rounded-full border border-violet-500/25 bg-violet-500/12 px-3 py-2 text-sm text-violet-300 cursor-default relative"
        >
          {/* Breathing glow */}
          <motion.div
            className="absolute -inset-1 rounded-full bg-violet-600/25 blur-md pointer-events-none -z-10"
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default ProjectTech;
