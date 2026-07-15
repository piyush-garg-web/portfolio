import { motion } from "framer-motion";

function JourneyCard({ item, reverse }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: reverse ? 80 : -80,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`w-full lg:w-[45%] ${
        reverse ? "lg:ml-auto" : ""
      }`}
    >
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-violet-500/40">
        <p className="text-sm font-semibold text-violet-400">
          {item.year}
        </p>

        <h3 className="mt-2 text-2xl font-bold">
          {item.title}
        </h3>

        <p className="mt-1 text-sm text-violet-300">
          {item.location}
        </p>

        <p className="mt-5 leading-7 text-gray-400">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default JourneyCard;