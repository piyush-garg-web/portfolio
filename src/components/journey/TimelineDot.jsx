import { motion } from "framer-motion";

function TimelineDot() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative z-10 h-5 w-5 rounded-full bg-violet-500"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-violet-500 opacity-50" />
    </motion.div>
  );
}

export default TimelineDot;