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
      {tech.map((item) => (
        <motion.span
          key={item}
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: motionConfig.fast, ease: motionConfig.ease },
            },
          }}
          whileHover={{
            y: -2,
            scale: 1.08,
            borderColor: "rgba(139, 92, 246, 0.5)",
            backgroundColor: "rgba(139, 92, 246, 0.2)",
            color: "#ffffff",
            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.25)",
          }}
          whileTap={{ scale: motionConfig.tapScale }}
          transition={{ duration: motionConfig.fast, ease: motionConfig.ease }}
          className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-sm text-violet-300 cursor-default"
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default ProjectTech;