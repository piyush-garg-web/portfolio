import { motion } from "framer-motion";

import Section from "../layout/Section";

import journey from "../../data/journey";

import JourneyCard from "../journey/JourneyCard";
import TimelineDot from "../journey/TimelineDot";
import TimelineLine from "../journey/TimelineLine";

function Journey() {
  return (
    <Section id="journey">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
          My Journey
        </p>

        <h2 className="mt-4 text-center text-5xl font-black">
          Learning, Building & Growing
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-center text-gray-400">
          My journey from an Information Technology student to a Full Stack
          Developer building production-ready applications while continuously
          improving problem-solving skills.
        </p>
      </motion.div>

      <div className="relative mt-24">
        <TimelineLine />

        <div className="space-y-20">
          {journey.map((item, index) => (
            <div
              key={item.title}
              className="relative flex items-center justify-center"
            >
              <TimelineDot />

              <JourneyCard
                item={item}
                reverse={index % 2 !== 0}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Journey;