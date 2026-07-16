import { motion } from "framer-motion";

function SectionHeading({ eyebrow, title, description }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-16 max-w-3xl"
    >
      <motion.p
        variants={itemVariants}
        className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400"
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        variants={itemVariants}
        className="mt-4 text-4xl font-black text-white md:text-5xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg leading-8 text-gray-400"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

export default SectionHeading;