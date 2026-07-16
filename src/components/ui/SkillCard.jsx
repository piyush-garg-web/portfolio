import { motion } from "framer-motion";

function SkillCard({ title, skills, ...props }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.05,
      },
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{
        y: -6,
        scale: 1.01,
        borderColor: "rgba(255, 255, 255, 0.15)",
        backgroundColor: "rgba(255, 255, 255, 0.07)",
      }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] cursor-default"
      {...props}
    >
      <h3 className="mb-6 text-xl font-bold text-white">
        {title}
      </h3>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <motion.span
            key={skill}
            variants={chipVariants}
            whileHover={{
              y: -2,
              scale: 1.05,
              borderColor: "rgba(139, 92, 246, 0.4)",
              backgroundColor: "rgba(139, 92, 246, 0.15)",
              color: "#ffffff",
              boxShadow: "0 4px 10px rgba(139, 92, 246, 0.15)",
            }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300 transition-colors"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default SkillCard;