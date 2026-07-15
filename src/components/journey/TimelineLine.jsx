import { motion } from "framer-motion";

function TimelineLine() {
  return (
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: "100%" }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-violet-500 via-fuchsia-500 to-blue-500"
    />
  );
}

export default TimelineLine;