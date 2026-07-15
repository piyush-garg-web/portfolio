import { motion } from "framer-motion";

function SkillCard({ title, skills }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >
      <h3 className="mb-6 text-xl font-bold text-white">
        {title}
      </h3>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default SkillCard;