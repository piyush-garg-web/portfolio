import { motion } from "framer-motion";

import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";

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
        className="flex flex-col items-center text-center"
      >
        <SectionHeading
          eyebrow="My Journey"
          title="Learning, Building & Growing"
          description="My journey from an Information Technology student to a Full Stack
          Developer building production-ready applications while continuously
          improving problem-solving skills."
        />
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