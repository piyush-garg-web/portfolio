import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { motionConfig } from "../../utils/motion";

function FeatureList({ features }) {
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
      className="mt-8 grid gap-3 sm:grid-cols-2"
    >
      {features.map((feature) => (
        <motion.div
          key={feature}
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: motionConfig.fast, ease: motionConfig.ease },
            },
          }}
          whileHover={{
            x: 5,
            color: "#ffffff",
          }}
          transition={{ duration: motionConfig.fast, ease: motionConfig.ease }}
          className="flex items-center gap-3 cursor-default"
        >
         <motion.div
           whileHover={{ scale: 1.2, rotate: 10 }}
           transition={{ duration: motionConfig.fast, ease: motionConfig.ease }}
         >
           <FaCheck size={14} className="text-violet-400" />
         </motion.div>

          <span className="text-gray-300 transition-colors">
            {feature}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default FeatureList;