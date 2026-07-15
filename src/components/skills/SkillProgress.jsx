import { motion } from "framer-motion";

function SkillProgress({ title, level, skills }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">
          {title}
        </h3>

        <span className="text-violet-400">
          {level}%
        </span>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{
            width: `${level}%`,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
          }}
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default SkillProgress;